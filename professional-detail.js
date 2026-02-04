// Professional Detail Page Script

const typeIcons = {
  builder: '👷',
  engineer: '🏗️',
  architect: '🏛️',
  interior_designer: '🎨',
  mep_specialist: '⚙️',
  surveyor: '📐'
};

// All professionals data
const allProfessionals = [
  { id: 1, name: 'Rajesh Kumar', type: 'builder', city: 'Delhi', exp: 15, rating: 4.8, reviews: 145, fee: 500, verified: true, bio: 'Expert in residential & commercial construction with 15+ years of experience in project management and execution.', specs: ['Commercial', 'Residential', 'Renovation'] },
  { id: 2, name: 'Priya Singh', type: 'architect', city: 'Mumbai', exp: 12, rating: 4.9, reviews: 98, fee: 800, verified: true, bio: 'Modern sustainable design specialist focused on eco-friendly architecture and innovative solutions.', specs: ['Sustainable', 'Modern', 'Eco-Design'] },
  { id: 3, name: 'Amit Patel', type: 'engineer', city: 'Ahmedabad', exp: 18, rating: 4.7, reviews: 156, fee: 600, verified: true, bio: 'Structural engineer with expertise in project management, BIM, and complex building systems.', specs: ['Structural', 'BIM', 'Infrastructure'] },
  { id: 4, name: 'Neha Sharma', type: 'interior_designer', city: 'Bangalore', exp: 10, rating: 4.6, reviews: 87, fee: 700, verified: true, bio: 'Creative interior designer specializing in contemporary and traditional design aesthetics.', specs: ['Contemporary', 'Space Planning', 'Residential'] },
  { id: 5, name: 'Vikram Desai', type: 'mep_specialist', city: 'Pune', exp: 14, rating: 4.5, reviews: 102, fee: 550, verified: true, bio: 'MEP systems specialist with expertise in HVAC, electrical, and plumbing systems.', specs: ['HVAC', 'Plumbing', 'Electrical'] },
  { id: 6, name: 'Anita Verma', type: 'builder', city: 'Delhi', exp: 8, rating: 4.4, reviews: 64, fee: 400, verified: true, bio: 'Residential builder known for timely delivery and quality craftsmanship.', specs: ['Renovation', 'Residential'] },
  { id: 7, name: 'Suresh Kumar', type: 'surveyor', city: 'Hyderabad', exp: 16, rating: 4.8, reviews: 129, fee: 450, verified: true, bio: 'Licensed land surveyor with expertise in measurements and legal documentation.', specs: ['Land Survey', 'Legal Compliance'] },
  { id: 8, name: 'Ravi Chopra', type: 'architect', city: 'Delhi', exp: 20, rating: 4.9, reviews: 178, fee: 1000, verified: true, bio: 'Senior architect with award-winning designs in luxury and commercial sectors.', specs: ['Luxury', 'Commercial', 'Award-Winning'] },
  { id: 9, name: 'Divya Nair', type: 'interior_designer', city: 'Kochi', exp: 9, rating: 4.7, reviews: 76, fee: 650, verified: true, bio: 'Luxury and hospitality space designer with a focus on minimalist aesthetics.', specs: ['Luxury', 'Hospitality', 'Minimalist'] },
  { id: 10, name: 'Rohan Singh', type: 'engineer', city: 'Mumbai', exp: 11, rating: 4.6, reviews: 95, fee: 550, verified: false, bio: 'Structural engineer specializing in high-rise buildings and complex projects.', specs: ['High-Rise', 'Structural'] },
  { id: 11, name: 'Kavya Nambiar', type: 'architect', city: 'Bangalore', exp: 14, rating: 4.8, reviews: 112, fee: 900, verified: true, bio: 'Eco-friendly architecture expert with green building certifications.', specs: ['Eco-Design', 'Residential', 'Sustainable'] },
  { id: 12, name: 'Mohan Lal', type: 'builder', city: 'Jaipur', exp: 19, rating: 4.7, reviews: 134, fee: 550, verified: true, bio: 'Heritage construction specialist preserving traditional architecture.', specs: ['Heritage', 'Residential', 'Restoration'] },
  { id: 13, name: 'Sarah Khan', type: 'interior_designer', city: 'Hyderabad', exp: 7, rating: 4.5, reviews: 58, fee: 600, verified: true, bio: 'Modern minimalist design expert for commercial and residential spaces.', specs: ['Minimalist', 'Commercial', 'Modern'] },
  { id: 14, name: 'Vikrant Gupta', type: 'engineer', city: 'Pune', exp: 13, rating: 4.8, reviews: 141, fee: 700, verified: true, bio: 'Civil & structural engineering expert with focus on sustainable infrastructure.', specs: ['Civil', 'Infrastructure', 'Structural'] },
  { id: 15, name: 'Meera Sinha', type: 'builder', city: 'Kolkata', exp: 11, rating: 4.6, reviews: 79, fee: 480, verified: false, bio: 'Women-led construction firm specializing in affordable housing projects.', specs: ['Residential', 'Affordable', 'Community'] }
];

