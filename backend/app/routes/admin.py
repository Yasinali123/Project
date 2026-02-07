from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.product import Product, ProductCategory

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/products/approve/<int:product_id>', methods=['PUT'])
@jwt_required()
def approve_product(product_id):
    """Approve product (Admin only)"""
    try:
        product = Product.query.get(product_id)
        
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        
        product.approved = True
        db.session.commit()
        
        return jsonify({
            'message': 'Product approved',
            'product': product.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@admin_bp.route('/products/pending', methods=['GET'])
@jwt_required()
def get_pending_products():
    """Get pending product approvals (Admin only)"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        paginated = Product.query.filter_by(approved=False).paginate(page=page, per_page=per_page)
        
        return jsonify({
            'products': [product.to_dict() for product in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@admin_bp.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    """Create product category (Admin only)"""
    try:
        data = request.get_json()
        
        if not data.get('name'):
            return jsonify({'message': 'Category name is required'}), 400
        
        category = ProductCategory(
            name=data['name'],
            description=data.get('description'),
            icon=data.get('icon')
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify({
            'message': 'Category created',
            'category': category.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@admin_bp.route('/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    """Get admin dashboard statistics"""
    try:
        from app.models.user import User
        from app.models.order import Order
        from app.models.professional import Professional
        
        total_users = User.query.count()
        total_sellers = User.query.filter_by(role='seller').count()
        total_professionals = Professional.query.count()
        total_orders = Order.query.count()
        total_revenue = db.session.query(db.func.sum(Order.total_amount)).scalar() or 0
        
        return jsonify({
            'total_users': total_users,
            'total_sellers': total_sellers,
            'total_professionals': total_professionals,
            'total_orders': total_orders,
            'total_revenue': total_revenue
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
