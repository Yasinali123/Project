# YASINOVA - Building Materials Marketplace Platform

## Overview

YASINOVA is a comprehensive web-based marketplace platform that connects builders, vendors, and professionals (engineers, interior designers, architects) to enable legal, transparent, and efficient sourcing of construction materials and services.

## 🎯 Key Features

### 1. **Authentication & Role Management**
- User registration/login with role-based access (Buyer, Seller, Professional, Admin)
- JWT-based authentication
- Secure password handling
- User profile management

### 2. **Marketplace**
- **Product Catalog**
  - Categories: Sand, Bricks, Cement, Steel, MEP, Interior Items, Furniture, BIM Components
  - Advanced filtering by category, price, availability
  - Product search functionality
  - Detailed product information with specifications

- **Product Management** (Sellers)
  - Add/Edit/Delete products
  - Upload product images
  - Manage inventory
  - Track product performance

### 3. **Shopping & Orders**
- Shopping cart management
- Order placement with delivery address
- Multiple payment options (UPI, Card, COD)
- Order tracking and status updates
- Order history and invoices

### 4. **Professional Network**
- Find verified professionals (Builders, Engineers, Architects, Interior Designers)
- Professional profiles with:
  - Experience and specializations
  - Licensing information
  - Portfolio/reviews
  - Consultation fees
  - Location-based search

- **In-app Communication**
  - Direct contact with professionals
  - Reviews and ratings
  - Service booking

### 5. **Payment Integration**
- Razorpay integration for secure transactions
- Support for UPI, Cards, and Cash on Delivery
- Payment verification and order confirmation
- Refund and dispute handling

### 6. **Admin Panel**
- Vendor and professional verification
- Product approval workflow
- Commission and subscription management
- Platform analytics and insights
- Compliance monitoring

### 7. **Security & Compliance**
- Legal sourcing tracking (especially for sand)
- Transaction transparency
- Vendor verification system
- User dispute resolution

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: SQLite/PostgreSQL
- **Authentication**: JWT (Flask-JWT-Extended)
- **Payment Gateway**: Razorpay API
- **ORM**: SQLAlchemy

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive design
- **JavaScript (ES6+)** - Interactive features
- **Fetch API** - Async requests

### Additional Libraries
- Flask-CORS - Cross-origin requests
- Flask-SQLAlchemy - ORM
- python-dotenv - Environment variables

## 📁 Project Structure

```
yasinova/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── models/              # Database models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── order.py
│   │   │   ├── professional.py
│   │   │   ├── cart.py
│   │   │   ├── payment.py
│   │   │   └── review.py
│   │   ├── routes/              # API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── product.py
│   │   │   ├── order.py
│   │   │   ├── cart.py
│   │   │   ├── payment.py
│   │   │   ├── professional.py
│   │   │   └── admin.py
│   │   └── utils/               # Helper functions
│   │       ├── decorators.py
│   │       ├── helpers.py
│   │       └── payment.py
│   ├── app.py                   # Entry point
│   ├── config.py                # Configuration
│   ├── requirements.txt          # Dependencies
│   ├── .env                      # Environment variables
│   └── migrations/              # Database migrations
│
└── frontend/
    ├── index.html               # Home page
    ├── products.html            # Product listing
    ├── cart.html                # Shopping cart
    ├── checkout.html            # Checkout page
    ├── orders.html              # Order history
    ├── professionals.html       # Professional directory
    ├── auth/
    │   ├── login.html
    │   └── signup.html
    ├── css/
    │   ├── styles.css           # Main styles
    │   └── responsive.css       # Responsive design
    ├── js/
    │   ├── config.js            # Configuration
    │   ├── api.js               # API functions
    │   ├── auth.js              # Auth functions
    │   └── index.js             # Page-specific scripts
    └── images/                  # Image assets
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Modern web browser
- Text editor/IDE

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Edit `.env` file with your configuration:
   ```env
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key
   DATABASE_URL=sqlite:///yasinova.db
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

5. **Initialize database**
   ```bash
   python app.py
   ```