const $ = id => document.getElementById(id);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function loadProfessionalDetail() {
  const prof = JSON.parse(sessionStorage.getItem('professional'));
  
  if (!prof) {
    window.location.href = 'professionals.html';
    return;
  }

  // Populate main profile
  $('avatar').textContent = typeIcons[prof.type] || '👤';
  $('name').textContent = prof.name;
  $('type').textContent = prof.type.replace(/_/g, ' ');
  $('city').textContent = `📍 ${prof.city}`;
  $('experience').textContent = `📅 ${prof.exp} years experience`;
  $('rating').innerHTML = `⭐ ${prof.rating}`;
  $('reviews').textContent = `${prof.reviews} reviews`;
  
  if (prof.verified) {
    $('verified').style.display = 'inline-block';
  }

  $('bio').textContent = prof.bio;
  
  $('specs').innerHTML = prof.specs.map(s => `<div class="spec-tag">${s}</div>`).join('');
  
  $('fee').textContent = `₹${prof.fee}/session`;
  $('exp').textContent = `${prof.exp} years`;
  $('status').textContent = prof.verified ? '✓ Verified' : 'Not verified';

  // Quick info sidebar
  $('quick-rating').textContent = `${prof.rating} (${prof.reviews})`;
  $('quick-city').textContent = prof.city;
  $('quick-type').textContent = prof.type.replace(/_/g, ' ');

  // Similar professionals (same type, different person)
  const similar = allProfessionals.filter(p => p.type === prof.type && p.id !== prof.id).slice(0, 3);
  $('similarGrid').innerHTML = similar.map(p => `
    <div class="similar-card" onclick="viewProfessional(${p.id})">
      <div class="similar-avatar">${typeIcons[p.type]}</div>
      <div class="name">${p.name}</div>
      <div class="type">${p.type.replace(/_/g, ' ')}</div>
      <div style="color:#667EEA;font-weight:600">⭐ ${p.rating}</div>
      <div style="color:#999;font-size:0.85rem">${p.city}</div>
    </div>
  `).join('');
}

function viewProfessional(id) {
  const prof = allProfessionals.find(p => p.id === id);
  if (prof) {
    sessionStorage.setItem('professional', JSON.stringify(prof));
    location.reload();
  }
}

function contactProfessional() {
  const isLogged = !!localStorage.getItem('user');
  if (!isLogged) {
    alert('Please login to contact professionals');
    window.location.href = 'auth/login.html';
    return;
  }
  alert('Contact request sent! The professional will respond soon.');
}

// Handle form submission
const contactForm = $('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    contactForm.reset();
  });
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadProfessionalDetail);

