from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.professional import Professional, ProfessionalService
from app.models.user import User
from app.models.review import Review

professional_bp = Blueprint('professional', __name__, url_prefix='/api/professionals')

@professional_bp.route('', methods=['GET'])
def get_professionals():
    """Get professionals with filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        professional_type = request.args.get('type')
        city = request.args.get('city')
        
        query = Professional.query.filter_by(verified=True)
        
        if professional_type:
            query = query.filter_by(professional_type=professional_type)
        
        if city:
            query = query.join(User).filter(User.city.ilike(f'%{city}%'))
        
        paginated = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'professionals': [prof.to_dict() for prof in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@professional_bp.route('/<int:professional_id>', methods=['GET'])
def get_professional(professional_id):
    """Get professional details"""
    try:
        professional = Professional.query.get(professional_id)
        
        if not professional:
            return jsonify({'message': 'Professional not found'}), 404
        
        reviews = Review.query.filter_by(professional_id=professional_id).all()
        
        prof_data = professional.to_dict()
        prof_data['services'] = [service.to_dict() for service in professional.services]
        prof_data['reviews'] = [review.to_dict() for review in reviews]
        
        return jsonify(prof_data), 200
        
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

@professional_bp.route('', methods=['POST'])
@jwt_required()
def create_professional_profile():
    """Create professional profile"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if Professional.query.filter_by(user_id=user_id).first():
            return jsonify({'message': 'Professional profile already exists'}), 400
        
        professional = Professional(
            user_id=user_id,
            professional_type=data.get('professional_type'),
            license_number=data.get('license_number'),
            experience_years=data.get('experience_years'),
            specialization=data.get('specialization'),
            consultation_fee=data.get('consultation_fee')
        )
        
        db.session.add(professional)
        db.session.commit()
        
        return jsonify({
            'message': 'Professional profile created',
            'professional': professional.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@professional_bp.route('/<int:professional_id>', methods=['PUT'])
@jwt_required()
def update_professional(professional_id):
    """Update professional profile"""
    try:
        user_id = get_jwt_identity()
        professional = Professional.query.get(professional_id)
        
        if not professional:
            return jsonify({'message': 'Professional not found'}), 404
        
        if professional.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        professional.experience_years = data.get('experience_years', professional.experience_years)
        professional.specialization = data.get('specialization', professional.specialization)
        professional.consultation_fee = data.get('consultation_fee', professional.consultation_fee)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Professional updated',
            'professional': professional.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@professional_bp.route('/<int:professional_id>/services', methods=['POST'])
@jwt_required()
def add_service(professional_id):
    """Add service to professional"""
    try:
        user_id = get_jwt_identity()
        professional = Professional.query.get(professional_id)
        
        if not professional:
            return jsonify({'message': 'Professional not found'}), 404
        
        if professional.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        service = ProfessionalService(
            professional_id=professional_id,
            service_name=data.get('service_name'),
            description=data.get('description'),
            service_type=data.get('service_type')
        )
        
        db.session.add(service)
        db.session.commit()
        
        return jsonify({
            'message': 'Service added',
            'service': service.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500

@professional_bp.route('/<int:professional_id>/reviews', methods=['POST'])
@jwt_required()
def add_review(professional_id):
    """Add review to professional"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        professional = Professional.query.get(professional_id)
        if not professional:
            return jsonify({'message': 'Professional not found'}), 404
        
        if not data.get('rating'):
            return jsonify({'message': 'Rating is required'}), 400
        
        review = Review(
            user_id=user_id,
            professional_id=professional_id,
            rating=data.get('rating'),
            title=data.get('title'),
            comment=data.get('comment')
        )
        
        db.session.add(review)
        
        # Update professional rating
        all_reviews = Review.query.filter_by(professional_id=professional_id).all()
        avg_rating = sum(r.rating for r in all_reviews) / len(all_reviews) if all_reviews else 0
        professional.rating = avg_rating
        professional.review_count = len(all_reviews)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Review added',
            'review': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
