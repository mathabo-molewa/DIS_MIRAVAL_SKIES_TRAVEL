
# DIS_MIRAVAL_SKIES_TRAVEL

# MIRAVAL SKIES TRAVEL

## Student Information
Name: Mathabo Mapula Molewa
Student number: ST10520046
Programme: Diploma in IT: Software Development
Project: Miraval Skies Travel

## Project overview
Miraval Skies Travel is a luxury travel agency that needs a website created for customer engagement by providing them with easy to use features. The website alows visitors to explore domestic and international travel packages, cruises, corporate travel and customised travel experiences. It also provides separate contact and travel enquiry forms.

## Goals and objectives
- It is too give the ultimate luxury experience to all the clients as well as exceptional customer services.
- Present the organisation and its services clearly.
- Allow customers to search and filter travel packages.
- Allow customers to submit general messages and travel enquiries.
- Provide useful location information through Google Maps.
- Apply on-page SEO practices to improve how search engines understand the pages.

## Key features and functionality
The website has 5 pages (home, about us, enquiry, contact us and services). Each of these pages serve the customer with relevent information for each topic. The user is able to go between the pages smoothly, the user is able to fill out an enquiry form and see the google map location in order to locate where the company us operating from.

## Website pages 
1. **Home (index.html)** – introduces Miraval Skies Travel and provides links to the main website sections.
2. **About (pages/about.html)** – provides company background, values and staff information.
3. **Services (pages/services.html)** – presents travel packages and includes search and category filtering.
4. **Enquiry (pages/enquiry.html)** – collects travel preferences, dates, number of travellers and budget.
5. **Contact (pages/contact.html)** – provides contact details, a general message form and a Google Maps location.

## Technologies and tools

- HTML5
- CSS3
- JavaScript
- Google Fonts
- Google Maps embed
- GitHub and GitHub Desktop
- FormSubmit AJAX endpoint for form processing (requires email activation and live testing)

## JavaScript functionality

- The homepage discovery button shows and hides additional information.
- The About page values button expands and collapses information.
- Staff photographs open in a lightbox and can be closed using the Escape key.
- The Services page searches package names and descriptions and filters packages by category.
- The Services page updates the number of matching packages and displays a no-results message when needed.
- The Contact page validates the general message form and submits it asynchronously.
- The Enquiry page validates customer details and travel dates before asynchronous submission.
- The copyright year is updated automatically.

## Forms and submission

The Contact form collects a customer's name, email address, optional phone number, message type and message.

The Enquiry form collects the customer's name and email, travel type, destination, number of travellers, departure and return dates, budget, currency and optional additional requirements.

Both forms use client-side JavaScript validation and send the form data asynchronously to the FormSubmit AJAX endpoint. The recipient address configured in the code is `info@miravalskiestravel.com`

## Search engine optimisation

The website includes:
- A unique page title and meta description on each page.
- Relevant keyword metadata and Open Graph title/description metadata.
- A logical heading structure.
- Descriptive alternative text for informative images.
- Internal links between the five pages.
- Mobile viewport metadata and responsive CSS.
- `robots.txt` to provide crawler instructions.
- `sitemap.xml` listing the five website pages.
## Responsive design

The stylesheet includes responsive layouts and media queries for different screen widths. The website should be tested at desktop, tablet and mobile sizes. Check that navigation, forms, images, service cards and the footer remain usable at each size.

## Testing checklist

Record the actual results and dates when testing the completed website.

- [ ] Open all five pages and check navigation links.
- [ ] Test the homepage discovery button.
- [ ] Test the About page values button.
- [ ] Open each staff image and close the lightbox using the background, image and Escape key.
- [ ] Search for destinations on the Services page.
- [ ] Test every category filter and the no-results message.
- [ ] Submit the Contact form with empty and invalid values.
- [ ] Submit the Contact form with valid values and confirm the message reaches the recipient.
- [ ] Submit the Enquiry form with invalid and valid values.
- [ ] Confirm that past dates cannot be selected and the return date cannot be before departure.
- [ ] Test the website at desktop, tablet and mobile widths.
- [ ] Check image loading, broken links and browser console errors.
- [ ] Test the published website after deployment.

## Deployment

The website is intended to be deployed using a free static hosting platform such as GitHub Pages or Netlify.

- **GitHub repository:** Add the final repository URL here.
- **Published website:** Add the final deployed website URL here.

## Project structure
MiravalSkiesTravel/
├── index.html
├── robots.txt
├── sitemap.xml
├──gitattributes
├── miscellaneous
|       └── README.md
├── pages/
│   ├── about.html
│   ├── contact.html
│   ├── enquiry.html
│   └── services.html
└── asserts/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── home.js
    │   ├── about.js
    │   ├── contact.js
    │   ├── enquiry.js
    │   └── services.js
    └── images/
       └── website images
       
    

## Timeline