// Sample professional data with extended details
const sampleProfessionalsDetail = {
    1: {
        id: 1,
        name: 'Rajesh Kumar',
        type: 'builder',
        city: 'Delhi',
        email: 'rajesh.kumar@yasinova.com',
        phone: '+91-9876543210',
        experience_years: 15,
        rating: 4.8,
        review_count: 145,
        consultation_fee: 500,
        verified: true,
        bio: 'Experienced builder with 15 years in commercial and residential projects. Known for timely delivery and quality work. Specializes in large-scale projects and team management.',
        specialties: ['Commercial', 'Residential', 'Large-Scale Projects', 'Team Management', 'Quality Assurance'],
        portfolio_count: 28,
        portfolio: [
            { title: 'Office Complex', icon: '🏢' },
            { title: 'Residential Tower', icon: '🏗️' },
            { title: 'Shopping Mall', icon: '🏪' },
            { title: 'School Building', icon: '🏫' },
            { title: 'Hospital Project', icon: '🏥' },
            { title: 'Restaurant', icon: '🍽️' }
        ],
        reviews: [
            { name: 'Amit Sharma', rating: 5, date: '2024-01-15', text: 'Excellent work! Very professional and delivered on time.' },
            { name: 'Priya Singh', rating: 5, date: '2024-01-10', text: 'Highly recommended. Great attention to detail.' },
            { name: 'Vikram Patel', rating: 4, date: '2024-01-05', text: 'Good work. Communication could be better.' }
        ]
    },
    2: {
        id: 2,
        name: 'Priya Singh',
        type: 'architect',
        city: 'Mumbai',
        email: 'priya.singh@yasinova.com',
        phone: '+91-9876543211',
        experience_years: 12,
        rating: 4.9,
        review_count: 98,
        consultation_fee: 800,
        verified: true,
        bio: 'Modern architecture specialist with focus on sustainable and eco-friendly design. Award-winning designer with expertise in residential and commercial spaces.',
        specialties: ['Modern Design', 'Sustainable Architecture', 'Interior Planning', 'Award-Winning', 'Green Building'],
        portfolio_count: 34,
        portfolio: [
            { title: 'Luxury Villa', icon: '🏰' },
            { title: 'Green Office', icon: '🌿' },
            { title: 'Modern Apartment', icon: '🏢' },
            { title: 'Contemporary House', icon: '🏠' },
            { title: 'Eco Resort', icon: '🏨' },
            { title: 'Design Studio', icon: '🎨' }
        ],
        reviews: [
            { name: 'Deepak Verma', rating: 5, date: '2024-01-14', text: 'Fantastic design! Exceeded all expectations.' },
            { name: 'Neha Jain', rating: 5, date: '2024-01-09', text: 'Beautiful and functional design. Highly professional.' },
            { name: 'Rohan Gupta', rating: 4, date: '2024-01-01', text: 'Great concepts but took longer than expected.' }
        ]
    },
    3: {
        id: 3,
        name: 'Amit Patel',
        type: 'engineer',
        city: 'Ahmedabad',
        email: 'amit.patel@yasinova.com',
        phone: '+91-9876543212',
        experience_years: 18,
        rating: 4.7,
        review_count: 156,
        consultation_fee: 600,
        verified: true,
        bio: 'Civil engineer specializing in structural design and project management. Expert in BIM modeling and infrastructure projects with focus on safety and compliance.',
        specialties: ['Structural Design', 'Project Management', 'BIM Modeling', 'Infrastructure', 'Safety Compliance'],
        portfolio_count: 42,
        portfolio: [
            { title: 'Bridge Project', icon: '🌉' },
            { title: 'Highway', icon: '🛣️' },
            { title: 'Dam Construction', icon: '🏗️' },
            { title: 'Metro Station', icon: '🚇' },
            { title: 'High-Rise Building', icon: '🏢' },
            { title: 'Infrastructure Network', icon: '🕸️' }
        ],
        reviews: [
            { name: 'Government Agency', rating: 5, date: '2024-01-12', text: 'Perfect execution of infrastructure project. Highly skilled team.' },
            { name: 'Construction Firm', rating: 5, date: '2024-01-08', text: 'Expert guidance throughout the project.' },
            { name: 'Developer', rating: 4, date: '2024-01-03', text: 'Good work, some minor delays.' }
        ]
    },
    4: {
        id: 4,
        name: 'Neha Sharma',
        type: 'interior_designer',
        city: 'Bangalore',
        email: 'neha.sharma@yasinova.com',
        phone: '+91-9876543213',
        experience_years: 10,
        rating: 4.6,
        review_count: 87,
        consultation_fee: 700,
        verified: true,
        bio: 'Creative interior designer specializing in contemporary and traditional styles. Known for transforming spaces with aesthetic appeal and functionality.',
        specialties: ['Contemporary Design', 'Traditional Styles', 'Space Planning', 'Color Consultation', 'Furniture Selection'],
        portfolio_count: 31,
        portfolio: [
            { title: 'Modern Bedroom', icon: '🛏️' },
            { title: 'Living Room', icon: '🛋️' },
            { title: 'Kitchen Design', icon: '🍳' },
            { title: 'Office Space', icon: '💼' },
            { title: 'Restaurant', icon: '🍽️' },
            { title: 'Home Decor', icon: '🎨' }
        ],
        reviews: [
            { name: 'Home Owner', rating: 5, date: '2024-01-13', text: 'Amazing transformation! Love the new design.' },
            { name: 'Homemaker', rating: 5, date: '2024-01-07', text: 'Professional and creative. Highly satisfied.' },
            { name: 'Property Manager', rating: 4, date: '2024-01-02', text: 'Good design work, budget management could improve.' }
        ]
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('id');
    
    if (professionalId) {
        loadProfessionalDetails(professionalId);
    }
});