6. **Run Flask server**
   ```bash
   python app.py
   ```
   Server will start at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Start a local server** (required for CORS)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js (if installed)
   npx http-server
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register           - Register new user
POST   /api/auth/login              - User login
GET    /api/auth/profile            - Get user profile
PUT    /api/auth/profile            - Update user profile
POST   /api/auth/logout             - User logout
```

### Product Endpoints

```
GET    /api/products/categories     - Get all categories
GET    /api/products                - Get products (with filters)
GET    /api/products/<id>           - Get product details
POST   /api/products                - Create product (Seller)
PUT    /api/products/<id>           - Update product (Seller)
DELETE /api/products/<id>           - Delete product (Seller)
POST   /api/products/<id>/reviews   - Add product review
```

### Cart Endpoints

```
GET    /api/cart                    - Get user cart
POST   /api/cart/add                - Add to cart
PUT    /api/cart/<id>               - Update cart item
DELETE /api/cart/<id>               - Remove from cart
POST   /api/cart/clear              - Clear cart
```

### Order Endpoints

```
POST   /api/orders                  - Create order
GET    /api/orders                  - Get user orders
GET    /api/orders/<id>             - Get order details
PUT    /api/orders/<id>/status      - Update order status
POST   /api/orders/<id>/cancel      - Cancel order
```

### Payment Endpoints

```
POST   /api/payments/create-order   - Create Razorpay order
POST   /api/payments/verify         - Verify payment
GET    /api/payments/<id>           - Get payment details
```

### Professional Endpoints

```
GET    /api/professionals           - Get professionals (with filters)
GET    /api/professionals/<id>      - Get professional details
POST   /api/professionals           - Create professional profile
PUT    /api/professionals/<id>      - Update professional profile
POST   /api/professionals/<id>/services - Add service
POST   /api/professionals/<id>/reviews - Add review
```

### Admin Endpoints

```
GET    /api/admin/dashboard/stats   - Get dashboard stats
GET    /api/admin/products/pending  - Get pending approvals
PUT    /api/admin/products/approve/<id> - Approve product
POST   /api/admin/categories        - Create category
```

## 🔐 User Roles & Permissions

### Buyer
- Browse and search products
- Add items to cart
- Place orders
- Track orders
- Find and contact professionals
- Leave reviews

### Seller
- Create and manage products
- Upload product images
- Track inventory
- View orders
- Manage pricing
- Analytics dashboard

### Professional
- Create professional profile
- Add services
- Manage consultation requests
- Get verified
- View ratings and reviews

### Admin
- Approve/reject products
- Verify vendors and professionals
- Manage categories
- Monitor compliance
- View platform analytics
- Handle disputes

## 🔗 Database Schema

### Users Table
```sql
- id (PK)
- username (unique)
- email (unique)
- password_hash
- phone
- role (buyer, seller, professional, admin)
- full_name
- company_name
- address
- city, state, pincode
- verified
- created_at, updated_at
```

### Products Table
```sql
- id (PK)
- name
- description
- category_id (FK)
- seller_id (FK)
- price
- unit
- quantity_available
- specifications (JSON)
- rating
- review_count
- approved
- created_at, updated_at
```

### Orders Table
```sql
- id (PK)
- order_number (unique)
- buyer_id (FK)
- total_amount
- status (pending, confirmed, shipped, delivered, cancelled)
- payment_method
- delivery_address
- created_at, updated_at
```

### And more... (see models/ directory)

## 🧪 Testing

### Manual Testing Scenarios

1. **User Registration & Login**
   - Create account as Buyer
   - Create account as Seller
   - Login with different roles

2. **Product Management**
   - Add product as seller
   - Search and filter products
   - View product details

3. **Shopping Flow**
   - Add products to cart
   - Update quantities
   - Proceed to checkout

4. **Payment**
   - Test order creation
   - Verify payment integration (Razorpay)

5. **Professional Search**
   - Search professionals by type
   - Filter by location
   - View profiles

## 🚢 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
heroku login
heroku create yasinova-backend
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
# Deploy frontend
netlify deploy --prod frontend/
```

## 🔄 Future Enhancements

1. **BIM Integration**
   - Upload IFC/Revit files
   - Auto-calculate material quantities
   - Material list generation

2. **Advanced Features**
   - Real-time messaging
   - Video consultations
   - Project collaboration tools

3. **Analytics**
   - Seller analytics dashboard
   - Market insights
   - Trend analysis

4. **Mobile App**
   - Native iOS app
   - Native Android app
   - Push notifications

5. **Payments**
   - Wallet system
   - Subscription plans
   - Commission system

## 📞 Support

For issues and support:
- Email: support@yasinova.com
- GitHub Issues: [Repository URL]
- Documentation: [Wiki URL]

## 📄 License

MIT License - see LICENSE file

## ✨ Contributors

- Development Team
- QA Team
- Design Team

---

**Last Updated**: January 30, 2026
**Version**: 1.0.0
