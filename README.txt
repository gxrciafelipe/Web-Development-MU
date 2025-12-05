-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
LINK TO MY WEBSITE:
gxrciafelipe.github.io
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
LINK TO MY REPOSITORY:
https://github.com/gxrciafelipe/Web-Development-MU
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Milestone 1
For this Project, I've created two websites: index.html and contact.html;
On index, I've put some basic information about me, the purpose of the website and also a picture of me. Also, there's a navigation bar where the user can easily switch between both websites.
On contact, I've put my contact information and I also implemented a simple form where the user can contact me by including their name, email, and message.
I've put a list on my the index page, listing my interests; I've put a table on the contact page, to show my social media organized; And I've put the special character &copy; at the footer of both pages to indicate a copyright.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Milestone 2
For this next step, I've styled both the home and the contact pages. I've implemented an external CSS stylesheet using many configurations that I've learned so far to make the webpages look more pleasant both for me and for whoever may see them.
I used Arial as my first font option, followed by Helvetica, and then a third sans-serif font. Also, I decided to use the rgb color #333333 for the body font color. For hover actions, I've used light blue and Orange. And, fot the background colors, I've used shades of gray. I want to implement a light/dark toggle switch on my page later, and improve some actions with JavaScript.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Milestone 3
This website includes a dark/light mode toggle and form validation on the Contact page.
The dark/light mode toggle lets users switch themes by clicking the sun/moon slider in the navigation bar. The site remembers your choice even when you navigate to another page.
The Contact form checks that Name, Email, and Message fields are not empty and shows an alert if any field is missing.
JavaScript concepts used: variables (const and let), conditionals (if/else), functions (arrow function for event listener), and event listeners (change for the toggle, submit for the form).
Console logs are used for debugging, and localStorage is applied to save the user’s theme preference.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Milestone 4
JavaScript Features Summary

1. Image Zoom on Hover
----------------------
- Adds a zoom-in effect when hovering over the profile picture.
- Dims the background during hover for visual emphasis.
- Restores normal view when the mouse leaves.
- Includes console warnings if required HTML elements are missing.

2. Theme Toggle (Light/Dark Mode)
---------------------------------
- Loads the saved theme from localStorage on page load.
- Toggles between light and dark mode using a checkbox switch.
- Saves the user's preference (light or dark) to localStorage.

3. Contact Form Validation
--------------------------
- Validates the name, email, and message fields before submission.
- Prevents form submission if any field is empty.
- Displays an alert listing all missing fields.
- Allows a successful submission to proceed normally to Formspree.

4. GitHub Repository Fetcher
----------------------------
- Fetches the latest repositories from the user's GitHub account.
- Displays the six most recently updated projects.
- Handles missing descriptions or languages gracefully.
- Shows project name, description, tech stack, GitHub link, and optional live demo link.
- Provides a user-friendly error message if the API request fails.

