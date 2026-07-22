"use strict";

/* ==========================================================================
 * My Love Website
 * Hero Module
 * --------------------------------------------------------------------------
 * Controls Hero section lifecycle.
 * ========================================================================== */

const Hero = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    const SELECTORS = {

        container: "#hero",

        content: ".hero-content",

        nextButton: "#hero-next"

    };

    const CSS_CLASSES = {

        active: "hero--active",

        hidden: "hero--hidden"

    };

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
     * Cache DOM elements.
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

        if (!nextButton) {

            missing.push(

                SELECTORS.nextButton

            );

        }

        if (missing.length > 0) {

            console.error(

                "[Hero] Missing element(s):",

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

            nextButton !== null

        );

    };
    /* ======================================================================
 * EVENT HANDLERS
 * ====================================================================== */

    /**
     * Handle Next button click.
     *
     * @returns {Promise<void>}
     */
    const handleNextClick = async () => {

        if (

            !isInitialized ||

            !isActive ||

            isTransitioning

        ) {

            return;

        }

        nextButton.disabled = true;

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
     * Unbind events.
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
     * DISPLAY HELPERS
     * ====================================================================== */

    /**
     * Show Hero section.
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

        nextButton.disabled = false;

        nextButton.blur();

        await Utils.delay(

            ANIMATION.fadeIn

        );

        isActive = true;

        isTransitioning = false;

    };

    /**
     * Hide Hero section.
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

        nextButton.disabled = true;

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
     * Destroy Hero module.
     */
    const destroy = () => {

        unbindEvents();

        container = null;

        content = null;

        nextButton = null;

        isInitialized = false;

        isActive = false;

        isTransitioning = false;

        onComplete = null;

    };

    /**
     * Initialize Hero module.
     *
     * @param {Function|null} callback
     *
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