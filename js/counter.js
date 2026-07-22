"use strict";

/* ==========================================================================
 * My Love Website
 * Counter Module
 * ========================================================================== */

const Counter = (() => {

    /* ======================================================================
     * CONSTANTS
     * ====================================================================== */

    /**
     * DOM Selectors
     */
    const SELECTORS = {

        container: "#counter",

        content: ".counter-content",

        days: "#counterDays",

        hours: "#counterHours",

        minutes: "#counterMinutes",

        seconds: "#counterSeconds",

        nextButton: "#counter-next"

    };

    /**
     * CSS Classes
     */
    const CSS_CLASSES = {

        active: "counter--active",

        hidden: "counter--hidden"

    };

    /**
     * Animation Duration (ms)
     */
    const ANIMATION = {

        fadeIn: 800,

        fadeOut: 600

    };

    /**
     * Relationship Start Date
     *
     * Ganti sesuai tanggal jadian.
     *
     * Format:
     * new Date(Tahun, Bulan(0-11), Tanggal, Jam, Menit, Detik)
     */
    const RELATIONSHIP_START = new Date(

        2025,

        6,

        19,

        0,

        0,

        0

    );

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let container = null;

    let content = null;

    let days = null;

    let hours = null;

    let minutes = null;

    let seconds = null;

    let nextButton = null;

    /**
     * Active setInterval reference.
     */
    let timerId = null;

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

        days = Utils.$(
            SELECTORS.days
        );

        hours = Utils.$(
            SELECTORS.hours
        );

        minutes = Utils.$(
            SELECTORS.minutes
        );

        seconds = Utils.$(
            SELECTORS.seconds
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
            missing.push(SELECTORS.container);
        }

        if (!content) {
            missing.push(SELECTORS.content);
        }

        if (!days) {
            missing.push(SELECTORS.days);
        }

        if (!hours) {
            missing.push(SELECTORS.hours);
        }

        if (!minutes) {
            missing.push(SELECTORS.minutes);
        }

        if (!seconds) {
            missing.push(SELECTORS.seconds);
        }

        if (!nextButton) {
            missing.push(SELECTORS.nextButton);
        }

        if (missing.length > 0) {

            console.error(
                `[Counter] Missing required element(s): ${missing.join(", ")}`
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
     * Show counter section.
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
     * Hide counter section.
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

    /**
     * Update relationship counter.
     */
    const updateCounter = () => {

        if (
            !days ||
            !hours ||
            !minutes ||
            !seconds
        ) {
            return;
        }

        try {

            const duration = Utils.getRelationshipDuration(
                RELATIONSHIP_START
            );

            days.textContent = String(duration.days);

            hours.textContent = duration.hours;

            minutes.textContent = duration.minutes;

            seconds.textContent = duration.seconds;

        } catch (error) {

            console.error(
                "[Counter] Failed to update relationship counter.",
                error
            );

            stopCounter();

        }

    };

    /**
     * Start relationship counter.
     */
    const startCounter = () => {

        if (timerId !== null) {
            return;
        }

        updateCounter();

        timerId = window.setInterval(

            updateCounter,

            1000

        );

    };

    /**
     * Stop relationship counter.
     */
    const stopCounter = () => {

        if (timerId === null) {
            return;
        }

        clearInterval(
            timerId
        );

        timerId = null;

    };

    /* ======================================================================
     * EVENTS
     * ====================================================================== */

    /**
     * Handle next button click.
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

        stopCounter();

        if (nextButton) {

            unbindEvents();

            enableNextButton();

        }

        container = null;

        content = null;

        days = null;

        hours = null;

        minutes = null;

        seconds = null;

        nextButton = null;

        timerId = null;

        isInitialized = false;

        isActive = false;

        isTransitioning = false;

        onComplete = null;

    };

    /**
     * Initialize counter module.
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

        startCounter();

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return Object.freeze({

        init

    });

})();