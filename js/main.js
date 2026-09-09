/* =========================================
   DALE COLLEGE
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Dale College website initialized.");

    document.querySelectorAll("[data-count]").forEach((counter) => {
        const target = Number(counter.dataset.count);
        const start = performance.now();
        const update = (now) => {
            const progress = Math.min((now - start) / 1400, 1);
            counter.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    });

});