// Load professional details
function loadProfessionalDetails(professionalId) {
    const professional = sampleProfessionalsDetail[professionalId];
    
    if (!professional) {
        document.querySelector('.profile-content').innerHTML = '<p>Professional not found</p>';
        return;
    }

    // Update header
    document.getElementById('profileAvatar').textContent = typeIcons[professional.type] || '👤';
    document.getElementById('profileName').textContent = professional.name;
    document.getElementById('profileType').textContent = professional.type.replace(/_/g, ' ').toUpperCase();
    
    const badgesHtml = professional.verified ? '<div class="profile-badge">✓ Verified Professional</div>' : '';
    document.getElementById('profileBadges').innerHTML = badgesHtml;

    // Update quick facts
    document.getElementById('profileCity').textContent = professional.city;
    document.getElementById('profileExperience').textContent = `${professional.experience_years} years`;
    document.getElementById('profileRating').textContent = `⭐ ${professional.rating}`;
    document.getElementById('profileReviews').textContent = `${professional.review_count}`;
    document.getElementById('profileProjects').textContent = `${professional.portfolio_count}`;
    document.getElementById('profileFee').textContent = `₹${professional.consultation_fee}`;

    // Update biography
    document.getElementById('profileBio').textContent = professional.bio;

    // Update specialties
    const specialtiesHtml = professional.specialties
        .map(s => `<span class="specialty">${s}</span>`)
        .join('');
    document.getElementById('profileSpecialties').innerHTML = specialtiesHtml;

    // Update portfolio
    const portfolioHtml = professional.portfolio
        .map(item => `
            <div class="portfolio-item">
                <div class="portfolio-image">${item.icon}</div>
                <div class="portfolio-title">${item.title}</div>
            </div>
        `)
        .join('');
    document.getElementById('profilePortfolio').innerHTML = portfolioHtml;

    // Update reviews
    const reviewsHtml = professional.reviews
        .map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <div class="review-name">${review.name}</div>
                        <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                    </div>
                    <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `)
        .join('');
    document.getElementById('profileReviewsList').innerHTML = reviewsHtml;

    // Update sidebar
    document.getElementById('sidebarEmail').textContent = professional.email;
    document.getElementById('sidebarPhone').textContent = professional.phone;
    document.getElementById('verificationStatus').innerHTML = professional.verified 
        ? '✓ Verified Professional<br><span style="font-size: 0.8rem; color: #888;">Identity and credentials verified</span>'
        : '⚠ Not Yet Verified';
}

// Action functions
function sendMessage() {
    const params = new URLSearchParams(window.location.search);
    const professionalId = params.get('id');
    
    if (!isLoggedIn()) {
        alert('Please login to send messages');
        window.location.href = 'auth/login.html';
        return;
    }
    
    alert(`Message feature coming soon! You'll be able to message ${document.getElementById('profileName').textContent}`);
}

function requestCall() {
    if (!isLoggedIn()) {
        alert('Please login to request a call');
        window.location.href = 'auth/login.html';
        return;
    }
    
    const phone = document.getElementById('sidebarPhone').textContent;
    alert(`Call request feature coming soon!\n\nWe'll notify ${document.getElementById('profileName').textContent} about your call request.`);
}

function bookConsultation() {
    if (!isLoggedIn()) {
        alert('Please login to book consultation');
        window.location.href = 'auth/login.html';
        return;
    }
    
    const fee = document.querySelector('[id="profileFee"]').textContent;
    alert(`Consultation Booking\n\nFee: ${fee}\n\nBooking system coming soon!`);
}

function shareProfile() {
    const name = document.getElementById('profileName').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: `${name} - YASINOVA Professional`,
            text: `Check out this professional on YASINOVA`,
            url: url
        });
    } else {
        alert(`Share this profile:\n${url}`);
    }
}

function addFavorite() {
    if (!isLoggedIn()) {
        alert('Please login to add favorites');
        window.location.href = 'auth/login.html';
        return;
    }
    
    const name = document.getElementById('profileName').textContent;
    alert(`${name} added to your favorites!`);
}
