# Professionals Section - Backend Integration Guide

## Current Implementation

The professionals section currently uses **sample data** for demonstration and testing. To connect it to the actual backend API, follow the integration steps below.

## Backend API Endpoints Required

### 1. Get All Professionals
**Endpoint**: `GET /api/professionals`

**Query Parameters**:
```
- page: int (default: 1)
- per_page: int (default: 12)
- type: string (builder, engineer, architect, interior_designer, mep_specialist, surveyor)
- city: string
- search: string (search by name or specialty)
- min_rating: float
- min_experience: int
- verified: boolean
- sort_by: string (rating, experience, newest, fee_low)
```

**Response**:
```json
{
  "professionals": [
    {
      "id": 1,
      "user": {
        "id": 1,
        "name": "Rajesh Kumar",
        "email": "rajesh@example.com",
        "phone": "+91-9876543210",
        "city": "Delhi"
      },
      "professional_type": "builder",
      "experience_years": 15,
      "rating": 4.8,
      "review_count": 145,
      "consultation_fee": 500,
      "verified": true,
      "bio": "Experienced builder...",
      "specialties": ["Commercial", "Residential"],
      "portfolio_count": 28
    }
  ],
  "total": 150,
  "pages": 13,
  "current_page": 1,
  "per_page": 12
}
```

### 2. Get Single Professional
**Endpoint**: `GET /api/professionals/{id}`

