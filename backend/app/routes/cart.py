from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.cart import CartItem
from app.models.product import Product

cart_bp = Blueprint('cart', __name__, url_prefix='/api/cart')

@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    """Get user shopping cart"""
    try:
        user_id = get_jwt_identity()
        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        
        total_price = 0
        items_data = []
        
        for item in cart_items:
            item_data = item.to_dict()
            items_data.append(item_data)
            total_price += item_data.get('subtotal', 0)
        
        return jsonify({
            'items': items_data,
            'total_price': total_price,
            'item_count': len(cart_items)
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@cart_bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    """Add product to cart"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        if not product_id or quantity <= 0:
            return jsonify({'message': 'Invalid product or quantity'}), 400
        
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        # Check if item already in cart
        existing_item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
        
        if existing_item:
            existing_item.quantity += quantity
            db.session.commit()
            return jsonify({
                'message': 'Cart updated',
                'cart_item': existing_item.to_dict()
            }), 200
        
        cart_item = CartItem(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )
        
        db.session.add(cart_item)
        db.session.commit()
        
        return jsonify({
            'message': 'Product added to cart',
            'cart_item': cart_item.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@cart_bp.route('/<int:cart_item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(cart_item_id):
    """Update cart item quantity"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        cart_item = CartItem.query.get(cart_item_id)
        
        if not cart_item:
            return jsonify({'message': 'Cart item not found'}), 404
        
        if cart_item.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        quantity = data.get('quantity')
        if quantity and quantity > 0:
            cart_item.quantity = quantity
            db.session.commit()
        
        return jsonify({
            'message': 'Cart item updated',
            'cart_item': cart_item.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@cart_bp.route('/<int:cart_item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(cart_item_id):
    """Remove item from cart"""
    try:
        user_id = get_jwt_identity()
        cart_item = CartItem.query.get(cart_item_id)
        
        if not cart_item:
            return jsonify({'message': 'Cart item not found'}), 404
        
        if cart_item.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        db.session.delete(cart_item)
        db.session.commit()
        
        return jsonify({'message': 'Item removed from cart'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@cart_bp.route('/clear', methods=['POST'])
@jwt_required()
def clear_cart():
    """Clear entire cart"""
    try:
        user_id = get_jwt_identity()
        
        CartItem.query.filter_by(user_id=user_id).delete()
        db.session.commit()
        
        return jsonify({'message': 'Cart cleared'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
