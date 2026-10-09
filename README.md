# Kailash Cotton Ginning Factory website

Five responsive, standalone HTML pages for the company website. The pages share a common navigation, footer, visual design system and small set of vanilla JavaScript interactions.

## Run locally

Open this folder through a local web server. With WAMP, place the project under the web root and visit its local URL (for example, `http://localhost/ai/`). Alternatively, from this folder run PHP's built-in server:

```sh
php -S localhost:8000
```

Then open `http://localhost:8000/`. Bootstrap, Bootstrap Icons, Google Fonts and the illustrative Unsplash images are loaded from external URLs, so an internet connection is needed for the complete visual presentation.

## Project files

- `index.html` — homepage and full company overview
- `about.html` — company background, mission, vision and values
- `services.html` — cotton ginning, mustard oil and oil cake service overview
- `products.html` — mustard oil, mustard cake and cottonseed oil cake catalogue
- `contact.html` — contact information placeholders, enquiry form and map placeholder
- `assets/css/style.css` — base styles and design system
- `assets/css/responsive.css` — tablet and mobile adjustments
- `assets/js/main.js` — navigation, hero slider, reveal effects, gallery lightbox and form feedback
- `assets/images/logo.png` — supplied company logo

## Before launch

1. Replace `YOUR-PRODUCTION-DOMAIN` in each canonical URL and in `sitemap.xml` / `robots.txt` with the verified production domain.
2. Replace the clearly marked address, phone, email and business-hours placeholders with verified business information. Add verified social links if wanted.
3. Replace the `YOUR-GOOGLE-BUSINESS-PROFILE` placeholder reference after obtaining the actual Google Business Profile URL. Add only verified review content and ratings.
4. Replace the map placeholder in `contact.html` with the verified factory location and an official Google Maps embed URL.
5. Supply and optimize authentic factory and product photography, or confirm suitable stock-image licenses. Current Unsplash images are illustrative stock images and do not depict the Kailash factory. Image URLs are collected in CSS backgrounds and the HTML `img` elements.
6. Connect both `.enquiry-form` forms to a server endpoint. Set the HTML `action` to the endpoint and add server-side validation, spam protection, secure handling and a real success/error response. The current JavaScript prevents submission and explicitly reports that the form is not connected; it does not claim to deliver messages.
7. Confirm current product availability, specifications, intended uses and any operating details before adding claims. No awards, certifications, capacity, founder story, performance guarantees or customer testimonials are asserted here.
8. Replace the copyright year as needed.

The product enquiry links pass a `product` query parameter (for example, `contact.html?product=Mustard%20Oil`) and the contact form selects the matching option.

## Interactions and accessibility

JavaScript is limited to mobile navigation, sticky-header state, hero slides, scroll reveal, gallery lightbox and form feedback. Layout and content remain in HTML and CSS. The site includes keyboard focus styles, skip links, labelled form controls, descriptive image text, reduced-motion handling and accessible lightbox controls.