**Response**:
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "+91-9876543210",
    "city": "Delhi"
  },
  "professional_type": "builder",
  "experience_years": 15,
  "rating": 4.8,
  "review_count": 145,
  "consultation_fee": 500,
  "verified": true,
  "bio": "Experienced builder...",
  "specialties": ["Commercial", "Residential", "Renovation"],
  "portfolio_count": 28,
  "portfolio": [
    {
      "id": 1,
      "title": "Office Complex",
      "description": "Modern office complex in downtown area",
      "image_url": "https://...",
      "date": "2023-12-15"
    }
  ],
  "reviews": [
    {
      "id": 1,
      "reviewer_name": "Amit Sharma",
      "rating": 5,
      "text": "Excellent work!",
      "date": "2024-01-15"
    }
  ]
}
```

### 3. Send Message to Professional
**Endpoint**: `POST /api/professionals/{id}/messages`

**Request Body**:
```json
{
  "subject": "Project Discussion",
  "message": "I'm interested in discussing a project...",
  "project_details": "Optional project description"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "message_id": 123
}
```

### 4. Request Call with Professional
**Endpoint**: `POST /api/professionals/{id}/call-request`

**Request Body**:
```json
{
  "preferred_time": "2024-02-01 14:00",
  "description": "Want to discuss project",
  "phone": "+91-9876543210"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Call request sent",
  "request_id": 456
}
```

### 5. Book Consultation
**Endpoint**: `POST /api/professionals/{id}/consultations`

**Request Body**:
```json
{
  "date": "2024-02-05",
  "time": "14:00",
  "duration_minutes": 30,
  "project_description": "Residential construction project"
}
```

**Response**:
```json
{
  "success": true,
  "consultation": {
    "id": 789,
    "professional_id": 1,
    "scheduled_at": "2024-02-05T14:00:00",
    "fee": 500,
    "payment_status": "pending",
    "meeting_link": "https://..."
  }
}
```

### 6. Get Professional Reviews
**Endpoint**: `GET /api/professionals/{id}/reviews`

**Query Parameters**:
```
- page: int
- per_page: int (default: 10)
- sort_by: string (recent, rating)
```

**Response**:
```json
{
  "reviews": [
    {
      "id": 1,
      "reviewer": {
        "id": 1,
        "name": "Amit Sharma"
      },
      "rating": 5,
      "title": "Excellent Work",
      "text": "Very professional and timely...",
      "date": "2024-01-15"
    }
  ],
  "total": 145,
  "pages": 15,
  "current_page": 1
}
```

## Integration Steps

### Step 1: Update API Functions
In `frontend/js/api.js`, add these functions:

```javascript
// Get all professionals with filters
async function getProfessionals(params = {}) {
    return apiCall('/professionals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// Get single professional
async function getProfessional(professionalId) {
    return apiCall(`/professionals/${professionalId}`, {
        method: 'GET'
    });
}

// Send message to professional
async function sendMessageToProfessional(professionalId, message) {
    return apiCall(`/professionals/${professionalId}/messages`, {
        method: 'POST',
        body: JSON.stringify(message)
    });
}

// Request call with professional
async function requestCallWithProfessional(professionalId, callData) {
    return apiCall(`/professionals/${professionalId}/call-request`, {
        method: 'POST',
        body: JSON.stringify(callData)
    });
}

// Book consultation
async function bookConsultation(professionalId, bookingData) {
    return apiCall(`/professionals/${professionalId}/consultations`, {
        method: 'POST',
        body: JSON.stringify(bookingData)
    });
}

// Get professional reviews
async function getProfessionalReviews(professionalId, params = {}) {
    return apiCall(`/professionals/${professionalId}/reviews`, {
        method: 'GET'
    });
}
```

### Step 2: Update professionals.js
Replace the sample data loading with API calls:

```javascript
// Replace in loadProfessionals function
async function loadProfessionals(page = 1) {
    try {
        document.getElementById('loadingMessage').style.display = 'block';
        
        // Build query parameters
        const params = {
            page: page,
            per_page: itemsPerPage,
            type: document.getElementById('typeFilter').value || undefined,
            city: document.getElementById('cityFilter').value || undefined,
            search: document.getElementById('searchInput').value || undefined,
            sort_by: document.getElementById('sortBy').value || 'rating'
        };

        // Remove undefined values
        Object.keys(params).forEach(key => {
            if (params[key] === undefined || params[key] === '') {
                delete params[key];
            }
        });

        // Call API instead of using sample data
        const data = await getProfessionals(params);

        // Rest of the function remains the same...
        // The API response will have the same structure as sampleProfessionals
    } catch (error) {
        console.error('Error loading professionals:', error);
        // Handle error appropriately
    }
}
```

### Step 3: Update professional-detail.js
Replace sample data with API calls:

```javascript
async function loadProfessionalDetails(professionalId) {
    try {
        // Call API to get professional details
        const professional = await getProfessional(professionalId);
        
        // Get reviews
        const reviewsData = await getProfessionalReviews(professionalId);
        professional.reviews = reviewsData.reviews;

        // Rest of the function to display data...
    } catch (error) {
        console.error('Error loading professional:', error);
        document.querySelector('.profile-content').innerHTML = 
            '<p>Error loading professional details</p>';
    }
}
```

### Step 4: Update Contact Functions
Replace mock alerts with actual API calls:

```javascript
async function sendMessage() {
    if (!isLoggedIn()) {
        alert('Please login to send messages');
        window.location.href = 'auth/login.html';
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('id');
    
    const message = prompt('Enter your message:');
    if (!message) return;
    
    try {
        const response = await sendMessageToProfessional(professionalId, {
            subject: 'Project Discussion',
            message: message
        });
        alert('Message sent successfully!');
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }
}

async function requestCall() {
    if (!isLoggedIn()) {
        alert('Please login');
        window.location.href = 'auth/login.html';
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('id');
    const phone = prompt('Enter your phone number:');
    
    if (!phone) return;
    
    try {
        const response = await requestCallWithProfessional(professionalId, {
            phone: phone,
            preferred_time: new Date().toISOString()
        });
        alert('Call request sent! The professional will contact you soon.');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function bookConsultation() {
    if (!isLoggedIn()) {
        alert('Please login');
        window.location.href = 'auth/login.html';
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('id');
    
    // Show date/time picker (can use HTML5 inputs)
    const date = prompt('Enter preferred date (YYYY-MM-DD):');
    const time = prompt('Enter preferred time (HH:MM):');
    
    if (!date || !time) return;
    
    try {
        const response = await bookConsultation(professionalId, {
            date: date,
            time: time,
            duration_minutes: 30
        });
        alert('Consultation booked! Check your email for confirmation.');
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
```

## Backend Model Requirements

Your backend should have a `Professional` model with these fields:

```python
class Professional(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='professional')
    
    professional_type = db.Column(db.String(50), nullable=False)  # builder, engineer, etc.
    experience_years = db.Column(db.Integer)
    consultation_fee = db.Column(db.Float)
    bio = db.Column(db.Text)
    verified = db.Column(db.Boolean, default=False)
    
    # Relationships
    reviews = db.relationship('ProfessionalReview', backref='professional')
    portfolio = db.relationship('PortfolioItem', backref='professional')
    
    # Computed properties
    @property
    def rating(self):
        if not self.reviews:
            return 0
        return sum(r.rating for r in self.reviews) / len(self.reviews)
    
    @property
    def review_count(self):
        return len(self.reviews)
    
    @property
    def specialties(self):
        return [p.specialty for p in self.portfolio]
    
    @property
    def portfolio_count(self):
        return len(self.portfolio)
```

## Testing Checklist

- [ ] List page loads professionals from API
- [ ] Filters work correctly with API parameters
- [ ] Search functionality works
- [ ] Sorting works on backend
- [ ] Pagination works correctly
- [ ] Individual professional profile loads details
- [ ] Reviews display correctly
- [ ] Contact features work (message, call, booking)
- [ ] Error handling works for failed API calls
- [ ] Loading states display correctly
- [ ] Mobile responsiveness maintained

## Deployment Notes

1. Update API base URL in `js/config.js`
2. Ensure CORS is configured on backend
3. Test all API endpoints before deployment
4. Add error logging for debugging
5. Implement rate limiting on backend
6. Add caching for frequently accessed data
7. Optimize images in portfolio

---

**Version**: 1.0
**Last Updated**: January 30, 2026
