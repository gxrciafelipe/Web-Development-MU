# Personal Portfolio Website

A responsive personal portfolio website built to showcase my projects and interests as a Computer Science student at Madonna University.

🔗 **[View Live Demo](https://gxrciafelipe.github.io/)**

## 🚀 Key Features

* **Dynamic Project Loading:** Uses the GitHub API to automatically fetch and display my latest coding projects.
* **Dark/Light Mode:** Includes a theme toggler that persists user preference via `localStorage`.
* **Contact Form:** Features client-side validation using JavaScript (checks for empty fields) and integrates with Formspree for email delivery.
* **Responsive Design:** Styled with external CSS using a clean, accessible color palette and hover effects.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure, tables for layout, and forms.
* **CSS3:** Custom styling, fonts (Arial/Helvetica), and responsive design.
* **JavaScript (ES6):**
    * `fetch()` API with `async/await`
    * DOM Manipulation
    * `localStorage` for theme persistence
    * Event Listeners & Form Validation

---

## 📅 Project History (Milestones)

### Milestone 4: Advanced JavaScript Features
* **Image Zoom on Hover:** Implemented a visual effect that zooms in on the profile picture and dims the background for emphasis. Includes error handling (console warnings) if HTML elements are missing.
* **Theme Toggle (Light/Dark Mode):** Uses `localStorage` to load and save the user's preferred theme. Toggles between modes instantly using a checkbox switch.
* **Contact Form Validation:** Validates that Name, Email, and Message fields are not empty. Prevents submission on error, displays an alert, and allows valid forms to proceed to Formspree.
* **GitHub Repository Fetcher:** Asynchronously fetches the latest 6 repositories from the GitHub API. Dynamically creates project cards showing the name, description, tech stack, and links, while gracefully handling errors or missing data.

### Milestone 3: Interactivity & Logic
* **Theme Toggle:** Implemented a dark/light mode slider in the navigation bar. The site remembers the user's choice even when navigating between pages.
* **Form Validation:** The Contact form now checks that Name, Email, and Message fields are not empty before submitting.
* **Code Structure:** utilized `const` and `let`, arrow functions, and conditional logic.

### Milestone 2: Styling & Design
* **CSS Styling:** Created an external stylesheet to improve visual appeal.
* **Typography:** Used Arial and Helvetica sans-serif fonts for readability.
* **Color Palette:** Implemented a `#333333` text color with Light Blue and Orange accents for hover states.
* **Backgrounds:** Used various shades of gray to create depth.

### Milestone 1: Structure & Content
* **Core Pages:** Created `index.html` (Home) and `contact.html`.
* **Navigation:** Built a navigation bar for easy switching between pages.
* **Content:** Added personal bio, profile picture, interest list, and a social media table.
* **Copyright:** Added dynamic footer content.