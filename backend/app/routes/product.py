from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.product import Product, ProductCategory, ProductImage
from app.models.review import Review
from app.utils.decorators import token_required, role_required

product_bp = Blueprint('product', __name__, url_prefix='/api/products')

@product_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    try:
        categories = ProductCategory.query.all()
        return jsonify([cat.to_dict() for cat in categories]), 200
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@product_bp.route('', methods=['GET'])
def get_products():
    """Get products with filtering and pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        category_id = request.args.get('category_id', type=int)
        search = request.args.get('search', '')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        
        query = Product.query.filter_by(approved=True)
        
        if category_id:
            query = query.filter_by(category_id=category_id)
        
        if search:
            query = query.filter(Product.name.ilike(f'%{search}%'))
        
        if min_price:
            query = query.filter(Product.price >= min_price)
        
        if max_price:
            query = query.filter(Product.price <= max_price)
        
        paginated = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'products': [product.to_dict() for product in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get product details"""
    try:
        product = Product.query.get(product_id)
        
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        reviews = Review.query.filter_by(product_id=product_id).all()
        
        product_data = product.to_dict()
        product_data['reviews'] = [review.to_dict() for review in reviews]
        
        return jsonify(product_data), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@product_bp.route('', methods=['POST'])
@jwt_required()
def create_product():
    """Create new product (Seller only)"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('name') or not data.get('category_id') or not data.get('price'):
            return jsonify({'message': 'Missing required fields'}), 400
        
        product = Product(
            name=data['name'],
            description=data.get('description'),
            category_id=data['category_id'],
            seller_id=user_id,
            price=data['price'],
            unit=data.get('unit', 'piece'),
            quantity_available=data.get('quantity_available', 0),
            specifications=data.get('specifications'),
            delivery_available=data.get('delivery_available', True),
            approved=False  # Admin approval needed
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'Product created successfully',
            'product': product.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    """Update product (Seller only)"""
    try:
        user_id = get_jwt_identity()
        product = Product.query.get(product_id)
        
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        if product.seller_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.quantity_available = data.get('quantity_available', product.quantity_available)
        product.delivery_available = data.get('delivery_available', product.delivery_available)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Product updated successfully',
            'product': product.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    """Delete product (Seller only)"""
    try:
        user_id = get_jwt_identity()
        product = Product.query.get(product_id)
        
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        if product.seller_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@product_bp.route('/<int:product_id>/reviews', methods=['POST'])
@jwt_required()
def create_review(product_id):
    """Create product review"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        if not data.get('rating'):
            return jsonify({'message': 'Rating is required'}), 400
        
        review = Review(
            user_id=user_id,
            product_id=product_id,
            rating=data.get('rating'),
            title=data.get('title'),
            comment=data.get('comment')
        )
        
        db.session.add(review)
        
        # Update product rating
        all_reviews = Review.query.filter_by(product_id=product_id).all()
        avg_rating = sum(r.rating for r in all_reviews) / len(all_reviews) if all_reviews else 0
        product.rating = avg_rating
        product.review_count = len(all_reviews)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Review created successfully',
            'review': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
