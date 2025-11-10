// ========== THEME TOGGLER ==========

// Select the button dynamically or create one if it doesn’t exist
const themeToggleBtn = document.createElement('button');
themeToggleBtn.textContent = 'Toggle Dark Mode';
themeToggleBtn.id = 'theme-toggle';
themeToggleBtn.style.display = 'block';
themeToggleBtn.style.margin = '20px auto';
document.body.prepend(themeToggleBtn); // Adds button at top of the page

// Check localStorage for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

// Event listener to toggle theme and save preference
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Save theme preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});


// ========== FORM VALIDATION (only runs on contact.html) ==========
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop form from submitting automatically

    // Grab input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Initialize error message container
    let errors = [];

    // Basic validation checks
    if (name === '') {
      errors.push('Name field cannot be empty.');
    }
    if (email === '') {
      errors.push('Email field cannot be empty.');
    }
    if (message === '') {
      errors.push('Message field cannot be empty.');
    }

    // Display errors or success message
    if (errors.length > 0) {
      alert(errors.join('\n')); // Show all missing fields
    } else {
      alert('Message sent successfully! Thank you for contacting me.');
      form.reset(); // Clear the form
    }
  });
}
