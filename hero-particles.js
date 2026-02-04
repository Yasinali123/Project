// Hero Section Particle Animation — Construction Materials Theme
(function(){
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  
  function resizeCanvas(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  // Particle class
  class Particle {
    constructor(x, y, vx, vy, type){
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.type = type; // 'brick', 'cement', 'steel'
      this.size = Math.random() * 8 + 4;
      this.opacity = Math.random() * 0.3 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update(){
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05; // gravity
      this.rotation += this.rotSpeed;
      
      // fade out at bottom
      if (this.y > canvas.height) {
        this.opacity -= 0.01;
      }
    }
    
    draw(){
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      if (this.type === 'brick'){
        // Draw brick
        ctx.fillStyle = '#c85a3a';
        ctx.fillRect(-this.size / 2, -this.size / 3, this.size, this.size / 1.5);
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.5)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(-this.size / 2, -this.size / 3, this.size, this.size / 1.5);
      } else if (this.type === 'cement'){
        // Draw small circle (cement particle)
        ctx.fillStyle = '#999999';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'steel'){
        // Draw small square (steel)
        ctx.fillStyle = '#666666';
        ctx.fillRect(-this.size / 2.5, -this.size / 2.5, this.size / 1.25, this.size / 1.25);
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.6)';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-this.size / 2.5, -this.size / 2.5, this.size / 1.25, this.size / 1.25);
      }
      
      ctx.restore();
    }
    
    isAlive(){
      return this.opacity > 0 && this.y < canvas.height + 100;
    }
  }
  
  let particles = [];
  
  function createParticles(){
    const types = ['brick', 'cement', 'steel'];
    for (let i = 0; i < 2; i++){
      const x = Math.random() * canvas.width;
      const y = -20;
      const vx = (Math.random() - 0.5) * 2;
      const vy = Math.random() * 1 + 0.5;
      const type = types[Math.floor(Math.random() * types.length)];
      particles.push(new Particle(x, y, vx, vy, type));
    }
  }
  
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw decorative construction elements at top
    drawConstructionPattern();
    
    // Update and draw particles
    particles = particles.filter(p => p.isAlive());
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Occasionally create new particles
    if (Math.random() < 0.3) {
      createParticles();
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  function drawConstructionPattern(){
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    // Draw construction grid pattern
    const gridSize = 60;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw corner brackets
    const bracketSize = 30;
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.25;
    
    // Top-left
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10 + bracketSize, 10);
    ctx.lineTo(10, 10 + bracketSize);
    ctx.stroke();
    
    // Top-right
    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, 10);
    ctx.lineTo(canvas.width - 10 - bracketSize, 10);
    ctx.lineTo(canvas.width - 10, 10 + bracketSize);
    ctx.stroke();
    
    ctx.restore();
  }
  
  // Initialize
  resizeCanvas();
  animate();
  
  window.addEventListener('resize', resizeCanvas);
})();
