"use strict";

/* ==========================================================================
 * My Love Website
 * Journey Module
 * ========================================================================== */

const Journey = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    /**
     * DOM Selectors
     */
    const SELECTORS = {

        container: "#journey",

        content: ".journey-content",

        nextButton: "#journey-next"

    };

    /**
     * CSS Classes
     */
    const CSS_CLASSES = {

        active: "journey--active",

        hidden: "journey--hidden"

    };

    /**
     * Animation Duration (ms)
     */
    const ANIMATION = {

        fadeIn: 800,

        fadeOut: 600

    };

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let container = null;

    let content = null;

    let nextButton = null;

    let isInitialized = false;

    let isActive = false;

    let isTransitioning = false;

    let onComplete = null;

    /* ======================================================================
     * DOM
     * ====================================================================== */

    /**
     * Cache required DOM elements.
     */
    const cacheDOM = () => {

        container = Utils.$(
            SELECTORS.container
        );

        content = Utils.$(
            SELECTORS.content
        );

        nextButton = Utils.$(
            SELECTORS.nextButton
        );

    };

    /**
     * Validate required DOM elements.
     *
     * @returns {boolean}
     */
    const validateDOM = () => {

        const missing = [];

        if (!container) {
            missing.push(
                SELECTORS.container
            );
        }

        if (!content) {
            missing.push(
                SELECTORS.content
            );
        }

        if (!nextButton) {
            missing.push(
                SELECTORS.nextButton
            );
        }

        if (missing.length > 0) {

            console.error(
                `[Journey] Missing required element(s): ${missing.join(", ")}`
            );

            return false;

        }

        return true;

    };
    /* ======================================================================
 * HELPERS
 * ====================================================================== */

    /**
     * Enable next button.
     */
    const enableNextButton = () => {

        if (nextButton) {
            nextButton.disabled = false;
        }

    };

    /**
     * Disable next button.
     */
    const disableNextButton = () => {

        if (nextButton) {
            nextButton.disabled = true;
        }

    };

    /**
     * Show journey section.
     *
     * @returns {Promise<void>}
     */
    const show = async () => {

        if (
            !container ||
            isTransitioning ||
            isActive
        ) {
            return;
        }

        isTransitioning = true;

        try {

            Utils.removeClass(
                container,
                CSS_CLASSES.hidden
            );

            Utils.addClass(
                container,
                CSS_CLASSES.active
            );

            enableNextButton();

            await Utils.delay(
                ANIMATION.fadeIn
            );

            isActive = true;

        } finally {

            isTransitioning = false;

        }

    };

    /**
     * Hide journey section.
     *
     * @returns {Promise<void>}
     */
    const hide = async () => {

        if (
            !container ||
            isTransitioning ||
            !isActive
        ) {
            return;
        }

        isTransitioning = true;

        try {

            disableNextButton();

            Utils.removeClass(
                container,
                CSS_CLASSES.active
            );

            Utils.addClass(
                container,
                CSS_CLASSES.hidden
            );

            await Utils.delay(
                ANIMATION.fadeOut
            );

            isActive = false;

        } finally {

            isTransitioning = false;

        }

    };

    /* ======================================================================
     * EVENTS
     * ====================================================================== */

    /**
     * Handle next button click.
     *
     * @returns {Promise<void>}
     */
    const handleNextClick = async () => {

        if (
            !nextButton ||
            !isActive ||
            isTransitioning
        ) {
            return;
        }

        disableNextButton();

        await proceed();

    };

    /**
     * Register DOM events.
     */
    const bindEvents = () => {

        if (!nextButton) {
            return;
        }

        Utils.on(
            nextButton,
            "click",
            handleNextClick
        );

    };

    /**
     * Remove DOM events.
     */
    const unbindEvents = () => {

        if (!nextButton) {
            return;
        }

        Utils.off(
            nextButton,
            "click",
            handleNextClick
        );

    };
    /* ======================================================================
 * LIFECYCLE
 * ====================================================================== */

    /**
     * Continue to next section.
     *
     * @returns {Promise<void>}
     */
    const proceed = async () => {

        const callback = onComplete;

        try {

            await hide();

        } finally {

            destroy();

        }

        if (typeof callback === "function") {

            callback();

        }

    };

    /**
     * Reset module state.
     */
    const destroy = () => {

        if (nextButton) {

            unbindEvents();

            enableNextButton();

        }

        container = null;

        content = null;

        nextButton = null;

        isInitialized = false;

        isActive = false;

        isTransitioning = false;

        onComplete = null;

    };

    /**
     * Initialize journey module.
     *
     * @param {Function|null} callback
     *
     * @returns {Promise<void>}
     */
    const init = async (callback = null) => {

        if (isInitialized) {
            return;
        }

        cacheDOM();

        if (!validateDOM()) {
            return;
        }

        onComplete =

            typeof callback === "function"

                ? callback

                : null;

        isInitialized = true;

        bindEvents();

        await show();

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return Object.freeze({

        init

    });

})();