/* =========================================
   DALE COLLEGE
   GSAP ANIMATIONS
========================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".page-loader");

    const counter =
        document.getElementById("loader-percent");


    if (!loader || !counter) return;

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    const loaderObject = {
        value: 0
    };


    timeline.to(
        loaderObject,
        {
            value: 100,
            duration: 2.2,

            ease: "power2.out",

            onUpdate: () => {

                counter.textContent =
                    Math.round(loaderObject.value);

            }

        }
    );


    timeline.to(
        ".loader-crest",
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: .9
        },
        "-=1.55"
    );


    timeline.to(
        ".loader-name",
        {
            opacity: 1,
            y: 0,
            duration: .7
        },
        "-=.55"
    );


    timeline.to(
        ".loader-line",
        {
            width: 100,
            duration: .7,
            ease: "power2.inOut"
        },
        "-=.35"
    );


    timeline.to(
        ".loader-motto",
        {
            opacity: 1,
            y: 0,
            duration: .6
        },
        "-=.35"
    );


    timeline.to(
        ".loader-content",
        {
            y: -18,
            opacity: 0,
            duration: .55,
            ease: "power2.in"
        },
        "+=.15"
    );


    timeline.to(
        ".page-loader",
        {
            clipPath:
                "inset(0 0 100% 0)",

            duration: 1.1,

            ease: "power4.inOut",

            delay: .05,

            onComplete: () => {
                loader.style.visibility = "hidden";
                loader.style.pointerEvents = "none";
            }

        }
    );


    timeline.from(
        ".hero-crest",
        {
            scale: .7,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        },
        "-=.7"
    );


    timeline.from(
        ".hero-title",
        {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        },
        "-=.7"
    );


    timeline.from(
        ".hero-small",
        {
            y: 20,
            opacity: 0,
            duration: .6
        },
        "-=.6"
    );


    timeline.from(
        ".hero-motto, .hero-established",
        {
            opacity: 0,
            y: 20,
            duration: .6
        },
        "-=.4"
    );


    timeline.from(
        ".hero-scroll",
        {
            opacity: 0,
            duration: .5
        },
        "-=.3"
    );

});


/* =========================================
   INTRO
========================================= */

gsap.from(
    ".intro .eyebrow",
    {

        scrollTrigger: {

            trigger: ".intro",

            start: "top 70%"

        },

        y: 30,

        opacity: 0,

        duration: .8

    }
);


gsap.from(
    ".intro h2",
    {

        scrollTrigger: {

            trigger: ".intro",

            start: "top 65%"

        },

        y: 80,

        opacity: 0,

        duration: 1.2,

        ease: "power4.out"

    }
);


gsap.from(
    ".intro-description",
    {

        scrollTrigger: {

            trigger: ".intro",

            start: "top 60%"

        },

        y: 40,

        opacity: 0,

        duration: .8,

        delay: .2

    }
);


/* =========================================
   EXPERIENCE CARDS
========================================= */

gsap.from(
    ".experience-card",
    {

        scrollTrigger: {

            trigger: ".experience-grid",

            start: "top 75%"

        },

        y: 100,

        opacity: 0,

        duration: 1,

        stagger: .15,

        ease: "power4.out"

    }
);


/* =========================================
   SPORT
========================================= */

gsap.from(
    ".sport-header h2",
    {

        scrollTrigger: {

            trigger: ".sport",

            start: "top 65%"

        },

        x: -100,

        opacity: 0,

        duration: 1,

        ease: "power4.out"

    }
);


gsap.from(
    ".match-card",
    {

        scrollTrigger: {

            trigger: ".match-card",

            start: "top 75%"

        },

        y: 80,

        opacity: 0,

        duration: 1,

        ease: "power4.out"

    }
);


/* =========================================
   HERITAGE
========================================= */

gsap.from(
    ".heritage-content",
    {

        scrollTrigger: {

            trigger: ".heritage",

            start: "top 65%"

        },

        x: -100,

        opacity: 0,

        duration: 1.2,

        ease: "power4.out"

    }
);


gsap.to(
    ".heritage-crest",
    {

        scrollTrigger: {

            trigger: ".heritage",

            start: "top bottom",

            end: "bottom top",

            scrub: true

        },

        rotation: 8,

        y: -100

    }
);


/* =========================================
   ADMISSIONS
========================================= */

gsap.from(
    ".admissions-content",
    {

        scrollTrigger: {

            trigger: ".admissions",

            start: "top 70%"

        },

        y: 100,

        opacity: 0,

        duration: 1.2,

        ease: "power4.out"

    }
);