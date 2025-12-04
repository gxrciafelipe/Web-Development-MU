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
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let errors = [];

  if (!name) errors.push('Name field cannot be empty.');
  if (!email) errors.push('Email field cannot be empty.');
  if (!message) errors.push('Message field cannot be empty.');

  if (errors.length > 0) {
    alert(errors.join('\n'));
  } else {
    alert('Message sent successfully! Thank you for contacting me.');
    form.reset();
  }
}

// ========== EVENT LISTENERS ==========
themeToggleBtn.addEventListener('change', toggleTheme);
if (form) {
  form.addEventListener('submit', validateForm);
}

// ========== INITIALIZE ==========
loadTheme();
