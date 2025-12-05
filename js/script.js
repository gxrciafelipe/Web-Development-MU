// ========== VARIABLES ==========
const themeToggleBtn = document.getElementById('theme-toggle');
const form = document.querySelector('form');

// ========== IMAGE ZOOM LOGIC ==========
const profilePic = document.getElementById('profile-pic');
const blurOverlay = document.getElementById('blur-overlay');

// Check if elements exist before adding listeners
if (profilePic && blurOverlay) {
  
  profilePic.addEventListener('mouseenter', () => {
    console.log("Mouse entered image"); // Debug message
    document.body.classList.add('dimmed');
    profilePic.classList.add('zoomed');
  });

  profilePic.addEventListener('mouseleave', () => {
    console.log("Mouse left image"); // Debug message
    document.body.classList.remove('dimmed');
    profilePic.classList.remove('zoomed');
  });
} else {
  // If this prints, you are missing the ID in HTML
  console.log("Profile Pic or Overlay not found in HTML");
}

// ========== THEME TOGGLER FUNCTIONS ==========
/**
 * Apply theme based on localStorage or default to light
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.checked = true; // Set toggle to "moon"
  } else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.checked = false; // Set toggle to "sun"
  }
}

/**
 * Toggle dark mode and save preference
 */
function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// ========== FORM VALIDATION FUNCTIONS ==========
/**
 * Validate contact form fields
 */
function validateForm(event) {
  // 1. Collect values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let errors = [];

  // 2. Check for errors
  if (!name) errors.push('Name field cannot be empty.');
  if (!email) errors.push('Email field cannot be empty.');
  if (!message) errors.push('Message field cannot be empty.');

  // 3. LOGIC CHANGE:
  if (errors.length > 0) {
    // If there ARE errors, stop the submission
    event.preventDefault();
    alert(errors.join('\n'));
  } else {
    // If NO errors, do nothing here. 
    // The browser will naturally proceed to the 'action' URL (Formspree)
    // and send the email.
  }
}

// ========== EVENT LISTENERS ==========
themeToggleBtn.addEventListener('change', toggleTheme);
if (form) {
  form.addEventListener('submit', validateForm);
}

// ========== INITIALIZE ==========
loadTheme();

// ========== GITHUB API FETCH ==========
const reposContainer = document.getElementById('github-repos-container');

async function getGithubRepos() {
    // Only run this if the container exists (so we don't get errors on index.html)
    if (!reposContainer) return;

    try {
        // Fetch repositories from GitHub, sorted by latest update
        const response = await fetch('https://api.github.com/users/gxrciafelipe/repos?sort=updated&direction=desc');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        // Clear the "Loading..." text
        reposContainer.innerHTML = '';

        // Loop through the repositories
        // We use .slice(0, 6) to only show the latest 6 projects so the page isn't too long
        repos.slice(0, 6).forEach(repo => {
            
            // Create the card div
            const card = document.createElement('div');
            card.className = 'project-card'; // Re-using your existing CSS class

            // Handle cases where description or language might be null
            const description = repo.description ? repo.description : "No description available.";
            const language = repo.language ? repo.language : "Mixed";

            // Build the HTML content
            card.innerHTML = `
                <h2>${repo.name}</h2>
                <p class="left-align">${description}</p>
                <p class="left-align"><strong>Tech Stack:</strong> ${language}</p>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank">View Code on GitHub</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Live Demo</a>` : ''}
                </div>
            `;

            // Append the card to the container
            reposContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading GitHub projects:", error);
        reposContainer.innerHTML = '<p>Unable to load projects at this time.</p>';
    }
}

// Call the function
getGithubRepos();