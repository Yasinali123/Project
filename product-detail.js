// Product Detail Page JavaScript

// Sample products data (same as marketplace)
const sampleProducts = [
    { id: 1, name: 'River Sand - Premium Grade', category: 'sand', price: 450, unit: 'ton', rating: 4.8, reviews: 256, seller: { name: 'Sand Suppliers Ltd', id: 1, rating: 4.7 }, availability: 'in_stock', badge: 'Popular' },
    { id: 2, name: 'M-Sand (Manufactured Sand)', category: 'sand', price: 380, unit: 'ton', rating: 4.6, reviews: 189, seller: { name: 'Quality Materials', id: 2, rating: 4.6 }, availability: 'in_stock', badge: 'Discount' },
    { id: 3, name: 'Fine Sand - Construction Grade', category: 'sand', price: 400, unit: 'ton', rating: 4.5, reviews: 142, seller: { name: 'Sand Suppliers Ltd', id: 1, rating: 4.7 }, availability: 'in_stock' },
    { id: 4, name: 'Silica Sand - Industrial', category: 'sand', price: 520, unit: 'ton', rating: 4.7, reviews: 98, seller: { name: 'Industrial Materials', id: 3, rating: 4.8 }, availability: 'low_stock' },
    { id: 5, name: 'Red Clay Bricks - Standard', category: 'bricks', price: 5000, unit: '1000 pcs', rating: 4.7, reviews: 342, seller: { name: 'Brick Manufacturers', id: 4, rating: 4.9 }, availability: 'in_stock', badge: 'Best Seller' },
    { id: 6, name: 'Fly Ash Bricks - Eco Friendly', category: 'bricks', price: 4800, unit: '1000 pcs', rating: 4.9, reviews: 267, seller: { name: 'Eco Bricks', id: 5, rating: 4.8 }, availability: 'in_stock', badge: 'Eco' },
    { id: 7, name: 'Hollow Concrete Bricks', category: 'bricks', price: 5200, unit: '1000 pcs', rating: 4.6, reviews: 198, seller: { name: 'Concrete Products', id: 6, rating: 4.5 }, availability: 'in_stock' },
    { id: 8, name: 'Interlocking Bricks - Design', category: 'bricks', price: 7500, unit: '1000 pcs', rating: 4.8, reviews: 156, seller: { name: 'Design Bricks Co', id: 7, rating: 4.7 }, availability: 'low_stock' },
    { id: 9, name: 'Portland Cement - 50kg', category: 'cement', price: 280, unit: 'bag', rating: 4.9, reviews: 512, seller: { name: 'Cement Corp', id: 8, rating: 4.9 }, availability: 'in_stock', badge: 'Top Rated' },
    { id: 10, name: 'Pozzolana Cement - 50kg', category: 'cement', price: 260, unit: 'bag', rating: 4.7, reviews: 289, seller: { name: 'Eco Cements', id: 9, rating: 4.7 }, availability: 'in_stock' },
    { id: 11, name: 'Composite Cement - 50kg', category: 'cement', price: 290, unit: 'bag', rating: 4.6, reviews: 234, seller: { name: 'Cement Corp', id: 8, rating: 4.9 }, availability: 'in_stock' },
    { id: 12, name: 'White Cement - 20kg', category: 'cement', price: 450, unit: 'bag', rating: 4.8, reviews: 167, seller: { name: 'Premium Cements', id: 10, rating: 4.8 }, availability: 'low_stock' },
    { id: 13, name: 'TMT Steel Bars - 8mm', category: 'steel', price: 45000, unit: 'ton', rating: 4.8, reviews: 428, seller: { name: 'Steel Industries', id: 11, rating: 4.8 }, availability: 'in_stock', badge: 'Popular' },
    { id: 14, name: 'TMT Steel Bars - 12mm', category: 'steel', price: 45500, unit: 'ton', rating: 4.9, reviews: 356, seller: { name: 'Steel Industries', id: 11, rating: 4.8 }, availability: 'in_stock' },
    { id: 15, name: 'Mild Steel Bars', category: 'steel', price: 42000, unit: 'ton', rating: 4.6, reviews: 212, seller: { name: 'Metal Supplies', id: 12, rating: 4.6 }, availability: 'in_stock' },
    { id: 16, name: 'Steel Channels - 150mm', category: 'steel', price: 48000, unit: 'ton', rating: 4.7, reviews: 145, seller: { name: 'Steel Industries', id: 11, rating: 4.8 }, availability: 'low_stock' },
    { id: 17, name: 'Crushed Stone - 40mm', category: 'crushed_stone', price: 380, unit: 'ton', rating: 4.6, reviews: 278, seller: { name: 'Aggregates Ltd', id: 13, rating: 4.6 }, availability: 'in_stock' },
    { id: 18, name: 'Crushed Stone - 20mm', category: 'crushed_stone', price: 400, unit: 'ton', rating: 4.7, reviews: 245, seller: { name: 'Quality Aggregates', id: 14, rating: 4.7 }, availability: 'in_stock' },
    { id: 19, name: 'Stone Chips - 10mm', category: 'crushed_stone', price: 420, unit: 'ton', rating: 4.5, reviews: 156, seller: { name: 'Aggregates Ltd', id: 13, rating: 4.6 }, availability: 'in_stock' },
    { id: 20, name: 'PVC Electrical Conduit - 20mm', category: 'mep', price: 85, unit: 'meter', rating: 4.7, reviews: 234, seller: { name: 'MEP Supplies', id: 15, rating: 4.6 }, availability: 'in_stock' },
    { id: 24, name: 'Ceramic Floor Tiles - 2x2', category: 'interior', price: 450, unit: 'sqft', rating: 4.8, reviews: 389, seller: { name: 'Tile World', id: 18, rating: 4.7 }, availability: 'in_stock', badge: 'Best Seller' },
];

