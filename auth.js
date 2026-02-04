// Authentication Functions

function showAuthMenu() {
    const authMenu = document.getElementById('authMenu');
    const userMenu = document.getElementById('userMenu');
    
    if (isLoggedIn()) {
        authMenu.style.display = 'none';
        userMenu.style.display = 'block';
    } else {
        authMenu.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

function logout() {
    removeToken();
    removeCurrentUser();
    showAuthMenu();
    alert('Logged out successfully');
    window.location.href = 'index.html';
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    showAuthMenu();
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    if (navbarMenu) {
        const links = navbarMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
            });
        });
    }
});
