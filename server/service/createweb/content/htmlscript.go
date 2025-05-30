package content

func Htmlscript() string {
	return `document.addEventListener('DOMContentLoaded', function() {
            const ctaButton = document.querySelector('.cta-button');
            
            // Button hover effect enhancement
            ctaButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 15px 25px -10px rgba(247, 147, 30, 0.6)';
            });
            
            ctaButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 20px -10px rgba(247, 147, 30, 0.5)';
            });
            
            // Add ripple effect to button
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.style.left = `+"`${x}px`"+`;
                ripple.style.top = `+"`${y}px`"+`;
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 1000);
                
                // Simulate terminal interaction
                const terminal = document.querySelector('.terminal');
                terminal.style.transform = 'translate(-50%, -50%) scale(1.05)';
                setTimeout(() => {
                    terminal.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 300);
            });
            
            // Add subtle animation to logo on hover
            const logoSvg = document.querySelector('.logo-svg');
            logoSvg.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 15px rgba(247, 147, 30, 0.6))';
                this.style.transform = 'scale(1.05)';
            });
            
            logoSvg.addEventListener('mouseleave', function() {
                this.style.filter = 'drop-shadow(0 0 10px rgba(247, 147, 30, 0.4))';
                this.style.transform = 'scale(1)';
            });
            
            // Add parallax effect to server icons
            document.addEventListener('mousemove', function(e) {
                const serverIcons = document.querySelectorAll('.server-icon');
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                serverIcons.forEach((icon, index) => {
                    const speed = 0.05 * (index + 1);
                    const xPos = (x * 20 - 10) * speed;
                    const yPos = (y * 20 - 10) * speed;
                    
                    icon.style.transform = `+"`translate(${xPos}px, ${yPos}px);`"+`
                });
            });
        });`
}