// Seller Login JavaScript

const form = document.getElementById('sellerLoginForm');
const emailInput = document.getElementById('loginEmail');
const passwordInput = document.getElementById('loginPassword');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

function clearError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  errorElement.textContent = '';
  errorElement.classList.remove('show');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Validate email
  if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  } else {
    clearError('email');
  }
  
  // Validate password
  if (password.length < 6) {
    showError('password', 'Please enter your password');
    isValid = false;
  } else {
    clearError('password');
  }
  
  if (isValid) {
    // Check against saved seller data
    const sellerData = JSON.parse(localStorage.getItem('sellerSignup') || '{}');
    
    if (sellerData.email === email && sellerData.password === password) {
      localStorage.setItem('isSellerLoggedIn', 'true');
      localStorage.setItem('sellerName', sellerData.businessName);
      
      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('rememberEmail', email);
      }
      
      alert('Login successful!');
      window.location.href = 'seller-dashboard.html';
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
});

// Auto-fill email if remembered
window.addEventListener('load', () => {
  const rememberedEmail = localStorage.getItem('rememberEmail');
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
  }
});
