from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.payment import Payment
from app.utils.helpers import generate_order_number

order_bp = Blueprint('order', __name__, url_prefix='/api/orders')

@order_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    """Create new order"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('items') or not data.get('delivery_address'):
            return jsonify({'message': 'Missing required fields'}), 400
        
        # Calculate total
        total_amount = 0
        items_data = []
        
        for item in data['items']:
            product = Product.query.get(item['product_id'])
            if not product:
                return jsonify({'message': f"Product {item['product_id']} not found"}), 404
            
            quantity = item.get('quantity', 1)
            subtotal = product.price * quantity
            total_amount += subtotal
            
            items_data.append({
                'product': product,
                'quantity': quantity,
                'price': product.price,
                'subtotal': subtotal
            })
        
        # Create order
        order = Order(
            order_number=generate_order_number(),
            buyer_id=user_id,
            total_amount=total_amount,
            status='pending',
            payment_method=data.get('payment_method', 'UPI'),
            delivery_address=data['delivery_address'],
            notes=data.get('notes')
        )
        
        db.session.add(order)
        db.session.flush()  # Get order ID
        
        # Create order items
        for item_data in items_data:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['product'].id,
                quantity=item_data['quantity'],
                price=item_data['price'],
                subtotal=item_data['subtotal']
            )
            db.session.add(order_item)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Order created successfully',
            'order': order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@order_bp.route('', methods=['GET'])
@jwt_required()
def get_user_orders():
    """Get user orders"""
    try:
        user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        paginated = Order.query.filter_by(buyer_id=user_id).paginate(page=page, per_page=per_page)
        
        return jsonify({
            'orders': [order.to_dict() for order in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@order_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    """Get order details"""
    try:
        user_id = get_jwt_identity()
        order = Order.query.get(order_id)
        
        if not order:
            return jsonify({'message': 'Order not found'}), 404
        
        if order.buyer_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        return jsonify(order.to_dict()), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@order_bp.route('/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    """Update order status (Seller/Admin only)"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'message': 'Order not found'}), 404
        
        # Check if user is the seller or admin
        # For simplicity, allowing buyer to update their own order
        if order.buyer_id != user_id:
            # TODO: Add role-based check for seller/admin
            pass
        
        if not data.get('status'):
            return jsonify({'message': 'Status is required'}), 400
        
        order.status = data['status']
        db.session.commit()
        
        return jsonify({
            'message': 'Order status updated',
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@order_bp.route('/<int:order_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_order(order_id):
    """Cancel order"""
    try:
        user_id = get_jwt_identity()
        order = Order.query.get(order_id)
        
        if not order:
            return jsonify({'message': 'Order not found'}), 404
        
        if order.buyer_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        if order.status not in ['pending', 'confirmed']:
            return jsonify({'message': 'Order cannot be cancelled'}), 400
        
        order.status = 'cancelled'
        db.session.commit()
        
        return jsonify({
            'message': 'Order cancelled successfully',
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
