html:5

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

    // Update the copyright year automatically.
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Clear custom validation messages as the user corrects their input.
    [contactName, contactEmail, contactPhone, messageType, contactMessage]
        .forEach(function (field) {
            field.addEventListener("input", function () {
                field.setCustomValidity("");
            });

            field.addEventListener("change", function () {
                field.setCustomValidity("");
            });
        });

    // Validate the contact form and prepare an email.
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Prevent names and messages made only of spaces.
        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const phone = contactPhone.value.trim();
        const type = messageType.value;
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

        // Display browser validation messages if any field is invalid.
        if (!contactForm.reportValidity()) {
            contactResponse.hidden = true;
            return;
        }

        // Prepare the email subject and body.
        const subject = type + " - Website Contact Form";

        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Phone: " + (phone || "Not provided") + "\n" +
            "Message Type: " + type + "\n\n" +
            "Message:\n" + message;

        // Encode the information for a mailto link.
        const mailtoLink =
            "mailto:info@miravalskiestravel.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        // Clear any previous response.
        contactResponse.replaceChildren();

        // Create confirmation text.
        const confirmation = document.createElement("p");
        confirmation.textContent =
            "Your message has passed validation and is ready to be prepared.";

        // Create a link that opens the visitor's email application.
        const emailLink = document.createElement("a");
        emailLink.href = mailtoLink;
        emailLink.textContent = "Open Email to Send Message";
        emailLink.className = "contact-email-link";

        // Explain that the email is not sent automatically.
        const note = document.createElement("p");
        note.textContent =
            "Review your message in your email application and press Send " +
            "to deliver it. This website does not send the email automatically.";

        
        // Add the response to the page.
        contactResponse.append(confirmation, emailLink, note);
        contactResponse.hidden = false;

        // Reset the form after preparing the email.
        contactForm.reset();

        // Clear any custom validation messages.
        [contactName, contactEmail, contactPhone, messageType, contactMessage]
            .forEach(function (field) {
                field.setCustomValidity("");
            });

        // Move the visitor to the confirmation message.
        contactResponse.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        contactResponse.focus();
    });
}); 
