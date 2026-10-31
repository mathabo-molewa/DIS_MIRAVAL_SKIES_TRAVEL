
document.addEventListener("DOMContentLoaded", function () {
    const serviceSearch = document.getElementById("serviceSearch");
    const serviceFilter = document.getElementById("serviceFilter");
    const serviceCount = document.getElementById("serviceCount");
    const noServicesMessage = document.getElementById("noServicesMessage");
    const copyrightYear = document.getElementById("copyrightYear");

    const serviceCards = Array.from(
        document.querySelectorAll(".service-card[data-category]")
    );

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    if (!serviceSearch || !serviceFilter || !serviceCount ||
        !noServicesMessage || serviceCards.length === 0) {
        return;
    }

    function filterServices() {
        const searchTerm = serviceSearch.value.trim().toLowerCase();
        const selectedCategory = serviceFilter.value;
        let visibleCount = 0;

        serviceCards.forEach(function (card) {
            const category = (card.dataset.category || "").toLowerCase();
            const searchableText = (
                card.textContent + " " + (card.dataset.search || "")
            ).toLowerCase();

            const matchesCategory =
                selectedCategory === "all" || category === selectedCategory;
            const matchesSearch = searchableText.includes(searchTerm);
            const isVisible = matchesCategory && matchesSearch;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        document.querySelectorAll(".service-category").forEach(function (section) {
            const cards = section.querySelectorAll(
                ".service-card[data-category]"
            );

            const hasVisibleCards = Array.from(cards).some(function (card) {
                return !card.hidden;
            });

            section.hidden = !hasVisibleCards;
        });

        serviceCount.textContent = visibleCount === 0
            ? "No matching services found."
            : "Showing " + visibleCount +
              (visibleCount === 1 ? " matching service." : " matching services.");

        noServicesMessage.hidden = visibleCount !== 0;
    }

    serviceSearch.addEventListener("input", filterServices);
    serviceFilter.addEventListener("change", filterServices);
    filterServices();
});
