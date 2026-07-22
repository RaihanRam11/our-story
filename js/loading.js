"use strict";

/* ==========================================================================
 * My Love Website
 * Loading Module
 * ========================================================================== */

const Loading = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    const STEP_DELAY = 15;

    const STATUS_DELAY = 300;

    const EXIT_DELAY = 600;

    const LOADING_STAGES = [

        {
            progress: 20,
            text: "Loading assets..."
        },

        {
            progress: 45,
            text: "Preparing memories..."
        },

        {
            progress: 70,
            text: "Almost ready..."
        },

        {
            progress: 100,
            text: "Welcome ❤️"
        }

    ];

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let screen = null;

    let progressBar = null;

    let percentage = null;

    let status = null;

    let progressValue = 0;

    let isLoading = false;

    let onComplete = null;

    let previousHtmlOverflow = "";

    let previousBodyOverflow = "";

    /* ======================================================================
     * DOM
     * ====================================================================== */

    /**
     * Cache DOM elements.
     */

    const cacheDOM = () => {

        /*
        ===================================================================
        Sinkron dengan index.html Final Revision v2

        HTML:
            id="loading"
            id="loadingFill"
            id="loadingPercent"
            id="loadingMessage"

        ===================================================================
        */

        screen = Utils.$("#loading");

        progressBar = Utils.$("#loadingFill");

        percentage = Utils.$("#loadingPercent");

        status = Utils.$("#loadingMessage");

    };

    /**
     * Validate required DOM elements.
     *
     * @returns {boolean}
     */

    const validateDOM = () => {

        return [

            screen,

            progressBar,

            percentage,

            status

        ].every(Boolean);

    };

    /* ======================================================================
     * SCROLL
     * ====================================================================== */

    /**
     * Lock page scrolling.
     */

    const lockScroll = () => {

        previousHtmlOverflow =
            document.documentElement.style.overflow;

        previousBodyOverflow =
            document.body.style.overflow;

        document.documentElement.style.overflow = "hidden";

        document.body.style.overflow = "hidden";

    };

    /**
     * Restore page scrolling.
     */

    const unlockScroll = () => {

        document.documentElement.style.overflow =
            previousHtmlOverflow;

        document.body.style.overflow =
            previousBodyOverflow;

    };
    /* ======================================================================
     * PROGRESS
     * ====================================================================== */

    /**
     * Update loading progress.
     *
     * @param {number} value - Progress value (0 - 100).
     */
    const updateProgress = (value) => {

        if (typeof value !== "number" || Number.isNaN(value)) {
            return;
        }

        progressValue = Math.max(
            0,
            Math.min(100, Math.round(value))
        );

        if (progressBar) {
            progressBar.style.width = `${progressValue}%`;
        }

        if (percentage) {
            percentage.textContent = `${progressValue}%`;
        }

    };

    /**
     * Update loading status text.
     *
     * @param {string} text - Status message.
     */
    const updateStatus = (text) => {

        if (!status) {
            return;
        }

        status.textContent = String(text);

    };

    /**
     * Reset loading progress.
     */
    const resetProgress = () => {

        progressValue = 0;

        updateProgress(0);

        updateStatus("Memuat kenangan...");

    };
    /* ======================================================================
 * SIMULATION
 * ====================================================================== */

    /**
     * Run loading animation sequence.
     *
     * @returns {Promise<void>}
     */
    const simulateLoading = async () => {

        if (isLoading) {
            return;
        }

        isLoading = true;

        resetProgress();

        for (const stage of LOADING_STAGES) {

            while (progressValue < stage.progress) {

                if (!isLoading) {
                    return;
                }

                updateProgress(progressValue + 1);

                await Utils.delay(STEP_DELAY);

            }

            updateStatus(stage.text);

            await Utils.delay(STATUS_DELAY);

        }

        isLoading = false;

    };
    /* ======================================================================
 * LIFECYCLE
 * ====================================================================== */

    /**
     * Finish loading process.
     *
     * @returns {Promise<void>}
     */
    const finish = async () => {

        if (!screen) {
            return;
        }

        Utils.addClass(screen, "hide");

        await Utils.delay(EXIT_DELAY);

        unlockScroll();

        const callback = onComplete;

        destroy();

        if (typeof callback === "function") {
            callback();
        }

    };

    /**
     * Reset module state.
     */
    const destroy = () => {

        screen = null;

        progressBar = null;

        percentage = null;

        status = null;

        progressValue = 0;

        isLoading = false;

        onComplete = null;

    };

    /**
     * Initialize loading module.
     *
     * @param {Function|null} callback
     *
     * @returns {Promise<void>}
     */
    const init = async (callback = null) => {

        if (isLoading) {
            return;
        }

        onComplete =
            typeof callback === "function"
                ? callback
                : null;

        cacheDOM();

        if (!validateDOM()) {

            console.error(
                "[Loading] Required loading elements were not found."
            );

            return;

        }

        lockScroll();

        await simulateLoading();

        await finish();

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return Object.freeze({

        init

    });

})();