"use strict";

/* ==========================================================================
 * My Love Website
 * Animation Module
 * ========================================================================== */

const Animation = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    const CSS_CLASSES = {
        active: "is-active",
        hidden: "is-hidden",
        animate: "is-animated"
    };

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let isInitialized = false;

    /* ======================================================================
     * VALIDATION
     * ====================================================================== */

    /**
     * Validate animation target.
     *
     * @param {Element} element
     * @returns {boolean}
     */
    const validateElement = (element) => {

        if (!(element instanceof Element)) {

            console.error(
                "[Animation] Invalid animation target."
            );

            return false;

        }

        return true;

    };
    /* ======================================================================
     * HELPERS
     * ====================================================================== */

    /**
     * Show an element.
     *
     * @param {Element} element
     * @returns {void}
     */
    const show = (element) => {

        if (!validateElement(element)) {
            return;
        }

        Utils.removeClass(
            element,
            CSS_CLASSES.hidden
        );

        Utils.addClass(
            element,
            CSS_CLASSES.active
        );

    };

    /**
     * Hide an element.
     *
     * @param {Element} element
     * @returns {void}
     */
    const hide = (element) => {

        if (!validateElement(element)) {
            return;
        }

        Utils.removeClass(
            element,
            CSS_CLASSES.active
        );

        Utils.addClass(
            element,
            CSS_CLASSES.hidden
        );

    };

    /**
     * Trigger animation.
     *
     * @param {Element} element
     * @returns {void}
     */
    const animate = (element) => {

        if (!validateElement(element)) {
            return;
        }

        Utils.addClass(
            element,
            CSS_CLASSES.animate
        );

    };

    /* ======================================================================
     * EVENTS
     * ====================================================================== */

    // Animation module does not register DOM events.
    /* ======================================================================
     * LIFECYCLE
     * ====================================================================== */

    /**
     * Initialize animation module.
     *
     * @returns {void}
     */
    const init = () => {

        if (isInitialized) {
            return;
        }

        isInitialized = true;

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return {

        init,
        show,
        hide,
        animate

    };

})();