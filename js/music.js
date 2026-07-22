"use strict";

/* ==========================================================================
 * My Love Website
 * Music Module
 * ========================================================================== */

const Music = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    const SELECTORS = {
        audio: "#background-music",
        toggleButton: "#music-toggle"
    };

    const CSS_CLASSES = {
        playing: "music--playing"
    };

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let audio = null;
    let toggleButton = null;

    let isInitialized = false;
    let isPlaying = false;

    /* ======================================================================
     * DOM
     * ====================================================================== */

    /**
     * Cache required DOM elements.
     *
     * @returns {void}
     */
    const cacheDOM = () => {

        audio = Utils.$(SELECTORS.audio);
        toggleButton = Utils.$(SELECTORS.toggleButton);

    };

    /**
     * Validate required DOM elements.
     *
     * @returns {boolean}
     */
    const validateDOM = () => {

        const missing = [];

        if (!audio) {
            missing.push(SELECTORS.audio);
        }

        if (!toggleButton) {
            missing.push(SELECTORS.toggleButton);
        }

        if (missing.length > 0) {

            console.error(
                `[Music] Missing required element(s): ${missing.join(", ")}`
            );

            return false;

        }

        return true;

    };
    /* ======================================================================
 * HELPERS
 * ====================================================================== */

    /**
     * Update music toggle button state.
     *
     * @returns {void}
     */
    const updateButton = () => {

        if (!toggleButton) {
            return;
        }

        toggleButton.classList.toggle(
            CSS_CLASSES.playing,
            isPlaying
        );

        toggleButton.setAttribute(
            "aria-pressed",
            String(isPlaying)
        );

    };

    /**
     * Play background music.
     *
     * @returns {Promise<void>}
     */
    const play = async () => {

        if (!audio || isPlaying) {
            return;
        }

        try {

            await audio.play();

            isPlaying = true;

            updateButton();

        } catch (error) {

            console.warn(
                "[Music] Unable to start playback.",
                error
            );

        }

    };

    /**
     * Pause background music.
     *
     * @returns {void}
     */
    const pause = () => {

        if (!audio || !isPlaying) {
            return;
        }

        audio.pause();

        isPlaying = false;

        updateButton();

    };

    /**
     * Toggle music playback.
     *
     * @returns {Promise<void>}
     */
    const toggle = async () => {

        if (isPlaying) {

            pause();

            return;

        }

        await play();

    };

    /* ======================================================================
     * EVENTS
     * ====================================================================== */

    /**
     * Handle music toggle button click.
     *
     * @returns {Promise<void>}
     */
    const handleToggleClick = async () => {

        await toggle();

    };

    /**
     * Register DOM events.
     */
    const bindEvents = () => {

        Utils.on(
            toggleButton,
            "click",
            handleToggleClick
        );

    };

    /**
     * Remove DOM events.
     */
    const unbindEvents = () => {

        Utils.off(
            toggleButton,
            "click",
            handleToggleClick
        );

    };
    /* ======================================================================
 * LIFECYCLE
 * ====================================================================== */

    /**
     * Reset music module state.
     *
     * @returns {void}
     */
    const destroy = () => {

        pause();

        unbindEvents();

        audio = null;
        toggleButton = null;

        isInitialized = false;
        isPlaying = false;

    };

    /**
     * Initialize music module.
     *
     * @returns {void}
     */
    const init = () => {

        if (isInitialized) {
            return;
        }

        isInitialized = true;

        cacheDOM();

        if (!validateDOM()) {

            isInitialized = false;

            return;

        }

        bindEvents();

        updateButton();

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return {

        init,
        play,
        pause,
        toggle,
        destroy

    };

})();