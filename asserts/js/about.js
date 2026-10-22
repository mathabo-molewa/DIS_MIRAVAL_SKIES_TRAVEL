html:5

/*
 * Miraval Skies Travel
 * About Us page JavaScript functionality
 */

// Wait until the HTML document has loaded.
document.addEventListener("DOMContentLoaded", function () {

    // Select the values button and the hidden message.
    const valuesButton = document.getElementById("valuesButton");
    const valuesMessage = document.getElementById("valuesMessage");

    // Add a click event to show or hide the message.
    valuesButton.addEventListener("click", function () {

        // Check whether the message is currently visible.
        const isExpanded =
            valuesButton.getAttribute("aria-expanded") === "true";

        // Toggle the message visibility.
        valuesMessage.hidden = isExpanded;

        // Update the accessibility state.
        valuesButton.setAttribute("aria-expanded", String(!isExpanded));

        // Update the button label.
        valuesButton.textContent = isExpanded
            ? "Discover Our Values"
            : "Show Less";
    });

    // Select the copyright year in the footer.
    const copyrightYear = document.getElementById("copyrightYear");

    // Update the year automatically.
    copyrightYear.textContent = new Date().getFullYear();

    // Staff photo lightbox functionality
    const staffPhotos = document.querySelectorAll(".team-member img");
    const staffLightbox = document.getElementById("staffLightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    staffPhotos.forEach(function (photo) {
        photo.addEventListener("click", function () {
            lightboxImage.src = photo.src;
            lightboxImage.alt = photo.alt;

            staffLightbox.hidden = false;
            document.body.style.overflow = "hidden";
        });
    });

    // Close when the expanded image or dark background is clicked
    staffLightbox.addEventListener("click", function () {
        staffLightbox.hidden = true;
        lightboxImage.src = "";
        document.body.style.overflow = "";
    });

});
