const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);
    themeIcon.textContent = isLight ? '\u{1F319}' : '\u{2600}\u{FE0F}';
    localStorage.setItem('portfolioTheme', isLight ? 'light' : 'dark');
}

applyTheme(localStorage.getItem('portfolioTheme') || 'dark');

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
});
