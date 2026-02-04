// Marketplace JavaScript - Product Loading, Filtering, and Management

let currentPage = 1;
const itemsPerPage = 12;
let selectedCategory = '';

// Sample Products Data (In production, this would come from the backend)
const sampleProducts = [
    // Sand Products
    { id: 1, name: 'River Sand - Premium Grade', category: 'sand', price: 450, unit: 'ton', rating: 4.8, reviews: 256, seller: { name: 'Sand Suppliers Ltd', id: 1 }, availability: 'in_stock', badge: 'Popular' },
    { id: 2, name: 'M-Sand (Manufactured Sand)', category: 'sand', price: 380, unit: 'ton', rating: 4.6, reviews: 189, seller: { name: 'Quality Materials', id: 2 }, availability: 'in_stock', badge: 'Discount' },
    { id: 3, name: 'Fine Sand - Construction Grade', category: 'sand', price: 400, unit: 'ton', rating: 4.5, reviews: 142, seller: { name: 'Sand Suppliers Ltd', id: 1 }, availability: 'in_stock' },
    { id: 4, name: 'Silica Sand - Industrial', category: 'sand', price: 520, unit: 'ton', rating: 4.7, reviews: 98, seller: { name: 'Industrial Materials', id: 3 }, availability: 'low_stock' },
    
    // Bricks Products
    { id: 5, name: 'Red Clay Bricks - Standard', category: 'bricks', price: 5000, unit: '1000 pcs', rating: 4.7, reviews: 342, seller: { name: 'Brick Manufacturers', id: 4 }, availability: 'in_stock', badge: 'Best Seller' },
    { id: 6, name: 'Fly Ash Bricks - Eco Friendly', category: 'bricks', price: 4800, unit: '1000 pcs', rating: 4.9, reviews: 267, seller: { name: 'Eco Bricks', id: 5 }, availability: 'in_stock', badge: 'Eco' },
    { id: 7, name: 'Hollow Concrete Bricks', category: 'bricks', price: 5200, unit: '1000 pcs', rating: 4.6, reviews: 198, seller: { name: 'Concrete Products', id: 6 }, availability: 'in_stock' },
    { id: 8, name: 'Interlocking Bricks - Design', category: 'bricks', price: 7500, unit: '1000 pcs', rating: 4.8, reviews: 156, seller: { name: 'Design Bricks Co', id: 7 }, availability: 'low_stock' },
    
    // Cement Products
    { id: 9, name: 'Portland Cement - 50kg', category: 'cement', price: 280, unit: 'bag', rating: 4.9, reviews: 512, seller: { name: 'Cement Corp', id: 8 }, availability: 'in_stock', badge: 'Top Rated' },
    { id: 10, name: 'Pozzolana Cement - 50kg', category: 'cement', price: 260, unit: 'bag', rating: 4.7, reviews: 289, seller: { name: 'Eco Cements', id: 9 }, availability: 'in_stock' },
    { id: 11, name: 'Composite Cement - 50kg', category: 'cement', price: 290, unit: 'bag', rating: 4.6, reviews: 234, seller: { name: 'Cement Corp', id: 8 }, availability: 'in_stock' },
    { id: 12, name: 'White Cement - 20kg', category: 'cement', price: 450, unit: 'bag', rating: 4.8, reviews: 167, seller: { name: 'Premium Cements', id: 10 }, availability: 'low_stock' },
    
    // Steel Products
    { id: 13, name: 'TMT Steel Bars - 8mm', category: 'steel', price: 45000, unit: 'ton', rating: 4.8, reviews: 428, seller: { name: 'Steel Industries', id: 11 }, availability: 'in_stock', badge: 'Popular' },
    { id: 14, name: 'TMT Steel Bars - 12mm', category: 'steel', price: 45500, unit: 'ton', rating: 4.9, reviews: 356, seller: { name: 'Steel Industries', id: 11 }, availability: 'in_stock' },
    { id: 15, name: 'Mild Steel Bars', category: 'steel', price: 42000, unit: 'ton', rating: 4.6, reviews: 212, seller: { name: 'Metal Supplies', id: 12 }, availability: 'in_stock' },
    { id: 16, name: 'Steel Channels - 150mm', category: 'steel', price: 48000, unit: 'ton', rating: 4.7, reviews: 145, seller: { name: 'Steel Industries', id: 11 }, availability: 'low_stock' },
    
    // Crushed Stone
    { id: 17, name: 'Crushed Stone - 40mm', category: 'crushed_stone', price: 380, unit: 'ton', rating: 4.6, reviews: 278, seller: { name: 'Aggregates Ltd', id: 13 }, availability: 'in_stock' },
    { id: 18, name: 'Crushed Stone - 20mm', category: 'crushed_stone', price: 400, unit: 'ton', rating: 4.7, reviews: 245, seller: { name: 'Quality Aggregates', id: 14 }, availability: 'in_stock' },
    { id: 19, name: 'Stone Chips - 10mm', category: 'crushed_stone', price: 420, unit: 'ton', rating: 4.5, reviews: 156, seller: { name: 'Aggregates Ltd', id: 13 }, availability: 'in_stock' },
    
    // MEP Products
    { id: 20, name: 'PVC Electrical Conduit - 20mm', category: 'mep', price: 85, unit: 'meter', rating: 4.7, reviews: 234, seller: { name: 'MEP Supplies', id: 15 }, availability: 'in_stock' },
    { id: 21, name: 'Copper Wire - 2.5 sq mm', category: 'mep', price: 120, unit: 'meter', rating: 4.8, reviews: 312, seller: { name: 'Electrical Goods', id: 16 }, availability: 'in_stock' },
    { id: 22, name: 'PVC Pipes - 1 inch', category: 'mep', price: 95, unit: 'meter', rating: 4.6, reviews: 178, seller: { name: 'MEP Supplies', id: 15 }, availability: 'in_stock' },
    { id: 23, name: 'MS Plumbing Fittings - Set', category: 'mep', price: 1500, unit: 'set', rating: 4.7, reviews: 145, seller: { name: 'Plumbing Systems', id: 17 }, availability: 'low_stock' },
    
    // Interior Products
    { id: 24, name: 'Ceramic Floor Tiles - 2x2', category: 'interior', price: 450, unit: 'sqft', rating: 4.8, reviews: 389, seller: { name: 'Tile World', id: 18 }, availability: 'in_stock', badge: 'Best Seller' },
    { id: 25, name: 'Wall Paint - Premium', category: 'interior', price: 850, unit: 'liter', rating: 4.9, reviews: 456, seller: { name: 'Paint Experts', id: 19 }, availability: 'in_stock' },
    { id: 26, name: 'Wood Flooring - Oak', category: 'interior', price: 2500, unit: 'sqft', rating: 4.7, reviews: 267, seller: { name: 'Flooring Solutions', id: 20 }, availability: 'in_stock' },
    { id: 27, name: 'Glass Mosaic Tiles', category: 'interior', price: 650, unit: 'sqft', rating: 4.6, reviews: 198, seller: { name: 'Tile World', id: 18 }, availability: 'low_stock' },
    
    // Furniture Products
    { id: 28, name: 'Wooden Door Frame - Teak', category: 'furniture', price: 8500, unit: 'piece', rating: 4.8, reviews: 234, seller: { name: 'Furniture House', id: 21 }, availability: 'in_stock' },
    { id: 29, name: 'Steel Windows - Casement', category: 'furniture', price: 4200, unit: 'piece', rating: 4.6, reviews: 156, seller: { name: 'Window Specialists', id: 22 }, availability: 'in_stock' },
    { id: 30, name: 'Kitchen Cabinet Set', category: 'furniture', price: 15000, unit: 'set', rating: 4.7, reviews: 289, seller: { name: 'Modular Furniture', id: 23 }, availability: 'in_stock' },
    { id: 31, name: 'Wooden Wardrobe', category: 'furniture', price: 12000, unit: 'piece', rating: 4.9, reviews: 312, seller: { name: 'Furniture House', id: 21 }, availability: 'low_stock' },
];

