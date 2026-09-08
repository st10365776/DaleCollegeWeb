/* =========================================
   NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const fullscreenMenu =
    document.getElementById("fullscreen-menu");

const menuLinks =
    document.querySelectorAll(".menu-link");

const siteHeader =
    document.querySelector(".site-header");


let menuOpen = false;


/* =========================================
   HEADER MOTION
========================================= */

if (siteHeader) {

    siteHeader.classList.add("is-visible");

    siteHeader.classList.toggle(
        "is-scrolled",
        window.scrollY > 40
    );

    window.addEventListener("scroll", () => {

        siteHeader.classList.toggle(
            "is-scrolled",
            window.scrollY > 40
        );

    }, { passive: true });

}


/* =========================================
   OPEN / CLOSE MENU
========================================= */

menuToggle.addEventListener("click", () => {

    menuOpen = !menuOpen;

    if (menuOpen) {

        openMenu();

    } else {

        closeMenu();

    }

});


/* =========================================
   OPEN
========================================= */

function openMenu() {

    document.body.classList.add("menu-open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );


    fullscreenMenu.style.visibility = "visible";


    gsap.to(fullscreenMenu, {

        clipPath:
            "inset(0% 0% 0% 0%)",

        duration: .8,

        ease: "power4.inOut"

    });


    gsap.fromTo(
        ".menu-link",
        {
            y: 80,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: .8,
            stagger: .08,
            delay: .25,
            ease: "power4.out"
        }
    );

}


/* =========================================
   CLOSE
========================================= */

function closeMenu() {

    document.body.classList.remove("menu-open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    gsap.to(fullscreenMenu, {

        clipPath:
            "inset(0% 0% 100% 0%)",

        duration: .7,

        ease: "power4.inOut",

        onComplete: () => {

            fullscreenMenu.style.visibility =
                "hidden";

        }

    });

}


/* =========================================
   MENU LINKS
========================================= */

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});