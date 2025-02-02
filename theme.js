document.addEventListener('DOMContentLoaded', function() {
    // Function to apply theme
    function applyTheme() {
        const currentTheme = localStorage.getItem('theme');
        console.log('Current theme:', currentTheme); // Debug log

        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('checkbox').checked = true; // Check the checkbox if dark mode is active
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('checkbox').checked = false; // Uncheck the checkbox if light mode is active
        }
    }

    // Apply theme immediately when page loads
    applyTheme();

    // Listen for localStorage changes from other pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme') {
            console.log('Theme changed:', e.newValue); // Debug log
            applyTheme();
        }
    });

    // Theme switcher functionality
    const themeSwitch = document.getElementById('checkbox');
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        applyTheme();
    });
});