// Get product descriptions
function getProductDescription(productId) {
    const descriptions = {
        1: 'Premium quality river sand sourced from certified suppliers. Perfect for construction, plaster, and concrete works. Meeting all IS standards with consistent quality.',
        2: 'Manufactured sand (M-Sand) produced through crushing granite rocks. Better workability than river sand, economical, and eco-friendly. Suitable for all construction purposes.',
        5: 'Standard red clay bricks manufactured using traditional methods. Excellent strength, durability, and weather resistance. Ideal for load-bearing walls and masonry work.',
        9: 'High-quality Portland cement meeting IS 12269 standards. Superior strength development, perfect for concrete, mortar, and plaster applications.',
        13: 'High-tensile TMT steel bars with excellent strength and ductility. Meeting IS 1786 standards. Ideal for RCC construction and structural work.',
    };
    return descriptions[productId] || 'High-quality construction material sourced from certified suppliers. Perfect for your building needs.';
}

// Get product specifications
function getProductSpecs(product) {
    const specs = {
        sand: [
            { label: 'Grade', value: 'Premium' },
            { label: 'Fineness Modulus', value: '2.8-3.1' },
            { label: 'Moisture Content', value: '< 5%' },
            { label: 'Organic Content', value: 'Nil' }
        ],
        bricks: [
            { label: 'Compressive Strength', value: '7.5-9.5 MPa' },
            { label: 'Water Absorption', value: '< 20%' },
            { label: 'Size', value: '190 x 90 x 90mm' },
            { label: 'Density', value: '1800-1900 kg/m³' }
        ],
        cement: [
            { label: 'Type', value: 'Portland Cement' },
            { label: 'Grade', value: '43/53' },
            { label: 'Fineness', value: '> 225 m²/kg' },
            { label: 'Setting Time', value: '30-600 min' }
        ],
        steel: [
            { label: 'Type', value: 'TMT' },
            { label: 'Yield Strength', value: '500 MPa' },
            { label: 'Tensile Strength', value: '600 MPa' },
            { label: 'Elongation', value: '> 12%' }
        ]
    };
    
    const category = product.category;
    return specs[category] || [
        { label: 'Quality Grade', value: 'Premium' },
        { label: 'Certification', value: 'IS/BIS Approved' },
        { label: 'Shelf Life', value: '12 months' },
        { label: 'Warranty', value: '6 months' }
    ];
}

// Get sample reviews
function getProductReviews() {
    return [
        {
            author: 'Rajesh Kumar',
            rating: 5,
            date: '2 weeks ago',
            text: 'Excellent quality! Used this sand for my house construction. Very satisfied with the delivery and quality. Highly recommended!'
        },
        {
            author: 'Priya Singh',
            rating: 4.5,
            date: '1 month ago',
            text: 'Good product, fast delivery. Minor dust during delivery, but overall satisfied.'
        },
        {
            author: 'Amit Patel',
            rating: 5,
            date: '1.5 months ago',
            text: 'Best price in the market for this quality. Will order again for my next project.'
        },
        {
            author: 'Sharma Construction',
            rating: 4.8,
            date: '2 months ago',
            text: 'Bulk order handled professionally. Consistent quality throughout. Best supplier for our company.'
        }
    ];
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        document.getElementById('productDetailContainer').innerHTML = '<p>Product not found. <a href="products.html">Go back to products</a></p>';
        return;
    }
    
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) {
        document.getElementById('productDetailContainer').innerHTML = '<p>Product not found. <a href="products.html">Go back to products</a></p>';
        return;
    }
    
    displayProductDetail(product);
    displayRelatedProducts(product);
    updateAuthUI();
    setupEventListeners();
});

