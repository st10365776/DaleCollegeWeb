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

function initNavigation() {
    const currentToggle = document.getElementById("menu-toggle");
    const currentMenu = document.getElementById("fullscreen-menu");
    const currentLinks = document.querySelectorAll(".menu-link");
    const currentHeader = document.querySelector(".site-header");

    if (!currentToggle || !currentMenu || !currentHeader) return;

    currentHeader.classList.add("is-visible");
    currentHeader.classList.toggle("is-scrolled", window.scrollY > 40);

    window.addEventListener("scroll", () => {
        currentHeader.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });

    currentToggle.addEventListener("click", () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            openMenu(currentToggle, currentMenu);
        } else {
            closeMenu(currentToggle, currentMenu);
        }
    });

    currentLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu(currentToggle, currentMenu);
        });
    });
}

function openMenu(currentToggle, currentMenu) {
    document.body.classList.add("menu-open");
    currentToggle.classList.add("active");
    currentToggle.setAttribute("aria-expanded", "true");
    currentMenu.style.visibility = "visible";

    gsap.to(currentMenu, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: .8,
        ease: "power4.inOut"
    });

    gsap.fromTo(
        ".menu-link",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: .8, stagger: .08, delay: .25, ease: "power4.out" }
    );
}

function closeMenu(currentToggle, currentMenu) {
    document.body.classList.remove("menu-open");
    currentToggle.classList.remove("active");
    currentToggle.setAttribute("aria-expanded", "false");

    gsap.to(currentMenu, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: .7,
        ease: "power4.inOut",
        onComplete: () => {
            currentMenu.style.visibility = "hidden";
        }
    });
}

window.addEventListener("layoutReady", () => {
    initNavigation();
});

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
});

const contentScript = document.createElement("script");
contentScript.src = window.location.pathname.includes("/sports/")
    ? "../js/content.js"
    : "js/content.js";
document.body.appendChild(contentScript);