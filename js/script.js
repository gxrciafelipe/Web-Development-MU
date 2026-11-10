// ========== VARIABLES ==========
const themeToggleBtn = document.getElementById('theme-toggle');
const form = document.querySelector('form');
const rainCanvas = document.getElementById('binary-rain');
const resumeToggle = document.getElementById('resume-toggle');
const resumeViewer = document.getElementById('resume-viewer');

const RESUME_PATH = '../resume/Felipe_Sousa_Garcia_Resume.pdf';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ========== THEME TOGGLER FUNCTIONS ==========
/**
 * Apply theme based on localStorage, or the device's setting if nothing is saved
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
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

  // The static version of the rain has to be redrawn in the new color
  if (reduceMotion.matches) drawStaticRain();
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

// ========== BINARY RAIN BACKGROUND ==========
const RAIN_FONT_SIZE = 16;
const RAIN_FRAME_MS = 70; // ~14 frames per second keeps the rain slow and calm
let rainCtx = null;
let rainColumns = [];
let lastRainFrame = 0;

/**
 * Match the canvas to the window size and set up one falling column per character width
 */
function resizeRain() {
  const ratio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  rainCanvas.width = width * ratio;
  rainCanvas.height = height * ratio;
  rainCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  rainCtx.font = `${RAIN_FONT_SIZE}px "JetBrains Mono", Consolas, monospace`;

  // Keep existing columns when only the height changes (mobile address bar), so the rain doesn't jump
  const count = Math.ceil(width / RAIN_FONT_SIZE);
  if (count !== rainColumns.length) {
    rainColumns = Array.from({ length: count }, () => ({
      y: Math.random() * -height / RAIN_FONT_SIZE, // start above the screen at random heights
      speed: 0.4 + Math.random() * 0.6
    }));
  }

  if (reduceMotion.matches) drawStaticRain();
}

/**
 * Read the rain color from the CSS so it follows light/dark mode
 */
function getRainColor() {
  return getComputedStyle(document.body).getPropertyValue('--rain').trim();
}

/**
 * Draw one frame: fade what is already there, then add a new 0 or 1 to every column
 */
function drawRainFrame(time) {
  requestAnimationFrame(drawRainFrame);
  if (time - lastRainFrame < RAIN_FRAME_MS) return;
  lastRainFrame = time;

  const height = window.innerHeight;

  // Erase a little of the previous frame so the digits leave a fading trail
  rainCtx.globalCompositeOperation = 'destination-out';
  rainCtx.fillStyle = 'rgba(0, 0, 0, 0.09)';
  rainCtx.fillRect(0, 0, window.innerWidth, height);
  rainCtx.globalCompositeOperation = 'source-over';

  rainCtx.fillStyle = getRainColor();
  rainColumns.forEach((column, i) => {
    const digit = Math.random() > 0.5 ? '1' : '0';
    rainCtx.fillText(digit, i * RAIN_FONT_SIZE, Math.floor(column.y) * RAIN_FONT_SIZE);
    column.y += column.speed;

    // Once a column leaves the screen, send it back to the top at a random moment
    if (column.y * RAIN_FONT_SIZE > height && Math.random() > 0.975) {
      column.y = 0;
    }
  });
}

/**
 * For users who turned on "reduce motion": scatter still digits instead of animating
 */
function drawStaticRain() {
  if (!rainCtx) return;
  const width = window.innerWidth;
  const height = window.innerHeight;

  rainCtx.clearRect(0, 0, width, height);
  rainCtx.fillStyle = getRainColor();
  for (let x = 0; x < width; x += RAIN_FONT_SIZE) {
    for (let y = RAIN_FONT_SIZE; y < height; y += RAIN_FONT_SIZE) {
      if (Math.random() > 0.9) {
        rainCtx.globalAlpha = 0.3 + Math.random() * 0.7;
        rainCtx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
      }
    }
  }
  rainCtx.globalAlpha = 1;
}

function startBinaryRain() {
  if (!rainCanvas) return;
  rainCtx = rainCanvas.getContext('2d');
  resizeRain();
  window.addEventListener('resize', resizeRain);

  if (!reduceMotion.matches) {
    requestAnimationFrame(drawRainFrame);
  }
}

// ========== RESUME VIEWER ==========
/**
 * Show or hide the resume inside the page (no download needed)
 */
function toggleResume() {
  const isOpen = resumeToggle.getAttribute('aria-expanded') === 'true';

  resumeToggle.setAttribute('aria-expanded', String(!isOpen));
  resumeToggle.textContent = isOpen ? 'View resume' : 'Hide resume';
  resumeViewer.hidden = isOpen;

  // Only load the PDF the first time it's opened, so the home page loads faster
  if (!isOpen && !resumeViewer.dataset.loaded) {
    resumeViewer.dataset.loaded = 'true';

    // Most phones can't show a PDF inside a page, so point them to the buttons instead
    if (navigator.pdfViewerEnabled === false) {
      resumeViewer.querySelector('.resume-fallback').hidden = false;
      return;
    }

    const frame = document.createElement('iframe');
    frame.src = `${RESUME_PATH}#view=FitH&navpanes=0`;
    frame.title = 'Felipe_Sousa_Garcia_Resume';
    resumeViewer.appendChild(frame);
  }
}

// ========== EVENT LISTENERS ==========
themeToggleBtn.addEventListener('change', toggleTheme);
if (form) {
  form.addEventListener('submit', validateForm);
}
if (resumeToggle && resumeViewer) {
  resumeToggle.addEventListener('click', toggleResume);
}

// ========== INITIALIZE ==========
loadTheme();
startBinaryRain();

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
            card.className = 'project-card'; // Re-using my existing CSS class

            // Handle cases where description or language might be null
            const description = repo.description ? repo.description : "No description available.";
            const language = repo.language ? repo.language : "Mixed";

            // Build the HTML content
            card.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${description}</p>
                <p><strong>Tech Stack:</strong> ${language}</p>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener">View Code on GitHub</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener">Live Demo</a>` : ''}
                </div>
            `;

            // Append the card to the container
            reposContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading GitHub projects:", error);
        reposContainer.innerHTML = '<p class="muted">Unable to load projects at this time.</p>';
    }
}

// Call the function
getGithubRepos();
