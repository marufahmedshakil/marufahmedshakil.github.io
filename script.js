/* ============================================================================
   INTERACTIVE & 3D ENGINE — MD. MARUF AHMED SHAKIL
   1. 3D Mathematical Manifold Canvas Renderer (Geodesic, Torus, Fourier Wave)
   2. 3D Perspective Card Tilt & Specular Gold Glare Engine
   3. Editorial Typing Subtitle Animation
   4. Sticky Navigation, Scroll Spy, Reveal Animations & Contact Form Handler
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ========================================================================
       1. NAVIGATION, STICKY HEADER, MOBILE DRAWER & SCROLL-UP BUTTON
       ======================================================================== */
    const navbar = document.getElementById('navbar');
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navbar .menu li a');
    const sections = document.querySelectorAll('main section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        if (navbar) {
            navbar.classList.toggle('sticky', scrollY > 24);
        }

        if (scrollUpBtn) {
            scrollUpBtn.classList.toggle('show', scrollY > 450);
        }

        // Active Section Scroll-Spy
        let currentSectionId = 'home';
        sections.forEach((sec) => {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.toggle('active', href === `#${currentSectionId}`);
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
    }

    /* ========================================================================
       2. EDITORIAL TYPING SUBTITLE ANIMATION
       ======================================================================== */
    const typingEl = document.getElementById('heroTyping');
    const phrases = [
        'Mathematics Education',
        'Academic Mentorship',
        'Conceptual Problem-Solving',
        'Analytical & Logical Thinking'
    ];

    if (typingEl && !prefersReducedMotion) {
        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let isDeleting = false;

        function tickTyping() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingEl.textContent = currentPhrase.substring(0, charIndex);

            let delay = isDeleting ? 42 : 78;

            if (!isDeleting && charIndex === currentPhrase.length) {
                delay = 2400;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 380;
            }

            setTimeout(tickTyping, delay);
        }

        setTimeout(() => {
            isDeleting = true;
            tickTyping();
        }, 2400);
    }

    /* ========================================================================
       3. SCROLL REVEAL OBSERVER
       ======================================================================== */
    const revealElements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('revealed'));
    }

    /* ========================================================================
       4. 3D PERSPECTIVE TILT & SPECULAR GOLD GLARE ENGINE
       ======================================================================== */
    const tiltCards = document.querySelectorAll('.tilt-3d');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!prefersReducedMotion && !isTouchDevice) {
        tiltCards.forEach((card) => {
            const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 7;

            card.addEventListener('mouseenter', () => {
                card.classList.add('is-tilting');
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const normX = (x - centerX) / centerX;
                const normY = (y - centerY) / centerY;

                const rotateX = (-normY * maxTilt).toFixed(2);
                const rotateY = (normX * maxTilt).toFixed(2);

                card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.012, 1.012, 1.012)`;
                card.style.setProperty('--glare-x', `${((x / rect.width) * 100).toFixed(1)}%`);
                card.style.setProperty('--glare-y', `${((y / rect.height) * 100).toFixed(1)}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('is-tilting');
                card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    /* ========================================================================
       5. INTERACTIVE 3D MATHEMATICAL MANIFOLD CANVAS ENGINE
       Renders real-time 3D perspective-projected mathematical structures:
       - 'geodesic': Subdivided Icosahedral Symmetry Lattice (Abstract Algebra)
       - 'torus': Parametric Riemannian Torus Manifold (Tensor & Diff Geometry)
       - 'harmonic': 3D Harmonic Fourier Wave Surface (Fourier & Numerical Analysis)
       ======================================================================== */
    const canvas = document.getElementById('math3dCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const VERTEX_COUNT = 168;
        let currentVertices = [];
        let targetVertices = [];
        let edges = [];
        let ambientParticles = [];

        let rotX = 0.35;
        let rotY = 0.55;
        let targetMouseX = 0;
        let targetMouseY = 0;
        let time = 0;
        let currentShape = 'geodesic';
        let isHeroVisible = true;

        function resizeCanvas() {
            const parent = canvas.parentElement;
            width = parent ? parent.clientWidth : window.innerWidth;
            height = parent ? parent.clientHeight : window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Generate 3D coordinates for each mathematical manifold
        function generateShapeCoordinates(shapeType, t = 0) {
            const pts = [];

            if (shapeType === 'geodesic') {
                // Fibonacci Golden-Ratio Spherical Lattice + Inner Dual Core
                const phi = Math.PI * (3 - Math.sqrt(5));
                const outerCount = 128;
                for (let i = 0; i < outerCount; i++) {
                    const y = 1 - (i / (outerCount - 1)) * 2;
                    const radius = Math.sqrt(1 - y * y);
                    const theta = phi * i;
                    const rScale = 195;
                    pts.push({
                        x: Math.cos(theta) * radius * rScale,
                        y: y * rScale,
                        z: Math.sin(theta) * radius * rScale,
                        ring: 0
                    });
                }
                const innerCount = VERTEX_COUNT - outerCount;
                for (let i = 0; i < innerCount; i++) {
                    const y = 1 - (i / (innerCount - 1)) * 2;
                    const radius = Math.sqrt(1 - y * y);
                    const theta = phi * i * 2;
                    const rScale = 105;
                    pts.push({
                        x: Math.cos(theta) * radius * rScale,
                        y: y * rScale,
                        z: Math.sin(theta) * radius * rScale,
                        ring: 1
                    });
                }
            } else if (shapeType === 'torus') {
                // Parametric Torus Manifold (u, v)
                const uSteps = 14;
                const vSteps = 12;
                const R = 145;
                const r = 62;
                for (let i = 0; i < uSteps; i++) {
                    const u = (i / uSteps) * Math.PI * 2;
                    for (let j = 0; j < vSteps; j++) {
                        const v = (j / vSteps) * Math.PI * 2;
                        const x = (R + r * Math.cos(v)) * Math.cos(u);
                        const y = r * Math.sin(v) * 1.25;
                        const z = (R + r * Math.cos(v)) * Math.sin(u);
                        pts.push({ x, y, z, ring: i % 2 });
                    }
                }
            } else if (shapeType === 'harmonic') {
                // 3D Fourier Standing-Wave Grid
                const cols = 14;
                const rows = 12;
                const span = 330;
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        const nx = i / (cols - 1) - 0.5;
                        const nz = j / (rows - 1) - 0.5;
                        const x = nx * span;
                        const z = nz * span;
                        const dist = Math.sqrt(nx * nx + nz * nz) * 7.5;
                        const y =
                            Math.sin(dist - t * 2.2) * 48 +
                            Math.cos(nx * 5 + t) * 18;
                        pts.push({ x, y, z, ring: (i + j) % 2 });
                    }
                }
            }

            return pts;
        }

        function rebuildEdges(points, shapeType) {
            const newEdges = [];
            const maxDist = shapeType === 'geodesic' ? 84 : shapeType === 'torus' ? 86 : 58;
            const maxDistSq = maxDist * maxDist;

            for (let i = 0; i < points.length; i++) {
                let connections = 0;
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dz = points[i].z - points[j].z;
                    const dSq = dx * dx + dy * dy + dz * dz;
                    if (dSq < maxDistSq) {
                        newEdges.push([i, j]);
                        connections++;
                        if (connections >= 5) break;
                    }
                }
            }
            edges = newEdges;
        }

        function initGeometry() {
            const initial = generateShapeCoordinates(currentShape, 0);
            currentVertices = initial.map((p) => ({ ...p }));
            targetVertices = initial.map((p) => ({ ...p }));
            rebuildEdges(targetVertices, currentShape);

            ambientParticles = Array.from({ length: 34 }, () => ({
                x: (Math.random() - 0.5) * 900,
                y: (Math.random() - 0.5) * 560,
                z: (Math.random() - 0.5) * 450,
                size: Math.random() * 1.8 + 0.7,
                speed: Math.random() * 0.006 + 0.002
            }));
        }

        function setShape(newShape) {
            currentShape = newShape;
            targetVertices = generateShapeCoordinates(newShape, time);
            rebuildEdges(targetVertices, newShape);
        }

        // Shape Switcher Buttons
        const shapeButtons = document.querySelectorAll('.math-shape-btn');
        shapeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                shapeButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                const shape = btn.getAttribute('data-shape');
                if (shape) {
                    setShape(shape);
                }
            });
        });

        // Mouse Parallax Listener
        window.addEventListener(
            'mousemove',
            (e) => {
                targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.75;
                targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.55;
            },
            { passive: true }
        );

        // Pause canvas rendering when Hero is offscreen for performance
        if ('IntersectionObserver' in window) {
            const heroSection = document.getElementById('home');
            if (heroSection) {
                const heroObserver = new IntersectionObserver(
                    (entries) => {
                        isHeroVisible = entries[0].isIntersecting;
                    },
                    { threshold: 0.02 }
                );
                heroObserver.observe(heroSection);
            }
        }

        function project3D(x, y, z, centerX, centerY, fov) {
            const scale = fov / (fov + z + 380);
            return {
                px: centerX + x * scale,
                py: centerY + y * scale,
                scale,
                z
            };
        }

        function renderFrame() {
            if (isHeroVisible) {
                ctx.clearRect(0, 0, width, height);

                time += 0.012;

                // Update dynamic harmonic wave target if active
                if (currentShape === 'harmonic') {
                    targetVertices = generateShapeCoordinates('harmonic', time);
                }

                // Smoothly interpolate vertices toward target shape
                for (let i = 0; i < currentVertices.length; i++) {
                    const cur = currentVertices[i];
                    const tgt = targetVertices[i] || cur;
                    cur.x += (tgt.x - cur.x) * 0.085;
                    cur.y += (tgt.y - cur.y) * 0.085;
                    cur.z += (tgt.z - cur.z) * 0.085;
                }

                // Auto-rotate + mouse parallax
                if (!prefersReducedMotion) {
                    rotY += 0.0038;
                    rotX += 0.0014;
                }

                const effRotY = rotY + targetMouseX;
                const effRotX = rotX + targetMouseY;

                const cosY = Math.cos(effRotY);
                const sinY = Math.sin(effRotY);
                const cosX = Math.cos(effRotX);
                const sinX = Math.sin(effRotX);

                // Position 3D manifold slightly toward the right-center on wide screens
                const centerX = width > 1050 ? width * 0.62 : width * 0.5;
                const centerY = height * 0.48;
                const fov = Math.min(width, height) * 0.72;

                // Draw subtle floating ambient mathematical dust
                ambientParticles.forEach((p) => {
                    p.y -= p.speed * 18;
                    if (p.y < -280) p.y = 280;

                    const proj = project3D(p.x, p.y, p.z, width * 0.5, height * 0.5, fov);
                    ctx.beginPath();
                    ctx.arc(proj.px, proj.py, p.size * proj.scale, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(216, 183, 110, 0.22)';
                    ctx.fill();
                });

                // Transform and project manifold vertices
                const projected = currentVertices.map((v) => {
                    // Rotate around Y
                    const x1 = v.x * cosY - v.z * sinY;
                    const z1 = v.z * cosY + v.x * sinY;
                    // Rotate around X
                    const y2 = v.y * cosX - z1 * sinX;
                    const z2 = z1 * cosX + v.y * sinX;

                    return {
                        ...project3D(x1, y2, z2, centerX, centerY, fov),
                        ring: v.ring
                    };
                });

                // Draw 3D wireframe edges with depth-based alpha
                ctx.lineWidth = 1;
                for (let i = 0; i < edges.length; i++) {
                    const [aIdx, bIdx] = edges[i];
                    const a = projected[aIdx];
                    const b = projected[bIdx];
                    if (!a || !b) continue;

                    const avgZ = (a.z + b.z) * 0.5;
                    const depthAlpha = Math.max(0.04, Math.min(0.34, (220 - avgZ) / 420));

                    ctx.beginPath();
                    ctx.moveTo(a.px, a.py);
                    ctx.lineTo(b.px, b.py);
                    ctx.strokeStyle = `rgba(197, 160, 89, ${depthAlpha.toFixed(3)})`;
                    ctx.stroke();
                }

                // Draw 3D vertices sorted back-to-front
                for (let i = 0; i < projected.length; i++) {
                    const p = projected[i];
                    const depthFactor = Math.max(0.15, Math.min(0.95, (230 - p.z) / 420));
                    const radius = Math.max(1.1, (p.ring === 0 ? 2.4 : 1.7) * p.scale);

                    ctx.beginPath();
                    ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
                    ctx.fillStyle =
                        p.ring === 0
                            ? `rgba(229, 202, 153, ${depthFactor.toFixed(3)})`
                            : `rgba(130, 205, 195, ${(depthFactor * 0.78).toFixed(3)})`;
                    ctx.fill();
                }
            }

            if (!prefersReducedMotion) {
                requestAnimationFrame(renderFrame);
            }
        }

        resizeCanvas();
        initGeometry();
        renderFrame();

        window.addEventListener('resize', () => {
            resizeCanvas();
            if (prefersReducedMotion) {
                renderFrame();
            }
        });
    }

    /* ========================================================================
       6. COPY EMAIL BUTTON HANDLER
       ======================================================================== */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-copy') || 'marufshakilahmed@gmail.com';
            const span = copyEmailBtn.querySelector('span');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    if (span) span.textContent = 'Copied!';
                    setTimeout(() => {
                        if (span) span.textContent = 'Copy';
                    }, 2200);
                });
            }
        });
    }

    /* ========================================================================
       7. FOOTER CURRENT YEAR
       ======================================================================== */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
});
