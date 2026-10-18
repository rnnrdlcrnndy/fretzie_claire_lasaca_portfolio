/* ============================================================
   THEME TOGGLE (Light / Dark mode)
   - Persists preference in localStorage
   - Falls back to system preference on first visit
   ============================================================ */
(function initTheme() {
  const STORAGE_KEY = 'fcl-theme';
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  // Determine starting theme
  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Dark';
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Light';
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Initial theme: stored > system > light
  const initialTheme = getStoredTheme() || getSystemTheme();
  applyTheme(initialTheme);

  // Toggle handler
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  });

  // React to system preference changes (only if user hasn't set an explicit preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();


/* ============================================================
   MOBILE NAVIGATION TOGGLE
   ============================================================ */
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');

menuBtn.addEventListener('click', () => {
  const open = navlinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close ✕' : 'Menu ☰';
});

navlinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navlinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu ☰';
  });
});


/* ============================================================
   DYNAMIC FOOTER YEAR
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ============================================================
   CONTACT FORM → MAILTO
   ============================================================ */
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent('Portfolio inquiry from ' + name);
  const body = encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);

  const notice = document.getElementById('formNotice');
  notice.style.display = 'block';
  notice.textContent = 'Opening your email app with the message prepared. If it does not open, email fretzie.lasaca@example.com after replacing this sample address.';

  window.location.href = 'mailto:fretzie.lasaca@example.com?subject=' + subject + '&body=' + body;
});