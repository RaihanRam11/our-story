"use strict";

/* ==========================================================================
 * My Love Website
 * Utility Library
 * --------------------------------------------------------------------------
 * Shared helper functions used across the application.
 * ========================================================================== */

const Utils = (() => {

    /* ======================================================================
     * DOM HELPERS
     * ====================================================================== */

    /**
     * Returns first matching element.
     *
     * @param {string} selector
     * @param {ParentNode} [parent=document]
     *
     * @returns {Element|null}
     */
    const $ = (
        selector,
        parent = document
    ) => {

        return parent.querySelector(
            selector
        );

    };

    /**
     * Returns all matching elements.
     *
     * @param {string} selector
     * @param {ParentNode} [parent=document]
     *
     * @returns {Element[]}
     */
    const $$ = (
        selector,
        parent = document
    ) => {

        return Array.from(

            parent.querySelectorAll(
                selector
            )

        );

    };

    /**
     * Creates HTML element.
     *
     * @param {string} tag
     *
     * @returns {HTMLElement}
     */
    const create = (tag) => {

        return document.createElement(
            tag
        );

    };

    /* ======================================================================
     * CLASS HELPERS
     * ====================================================================== */

    /**
     * Adds CSS classes.
     *
     * @param {Element|null} element
     * @param {...string} classNames
     */
    const addClass = (
        element,
        ...classNames
    ) => {

        if (
            !element ||
            classNames.length === 0
        ) {
            return;
        }

        element.classList.add(
            ...classNames
        );

    };

    /**
     * Removes CSS classes.
     *
     * @param {Element|null} element
     * @param {...string} classNames
     */
    const removeClass = (
        element,
        ...classNames
    ) => {

        if (
            !element ||
            classNames.length === 0
        ) {
            return;
        }

        element.classList.remove(
            ...classNames
        );

    };

    /**
     * Toggles CSS class.
     *
     * @param {Element|null} element
     * @param {string} className
     * @param {boolean} [force]
     *
     * @returns {boolean}
     */
    const toggleClass = (
        element,
        className,
        force
    ) => {

        if (!element) {
            return false;
        }

        return element.classList.toggle(

            className,

            force

        );

    };

    /**
     * Checks CSS class.
     *
     * @param {Element|null} element
     * @param {string} className
     *
     * @returns {boolean}
     */
    const hasClass = (
        element,
        className
    ) => {

        if (!element) {
            return false;
        }

        return element.classList.contains(
            className
        );

    };

    /* ======================================================================
     * ATTRIBUTE HELPERS
     * ====================================================================== */

    /**
     * Sets attribute.
     *
     * @param {Element|null} element
     * @param {string} name
     * @param {string} value
     */
    const setAttr = (
        element,
        name,
        value
    ) => {

        if (!element) {
            return;
        }

        element.setAttribute(

            name,

            value

        );

    };

    /**
     * Gets attribute.
     *
     * @param {Element|null} element
     * @param {string} name
     *
     * @returns {string|null}
     */
    const getAttr = (
        element,
        name
    ) => {

        if (!element) {
            return null;
        }

        return element.getAttribute(
            name
        );

    };

    /**
     * Removes attribute.
     *
     * @param {Element|null} element
     * @param {string} name
     */
    const removeAttr = (
        element,
        name
    ) => {

        if (!element) {
            return;
        }

        element.removeAttribute(
            name
        );

    };

    /* ======================================================================
     * EVENT HELPERS
     * ====================================================================== */

    /**
     * Registers event listener.
     *
     * @param {EventTarget|null} element
     * @param {string} event
     * @param {Function} handler
     * @param {AddEventListenerOptions|boolean} [options=false]
     */
    const on = (
        element,
        event,
        handler,
        options = false
    ) => {

        if (!element) {
            return;
        }

        element.addEventListener(

            event,

            handler,

            options

        );

    };

    /**
     * Removes event listener.
     *
     * @param {EventTarget|null} element
     * @param {string} event
     * @param {Function} handler
     * @param {EventListenerOptions|boolean} [options=false]
     */
    const off = (
        element,
        event,
        handler,
        options = false
    ) => {

        if (!element) {
            return;
        }

        element.removeEventListener(

            event,

            handler,

            options

        );

    };
    /* ======================================================================
 * SCROLL HELPERS
 * ====================================================================== */

    /**
     * Scroll to element.
     *
     * @param {Element|null} element
     * @param {ScrollBehavior} [behavior="smooth"]
     */
    const scrollToElement = (
        element,
        behavior = "smooth"
    ) => {

        if (!(element instanceof Element)) {
            return;
        }

        element.scrollIntoView({

            behavior,

            block: "start",

            inline: "nearest"

        });

    };

    /**
     * Scroll page to top.
     *
     * @param {ScrollBehavior} [behavior="smooth"]
     */
    const scrollTop = (
        behavior = "smooth"
    ) => {

        window.scrollTo({

            top: 0,

            left: 0,

            behavior

        });

    };

    /* ======================================================================
     * TIME HELPERS
     * ====================================================================== */

    /**
     * Delay execution.
     *
     * @param {number} [ms=0]
     *
     * @returns {Promise<void>}
     */
    const delay = (
        ms = 0
    ) => {

        return new Promise(resolve => {

            window.setTimeout(

                resolve,

                Math.max(0, ms)

            );

        });

    };

    /**
     * Returns relationship duration.
     *
     * @param {Date|string|number} startDate
     *
     * @returns {{
     *      days:number,
     *      hours:string,
     *      minutes:string,
     *      seconds:string
     * }}
     */
    const getRelationshipDuration = (startDate) => {

        if (!startDate) {

            throw new Error(

                "Utils.getRelationshipDuration(): startDate is required."

            );

        }

        const start =

            startDate instanceof Date

                ? startDate

                : new Date(startDate);

        if (Number.isNaN(start.getTime())) {

            throw new Error(

                "Utils.getRelationshipDuration(): Invalid startDate."

            );

        }

        const now = new Date();

        const diff = Math.max(

            0,

            now.getTime() - start.getTime()

        );

        const totalSeconds = Math.floor(

            diff / 1000

        );

        const days = Math.floor(

            totalSeconds / 86400

        );

        const hours = Math.floor(

            (totalSeconds % 86400) / 3600

        );

        const minutes = Math.floor(

            (totalSeconds % 3600) / 60

        );

        const seconds =

            totalSeconds % 60;

        return {

            days,

            hours: pad(hours),

            minutes: pad(minutes),

            seconds: pad(seconds)

        };

    };

    /* ======================================================================
     * RANDOM HELPERS
     * ====================================================================== */

    /**
     * Returns random integer.
     *
     * @param {number} min
     * @param {number} max
     *
     * @returns {number}
     */
    const randomInt = (
        min,
        max
    ) => {

        const minimum = Math.ceil(min);

        const maximum = Math.floor(max);

        return Math.floor(

            Math.random() *

            (maximum - minimum + 1)

        ) + minimum;

    };

    /**
     * Returns random float.
     *
     * @param {number} min
     * @param {number} max
     *
     * @returns {number}
     */
    const randomFloat = (
        min,
        max
    ) => {

        return (

            Math.random() *

            (max - min)

        ) + min;

    };

    /* ======================================================================
     * FORMAT HELPERS
     * ====================================================================== */

    /**
     * Adds leading zero.
     *
     * @param {number|string} value
     *
     * @returns {string}
     */
    const pad = (value) => {

        return String(value).padStart(

            2,

            "0"

        );

    };

    /* ======================================================================
     * DEVICE HELPERS
     * ====================================================================== */

    /**
     * Detect mobile device.
     *
     * @returns {boolean}
     */
    const isMobile = () => {

        return window.matchMedia(

            "(max-width: 768px)"

        ).matches;

    };

    /**
     * Detect reduced motion.
     *
     * @returns {boolean}
     */
    const prefersReducedMotion = () => {

        return window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches;

    };
    /* ======================================================================
 * PUBLIC API
 * ====================================================================== */

    return Object.freeze({

        /* --------------------------------------------------------------
         * DOM
         * -------------------------------------------------------------- */

        $,

        $$,

        create,

        /* --------------------------------------------------------------
         * Class
         * -------------------------------------------------------------- */

        addClass,

        removeClass,

        toggleClass,

        hasClass,

        /* --------------------------------------------------------------
         * Attribute
         * -------------------------------------------------------------- */

        setAttr,

        getAttr,

        removeAttr,

        /* --------------------------------------------------------------
         * Event
         * -------------------------------------------------------------- */

        on,

        off,

        /* --------------------------------------------------------------
         * Scroll
         * -------------------------------------------------------------- */

        scrollToElement,

        scrollTop,

        /* --------------------------------------------------------------
         * Time
         * -------------------------------------------------------------- */

        delay,

        getRelationshipDuration,

        /* --------------------------------------------------------------
         * Random
         * -------------------------------------------------------------- */

        randomInt,

        randomFloat,

        /* --------------------------------------------------------------
         * Format
         * -------------------------------------------------------------- */

        pad,

        /* --------------------------------------------------------------
         * Device
         * -------------------------------------------------------------- */

        isMobile,

        prefersReducedMotion

    });

})();