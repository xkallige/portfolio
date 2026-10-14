        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon   = document.querySelector('.theme-icon');

        function applyTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                themeIcon.textContent = '🌙';
            } else {
                document.body.classList.remove('light-theme');
                themeIcon.textContent = '☀️';
            }
            localStorage.setItem('portfolioTheme', theme);
        }

        applyTheme(localStorage.getItem('portfolioTheme') || 'dark');

        themeToggle.addEventListener('click', () => {
            const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(next);
        });