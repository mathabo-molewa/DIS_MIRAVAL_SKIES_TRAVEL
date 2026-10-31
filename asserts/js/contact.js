
/*
 * Miraval Skies Travel
 * Contact Us page JavaScript functionality
 * Features: form validation, email preparation and copyright year.
 */

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const contactResponse = document.getElementById("contactResponse");
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactPhone = document.getElementById("contactPhone");
    const messageType = document.getElementById("messageType");
    const contactMessage = document.getElementById("contactMessage");
    const copyrightYear = document.getElementById("copyrightYear");

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    if (!contactForm || !contactResponse) {
        return;
    }

    const fields = [
        contactName, contactEmail, contactPhone, messageType, contactMessage
    ].filter(Boolean);

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            field.setCustomValidity("");
        });

        field.addEventListener("change", function () {
            field.setCustomValidity("");
        });
    });

    function showResponse(message, state) {
        contactResponse.replaceChildren();
        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        contactResponse.appendChild(paragraph);
        contactResponse.dataset.state = state;
        contactResponse.hidden = false;
        contactResponse.scrollIntoView({ behavior: "smooth", block: "start" });
        contactResponse.focus();
    }

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = contactName.value.trim();
        const message = contactMessage.value.trim();

        contactName.setCustomValidity(
            name.length < 2
                ? "Please enter your full name using at least 2 characters."
                : ""
        );

        contactMessage.setCustomValidity(
            message.length < 10
                ? "Please enter a message containing at least 10 characters."
                : ""
        );

        if (!contactForm.reportValidity()) {
            contactResponse.hidden = true;
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton
            ? submitButton.textContent
            : "Send Message";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        showResponse("Sending your message. Please wait...", "pending");

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
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
                throw new Error(result.message || "The message could not be submitted.");
            }

            showResponse(
                "Thank you, " + name +
                ". Your message has been submitted successfully. " +
                "Our team will review it and respond using the email address provided.",
                "success"
            );

            contactForm.reset();
            fields.forEach(function (field) {
                field.setCustomValidity("");
            });

        } catch (error) {
            console.error("Contact form submission error:", error);

            // Offer a mailto fallback if the AJAX service is unavailable.
            const subject = messageType.value + " - Website Contact Form";
            const emailBody =
                "Name: " + name + "\n" +
                "Email: " + contactEmail.value.trim() + "\n" +
                "Phone: " + (contactPhone.value.trim() || "Not provided") + "\n" +
                "Message Type: " + messageType.value + "\n\n" +
                "Message:\n" + message;

            const mailtoLink = "mailto:mathabo@miravalskiestravel.org" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(emailBody);

            contactResponse.replaceChildren();

            const explanation = document.createElement("p");
            explanation.textContent =
                "We could not submit your message online. You can still send it using your email application:";

            const emailLink = document.createElement("a");
            emailLink.href = mailtoLink;
            emailLink.className = "contact-email-link";
            emailLink.textContent = "Open Email to Send Message";

            const note = document.createElement("p");
            note.textContent =
                "Your message has not been submitted through the website. " +
                "Please press Send in your email application.";

            contactResponse.append(explanation, emailLink, note);
            contactResponse.dataset.state = "error";
            contactResponse.hidden = false;
            contactResponse.scrollIntoView({ behavior: "smooth", block: "start" });
            contactResponse.focus();

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
});