start - 30 July 2026
Ice task one(Proposal sent) - 5 August 2026
Ice task two(Github URL sent) - 8 August 2026
Research - 12 August 2026
Finish coding all 5 pages - 14 August 2026
Part one - 14 August 2026
Begin Part 2 - 11 September 2026
Fix proposal - 13 Septmber 2026
Add a site map on the proposal - 14 September 2026
Apply desktop CSS styling - 17 September 2026
Begin part 3 - 9 October 2026
Check form for Ice Task - 9 October 2026



## Sitemap
             Miraval Skies travel
                      |
________________________________________
|             |            |           |           
About us   Contact us   Enquiry   Services

##  Part 2 Details

Part two takes a focus on the visual aspect and responsive styling for the website.
Using an external CSS stylesheet, it was linked to all the webpages.
-Base styling 
-Consistent colour theme
-Typography and font styling
-Header and nagivation styling
-Submit button styling and hover effects
-Borders, rounded corners and box shadows
-Flexbox
-CSS Grid
-Responsive design for desktop, tablet and mobile screens
-Reponsive layout and image adjustments
-Form styling for enquiry page
-Responsive navigation
-Content Adjustments using media queries

### Part 3 – Functionality and SEO
- Added page-specific SEO titles, descriptions, keyword metadata and Open Graph metadata.
- Added `robots.txt` and `sitemap.xml` files. The published domain must be inserted after deployment.
- Improved the staff photo lightbox with keyboard interaction and Escape-key closing.
- Improved the service search and category filtering, including result counts and empty results.
- Improved client-side validation and asynchronous submission for the Contact form.
- Improved client-side validation, date checks and asynchronous submission for the Enquiry form.
- Added submission progress, success and error feedback, with an email-application fallback if online submission fails.
- Improved keyboard focus indicators and reduced-motion support.
- Updated this README with Part 3 functionality, SEO, form setup and testing requirements.


-Desktop
<img width="1113" height="920" alt="Screenshot 2026-09-18 104341" src="https://github.com/user-attachments/assets/0b18130a-5d42-4b7a-a09d-890063d00f7d" />

-Tablet
<img width="986" height="923" alt="Screenshot 2026-09-18 104447" src="https://github.com/user-attachments/assets/9ee556d9-c751-4488-b100-7e1555bef7c5" />

-Phone
<img width="949" height="896" alt="Screenshot 2026-09-18 104527" src="https://github.com/user-attachments/assets/5abf665b-0bf2-40ae-95a5-90b9e91a15a9" />


## Changelog
Created the structure on Visual studio code - 01 August 2026
Create a repository for the website - 02 August 2026
Added a home page - 03 August 2026
Added an about us page - 03 August 2026
Added a contact us page - 03 August 2026
Added an equiry page - 06 August 2026
Connect the pages by adding a navigation - 06 august 2026
Added a services page - 10 August 2026
Added pictures to Travel package - 13 August 2026
Finish coding all 5 Pages 14 August 2026
Remove colour decorations and styling - 14 August 2026
Add research - 14 August 2026
Begin Part 2 - 11 September 2026
Add footer section - 11 September
Revisit Part and make corrections - 13 September 2026
Added a visual sitemap to the readme.md - 14 Septemebr
Added base styling: background colours, fonts, margines and padding - 17 September
Added typography for headings, paragraphs and lists - 17 September 2026
Added visual styling, hover, focus effects, responsive css styling - 17 September 2026
Tested the website -18 September 2026
Added the screenshots to README -18 September 2026
Finish part 2 -18 September 2026
## References

•ASWD (2017). How Much Does a Website Design Cost in South Africa? | 
Web Design Prices. [online] Advertising Solutions Web Design. Available at: 
https://advertisingsolutions.co.za/website-design-cost-south-africa/ [Accessed 
5 Aug. 2026]. 
• 2025 Average Website Maintenance Costs In South Africa. (2025). 
[online] Allanux Web Blog. Available at: 
https://www.allanuxweb.com/blog/website-maintenance-costs [Accessed 5 
Aug. 2026].
•Reich, T. (2020). brown rocky mountain beside sea during daytime. [online] Unsplash.com. Unsplash. Available at: https://unsplash.com/photos/brown-rocky-mountain-beside-sea-during-daytime--7ZwuyDx2rI [Accessed 14 Aug. 2026].
•Tomaseti, D. (2020). zebra standing on green grass during daytime. [online] Unsplash.com. Unsplash. Available at: https://unsplash.com/photos/zebra-standing-on-green-grass-during-daytime-Vw2HZQ1FGjU [Accessed 14 Aug. 2026].
•Unsplash (2019). Photo by Todd Cravens on Unsplash. [online] unsplash.com. Available at: https://unsplash.com/photos/blue-whale-on-sea-lwACYK8ScmA [Accessed 14 Aug. 2026].
•Unsplash (2018). Photo by Fredrik Öhlander on Unsplash. [online] unsplash.com. Available at: https://unsplash.com/photos/camels-on-beach-sands-fCW1hWq2nq0 [Accessed 14 Aug. 2026].


