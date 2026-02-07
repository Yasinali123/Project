# Razorpay payment integration
import razorpay
import os

def get_razorpay_client():
    """Get Razorpay client instance"""
    client = razorpay.Client(
        auth=(os.getenv('RAZORPAY_KEY_ID'), os.getenv('RAZORPAY_KEY_SECRET'))
    )
    return client

def create_razorpay_order(amount, order_id):
    """Create Razorpay order"""
    try:
        client = get_razorpay_client()
        razorpay_order = client.order.create({
            'amount': int(amount * 100),  # Amount in paise
            'currency': 'INR',
            'receipt': str(order_id),
            'payment_capture': 1
        })
        return razorpay_order
    except Exception as e:
        return None

def verify_razorpay_payment(payment_id, order_id, signature):
    """Verify Razorpay payment"""
    try:
        client = get_razorpay_client()
        return client.utility.verify_payment_signature({
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        })
    except Exception as e:
        return False
