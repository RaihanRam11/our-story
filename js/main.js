"use strict";

/* ==========================================================================
 * My Love Website
 * Main Application Module
 * --------------------------------------------------------------------------
 * Controls application lifecycle and navigation flow.
 * ========================================================================== */

const App = (() => {

    /* ======================================================================
     * PRIVATE STATE
     * ====================================================================== */

    let isInitialized = false;

    /* ======================================================================
     * MODULE VALIDATION
     * ====================================================================== */

    /**
     * Required modules.
     */
    const REQUIRED_MODULES = {

        Loading,

        Opening,

        Hero,

        Envelope,

        Letter,

        Timeline,

        Counter,

        Journey,

        Memory,

        Gift,

        Music

    };

    /**
     * Validate required modules.
     *
     * @returns {boolean}
     */
    const validateModules = () => {

        const missing = [];

        Object.entries(REQUIRED_MODULES).forEach(

            ([name, module]) => {

                if (

                    !module ||

                    typeof module.init !== "function"

                ) {

                    missing.push(name);

                }

            }

        );

        if (missing.length > 0) {

            console.error(

                "[App] Missing module(s):",

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
     * Safe module initialization.
     *
     * @param {string} moduleName
     * @param {Function} callback
     */
    const runModule = (
        moduleName,
        callback
    ) => {

        try {

            callback();

        }

        catch (error) {

            console.error(

                `[App] ${moduleName} failed:`,

                error

            );

        }

    };
    /* ======================================================================
 * APPLICATION FLOW
 * ====================================================================== */

    /**
     * Start Last Message section.
     */
    const startLastMessage = () => {

        runModule(

            "LastMessage",

            () => LastMessage.init()

        );

    };

    /**
     * Start Gift section.
     */
    const startGift = () => {

        runModule(

            "Gift",

            () => Gift.init(

                startLastMessage

            )

        );

    };

    /**
     * Start Memory section.
     */
    const startMemory = () => {

        runModule(

            "Memory",

            () => Memory.init(

                startGift

            )

        );

    };

    /**
     * Start Journey section.
     */
    const startJourney = () => {

        runModule(

            "Journey",

            () => Journey.init(

                startMemory

            )

        );

    };

    /**
     * Start Counter section.
     */
    const startCounter = () => {

        runModule(

            "Counter",

            () => Counter.init(

                startJourney

            )

        );

    };

    /**
     * Start Timeline section.
     */
    const startTimeline = () => {

        runModule(

            "Timeline",

            () => Timeline.init(

                startCounter

            )

        );

    };

    /**
     * Start Letter section.
     */
    const startLetter = () => {

        runModule(

            "Letter",

            () => Letter.init(

                startTimeline

            )

        );

    };

    /**
     * Start Envelope section.
     */
    const startEnvelope = () => {

        runModule(

            "Envelope",

            () => Envelope.init(

                startLetter

            )

        );

    };

    /**
     * Start Hero section.
     */
    const startHero = () => {

        runModule(

            "Hero",

            () => Hero.init(

                startEnvelope

            )

        );

    };

    /**
     * Start Opening section.
     */
    const startOpening = () => {

        runModule(

            "Opening",

            () => Opening.init(

                startHero

            )

        );

    };

    /**
     * Start Loading section.
     */
    const startLoading = () => {

        runModule(

            "Loading",

            () => Loading.init(

                startOpening

            )

        );

    };
    /* ======================================================================
     * APPLICATION LIFECYCLE
     * ====================================================================== */

    /**
     * Start application.
     */
    const start = () => {

        /* Optional modules */

        if (

            typeof Music !== "undefined" &&

            Music &&

            typeof Music.init === "function"

        ) {

            runModule(

                "Music",

                () => Music.init()

            );

        }

        if (

            typeof Animation !== "undefined" &&

            Animation &&

            typeof Animation.init === "function"

        ) {

            runModule(

                "Animation",

                () => Animation.init()

            );

        }

        /* Required flow */

        startLoading();

    };

    /**
     * Initialize application.
     */
    const init = () => {

        if (isInitialized) {

            return;

        }

        if (!validateModules()) {

            console.error(

                "[App] Initialization failed."

            );

            return;

        }

        isInitialized = true;

        start();

    };

    /* ======================================================================
     * PUBLIC API
     * ====================================================================== */

    return Object.freeze({

        init

    });

})();

/* ==========================================================================
 * APPLICATION BOOTSTRAP
 * ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    App.init

);