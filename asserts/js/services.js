html:5

// Run the services page features after the page loads.
document.addEventListener("DOMContentLoaded", function () {

    // Retrieve the search and filter controls.
    const serviceSearch = document.getElementById("serviceSearch");
    const serviceFilter = document.getElementById("serviceFilter");
    const serviceCount = document.getElementById("serviceCount");
    const noServicesMessage = document.getElementById("noServicesMessage");
    const copyrightYear = document.getElementById("copyrightYear");

    // Retrieve all travel package cards.
    const serviceCards = Array.from(
        document.querySelectorAll(".service-card[data-category]")
    );

    // Update the copyright year automatically.
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Search and filter travel packages.
    function filterServices() {
        const searchTerm = serviceSearch.value.trim().toLowerCase();
        const selectedCategory = serviceFilter.value;

        let visibleCount = 0;

        serviceCards.forEach(function (card) {
            const category = card.dataset.category;
            const searchableText =
                (card.textContent + " " + card.dataset.search).toLowerCase();

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesSearch =
                searchableText.includes(searchTerm);

            const isVisible = matchesCategory && matchesSearch;

            // Show or hide the matching package.
            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        // Hide category headings when all their cards are hidden.
        document.querySelectorAll(".service-category").forEach(function (section) {
            const cards = section.querySelectorAll(
                ".service-card[data-category]"
            );

            const hasVisibleCards = Array.from(cards).some(function (card) {
                return !card.hidden;
            });

            section.hidden = !hasVisibleCards;
        });

        // Update the results message.
        if (visibleCount === 0) {
            serviceCount.textContent = "No matching services found.";
            noServicesMessage.hidden = false;
        } else {
            serviceCount.textContent =
                "Showing " + visibleCount +
                (visibleCount === 1 ? " matching service." : " matching services.");

            noServicesMessage.hidden = true;
        }
    }

    // Respond immediately when the visitor searches.
    serviceSearch.addEventListener("input", filterServices);

    // Respond when the visitor selects a category.
    serviceFilter.addEventListener("change", filterServices);

    // Apply the initial filter.
    filterServices();
});
