// Seller Signup JavaScript

const form = document.getElementById('sellerSignupForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const phoneInput = document.getElementById('phone');
const otpGroup = document.getElementById('otpGroup');
const otpTimer = document.getElementById('otpTimer');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

let otpTimeLeft = 0;
let otpTimerInterval = null;

// Password strength checker
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  let strength = 'weak';
  let color = 'danger';

  if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    strength = 'strong';
    strengthBar.className = 'strength-bar strong';
    strengthText.textContent = '✓ Strong password';
  } else if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    strength = 'good';
    strengthBar.className = 'strength-bar good';
    strengthText.textContent = 'Good password';
  } else if (password.length >= 6 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) {
    strength = 'fair';
    strengthBar.className = 'strength-bar fair';
    strengthText.textContent = 'Fair password';
  } else {
    strengthBar.className = 'strength-bar weak';
    strengthText.textContent = 'Weak password';
  }
});

// OTP Sender
sendOtpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const phone = phoneInput.value.trim();
  
  if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
    showError('phone', 'Please enter a valid 10-digit phone number');
    return;
  }

  clearError('phone');
  
  // Simulate OTP sending
  sendOtpBtn.textContent = 'OTP Sent ✓';
  sendOtpBtn.disabled = true;
  otpGroup.style.display = 'block';
  
  // Start OTP timer (5 minutes)
  otpTimeLeft = 300;
  startOtpTimer();
  
  // In real implementation, call API to send OTP
  console.log(`OTP sent to ${phone}`);
});

function startOtpTimer() {
  if (otpTimerInterval) clearInterval(otpTimerInterval);
  
  otpTimerInterval = setInterval(() => {
    otpTimeLeft--;
    const minutes = Math.floor(otpTimeLeft / 60);
    const seconds = otpTimeLeft % 60;
    otpTimer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (otpTimeLeft <= 0) {
      clearInterval(otpTimerInterval);
      sendOtpBtn.textContent = 'Resend OTP';
      sendOtpBtn.disabled = false;
      otpTimer.textContent = '';
    }
  }, 1000);
}

// Form Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateGST(gst) {
  const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return re.test(gst);
}

function validateIFSC(ifsc) {
  const re = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return re.test(ifsc);
}

function validateAccountNumber(account) {
  return account.trim().length >= 9 && account.trim().length <= 18 && /^\d+$/.test(account);
}

function validatePhone(phone) {
  return phone.length === 10 && /^\d+$/.test(phone);
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const formGroup = document.querySelector(`#${fieldId}`).closest('.form-group');
  
  errorElement.textContent = message;
  errorElement.classList.add('show');
  formGroup.classList.add('error');
}

function clearError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  const formGroup = document.querySelector(`#${fieldId}`).closest('.form-group');
  
  errorElement.textContent = '';
  errorElement.classList.remove('show');
  formGroup.classList.remove('error');
}

// Form Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  
  // Validate Business Name
  const businessName = document.getElementById('businessName').value.trim();
  if (businessName.length < 3) {
    showError('businessName', 'Business name must be at least 3 characters');
    isValid = false;
  } else {
    clearError('businessName');
  }
  
  // Validate Owner Name
  const ownerName = document.getElementById('ownerName').value.trim();
  if (ownerName.length < 3) {
    showError('ownerName', 'Owner name must be at least 3 characters');
    isValid = false;
  } else {
    clearError('ownerName');
  }
  
  // Validate Category
  const category = document.getElementById('category').value;
  if (!category) {
    showError('category', 'Please select a category');
    isValid = false;
  } else {
    clearError('category');
  }
  
  // Validate GST
  const gst = document.getElementById('gstNumber').value.trim();
  if (!gst) {
    showError('gstNumber', 'GST number is required');
    isValid = false;
  } else if (!validateGST(gst)) {
    showError('gstNumber', 'Invalid GST format');
    isValid = false;
  } else {
    clearError('gstNumber');
  }
  
  // Validate State
  const state = document.getElementById('state').value;
  if (!state) {
    showError('state', 'Please select a state');
    isValid = false;
  } else {
    clearError('state');
  }
  
  // Validate City
  const city = document.getElementById('city').value.trim();
  if (city.length < 2) {
    showError('city', 'Please enter a valid city name');
    isValid = false;
  } else {
    clearError('city');
  }
  
  // Validate Email
  const email = document.getElementById('email').value.trim();
  if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  } else {
    clearError('email');
  }
  
  // Validate Phone
  if (!validatePhone(phoneInput.value.trim())) {
    showError('phone', 'Please enter a valid 10-digit phone number');
    isValid = false;
  } else {
    clearError('phone');
  }
  
  // Validate OTP
  const otp = document.getElementById('otp').value.trim();
  if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
    showError('otp', 'Please enter a valid 6-digit OTP');
    isValid = false;
  } else {
    clearError('otp');
  }
  
  // Validate Account Holder
  const accountHolder = document.getElementById('accountHolder').value.trim();
  if (accountHolder.length < 3) {
    showError('accountHolder', 'Account holder name is required');
    isValid = false;
  } else {
    clearError('accountHolder');
  }
  
  // Validate Account Number
  const accountNumber = document.getElementById('accountNumber').value.trim();
  if (!validateAccountNumber(accountNumber)) {
    showError('accountNumber', 'Please enter a valid account number');
    isValid = false;
  } else {
    clearError('accountNumber');
  }
  
  // Validate IFSC
  const ifsc = document.getElementById('ifscCode').value.trim().toUpperCase();
  if (!validateIFSC(ifsc)) {
    showError('ifscCode', 'Please enter a valid IFSC code');
    isValid = false;
  } else {
    clearError('ifscCode');
  }
  
  // Validate Bank Name
  const bankName = document.getElementById('bankName').value.trim();
  if (bankName.length < 3) {
    showError('bankName', 'Please enter bank name');
    isValid = false;
  } else {
    clearError('bankName');
  }
  
  // Validate Password
  const password = passwordInput.value;
  if (password.length < 8) {
    showError('password', 'Password must be at least 8 characters');
    isValid = false;
  } else {
    clearError('password');
  }
  
  // Validate Password Match
  if (password !== confirmPasswordInput.value) {
    showError('confirmPassword', 'Passwords do not match');
    isValid = false;
  } else {
    clearError('confirmPassword');
  }
  
  // Validate Terms
  if (!document.getElementById('terms').checked) {
    document.getElementById('termsError').textContent = 'You must agree to the terms and conditions';
    document.getElementById('termsError').classList.add('show');
    isValid = false;
  } else {
    document.getElementById('termsError').textContent = '';
    document.getElementById('termsError').classList.remove('show');
  }
  
  if (isValid) {
    // Collect form data
    const formData = {
      businessName,
      ownerName,
      category,
      gstNumber: gst,
      state,
      city,
      email,
      phone: phoneInput.value,
      accountHolder,
      accountNumber,
      ifscCode: ifsc,
      bankName,
      password
    };
    
    // Save to localStorage (in real app, send to API)
    localStorage.setItem('sellerSignup', JSON.stringify(formData));
    localStorage.setItem('sellerName', businessName);
    localStorage.setItem('isSellerLoggedIn', 'true');
    
    alert('Account created successfully! Redirecting to dashboard...');
    window.location.href = 'seller-dashboard.html';
  } else {
    alert('Please fix the errors above and try again');
  }
});

// Clear errors on input
document.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('focus', () => {
    const fieldName = field.id;
    clearError(fieldName);
  });
});
