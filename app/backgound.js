export function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
  
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = Math.floor(canvas.width * canvas.height / 10000);
  
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(249, 115, 22, ${Math.random() * 0.5})`;
      }
  
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
  
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
  
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  
    // Animation loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
  
        // Connect particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < 100) {
            ctx.strokeStyle = `rgba(249, 115, 22, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
  
      requestAnimationFrame(animateParticles);
    }
  
    animateParticles();
  
    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  }
  
  export function initGlowEffects() {
    const glowElements = document.querySelectorAll('[data-glow], [data-card]');
    
    glowElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        el.style.setProperty('--glow-x', `${x}px`);
        el.style.setProperty('--glow-y', `${y}px`);
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.removeProperty('--glow-x');
        el.style.removeProperty('--glow-y');
      });
    });
  }
  
  export function initTerminalAnimation(terminal) {
    const content = terminal.querySelector('#terminal-content');
    if (!content) return;
  
    const commands = [
      { text: "> addms init --project=my_app", delay: 500 },
      { text: "Initializing ADDMS environment...", delay: 300 },
      { text: "✓ Connected to cloud network", delay: 200 },
      { text: "✓ Verified credentials", delay: 200 },
      { text: "✓ Allocated resources", delay: 200 },
      { text: "", delay: 500 },
      { text: "> addms deploy --env=production", delay: 800 },
      { text: "Building deployment package...", delay: 300 },
      { text: "✓ Compiled assets (4.2MB)", delay: 200 },
      { text: "✓ Optimized dependencies", delay: 200 },
      { text: "✓ Security checks passed", delay: 200 },
      { text: "", delay: 300 },
      { text: "Deploying to global edge network...", delay: 400 },
      { text: "✓ Tokyo (12ms)", delay: 100 },
      { text: "✓ Frankfurt (18ms)", delay: 100 },
      { text: "✓ Virginia (22ms)", delay: 100 },
      { text: "✓ São Paulo (34ms)", delay: 100 },
      { text: "", delay: 300 },
      { text: "Deployment complete!", delay: 300 },
      { text: "https://my_app.addms.io", delay: 200, class: "text-blue-400" },
      { text: "", delay: 500 },
      { text: "> _", delay: 200, blink: true }
    ];
  
    let index = 0;
    
    function typeNextLine() {
      if (index >= commands.length) {
        index = 0;
        content.innerHTML = '';
      }
      
      const cmd = commands[index];
      const line = document.createElement('div');
      
      if (cmd.class) {
        line.className = cmd.class;
      }
      
      content.appendChild(line);
      
      let charIndex = 0;
      const typing = setInterval(() => {
        if (charIndex < cmd.text.length) {
          line.textContent = cmd.text.substring(0, charIndex + 1);
          charIndex++;
        } else {
          clearInterval(typing);
          
          if (cmd.blink) {
            // Add blinking cursor effect
            let visible = true;
            setInterval(() => {
              visible = !visible;
              line.textContent = cmd.text + (visible ? '_' : '');
            }, 500);
          }
          
          setTimeout(typeNextLine, cmd.delay);
          index++;
        }
      }, Math.random() * 30 + 20);
    }
  
    // Start the animation
    typeNextLine();
  }