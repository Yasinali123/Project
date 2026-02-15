// Seller Dashboard JavaScript

// Check if seller is logged in
function checkSellerLogin() {
  if (!localStorage.getItem('isSellerLoggedIn')) {
    window.location.href = 'seller-signup.html';
    return false;
  }
  return true;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (!checkSellerLogin()) return;
  
  initializeDashboard();
  setupNavigation();
  setupLogout();
  setupProductForm();
  setupImageUpload();
  setupSupportForm();
  loadSellerData();
  loadDashboardData();
});

// Initialize Dashboard
function initializeDashboard() {
  const sellerName = localStorage.getItem('sellerName') || 'Seller';
  document.getElementById('sellerName').textContent = `Welcome, ${sellerName}`;
}

// Setup Navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active from all
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));
      
      // Add active to clicked
      item.classList.add('active');
      const sectionId = item.getAttribute('data-section');
      document.getElementById(sectionId).classList.add('active');
    });
  });
}

// Setup Logout
function setupLogout() {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isSellerLoggedIn');
      localStorage.removeItem('sellerName');
      window.location.href = 'index.html';
    }
  });
}

// Setup Product Form
function setupProductForm() {
  const form = document.getElementById('addProductForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productData = {
      id: Date.now(),
      name: document.getElementById('productName').value,
      category: document.getElementById('productCategory').value,
      price: parseFloat(document.getElementById('productPrice').value),
      stock: parseInt(document.getElementById('stockQuantity').value),
      description: document.getElementById('productDescription').value,
      images: getUploadedImages(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Validate
    if (!productData.name || !productData.category || !productData.price || !productData.stock || !productData.description) {
      alert('Please fill all required fields');
      return;
    }
    
    if (productData.images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }
    
    // Save product
    let products = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    products.push(productData);
    localStorage.setItem('sellerProducts', JSON.stringify(products));
    
    alert('Product submitted for approval!');
    form.reset();
    document.getElementById('imagePreview').innerHTML = '';
    loadMyProducts('all');
  });
}

// Image Upload Handler
function setupImageUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('productImages');
  const preview = document.getElementById('imagePreview');
  
  let uploadedFiles = [];
  
  // Click to upload
  uploadArea.addEventListener('click', () => fileInput.click());
  
  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
  });
  
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });
  
  function handleFiles(files) {
    const filesArray = Array.from(files);
    
    // Limit to 5 images
    if (uploadedFiles.length + filesArray.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    filesArray.forEach(file => {
      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedFiles.push({
          name: file.name,
          data: e.target.result
        });
        renderImagePreview();
      };
      reader.readAsDataURL(file);
    });
  }
  
  function renderImagePreview() {
    preview.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
      const item = document.createElement('div');
      item.className = 'preview-item';
      item.innerHTML = `
        <img src="${file.data}" alt="${file.name}">
        <button type="button" class="preview-remove" data-index="${index}">✕</button>
      `;
      preview.appendChild(item);
    });
    
    preview.querySelectorAll('.preview-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        uploadedFiles.splice(parseInt(btn.getAttribute('data-index')), 1);
        renderImagePreview();
      });
    });
  }
}

function getUploadedImages() {
  const preview = document.getElementById('imagePreview');
  const images = [];
  preview.querySelectorAll('img').forEach(img => {
    images.push(img.src);
  });
  return images;
}

// Load My Products
function loadMyProducts(status = 'all') {
  const products = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
  const productsList = document.getElementById('productsList');
  
  let filtered = status === 'all' ? products : products.filter(p => p.status === status);
  
  if (filtered.length === 0) {
    productsList.innerHTML = '<p class="empty-state">No products. <a href="#add-product">Add your first product</a></p>';
    return;
  }
  
  productsList.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}">
      </div>
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <span class="product-status ${product.status}">${product.status.toUpperCase()}</span>
        </div>
        <div class="product-price">₹${product.price.toFixed(2)}</div>
        <small style="color: var(--text-secondary);">Stock: ${product.stock} units</small>
        <div class="product-actions" style="margin-top: 12px;">
          <button onclick="editProduct(${product.id})">Edit</button>
          <button onclick="deleteProduct(${product.id})" style="color: var(--danger);">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
  
  updateStats();
}

function editProduct(id) {
  alert('Edit functionality will be available soon');
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    let products = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    products = products.filter(p => p.id !== id);
    localStorage.setItem('sellerProducts', JSON.stringify(products));
    loadMyProducts('all');
  }
}

// Status Filter
document.getElementById('statusFilter')?.addEventListener('change', (e) => {
  loadMyProducts(e.target.value);
});

// Load Dashboard Data
function loadDashboardData() {
  const products = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
  
  document.getElementById('totalProducts').textContent = products.length;
  document.getElementById('pendingApproval').textContent = products.filter(p => p.status === 'pending').length;
  document.getElementById('activeProducts').textContent = products.filter(p => p.status === 'approved').length;
  document.getElementById('totalOrders').textContent = '0'; // Placeholder
  
  // Load Recent Orders
  const recentOrders = document.getElementById('recentOrders');
  const orders = JSON.parse(localStorage.getItem('sellerOrders') || '[]');
  
  if (orders.length === 0) {
    recentOrders.innerHTML = '<p class="empty-state">No orders yet</p>';
  } else {
    recentOrders.innerHTML = orders.slice(0, 5).map(order => `
      <div class="order-item">
        <div class="order-icon">📦</div>
        <div class="order-details">
          <div class="order-id">Order #${order.id}</div>
          <div class="order-customer">${order.customerName}</div>
        </div>
        <div class="order-amount">₹${order.amount}</div>
        <div class="order-status ${order.status}">${order.status.toUpperCase()}</div>
      </div>
    `).join('');
  }
}

function updateStats() {
  loadDashboardData();
}

// Load Seller Data
function loadSellerData() {
  const sellerData = JSON.parse(localStorage.getItem('sellerSignup') || '{}');
  
  document.getElementById('profileBusinessName').value = sellerData.businessName || '';
  document.getElementById('profileOwnerName').value = sellerData.ownerName || '';
  document.getElementById('profileGST').value = sellerData.gstNumber || '';
  document.getElementById('profileCategory').value = sellerData.category || '';
  document.getElementById('profileCity').value = sellerData.city || '';
  document.getElementById('profileState').value = sellerData.state || '';
  document.getElementById('profileEmail').value = sellerData.email || '';
  document.getElementById('profilePhone').value = sellerData.phone || '';
  document.getElementById('profileBankName').value = sellerData.bankName || '';
  document.getElementById('profileAccountNumber').value = sellerData.accountNumber || '';
  document.getElementById('profileIFSC').value = sellerData.ifscCode || '';
  document.getElementById('profileAccountHolder').value = sellerData.accountHolder || '';
}

// Support Form
function setupSupportForm() {
  const form = document.getElementById('supportForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const ticket = {
      id: 'TKT-' + Date.now(),
      subject: document.getElementById('ticketSubject').value,
      category: document.getElementById('ticketCategory').value,
      message: document.getElementById('ticketMessage').value,
      status: 'open',
      createdAt: new Date().toLocaleDateString()
    };
    
    let tickets = JSON.parse(localStorage.getItem('sellerTickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('sellerTickets', JSON.stringify(tickets));
    
    alert('Support ticket submitted! Ticket ID: ' + ticket.id);
    form.reset();
  });
}

// Load My Products on page load
window.addEventListener('load', () => {
  loadMyProducts('all');
});
