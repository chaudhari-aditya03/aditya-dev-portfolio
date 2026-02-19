// Theme Initialization
(function () {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Check for Hacker Mode
    if (localStorage.hackerMode === 'true') {
        document.documentElement.classList.add('hacker-mode');
    }
})();

// Theme Toggling Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

    // Easter Egg: Hacker Mode (Triple click on separate element or specific key combo could trigger this, 
    // but for now let's keep it simple or exposing a hidden button if desired. 
    // The original code didn't seem to have an obvious toggle for hacker mode in the UI, 
    // assuming it might have been a console trick or hidden feature. 
    // I will add a hidden keyboard shortcut: 'Ctrl + Alt + H')

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.code === 'KeyH') {
            document.documentElement.classList.toggle('hacker-mode');
            localStorage.hackerMode = document.documentElement.classList.contains('hacker-mode');
            alert('Hacker Mode Toggled!');
        }
    });
});
