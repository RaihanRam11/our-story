"use strict";

/* ==========================================================================
 * My Love Website
 * Envelope Module
 * ========================================================================== */

const Envelope = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    /**
     * DOM Selectors
     * Sinkron dengan index.html Final Revision
     */
    const SELECTORS = {

        container: "#envelope",

        content: ".envelope-content",

        openButton: "#envelope-next"

    };

    /**
     * CSS Classes
     */
    const CSS_CLASSES = {

        active: "envelope--active",

        hidden: "envelope--hidden",

        opened: "envelope--opened"

    };

    /**
     * Animation Duration (ms)
     */
    const ANIMATION = {

        fadeIn: 800,

        open: 900,

        fadeOut: 600

    };

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let container = null;

    let content = null;

    let openButton = null;

    let isInitialized = false;

    let isActive = false;

    let isTransitioning = false;

    let onComplete = null;

    /* ======================================================================
     * DOM
     * ====================================================================== */

    /**
     * Cache DOM Elements.
     */
    const cacheDOM = () => {

        container = Utils.$(
            SELECTORS.container
        );

        content = Utils.$(
            SELECTORS.content
        );

        openButton = Utils.$(
            SELECTORS.openButton
        );

    };

    /**
     * Validate DOM Elements.
     *
     * @returns {boolean}
     */
    const validateDOM = () => {

        return [

            container,

            content,

            openButton

        ].every(Boolean);

    };
    /* ======================================================================
 * HELPERS
 * ====================================================================== */

    /**
     * Enable open button.
     */
    const enableOpenButton = () => {

        if (openButton) {
            openButton.disabled = false;
        }

    };

    /**
     * Disable open button.
     */
    const disableOpenButton = () => {

        if (openButton) {
            openButton.disabled = true;
        }

    };

    /**
     * Show envelope section.
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

            enableOpenButton();

            await Utils.delay(
                ANIMATION.fadeIn
            );

            isActive = true;

        } finally {

            isTransitioning = false;

        }

    };

    /**
     * Play envelope opening animation.
     *
     * @returns {Promise<void>}
     */
    const openEnvelope = async () => {

        if (
            !container ||
            !isActive ||
            isTransitioning
        ) {
            return;
        }

        isTransitioning = true;

        try {

            disableOpenButton();

            Utils.addClass(
                container,
                CSS_CLASSES.opened
            );

            await Utils.delay(
                ANIMATION.open
            );

        } finally {

            isTransitioning = false;

        }

    };

    /**
     * Hide envelope section.
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
     * Handle open button click.
     *
     * @returns {Promise<void>}
     */
    const handleOpenClick = async () => {

        if (
            !openButton ||
            !isActive ||
            isTransitioning
        ) {
            return;
        }

        disableOpenButton();

        await proceed();

    };

    /**
     * Register DOM events.
     */
    const bindEvents = () => {

        if (!openButton) {
            return;
        }

        Utils.on(
            openButton,
            "click",
            handleOpenClick
        );

    };

    /**
     * Remove DOM events.
     */
    const unbindEvents = () => {

        if (!openButton) {
            return;
        }

        Utils.off(
            openButton,
            "click",
            handleOpenClick
        );

    };
    /* ======================================================================
     * LIFECYCLE
     * ====================================================================== */

    /**
     * Complete envelope flow and continue to the next module.
     *
     * @returns {Promise<void>}
     */
    const proceed = async () => {

        const callback = onComplete;

        try {

            await openEnvelope();

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

        if (openButton) {
            unbindEvents();
            enableOpenButton();
        }

        if (container) {

            Utils.removeClass(
                container,
                CSS_CLASSES.opened
            );

        }

        container = null;

        content = null;

        openButton = null;

        isInitialized = false;

        isActive = false;

        isTransitioning = false;

        onComplete = null;

    };

    /**
     * Initialize envelope module.
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

            console.error(
                "[Envelope] Required elements were not found."
            );

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