// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Professionals page - enhanced with search, filter, sort, pagination, animations

const typeIcons = {
  builder: '👷',
  engineer: '🏗️',
  architect: '🏛️',
  interior_designer: '🎨',
  mep_specialist: '⚙️',
  surveyor: '📐'
};

// Professional data with 15+ professionals for better demonstration
const professionals = [
  { id: 1, name: 'Rajesh Kumar', type: 'builder', city: 'Delhi', exp: 15, rating: 4.8, fee: 500, verified: true, bio: 'Expert in residential & commercial construction', specs: ['Commercial', 'Residential'] },
  { id: 2, name: 'Priya Singh', type: 'architect', city: 'Mumbai', exp: 12, rating: 4.9, fee: 800, verified: true, bio: 'Modern sustainable design specialist', specs: ['Sustainable', 'Modern'] },
  { id: 3, name: 'Amit Patel', type: 'engineer', city: 'Ahmedabad', exp: 18, rating: 4.7, fee: 600, verified: true, bio: 'Structural engineer & project manager', specs: ['Structural', 'BIM'] },
  { id: 4, name: 'Neha Sharma', type: 'interior_designer', city: 'Bangalore', exp: 10, rating: 4.6, fee: 700, verified: true, bio: 'Contemporary & traditional interior designs', specs: ['Contemporary', 'Space Planning'] },
  { id: 5, name: 'Vikram Desai', type: 'mep_specialist', city: 'Pune', exp: 14, rating: 4.5, fee: 550, verified: true, bio: 'MEP systems specialist', specs: ['HVAC', 'Plumbing'] },
  { id: 6, name: 'Anita Verma', type: 'builder', city: 'Delhi', exp: 8, rating: 4.4, fee: 400, verified: true, bio: 'Residential builder with timely delivery', specs: ['Renovation'] },
  { id: 7, name: 'Suresh Kumar', type: 'surveyor', city: 'Hyderabad', exp: 16, rating: 4.8, fee: 450, verified: true, bio: 'Licensed land surveyor', specs: ['Land Survey', 'Legal'] },
  { id: 8, name: 'Ravi Chopra', type: 'architect', city: 'Delhi', exp: 20, rating: 4.9, fee: 1000, verified: true, bio: 'Award-winning luxury architect', specs: ['Luxury', 'Commercial'] },
  { id: 9, name: 'Divya Nair', type: 'interior_designer', city: 'Kochi', exp: 9, rating: 4.7, fee: 650, verified: true, bio: 'Luxury homes & hospitality spaces', specs: ['Luxury', 'Hospitality'] },
  { id: 10, name: 'Rohan Singh', type: 'engineer', city: 'Mumbai', exp: 11, rating: 4.6, fee: 550, verified: false, bio: 'Structural engineer - high-rise', specs: ['High-Rise'] },
  { id: 11, name: 'Kavya Nambiar', type: 'architect', city: 'Bangalore', exp: 14, rating: 4.8, fee: 900, verified: true, bio: 'Eco-friendly architecture expert', specs: ['Eco-Design', 'Residential'] },
  { id: 12, name: 'Mohan Lal', type: 'builder', city: 'Jaipur', exp: 19, rating: 4.7, fee: 550, verified: true, bio: 'Heritage construction specialist', specs: ['Heritage', 'Residential'] },
  { id: 13, name: 'Sarah Khan', type: 'interior_designer', city: 'Hyderabad', exp: 7, rating: 4.5, fee: 600, verified: true, bio: 'Modern minimalist design expert', specs: ['Minimalist', 'Commercial'] },
  { id: 14, name: 'Vikrant Gupta', type: 'engineer', city: 'Pune', exp: 13, rating: 4.8, fee: 700, verified: true, bio: 'Civil & structural engineering', specs: ['Civil', 'Infrastructure'] },
  { id: 15, name: 'Meera Sinha', type: 'builder', city: 'Kolkata', exp: 11, rating: 4.6, fee: 480, verified: false, bio: 'Women-led construction firm', specs: ['Residential', 'Affordable'] }
];

const $ = id => document.getElementById(id);

// Debounce function for smoother search
function debounce(fn, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

function getFilters() {
  return {
    search: $('search').value.trim().toLowerCase(),
    category: $('category').value,
    verified: $('verified').checked,
    sort: $('sort').value
  };
}

function filterAndSort(list) {
  const { search, category, verified, sort } = getFilters();
  
  let result = list.filter(p => {
    if (category && p.type !== category) return false;
    if (verified && !p.verified) return false;
    if (search) {
      const haystack = (p.name + ' ' + p.city + ' ' + p.specs.join(' ') + ' ' + p.type).toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sort === 'experience') result.sort((a, b) => b.exp - a.exp);
  else if (sort === 'fee_low') result.sort((a, b) => a.fee - b.fee);

  return result;
}

function render() {
  const grid = $('grid');
  const empty = $('empty');
  const filtered = filterAndSort(professionals);

  // Add fade animation
  grid.style.opacity = '0.5';
  
  setTimeout(() => {
    if (!filtered.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      grid.style.opacity = '1';
      return;
    }

    empty.hidden = true;
    grid.innerHTML = filtered.map((p, idx) => `
      <article class="card" style="animation: slideIn 0.4s ease-out ${idx * 0.05}s both">
        <div class="top">
          <div class="avatar">${typeIcons[p.type] || '👤'}</div>
          <div class="name">${p.name}</div>
          <div class="type">${p.type.replace(/_/g, ' ')}</div>
          ${p.verified ? '<div class="badge">✓ Verified</div>' : ''}
        </div>
        <div class="body">
          <div class="info">📍 ${p.city}</div>
          <div class="info">📅 ${p.exp} years</div>
          <div class="info">⭐ ${p.rating} (reviews)</div>
          <div class="info">💰 ₹${p.fee}/session</div>
          <p style="font-size:0.9rem;color:#666;margin:0.25rem 0">${p.bio}</p>
          <div class="specialties">
            ${p.specs.map(s => `<span class="tag">${s}</span>`).join('')}
          </div>
          <div class="actions">
            <button class="btn secondary" onclick="viewProfile(${p.id})">View</button>
            <button class="btn primary" onclick="contact(${p.id})">Contact</button>
          </div>
        </div>
      </article>
    `).join('');
    
    grid.style.opacity = '1';
  }, 50);
}

function viewProfile(id) {
  const prof = professionals.find(p => p.id === id);
  if (prof) {
    sessionStorage.setItem('professional', JSON.stringify(prof));
    window.location.href = `professional-detail.html?id=${id}`;
  }
}

function contact(id) {
  const prof = professionals.find(p => p.id === id);
  if (prof) {
    const isLogged = !!localStorage.getItem('user');
    if (!isLogged) {
      alert('Please login to contact professionals');
      window.location.href = 'auth/login.html';
      return;
    }
    alert(`Contact request sent to ${prof.name} - feature coming soon`);
  }
}

// Event listeners with debounce for smooth performance
const debouncedRender = debounce(render, 200);

$('search').addEventListener('input', debouncedRender);
$('category').addEventListener('change', render);
$('sort').addEventListener('change', render);
$('verified').addEventListener('change', render);
$('clearSearch').addEventListener('click', () => {
  $('search').value = '';
  $('search').focus();
  render();
});

// Add keyboard support for search
$('search').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    $('search').value = '';
    render();
  }
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
  render();
  // Add smooth fade-in animation to page
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.4s ease-in';
    document.body.style.opacity = '1';
  }, 50);
});
