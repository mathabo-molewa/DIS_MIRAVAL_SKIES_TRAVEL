html:5

// Run the enquiry form functionality after the page has loaded.
document.addEventListener("DOMContentLoaded", function () {

    // Retrieve the form elements.
    const enquiryForm = document.getElementById("enquiryForm");
    const departureDate = document.getElementById("travel_dates");
    const returnDate = document.getElementById("return_date");
    const enquiryResponse = document.getElementById("enquiryResponse");
    const copyrightYear = document.getElementById("copyrightYear");

    // Update the copyright year automatically.
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Get today's date in YYYY-MM-DD format.
    function getTodayString() {
        const today = new Date();

        return today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");
    }

    // Prevent customers from selecting dates in the past.
    departureDate.min = getTodayString();
    returnDate.min = getTodayString();

    // Update the minimum return date when departure changes.
    departureDate.addEventListener("change", function () {
        returnDate.min = departureDate.value || getTodayString();

        // Clear the return date if it is before departure.
        if (returnDate.value && returnDate.value < departureDate.value) {
            returnDate.value = "";
        }

        returnDate.setCustomValidity("");
    });

    // Clear the return date error when the customer changes it.
    returnDate.addEventListener("change", function () {
        returnDate.setCustomValidity("");
    });

    // Validate the enquiry form and prepare an email.
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous custom validation errors.
        enquiryForm.querySelectorAll("input, select, textarea")
            .forEach(function (field) {
                field.setCustomValidity("");
            });

        // Validate the customer's name.
        const nameField = document.getElementById("name");
        const name = nameField.value.trim();

        if (name.length < 2) {
            nameField.setCustomValidity(
                "Please enter a name containing at least two characters."
            );
        }

        // Validate the destination.
        const destinationField = document.getElementById("destination");

        if (!destinationField.value.trim()) {
            destinationField.setCustomValidity(
                "Please enter your travel destination."
            );
        }

        // Ensure the return date is not before departure.
        if (departureDate.value && returnDate.value &&
            returnDate.value < departureDate.value) {
            returnDate.setCustomValidity(
                "The return date must be on or after the departure date."
            );
        }

        // Stop if any information is invalid.
        if (!enquiryForm.reportValidity()) {
            return;
        }

        try {
            // Collect the customer's submitted information.
            const formData = new FormData(enquiryForm);

            const email = formData.get("email").trim();
            const travel = formData.get("travel");
            const destination = formData.get("destination").trim();
            const travellers = formData.get("Number_Travellers");
            const departure = formData.get("travel_dates");
            const returnTrip = formData.get("return_date");
            const budget = Number(formData.get("budget"));
            const currency = formData.get("currency");
            const message = formData.get("message").trim();

            // Format the travel budget.
            const formattedBudget = budget.toLocaleString("en-ZA", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Prepare the email subject and body.
            const subject = "Travel Enquiry - " + destination;

            const emailBody =
                "NEW TRAVEL ENQUIRY - MIRAVAL SKIES TRAVEL\n\n" +
                "Customer Name: " + name + "\n" +
                "Customer Email: " + email + "\n" +
                "Travel Type: " + travel + "\n" +
                "Destination: " + destination + "\n" +
                "Number of Travellers: " + travellers + "\n" +
                "Departure Date: " + departure + "\n" +
                "Return Date: " + returnTrip + "\n" +
                "Estimated Budget: " + currency + " " + formattedBudget +
                "\n\nAdditional Requirements:\n" +
                (message || "None provided") +
                "\n\nPlease contact the customer to discuss pricing " +
                "and availability. The enquiry is not a confirmed booking.";

            // Create a pre-filled email addressed to the business.
            const mailtoLink =
                "mailto:info@miravalskiestravel.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(emailBody);

            // Clear any previous response.
            enquiryResponse.replaceChildren();

            // Display a personalised confirmation.
            const heading = document.createElement("h2");
            heading.textContent = "Thank You, " + name + "!";

            const confirmation = document.createElement("p");
            confirmation.textContent =
                "Your " + travel.toLowerCase() +
                " travel enquiry for " + destination +
                " is ready to email to Miraval Skies Travel.";

            // Create the link that opens the customer's email application.
            const emailLink = document.createElement("a");
            emailLink.href = mailtoLink;
            emailLink.textContent = "Open Email to Send Enquiry";
            emailLink.className = "contact-email-link";

            // Explain how to complete the process.
            const nextStep = document.createElement("p");
            nextStep.textContent =
                "Click the link above to open your email application. " +
                "Review the enquiry and press Send to deliver it to us. " +
                "Your enquiry is not submitted until you send the email.";

            // Display the confirmation and email link.
            enquiryResponse.append(
                heading,
                confirmation,
                emailLink,
                nextStep
            );

            enquiryResponse.hidden = false;

            // Reset the form after preparing the email.
            enquiryForm.reset();

            // Restore the minimum dates after resetting.
            departureDate.min = getTodayString();
            returnDate.min = getTodayString();

            // Scroll to the confirmation message.
            enquiryResponse.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            enquiryResponse.focus();

        } catch (error) {
            // Display an error if the enquiry cannot be prepared.
            enquiryResponse.replaceChildren();

            const errorMessage = document.createElement("p");
            errorMessage.textContent =
                "Sorry, we could not prepare your enquiry email. " +
                "Please try again or contact us at " +
                "info@miravalskiestravel.com.";

            enquiryResponse.appendChild(errorMessage);
            enquiryResponse.hidden = false;
            enquiryResponse.focus();

            // Log the technical error for debugging.
            console.error("Enquiry form error:", error);
        }
    });
});