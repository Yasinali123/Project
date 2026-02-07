from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.order import Order
from app.models.payment import Payment
from app.utils.payment import create_razorpay_order, verify_razorpay_payment

payment_bp = Blueprint('payment', __name__, url_prefix='/api/payments')

@payment_bp.route('/create-order', methods=['POST'])
@jwt_required()
def create_payment_order():
    """Create Razorpay payment order"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        order_id = data.get('order_id')
        order = Order.query.get(order_id)
        
        if not order:
            return jsonify({'message': 'Order not found'}), 404
        
        if order.buyer_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Create Razorpay order
        razorpay_order = create_razorpay_order(order.total_amount, order_id)
        
        if not razorpay_order:
            return jsonify({'message': 'Payment order creation failed'}), 500
        
        # Save payment record
        payment = Payment(
            order_id=order_id,
            razorpay_order_id=razorpay_order['id'],
            amount=order.total_amount,
            payment_method=order.payment_method,
            status='pending'
        )
        
        db.session.add(payment)
        db.session.commit()
        
        return jsonify({
            'razorpay_order_id': razorpay_order['id'],
            'amount': razorpay_order['amount'],
            'currency': razorpay_order['currency']
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@payment_bp.route('/verify', methods=['POST'])
@jwt_required()
def verify_payment():
    """Verify Razorpay payment"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        payment_id = data.get('razorpay_payment_id')
        order_id = data.get('razorpay_order_id')
        signature = data.get('razorpay_signature')
        
        if not all([payment_id, order_id, signature]):
            return jsonify({'message': 'Missing payment details'}), 400
        
        # Verify with Razorpay
        is_valid = verify_razorpay_payment(payment_id, order_id, signature)
        
        if not is_valid:
            return jsonify({'message': 'Payment verification failed'}), 400
        
        # Update payment record
        payment = Payment.query.filter_by(razorpay_order_id=order_id).first()
        if payment:
            payment.razorpay_payment_id = payment_id
            payment.status = 'success'
            
            # Update order status
            order = payment.order
            order.status = 'confirmed'
            
            db.session.commit()
        
        return jsonify({
            'message': 'Payment verified successfully',
            'payment': payment.to_dict() if payment else None
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@payment_bp.route('/<int:payment_id>', methods=['GET'])
@jwt_required()
def get_payment(payment_id):
    """Get payment details"""
    try:
        payment = Payment.query.get(payment_id)
        
        if not payment:
            return jsonify({'message': 'Payment not found'}), 404
        
        return jsonify(payment.to_dict()), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
