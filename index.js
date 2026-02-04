// Index Page Functions

async function loadCategories() {
    try {
        const data = await getCategories();
        const categoriesGrid = document.getElementById('categoriesGrid');
        
        if (categoriesGrid && data) {
            categoriesGrid.innerHTML = data.map(category => `
                <div class="category-card" onclick="goToProducts('${category.name}')">
                    <div class="category-icon">${getIconForCategory(category.name)}</div>
                    <h3>${category.name}</h3>
                    <p>${category.description || ''}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadLatestProducts() {
    try {
        const data = await getProducts({ per_page: 6 });
        const productsGrid = document.getElementById('productsGrid');
        
        if (productsGrid && data.products) {
            productsGrid.innerHTML = data.products.map(product => `
                <div class="product-card">
                    <div class="product-image">📦</div>
                    <div class="product-info">
                        <div class="product-category">${product.category.name}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-rating">⭐ ${product.rating.toFixed(1)} (${product.review_count})</div>
                        <div class="product-price">₹${product.price}/${product.unit}</div>
                        <div class="product-seller">By: ${product.seller.name}</div>
                        <div class="product-actions">
                            <a href="product-detail.html?id=${product.id}" class="btn btn-secondary" style="flex: 1; text-align: center;">View</a>
                            <button class="btn btn-primary" onclick="addToCartQuick(${product.id})" style="flex: 1;">Add</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function getIconForCategory(categoryName) {
    const icons = {
        'Sand': '🏗️',
        'Bricks': '🧱',
        'Cement': '📦',
        'Steel': '🏗️',
        'MEP': '⚙️',
        'Interior': '🎨',
        'Furniture': '🪑',
        'BIM Components': '📐'
    };
    return icons[categoryName] || '📦';
}

function goToProducts(categoryName) {
    window.location.href = `products.html?category=${encodeURIComponent(categoryName)}`;
}

async function addToCartQuick(productId) {
    if (!isLoggedIn()) {
        alert('Please login first');
        window.location.href = 'auth/login.html';
        return;
    }

    try {
        await addToCart(productId, 1);
        alert('Product added to cart!');
    } catch (error) {
        alert('Error adding to cart: ' + error.message);
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('categoriesGrid')) {
        loadCategories();
    }
    if (document.getElementById('productsGrid')) {
        loadLatestProducts();
    }
    if (document.getElementById('aboutSection')) {
        renderAboutSection();
    }
});

// Inject about section content
function renderAboutSection() {
    const el = document.getElementById('aboutSection');
    if (!el) return;
    el.innerHTML = `
        <p class="about-paragraph">YASINOVA was founded and developed by MD YASIN ALI, whose vision, technical leadership, and tireless work laid the foundation for this platform. As the founder and principal developer, MD Yasin Ali led the architecture, design, and implementation of the marketplace to connect trusted suppliers, builders, and professionals. Muzammil Raza has been instrumental throughout the project—contributing significant technical effort, guidance, and partnership that helped shape key features and strategic decisions. We also acknowledge Devendar, whose ideas and early suggestions provided valuable direction during the platform's formative stages. Together, their combined expertise, dedication, and collaboration made YASINOVA possible, enabling us to build a reliable, accessible marketplace focused on improving access to construction materials and professional services for projects big and small.</p>
    `;
}