// Initialize marketplace on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(1);
    setupEventListeners();
    updateAuthUI();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('hamburger').addEventListener('click', toggleMenu);
    document.getElementById('userDropdown').addEventListener('click', toggleDropdown);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Enter key in search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
}

// Load and display products
function loadProducts(page = 1) {
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('productsContainer').innerHTML = '';
    document.getElementById('noResults').style.display = 'none';
    
    // Simulate loading delay
    setTimeout(() => {
        const filteredProducts = filterProducts();
        
        document.getElementById('loadingMessage').style.display = 'none';
        
        if (filteredProducts.length === 0) {
            document.getElementById('noResults').style.display = 'block';
            document.getElementById('pagination').innerHTML = '';
            return;
        }
        
        // Pagination
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Display products
        const container = document.getElementById('productsContainer');
        container.innerHTML = paginatedProducts.map(product => `
            <div class="product-card" onclick="openProductDetail(${product.id})">
                <div class="product-image">
                    ${getCategoryEmoji(product.category)}
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.toUpperCase()}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-specs">By: ${product.seller.name}</div>
                    <div class="product-rating">⭐ ${product.rating.toFixed(1)} (${product.reviews})</div>
                    <div class="product-price">₹${product.price.toLocaleString()}</div>
                    <div class="product-unit">per ${product.unit}</div>
                    <div class="product-availability ${product.availability === 'in_stock' ? 'in-stock' : 'low-stock'}">
                        ${product.availability === 'in_stock' ? '✓ In Stock' : '⚠️ Low Stock'}
                    </div>
                    <div class="product-actions">
                        <a href="javascript:void(0)" onclick="openProductDetail(${product.id}); event.stopPropagation();" class="view-btn">View</a>
                        <button class="add-btn" onclick="quickAddToCart(${product.id}); event.stopPropagation();">Add Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Display pagination
        displayPagination(totalPages, page);
    }, 300);
}

// Filter products based on criteria
function filterProducts() {
    let products = [...sampleProducts];
    
    // Category filter
    const category = document.getElementById('categoryFilter').value || selectedCategory;
    if (category) {
        products = products.filter(p => p.category === category);
    }
    
    // Search filter
    const search = document.getElementById('searchInput').value.toLowerCase();
    if (search) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(search) || 
            p.category.toLowerCase().includes(search)
        );
    }
    
    // Price filter
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    
    // Rating filter
    const rating = parseFloat(document.querySelectorAll('input[name="rating"]:checked')[0]?.value) || 0;
    if (rating > 0) {
        products = products.filter(p => p.rating >= rating);
    }
    
    // Sort
    const sortBy = document.getElementById('sortBy').value;
    switch(sortBy) {
        case 'price_low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            products.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // Reverse order by ID for newest first
            products.sort((a, b) => b.id - a.id);
            break;
    }
    
    return products;
}

// Display pagination
function displayPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('a');
        prevBtn.textContent = '← Previous';
        prevBtn.onclick = (e) => {
            e.preventDefault();
            loadProducts(currentPage - 1);
            window.scrollTo(0, 0);
        };
        pagination.appendChild(prevBtn);
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('span');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.className = 'active';
        } else {
            pageBtn.style.cursor = 'pointer';
            pageBtn.onclick = () => {
                loadProducts(i);
                window.scrollTo(0, 0);
            };
        }
        pagination.appendChild(pageBtn);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('a');
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = (e) => {
            e.preventDefault();
            loadProducts(currentPage + 1);
            window.scrollTo(0, 0);
        };
        pagination.appendChild(nextBtn);
    }
}

// Apply filters
function applyFilters() {
    currentPage = 1;
    loadProducts(1);
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('sortBy').value = '';
    document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(c => c.checked = false);
    selectedCategory = '';
    loadProducts(1);
}

// Filter by category
function filterByCategory(category) {
    selectedCategory = category;
    document.getElementById('categoryFilter').value = category;
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    event.target.closest('.category-card').classList.add('active');
    loadProducts(1);
}

// Get category emoji
function getCategoryEmoji(category) {
    const emojis = {
        'sand': '🏜️',
        'bricks': '🧱',
        'cement': '⚪',
        'steel': '🔩',
        'crushed_stone': '⛏️',
        'mep': '⚙️',
        'interior': '🎨',
        'furniture': '🪑',
        'autocad': '📐'
    };
    return emojis[category] || '📦';
}

// Quick add to cart
function quickAddToCart(productId) {
    if (!isLoggedIn()) {
        showAlert('Please login to add items to cart', 'info');
        setTimeout(() => window.location.href = 'auth/login.html', 1500);
        return;
    }
    
    const product = sampleProducts.find(p => p.id === productId);
    showAlert(`✓ "${product.name}" added to cart!`, 'success');
    
    // Store in localStorage for demo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Open product detail page
function openProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Show alert messages
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : '#3498DB'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 3000);
}

// Toggle hamburger menu
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Toggle user dropdown
function toggleDropdown(e) {
    e.preventDefault();
    const dropdown = e.target.nextElementSibling;
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Check if logged in
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Logout
function logout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Update auth UI
function updateAuthUI() {
    const authMenu = document.getElementById('authMenu');
    const userMenu = document.getElementById('userMenu');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        authMenu.style.display = 'none';
        userMenu.style.display = 'block';
    } else {
        authMenu.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
