// ──────────────────────────────────────────────
// Theme: apply saved preference (or OS default)
// ──────────────────────────────────────────────
// This runs IMMEDIATELY — before the page paints — so the user never
// sees a flash of the wrong theme.  We read from localStorage first;
// if nothing is saved we fall back to the OS-level preference
// (window.matchMedia checks the "prefers-color-scheme" media query).

function applyTheme() {
  var theme = localStorage.getItem('theme');

  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');   // <html class="dark">
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Run immediately so the <html> tag gets the right class before paint
applyTheme();

// ──────────────────────────────────────────────
// DOMContentLoaded — safe to touch DOM elements now
// ──────────────────────────────────────────────
// Everything inside this listener waits until the HTML is fully parsed.
// We set up click handlers here because the buttons don't exist in the
// DOM until the browser has finished reading the HTML.

document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile menu (overlay pattern) ──────────
  // Three elements work together: the "Menu" button opens,
  // the backdrop and close button both close.
  var menuToggle = document.getElementById('menu-toggle');
  var menuPanel = document.getElementById('mobile-menu');
  var menuBackdrop = document.getElementById('mobile-backdrop');
  var menuClose = document.getElementById('menu-close');

  // openMenu / closeMenu toggle BOTH the backdrop and the panel
  // in sync — they always show and hide together.
  function openMenu() {
    menuBackdrop.classList.remove('hidden');
    menuPanel.classList.remove('hidden');
  }

  function closeMenu() {
    menuBackdrop.classList.add('hidden');
    menuPanel.classList.add('hidden');
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuBackdrop.addEventListener('click', closeMenu);

  // Theme toggle button
  var themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', function () {
    // classList.toggle adds the class if missing, removes if present
    document.documentElement.classList.toggle('dark');

    var isDark = document.documentElement.classList.contains('dark');
    // Persist so the choice survives page reloads & navigation
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Because we're using inline SVGs with Tailwind's dark:hidden and
  // dark:block classes, the icon swap happens automatically via CSS.
  // When <html> has class="dark", Tailwind hides the sun and shows
  // the moon — no JS icon logic needed.
});
