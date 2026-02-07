from app.routes.auth import auth_bp
from app.routes.product import product_bp
from app.routes.order import order_bp
from app.routes.payment import payment_bp
from app.routes.professional import professional_bp
from app.routes.admin import admin_bp
from app.routes.cart import cart_bp

__all__ = [
    'auth_bp',
    'product_bp',
    'order_bp',
    'payment_bp',
    'professional_bp',
    'admin_bp',
    'cart_bp'
]