// Display product details
function displayProductDetail(product) {
    const specs = getProductSpecs(product);
    const reviews = getProductReviews();
    const emoji = getCategoryEmoji(product.category);
    
    const html = `
        <div class="product-image-section">
            <div class="product-main-image">
                ${emoji}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="thumbnail-gallery">
                <div class="thumbnail active">${emoji}</div>
                <div class="thumbnail">${emoji}</div>
                <div class="thumbnail">${emoji}</div>
                <div class="thumbnail">${emoji}</div>
            </div>
        </div>

        <div class="product-details-section">
            <h1 class="product-title">${product.name}</h1>
            
            <div class="product-rating-section">
                <div class="rating-stars">⭐ ${product.rating.toFixed(1)}</div>
                <div class="rating-count">${product.reviews} customer reviews</div>
            </div>

            <div class="price-section">
                <div class="price-label">Price per ${product.unit}</div>
                <div class="price-amount">₹${product.price.toLocaleString()}</div>
                <div class="price-unit">Unit: ${product.unit}</div>
            </div>

            <div class="availability-status ${product.availability === 'in_stock' ? 'in-stock' : 'low-stock'}">
                ${product.availability === 'in_stock' ? '✓ In Stock' : '⚠️ Low Stock - Order Soon'}
            </div>

            <div class="seller-section">
                <div class="seller-name">📌 Seller: ${product.seller.name}</div>
                <div class="seller-rating">⭐ ${product.seller.rating} seller rating</div>
            </div>

            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" min="1" value="1" max="100">
            </div>

            <div class="action-buttons">
                <button class="btn-add-cart" onclick="addToCart()">🛒 Add to Cart</button>
                <button class="btn-wishlist" onclick="addToWishlist()">❤️ Wishlist</button>
                <a href="#" class="btn-contact-seller" onclick="contactSeller(event)">💬 Contact Seller</a>
            </div>

            <div class="specs-section">
                <div class="specs-title">📋 Product Specifications</div>
                <div class="specs-list">
                    ${specs.map(spec => `
                        <div class="spec-item">
                            <div class="spec-label">${spec.label}</div>
                            <div class="spec-value">${spec.value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="description-section">
                <div class="description-title">📝 Product Description</div>
                <div class="description-text">${getProductDescription(product.id)}</div>
            </div>
        </div>
    `;
    
    document.getElementById('productDetailContainer').innerHTML = html;
    
    // Add reviews section
    const reviewsHTML = `
        <div class="reviews-section">
            <h2 class="reviews-title">⭐ Customer Reviews</h2>
            ${reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <div class="review-author">👤 ${review.author}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-rating">${'⭐'.repeat(Math.floor(review.rating))} ${review.rating}</div>
                    <div class="review-text">"${review.text}"</div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('productDetailContainer').innerHTML += reviewsHTML;
}

// Display related products
function displayRelatedProducts(product) {
    const related = sampleProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    
    const html = related.map(p => `
        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; transition: 0.3s;" 
             onclick="window.location.href='product-detail.html?id=${p.id}'">
            <div style="height: 150px; background: linear-gradient(135deg, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                ${getCategoryEmoji(p.category)}
            </div>
            <div style="padding: 1rem;">
                <div style="font-size: 0.8rem; color: #FF6B35; font-weight: 600; text-transform: uppercase; margin-bottom: 0.3rem;">${p.category}</div>
                <div style="font-size: 0.95rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">${p.name}</div>
                <div style="font-size: 0.85rem; color: #FFA500; margin-bottom: 0.5rem;">⭐ ${p.rating.toFixed(1)}</div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #FF6B35;">₹${p.price.toLocaleString()}</div>
                <div style="font-size: 0.8rem; color: #666;">per ${p.unit}</div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('relatedProducts').innerHTML = html;
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
    };
    return emojis[category] || '📦';
}

// Add to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = sampleProducts.find(p => p.id === productId);
    
    if (!isLoggedIn()) {
        showAlert('Please login to add items to cart', 'info');
        setTimeout(() => window.location.href = 'auth/login.html', 1500);
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showAlert(`✓ ${quantity} x ${product.name} added to cart!`, 'success');
}

// Add to wishlist
function addToWishlist() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = sampleProducts.find(p => p.id === productId);
    
    if (!isLoggedIn()) {
        showAlert('Please login to save items', 'info');
        setTimeout(() => window.location.href = 'auth/login.html', 1500);
        return;
    }
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showAlert(`❤️ Added to wishlist!`, 'success');
    } else {
        showAlert('Already in your wishlist', 'info');
    }
}

// Contact seller
function contactSeller(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = sampleProducts.find(p => p.id === productId);
    
    if (!isLoggedIn()) {
        showAlert('Please login to contact seller', 'info');
        setTimeout(() => window.location.href = 'auth/login.html', 1500);
        return;
    }
    
    showAlert(`Message sent to ${product.seller.name}! They will respond soon.`, 'success');
}

// Show alert
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

// Setup event listeners
function setupEventListeners() {
    document.getElementById('hamburger').addEventListener('click', toggleMenu);
    document.getElementById('userDropdown').addEventListener('click', toggleDropdown);
    document.getElementById('logoutBtn').addEventListener('click', logout);
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

// Toggle menu
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Toggle dropdown
function toggleDropdown(e) {
    e.preventDefault();
    const dropdown = e.target.nextElementSibling;
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}
