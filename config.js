// Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
function getToken() {
    return localStorage.getItem('access_token');
}

// Save token
function saveToken(token) {
    localStorage.setItem('access_token', token);
}

// Remove token
function removeToken() {
    localStorage.removeItem('access_token');
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
}

// Save current user
function saveCurrentUser(user) {
    localStorage.setItem('current_user', JSON.stringify(user));
}

// Remove current user
function removeCurrentUser() {
    localStorage.removeItem('current_user');
}

// Check if user is logged in
function isLoggedIn() {
    return !!getToken();
}
