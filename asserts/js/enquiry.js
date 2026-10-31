/*
 * Miraval Skies Travel
 * Enquiry page JavaScript functionality
 * Features: date validation, client-side validation and AJAX submission.
 *
 * FormSubmit must be activated for mathabo@miravalskiestravel.org before
 * real submissions can be received.
 */

document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiryForm");
    const departureDate = document.getElementById("travel_dates");
    const returnDate = document.getElementById("return_date");
    const enquiryResponse = document.getElementById("enquiryResponse");
    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    if (!enquiryForm || !departureDate || !returnDate || !enquiryResponse) {
        return;
    }

    function getTodayString() {
        const today = new Date();
        return today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");
    }

    departureDate.min = getTodayString();
    returnDate.min = getTodayString();

    departureDate.addEventListener("change", function () {
        returnDate.min = departureDate.value || getTodayString();

        if (returnDate.value && returnDate.value < departureDate.value) {
            returnDate.value = "";
        }

        returnDate.setCustomValidity("");
    });

    returnDate.addEventListener("change", function () {
        returnDate.setCustomValidity("");
    });

    enquiryForm.querySelectorAll("input, select, textarea").forEach(function (field) {
        field.addEventListener("input", function () {
            field.setCustomValidity("");
        });
        field.addEventListener("change", function () {
            field.setCustomValidity("");
        });
    });

    function showResponse(message, state, headingText) {
        enquiryResponse.replaceChildren();

        if (headingText) {
            const heading = document.createElement("h2");
            heading.textContent = headingText;
            enquiryResponse.appendChild(heading);
        }

        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        enquiryResponse.appendChild(paragraph);

        enquiryResponse.dataset.state = state;
        enquiryResponse.hidden = false;
        enquiryResponse.scrollIntoView({ behavior: "smooth", block: "start" });
        enquiryResponse.focus();
    }

    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nameField = document.getElementById("name");
        const destinationField = document.getElementById("destination");
        const name = nameField.value.trim();
        const destination = destinationField.value.trim();

        nameField.setCustomValidity(
            name.length < 2
                ? "Please enter a name containing at least two characters."
                : ""
        );

        destinationField.setCustomValidity(
            destination.length === 0
                ? "Please enter your travel destination."
                : ""
        );

        if (departureDate.value && returnDate.value &&
            returnDate.value < departureDate.value) {
            returnDate.setCustomValidity(
                "The return date must be on or after the departure date."
            );
        }

        if (!enquiryForm.reportValidity()) {
            enquiryResponse.hidden = true;
            return;
        }

        const submitButton = enquiryForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton
            ? submitButton.textContent
            : "Submit Enquiry";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        showResponse("Submitting your travel enquiry. Please wait...", "pending");

        try {
            const response = await fetch(enquiryForm.action, {
                method: "POST",
                body: new FormData(enquiryForm),
                headers: { "Accept": "application/json" }
            });

            let result = {};
            try {
                result = await response.json();
            } catch (parseError) {
                throw new Error("The form service returned an unreadable response.");
            }

            if (!response.ok || result.success === false ||
                result.success === "false" || result.success === "Failed") {
                throw new Error(result.message || "The enquiry could not be submitted.");
            }

            const travelType = document.getElementById("travel").value;
            showResponse(
                "Thank you, " + name + ". Your " + travelType.toLowerCase() +
                " travel enquiry for " + destination +
                " has been submitted. Our team will contact you to discuss " +
                "pricing, availability and your travel requirements. " +
                "This enquiry is not a confirmed booking.",
                "success",
                "Thank You!"
            );

            enquiryForm.reset();
            departureDate.min = getTodayString();
            returnDate.min = getTodayString();

        } catch (error) {
            console.error("Enquiry form submission error:", error);

            const formData = new FormData(enquiryForm);
            const email = String(formData.get("email") || "").trim();
            const travel = String(formData.get("travel") || "");
            const travellers = String(formData.get("Number_Travellers") || "");
            const departure = String(formData.get("travel_dates") || "");
            const returnTrip = String(formData.get("return_date") || "");
            const budget = String(formData.get("budget") || "");
            const currency = String(formData.get("currency") || "");
            const message = String(formData.get("message") || "").trim();

            const emailBody =
                "NEW TRAVEL ENQUIRY - MIRAVAL SKIES TRAVEL\n\n" +
                "Customer Name: " + name + "\n" +
                "Customer Email: " + email + "\n" +
                "Travel Type: " + travel + "\n" +
                "Destination: " + destination + "\n" +
                "Number of Travellers: " + travellers + "\n" +
                "Departure Date: " + departure + "\n" +
                "Return Date: " + returnTrip + "\n" +
                "Estimated Budget: " + currency + " " + budget + "\n\n" +
                "Additional Requirements:\n" + (message || "None provided") +
                "\n\nThis enquiry is not a confirmed booking.";

            const mailtoLink = "mailto:mathabo@miravalskiestravel.org" +
                "?subject=" + encodeURIComponent("Travel Enquiry - " + destination) +
                "&body=" + encodeURIComponent(emailBody);

            enquiryResponse.replaceChildren();

            const explanation = document.createElement("p");
            explanation.textContent =
                "We could not submit your enquiry online. You can still send it using your email application:";

            const emailLink = document.createElement("a");
            emailLink.href = mailtoLink;
            emailLink.className = "contact-email-link";
            emailLink.textContent = "Open Email to Send Enquiry";

            const note = document.createElement("p");
            note.textContent =
                "Your enquiry has not been submitted through the website. " +
                "Please press Send in your email application.";

            enquiryResponse.append(explanation, emailLink, note);
            enquiryResponse.dataset.state = "error";
            enquiryResponse.hidden = false;
            enquiryResponse.scrollIntoView({ behavior: "smooth", block: "start" });
            enquiryResponse.focus();

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
});