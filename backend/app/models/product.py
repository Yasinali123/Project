from app import db
from datetime import datetime

class ProductCategory(db.Model):
    """Product category model"""
    __tablename__ = 'product_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    products = db.relationship('Product', backref='category', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon
        }

class Product(db.Model):
    """Product model"""
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey('product_categories.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(50), nullable=False)  # kg, bag, ton, piece, etc.
    quantity_available = db.Column(db.Integer, nullable=False, default=0)
    specifications = db.Column(db.JSON)  # For product-specific specs
    delivery_available = db.Column(db.Boolean, default=True)
    rating = db.Column(db.Float, default=0.0)
    review_count = db.Column(db.Integer, default=0)
    approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    images = db.relationship('ProductImage', backref='product', lazy=True, cascade='all, delete-orphan')
    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    cart_items = db.relationship('CartItem', backref='product', lazy=True)
    reviews = db.relationship('Review', backref='product', lazy=True)
    
    def to_dict(self, include_seller=True):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category.to_dict() if self.category else None,
            'price': self.price,
            'unit': self.unit,
            'quantity_available': self.quantity_available,
            'specifications': self.specifications,
            'delivery_available': self.delivery_available,
            'rating': self.rating,
            'review_count': self.review_count,
            'images': [img.to_dict() for img in self.images],
            'created_at': self.created_at.isoformat()
        }
        if include_seller:
            data['seller'] = {
                'id': self.seller.id,
                'name': self.seller.full_name or self.seller.company_name,
                'verified': self.seller.verified
            }
        return data

class ProductImage(db.Model):
    """Product image model"""
    __tablename__ = 'product_images'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    alt_text = db.Column(db.String(255))
    is_primary = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'alt_text': self.alt_text,
            'is_primary': self.is_primary
        }
