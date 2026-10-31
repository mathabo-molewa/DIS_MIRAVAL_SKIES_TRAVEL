
/*
 * Miraval Skies Travel
 * Homepage JavaScript functionality
 */

document.addEventListener("DOMContentLoaded", function () {
    const discoveryButton = document.getElementById("discoveryButton");
    const discoveryMessage = document.getElementById("discoveryMessage");
    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    if (discoveryButton && discoveryMessage) {
        discoveryButton.addEventListener("click", function () {
            const isExpanded =
                discoveryButton.getAttribute("aria-expanded") === "true";

            discoveryMessage.hidden = isExpanded;
            discoveryButton.setAttribute("aria-expanded", String(!isExpanded));
            discoveryButton.textContent = isExpanded
                ? "Discover Our Approach"
                : "Show Less";
        });
    }
});

