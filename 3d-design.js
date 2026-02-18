// 3D Design gallery — loads from user-provided photos and videos
const builtinData = [
  {id:1,title:'Living Room',category:'interior',media:'photo',thumb:'living room.jpg',src:'living room.jpg',desc:'Modern living space design',tags:['living','interior'],style:'all'},
  {id:2,title:'Bedroom',category:'interior',media:'photo',thumb:'bedroom.jpg',src:'bedroom.jpg',desc:'Cozy bedroom with textures',tags:['bedroom','interior'],style:'all'},
  {id:3,title:'Exterior Facade',category:'exterior',media:'photo',thumb:'Facade.jpg',src:'Facade.jpg',desc:'Contemporary exterior facade',tags:['exterior'],style:'all'},
  {id:4,title:'Kitchen Layout',category:'interior',media:'photo',thumb:'kitchen.jpg',src:'kitchen.jpg',desc:'Functional kitchen design',tags:['kitchen','interior'],style:'all'},
  {id:5,title:'Floor Plan',category:'floorplan',media:'photo',thumb:'floorplan.jpg',src:'floorplan.jpg',desc:'3BHK floor plan layout',tags:['plan','layout'],style:'all'},
  {id:6,title:'Villa Walkthrough',category:'exterior',media:'photo',thumb:'Facade.jpg',src:'Facade.jpg',desc:'3D video walkthrough of a villa',tags:['video','walkthrough'],style:'all'},
  {id:9,title:'Climate-Adaptive Home',category:'exterior',media:'photo',thumb:'climate.jpg',src:'climate.jpg',desc:'Eco-friendly design with natural ventilation',tags:['climate','sustainable','exterior'],style:'climate'},
  {id:11,title:'Vastu Floor Plan',category:'floorplan',media:'photo',thumb:'vastu plane.jpg',src:'vastu plane.jpg',desc:'3D floor plan designed with Vastu principles',tags:['vastu','plan','layout'],style:'vastu'}
];

let data = builtinData;

// Try to load optional JSON index placed at `data/3d-gallery.json` (relative to the page)
async function loadExternalData(){
  try{
    const res = await fetch('3d-gallery.json');
    if(!res.ok) return;
    const j = await res.json();
    if(Array.isArray(j) && j.length) data = j;
  }catch(e){ /* ignore and use builtin data */ }
}

const $ = id => document.getElementById(id);
let filtered = [...data];

function renderGallery(items){
  const gallery = $('gallery');
  gallery.innerHTML = '';
  if(!items.length){ gallery.innerHTML = '<p class="muted">No results found.</p>'; return }
  items.forEach(it=>{
    const card = document.createElement('article'); card.className='card';
    const thumb = document.createElement('div'); thumb.className='card-thumb';
    const img = document.createElement('img'); img.src = it.thumb; img.alt = it.title;
    thumb.appendChild(img);
    if(it.media==='video'){
      const p = document.createElement('span'); p.className='play'; p.textContent='▶ Video'; thumb.appendChild(p);
    }
    const body = document.createElement('div'); body.className='card-body';
    const h = document.createElement('h3'); h.className='card-title'; h.textContent=it.title;
    const m = document.createElement('div'); m.className='card-meta'; m.textContent = it.category + ' • ' + it.tags.join(', ');
    const open = document.createElement('button'); open.className='btn'; open.textContent='View'; open.onclick = ()=> openLightbox(it.id);
    body.appendChild(h); body.appendChild(m); body.appendChild(open);
    card.appendChild(thumb); card.appendChild(body);
    gallery.appendChild(card);
  })
}

function getFilters(){
  return {
    q: $('search').value.trim().toLowerCase(),
    category: $('category').value,
    media: $('mediaType').value,
    style: $('design-style').value
  }
}

function applyFilters(){
  const f = getFilters();
  filtered = data.filter(d=>{
    if(f.category!=='all' && d.category!==f.category) return false;
    if(f.media!=='all' && d.media!==f.media) return false;
    if(f.style!=='all' && d.style!==f.style) return false;
    if(f.q){
      const hay = (d.title+' '+d.desc+' '+d.tags.join(' ')).toLowerCase();
      if(!hay.includes(f.q)) return false;
    }
    return true;
  });
  renderGallery(filtered);
}

function debounce(fn,ms=250){let t;return (...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}}

function openLightbox(id){
  const item = data.find(d=>d.id===id); if(!item) return;
  const lb = $('lightbox'); const lbMedia = $('lbMedia'); const lbCaption = $('lbCaption');
  lbMedia.innerHTML=''; lbCaption.textContent = item.title + (item.desc? ' — '+item.desc : '');
  if(item.media==='photo'){
    const img = document.createElement('img'); img.src=item.src; img.alt=item.title; lbMedia.appendChild(img);
    lb.setAttribute('aria-hidden','false');
  } else {
    const video = document.createElement('video'); video.controls=true; video.src=item.src; video.autoplay=true; video.playsInline=true; lbMedia.appendChild(video); lb.setAttribute('aria-hidden','false');
  }
}

function closeLightbox(){
  const lb = $('lightbox'); lb.setAttribute('aria-hidden','true'); const lbMedia = $('lbMedia'); lbMedia.innerHTML='';
}

async function init(){
  await loadExternalData();
  renderGallery(data);
  $('search').addEventListener('input', debounce(applyFilters,250));
  $('category').addEventListener('change', applyFilters);
  $('mediaType').addEventListener('change', applyFilters);
  $('design-style').addEventListener('change', applyFilters);
  $('clearFilters').addEventListener('click', ()=>{ $('search').value=''; $('category').value='all'; $('mediaType').value='all'; $('design-style').value='all'; applyFilters(); });
  $('lbClose').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLightbox(); });
  $('lightbox').addEventListener('click', e=>{ if(e.target.id==='lightbox') closeLightbox(); });
}

document.addEventListener('DOMContentLoaded', init);


