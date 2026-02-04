// API Functions

async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API Error');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth APIs
async function registerUser(userData) {
    return apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

async function loginUser(email, password) {
    return apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
}

async function getProfile() {
    return apiCall('/auth/profile', { method: 'GET' });
}

async function updateProfile(userData) {
    return apiCall('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

// Product APIs
async function getCategories() {
    return apiCall('/products/categories', { method: 'GET' });
}

async function getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/products?${query}`, { method: 'GET' });
}

async function getProduct(productId) {
    return apiCall(`/products/${productId}`, { method: 'GET' });
}

async function createProduct(productData) {
    return apiCall('/products', {
        method: 'POST',
        body: JSON.stringify(productData)
    });
}

async function updateProduct(productId, productData) {
    return apiCall(`/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
    });
}

async function deleteProduct(productId) {
    return apiCall(`/products/${productId}`, { method: 'DELETE' });
}

async function createProductReview(productId, reviewData) {
    return apiCall(`/products/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData)
    });
}

// Cart APIs
async function getCart() {
    return apiCall('/cart', { method: 'GET' });
}

async function addToCart(productId, quantity) {
    return apiCall('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, quantity })
    });
}

async function updateCartItem(cartItemId, quantity) {
    return apiCall(`/cart/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    });
}

async function removeFromCart(cartItemId) {
    return apiCall(`/cart/${cartItemId}`, { method: 'DELETE' });
}

async function clearCart() {
    return apiCall('/cart/clear', { method: 'POST' });
}

// Order APIs
async function createOrder(orderData) {
    return apiCall('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    });
}

async function getUserOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/orders?${query}`, { method: 'GET' });
}

async function getOrder(orderId) {
    return apiCall(`/orders/${orderId}`, { method: 'GET' });
}

async function updateOrderStatus(orderId, status) {
    return apiCall(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    });
}

async function cancelOrder(orderId) {
    return apiCall(`/orders/${orderId}/cancel`, { method: 'POST' });
}

// Payment APIs
async function createPaymentOrder(orderId) {
    return apiCall('/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ order_id: orderId })
    });
}

async function verifyPayment(paymentData) {
    return apiCall('/payments/verify', {
        method: 'POST',
        body: JSON.stringify(paymentData)
    });
}

// Professional APIs
async function getProfessionals(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/professionals?${query}`, { method: 'GET' });
}

async function getProfessional(professionalId) {
    return apiCall(`/professionals/${professionalId}`, { method: 'GET' });
}

async function createProfessionalProfile(profileData) {
    return apiCall('/professionals', {
        method: 'POST',
        body: JSON.stringify(profileData)
    });
}

async function updateProfessional(professionalId, profileData) {
    return apiCall(`/professionals/${professionalId}`, {
        method: 'PUT',
        body: JSON.stringify(profileData)
    });
}

async function createProfessionalReview(professionalId, reviewData) {
    return apiCall(`/professionals/${professionalId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData)
    });
}

// Admin APIs
async function getAdminStats() {
    return apiCall('/admin/dashboard/stats', { method: 'GET' });
}

async function approvePendingProducts() {
    return apiCall('/admin/products/pending', { method: 'GET' });
}

async function approveProduct(productId) {
    return apiCall(`/admin/products/approve/${productId}`, { method: 'PUT' });
}
