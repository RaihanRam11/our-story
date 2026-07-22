"use strict";

/* ==========================================================================
 * My Love Website
 * Opening Module
 * --------------------------------------------------------------------------
 * Controls the opening screen before entering the main website.
 * ========================================================================== */

const Opening = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    const SELECTORS = {

        container: "#opening",

        content: ".opening-content",

        button: "#startBtn"

    };

    const CSS_CLASSES = {

        active: "opening--active",

        hidden: "opening--hidden"

    };

    const ANIMATION = {

        fadeIn: 800,

        fadeOut: 800

    };

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let container = null;

    let content = null;

    let button = null;

    let isInitialized = false;

    let isActive = false;

    let isTransitioning = false;

    let onComplete = null;

    /* ======================================================================
     * DOM HELPERS
     * ====================================================================== */

    /**
     * Cache DOM elements.
     */
    const cacheDOM = () => {

        container = Utils.$(

            SELECTORS.container

        );

        content = Utils.$(

            SELECTORS.content

        );

        button = Utils.$(

            SELECTORS.button

        );

    };

    /**
     * Validate DOM elements.
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

        if (!button) {

            missing.push(

                SELECTORS.button

            );

        }

        if (missing.length > 0) {

            console.error(

                "[Opening] Missing element(s):",

                missing.join(", ")

            );

            return false;

        }

        return true;

    };

    /* ======================================================================
     * HELPERS
     * ====================================================================== */

    /**
     * Check module readiness.
     *
     * @returns {boolean}
     */
    const isReady = () => {

        return (

            container !== null &&

            content !== null &&

            button !== null

        );

    };
    /* ======================================================================
 * EVENT HANDLERS
 * ====================================================================== */

    /**
     * Handle Start button click.
     *
     * @returns {Promise<void>}
     */
    const handleStartClick = async () => {

        if (

            !isInitialized ||

            !isActive ||

            isTransitioning

        ) {

            return;

        }

        button.disabled = true;

        await hide();

        if (typeof onComplete === "function") {

            onComplete();

        }

    };

    /* ======================================================================
     * EVENT HELPERS
     * ====================================================================== */

    /**
     * Bind events.
     */
    const bindEvents = () => {

        if (!button) {

            return;

        }

        Utils.on(

            button,

            "click",

            handleStartClick

        );

    };

    /**
     * Unbind events.
     */
    const unbindEvents = () => {

        if (!button) {

            return;

        }

        Utils.off(

            button,

            "click",

            handleStartClick

        );

    };

    /* ======================================================================
     * DISPLAY HELPERS
     * ====================================================================== */

    /**
     * Show opening section.
     *
     * @returns {Promise<void>}
     */
    const show = async () => {

        if (

            !isInitialized ||

            !isReady()

        ) {

            return;

        }

        if (

            isTransitioning ||

            isActive

        ) {

            return;

        }

        isTransitioning = true;

        Utils.removeClass(

            container,

            CSS_CLASSES.hidden

        );

        Utils.addClass(

            container,

            CSS_CLASSES.active

        );

        button.disabled = false;

        button.blur();

        await Utils.delay(

            ANIMATION.fadeIn

        );

        isActive = true;

        isTransitioning = false;

    };

    /**
     * Hide opening section.
     *
     * @returns {Promise<void>}
     */
    const hide = async () => {

        if (

            !isInitialized ||

            !isReady()

        ) {

            return;

        }

        if (

            isTransitioning ||

            !isActive

        ) {

            return;

        }

        isTransitioning = true;

        button.disabled = true;

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

        isTransitioning = false;

    };
    /* ======================================================================
 * LIFECYCLE
 * ====================================================================== */

    /**
     * Destroy Opening module.
     */
    const destroy = () => {

        unbindEvents();

        if (container) {

            Utils.removeClass(

                container,

                CSS_CLASSES.active

            );

            Utils.removeClass(

                container,

                CSS_CLASSES.hidden

            );

        }

        if (button) {

            button.disabled = false;

        }

        container = null;

        content = null;

        button = null;

        isInitialized = false;

        isActive = false;

        isTransitioning = false;

        onComplete = null;

    };

    /**
     * Initialize Opening module.
     *
     * @param {Function|null} callback
     * @returns {Promise<boolean>}
     */
    const init = async (
        callback = null
    ) => {

        if (isInitialized) {

            destroy();

        }

        cacheDOM();

        if (!validateDOM()) {

            return false;

        }

        onComplete =

            typeof callback === "function"

                ? callback

                : null;

        bindEvents();

        isInitialized = true;

        await show();

        return true;

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return Object.freeze({

        init,

        destroy,

        show,

        hide,

        isActive: () => isActive

    });

})();