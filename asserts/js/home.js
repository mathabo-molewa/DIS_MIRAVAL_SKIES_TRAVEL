html: 5


/*
 * Miraval Skies Travel
 * Homepage JavaScript functionality
 */

// Wait for the HTML document to load before selecting elements.
document.addEventListener("DOMContentLoaded", function () {

    // Select the discovery button and its message.
    const discoveryButton = document.getElementById("discoveryButton");
    const discoveryMessage = document.getElementById("discoveryMessage");

    // Show or hide the additional welcome message.
    discoveryButton.addEventListener("click", function () {
        const isExpanded =
            discoveryButton.getAttribute("aria-expanded") === "true";

        discoveryMessage.hidden = isExpanded;

        discoveryButton.setAttribute("aria-expanded", String(!isExpanded));

        // Update the button text to reflect its current action.
        discoveryButton.textContent = isExpanded
            ? "Discover Our Approach"
            : "Show Less";
    });

    // Automatically display the current year in the footer.
    const copyrightYear = document.getElementById("copyrightYear");

    copyrightYear.textContent = new Date().getFullYear();

});
