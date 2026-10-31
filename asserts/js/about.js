
/*
 * Miraval Skies Travel
* About Us page JavaScript functionality
 * Features: values interaction and accessible staff-photo lightbox.
 */
document.addEventListener("DOMContentLoaded", function () {
    const valuesButton = document.getElementById("valuesButton");
    const valuesMessage = document.getElementById("valuesMessage");
    const copyrightYear = document.getElementById("copyrightYear");
    const staffPhotos = document.querySelectorAll(".team-member img");
    const staffLightbox = document.getElementById("staffLightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    if (valuesButton && valuesMessage) {
        valuesButton.addEventListener("click", function () {
            const isExpanded =
                valuesButton.getAttribute("aria-expanded") === "true";

            valuesMessage.hidden = isExpanded;
            valuesButton.setAttribute("aria-expanded", String(!isExpanded));
            valuesButton.textContent = isExpanded
                ? "Discover Our Values"
                : "Show Less";
        });
    }

    if (!staffLightbox || !lightboxImage) {
        return;
    }

    function openLightbox(photo) {
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
        staffLightbox.hidden = false;
        document.body.style.overflow = "hidden";
        staffLightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
        staffLightbox.hidden = true;
        lightboxImage.src = "";
        document.body.style.overflow = "";
        staffLightbox.setAttribute("aria-hidden", "true");
    }

    staffPhotos.forEach(function (photo) {
        photo.setAttribute("tabindex", "0");
        photo.setAttribute("role", "button");
        photo.setAttribute("aria-label", "Enlarge " + photo.alt);

        photo.addEventListener("click", function () {
            openLightbox(photo);
        });

        photo.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(photo);
            }
        });
    });

    staffLightbox.addEventListener("click", function (event) {
        if (event.target === staffLightbox || event.target === lightboxImage) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !staffLightbox.hidden) {
            closeLightbox();
        }
    });
});