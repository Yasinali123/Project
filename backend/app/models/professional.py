from app import db
from datetime import datetime

class Professional(db.Model):
    """Professional model for engineers, architects, interior designers"""
    __tablename__ = 'professionals'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    professional_type = db.Column(db.String(50), nullable=False)  # Builder, Engineer, Architect, InteriorDesigner
    license_number = db.Column(db.String(100))
    license_expiry = db.Column(db.DateTime)
    experience_years = db.Column(db.Integer)
    specialization = db.Column(db.JSON)  # List of specializations
    portfolio_url = db.Column(db.String(255))
    rating = db.Column(db.Float, default=0.0)
    review_count = db.Column(db.Integer, default=0)
    verified = db.Column(db.Boolean, default=False)
    available_for_consultation = db.Column(db.Boolean, default=True)
    consultation_fee = db.Column(db.Float)  # Per hour or project
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    services = db.relationship('ProfessionalService', backref='professional', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user': {
                'id': self.user.id,
                'name': self.user.full_name,
                'email': self.user.email,
                'phone': self.user.phone,
                'city': self.user.city,
                'profile_image': self.user.profile_image
            },
            'professional_type': self.professional_type,
            'license_number': self.license_number,
            'experience_years': self.experience_years,
            'specialization': self.specialization,
            'rating': self.rating,
            'review_count': self.review_count,
            'verified': self.verified,
            'consultation_fee': self.consultation_fee
        }

class ProfessionalService(db.Model):
    """Service offered by professional"""
    __tablename__ = 'professional_services'
    
    id = db.Column(db.Integer, primary_key=True)
    professional_id = db.Column(db.Integer, db.ForeignKey('professionals.id'), nullable=False)
    service_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    service_type = db.Column(db.String(50))  # consultation, design, site_visit, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'service_name': self.service_name,
            'description': self.description,
            'service_type': self.service_type
        }
