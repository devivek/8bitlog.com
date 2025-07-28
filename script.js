// Enhanced interactivity and animations for the resume website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for skill tags
                if (entry.target.classList.contains('skills-list')) {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }

                // Special animation for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section, .skills-list, .projects-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize skill tags for animation
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.9)';
        tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Initialize project cards for animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Dynamic typing effect for the title
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const titles = [
            'Software Developer',
            'Full Stack Engineer',
            'Tech Enthusiast',
            'Problem Solver'
        ];
        let currentTitleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const originalTitle = titleElement.textContent;

        function typeEffect() {
            const currentTitle = titles[currentTitleIndex];
            
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            titleElement.textContent = currentTitle.substring(0, charIndex);

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect after a delay
        setTimeout(() => {
            typeEffect();
        }, 2000);
    }

    // Contact info hover effects
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Skill tag click to copy
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const skill = this.textContent;
            navigator.clipboard.writeText(skill).then(() => {
                // Show feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 1000);
            }).catch(() => {
                // Fallback for older browsers
                console.log('Skill copied:', skill);
            });
        });

        // Add tooltip
        tag.title = 'Click to copy skill';
    });

    // Project card enhanced interactions
    document.querySelectorAll('.project-card').forEach(card => {
        const header = card.querySelector('.project-header h3');
        const description = card.querySelector('.project-description');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            if (header) header.style.color = 'var(--primary-color)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (header) header.style.color = '';
        });
    });

    // Timeline item hover effects
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'scale(1.3)';
                marker.style.background = 'var(--secondary-color)';
            }
        });

        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'scale(1)';
                marker.style.background = 'var(--primary-color)';
            }
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Profile image click to change
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            // You can add functionality to upload or change profile image
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });

        profileImg.style.cursor = 'pointer';
        profileImg.title = 'Click to change profile image';
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'j') {
            window.scrollBy(0, 100);
        } else if (e.key === 'ArrowUp' || e.key === 'k') {
            window.scrollBy(0, -100);
        }
    });

    // Dark mode toggle functionality
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.background = 'var(--bg-primary)';
    darkModeToggle.style.color = 'var(--text-primary)';
    darkModeToggle.style.border = '1px solid var(--border-color)';
    darkModeToggle.style.width = '40px';
    darkModeToggle.style.height = '40px';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.fontSize = '14px';
    darkModeToggle.style.zIndex = '1000';
    darkModeToggle.style.fontFamily = 'inherit';
    darkModeToggle.style.display = 'flex';
    darkModeToggle.style.alignItems = 'center';
    darkModeToggle.style.justifyContent = 'center';
    darkModeToggle.title = 'Toggle dark/light mode';

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    document.body.appendChild(darkModeToggle);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    });

    // Enhanced contact links
    document.querySelectorAll('.contact-item a, .project-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Print Resume';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '20px';
    printButton.style.right = '20px';
    printButton.style.background = 'var(--accent-color)';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.borderRadius = 'var(--border-radius)';
    printButton.style.padding = '12px 20px';
    printButton.style.cursor = 'pointer';
    printButton.style.fontSize = '14px';
    printButton.style.fontWeight = '500';
    printButton.style.zIndex = '1000';
    printButton.style.transition = 'transform 0.3s ease';
    printButton.style.boxShadow = 'var(--shadow-md)';

    printButton.addEventListener('click', function() {
        window.print();
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });

    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-md)';
    });

    document.body.appendChild(printButton);

    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.background = 'var(--primary-color)';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.color = 'white';
    loadingScreen.style.fontSize = '24px';
    loadingScreen.style.fontWeight = '600';
    loadingScreen.style.zIndex = '10000';
    loadingScreen.style.transition = 'opacity 0.5s ease';
    loadingScreen.innerHTML = 'Loading Resume...';

    document.body.appendChild(loadingScreen);

    // Hide loading screen after content loads
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);

    console.log('🚀 Resume website loaded successfully!');
    console.log('💡 Tip: Use arrow keys or j/k to scroll');
    console.log('💡 Click on skill tags to copy them');
    console.log('💡 Use the dark mode toggle in the top right');
});
