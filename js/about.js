document.addEventListener("DOMContentLoaded", () => {
    const timelineStops = document.querySelectorAll(".timeline-stop");
    const timelineDetails = document.querySelectorAll(".timeline-detail");

    timelineStops.forEach((stop) => {
        stop.addEventListener("click", () => {
            const year = stop.dataset.year;

            timelineStops.forEach((item) => item.classList.toggle("is-active", item === stop));
            timelineDetails.forEach((detail) => {
                detail.hidden = detail.dataset.detail !== year;
            });
        });
    });
});
