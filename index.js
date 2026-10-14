const skills = [
    { name: 'HTML', percentage: 95, category: 'frontend' },
    { name: 'CSS', percentage: 90, category: 'frontend' },
    { name: 'Javascript', percentage: 80, category: 'frontend' },
    { name: 'React', percentage: 10, category: 'frontend' },
    { name: 'Typescript', percentage: 40, category: 'frontend' },
    { name: 'Next.js', percentage: 20, category: 'frontend' },
    { name: 'Node.js', percentage: 45, category: 'backend' },
    { name: 'Express.js', percentage: 30, category: 'backend' },
    { name: 'MongoDB', percentage: 70, category: 'backend' },
    { name: 'PHP', percentage: 85, category: 'backend' },
    { name: 'Python', percentage: 70, category: 'backend' },
    { name: 'Kotlin', percentage: 95, category: 'app' },
    { name: 'Flutter', percentage: 10, category: 'app' },
    { name: 'MySQL', percentage: 90, category: 'database' },
    { name: 'Firebase', percentage: 85, category: 'database' },
    { name: 'Git/Github', percentage: 85, category: 'tools' },
    { name: 'Figma', percentage: 60, category: 'tools' },
    { name: 'Pixellab', percentage: 90, category: 'tools' },
    { name: 'Canva', percentage: 85, category: 'tools' },
    { name: 'Android Studio', percentage: 96, category: 'tools' },
    { name: 'VS Code', percentage: 90, category: 'tools' },
];

const tabs = document.querySelectorAll('.tab');
const skillsGrid = document.getElementById('skillsGrid');

function renderSkills(filter = 'all') {
    const filteredSkills = filter === 'all'
        ? skills
        : skills.filter(skill => skill.category === filter);

    skillsGrid.innerHTML = filteredSkills.map((skill, index) => `
        <div class="skill-card">
            <h3>${skill.name}</h3>
            <div class="progress-container">
                <div class="progress-bar" data-percentage="${skill.percentage}"></div>
            </div>
            <div class="percentage">${skill.percentage}%</div>
        </div>
    `).join('');

    requestAnimationFrame(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = bar.dataset.percentage + '%';
        });
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkills(tab.dataset.filter);
    });
});

renderSkills();

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

function updateThemeImages(theme) {
    document.querySelectorAll('img[data-dark-src]').forEach(img => {
        const darkSrc = img.dataset.darkSrc;
        const lightSrc = img.dataset.lightSrc;
        if (theme === 'light' && lightSrc) {
            img.src = lightSrc;
        } else if (darkSrc) {
            img.src = darkSrc;
        }
    });
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('portfolioTheme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        themeIcon.textContent = '☀️';
        localStorage.setItem('portfolioTheme', 'dark');
    }
    updateThemeImages(theme);
}

const initialTheme = localStorage.getItem('portfolioTheme') || 'dark';
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(nextTheme);
});

const roles = [
    'an Android App Developer',
    'a Full-Stack Web Developer',
    'an UI/UX Enthusiast',
    'a Graphics Designer',
];

const roleText = document.querySelector('.typing-roles');
let roleIndex = 0;
let letterIndex = 0;
let typingForward = true;

function updateTyping() {
    if (!roleText) return;

    const currentRole = roles[roleIndex];
    if (typingForward) {
        roleText.textContent = currentRole.slice(0, letterIndex + 1);
        letterIndex += 1;
        if (letterIndex === currentRole.length) {
            typingForward = false;
            setTimeout(updateTyping, 1800);
            return;
        }
    } else {
        roleText.textContent = currentRole.slice(0, letterIndex - 1);
        letterIndex -= 1;
        if (letterIndex === 0) {
            typingForward = true;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(updateTyping, typingForward ? 90 : 45);
}

updateTyping();

const homeSection = document.querySelector('.home');
const bubbleLayer = document.querySelector('.home-orbs');
const bubbleColors = ['95, 151, 255', '138, 72, 255', '60, 220, 232'];
const bubbles = [];
const bubblePairStates = new Map();
const minimumBubbleCount = 4;
const maximumBubbleCount = 20;
const bubbleSeparationGap = 22;
const initialBubblePositions = [
    [0.12, 0.17],
    [0.86, 0.22],
    [0.23, 0.78],
    [0.82, 0.78],
];
let nextBubbleId = 0;
let bubbleFrame = 0;
let previousBubbleTime = 0;
let bubbleLayerVisible = false;
let pointerInsideHero = false;
let pointerX = 0;
let pointerY = 0;
let bubbleCycleMode = 'grow';

function addBubble(element, x, y, vx, vy) {
    const radius = element.offsetWidth / 2;
    const bubble = {
        id: nextBubbleId++,
        element,
        radius,
        x,
        y,
        vx,
        vy,
    };
    bubbles.push(bubble);
    placeBubble(bubble);
    return bubble;
}

function placeBubble(bubble) {
    bubble.element.style.setProperty('--bubble-x', `${bubble.x - bubble.radius}px`);
    bubble.element.style.setProperty('--bubble-y', `${bubble.y - bubble.radius}px`);
}

function bubblePairKey(first, second) {
    return `${Math.min(first.id, second.id)}:${Math.max(first.id, second.id)}`;
}

function createCollisionEffect(x, y) {
    const effect = document.createElement('span');
    effect.className = 'bubble-impact';
    effect.setAttribute('aria-hidden', 'true');
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.innerHTML = '<i class="impact-ripple"></i><i class="impact-ripple impact-ripple-secondary"></i>' +
        Array.from({ length: 6 }, (_, index) => `<i class="impact-droplet impact-droplet-${index + 1}"></i>`).join('');
    bubbleLayer.appendChild(effect);
    effect.addEventListener('animationend', event => {
        if (event.target === effect) effect.remove();
    });
}

function createChildBubble(x, y, directionX, directionY) {
    if (bubbles.length >= maximumBubbleCount) return;

    const size = 40 + Math.random() * 30;
    const element = document.createElement('span');
    element.className = 'orb orb-spawned orb-growing';
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.setProperty('--orb-tint', bubbleColors[Math.floor(Math.random() * bubbleColors.length)]);
    bubbleLayer.appendChild(element);

    const speed = 65 + Math.random() * 35;
    const drift = (Math.random() - 0.5) * 45;
    const child = addBubble(element, x, y, directionX * speed - directionY * drift, directionY * speed + directionX * drift);
    element.addEventListener('animationend', () => element.classList.remove('orb-growing'), { once: true });

    // The new bubble starts at the impact point. Treat initial overlaps as part
    // of this impact so they don't trigger an extra burst on the next frame.
    bubbles.forEach(other => {
        if (other.id === child.id) return;
        const distance = Math.hypot(child.x - other.x, child.y - other.y);
        if (distance < child.radius + other.radius + bubbleSeparationGap) {
            bubblePairStates.set(bubblePairKey(child, other), { armed: false });
        }
    });
}

function popBubble(bubble) {
    const index = bubbles.indexOf(bubble);
    if (index === -1 || bubbles.length <= minimumBubbleCount) return;

    bubbles.splice(index, 1);
    for (const pairKey of bubblePairStates.keys()) {
        if (pairKey.split(':').includes(String(bubble.id))) bubblePairStates.delete(pairKey);
    }

    bubble.element.classList.add('orb-popping');
    bubble.element.addEventListener('animationend', () => bubble.element.remove(), { once: true });
}

function handleBubbleCollision(collision) {
    const { first, second, x, y, normalX, normalY } = collision;
    if (!bubbles.includes(first) || !bubbles.includes(second)) return;

    createCollisionEffect(x, y);
    if (bubbleCycleMode === 'grow') {
        if (bubbles.length < maximumBubbleCount) createChildBubble(x, y, normalX, normalY);
        if (bubbles.length >= maximumBubbleCount) bubbleCycleMode = 'shrink';
        return;
    }

    if (bubbles.length > minimumBubbleCount) {
        const bubbleToPop = first.id > second.id ? first : second;
        popBubble(bubbleToPop);
        if (bubbles.length <= minimumBubbleCount) bubbleCycleMode = 'grow';
    } else {
        bubbleCycleMode = 'grow';
    }
}

function resizeBubbles() {
    if (!bubbleLayer) return;
    const bounds = bubbleLayer.getBoundingClientRect();

    bubbles.forEach(bubble => {
        bubble.radius = bubble.element.offsetWidth / 2;
        bubble.x = Math.max(bubble.radius, Math.min(bounds.width - bubble.radius, bubble.x));
        bubble.y = Math.max(bubble.radius, Math.min(bounds.height - bubble.radius, bubble.y));
        placeBubble(bubble);
    });
}

function animateBubbles(time) {
    bubbleFrame = 0;
    if (!bubbleLayerVisible || document.hidden) return;

    const bounds = bubbleLayer.getBoundingClientRect();
    const deltaTime = previousBubbleTime ? Math.min((time - previousBubbleTime) / 1000, 0.04) : 0;
    previousBubbleTime = time;
    const collisionEvents = [];

    bubbles.forEach(bubble => {
        if (pointerInsideHero) {
            const dx = bubble.x - pointerX;
            const dy = bubble.y - pointerY;
            const distance = Math.hypot(dx, dy);
            const influence = 150;
            if (distance > 0 && distance < influence) {
                const force = (1 - distance / influence) * 75 * deltaTime;
                bubble.vx += (dx / distance) * force;
                bubble.vy += (dy / distance) * force;
            }
        }

        const speed = Math.hypot(bubble.vx, bubble.vy);
        const maxSpeed = 100;
        if (speed > maxSpeed) {
            bubble.vx = (bubble.vx / speed) * maxSpeed;
            bubble.vy = (bubble.vy / speed) * maxSpeed;
        }

        bubble.x += bubble.vx * deltaTime;
        bubble.y += bubble.vy * deltaTime;

        if (bubble.x < bubble.radius) {
            bubble.x = bubble.radius;
            bubble.vx = Math.abs(bubble.vx);
        } else if (bubble.x > bounds.width - bubble.radius) {
            bubble.x = bounds.width - bubble.radius;
            bubble.vx = -Math.abs(bubble.vx);
        }

        if (bubble.y < bubble.radius) {
            bubble.y = bubble.radius;
            bubble.vy = Math.abs(bubble.vy);
        } else if (bubble.y > bounds.height - bubble.radius) {
            bubble.y = bounds.height - bubble.radius;
            bubble.vy = -Math.abs(bubble.vy);
        }
    });

    for (let firstIndex = 0; firstIndex < bubbles.length; firstIndex += 1) {
        for (let secondIndex = firstIndex + 1; secondIndex < bubbles.length; secondIndex += 1) {
            const first = bubbles[firstIndex];
            const second = bubbles[secondIndex];
            const dx = second.x - first.x;
            const dy = second.y - first.y;
            const distance = Math.hypot(dx, dy);
            const minimumDistance = first.radius + second.radius;
            const pairKey = bubblePairKey(first, second);
            const pairState = bubblePairStates.get(pairKey);

            if (distance > minimumDistance + bubbleSeparationGap) {
                if (pairState) pairState.armed = true;
                continue;
            }
            if (distance >= minimumDistance) continue;

            const normalX = distance ? dx / distance : 1;
            const normalY = distance ? dy / distance : 0;

            if (!pairState || pairState.armed) {
                bubblePairStates.set(pairKey, { armed: false });
                collisionEvents.push({
                    first,
                    second,
                    x: first.x + normalX * first.radius,
                    y: first.y + normalY * first.radius,
                    normalX,
                    normalY,
                });
            }

            const overlap = minimumDistance - distance;
            first.x -= normalX * overlap / 2;
            first.y -= normalY * overlap / 2;
            second.x += normalX * overlap / 2;
            second.y += normalY * overlap / 2;

            const relativeVelocity = (second.vx - first.vx) * normalX + (second.vy - first.vy) * normalY;
            if (relativeVelocity < 0) {
                first.vx += relativeVelocity * normalX;
                first.vy += relativeVelocity * normalY;
                second.vx -= relativeVelocity * normalX;
                second.vy -= relativeVelocity * normalY;
            }

        }
    }

    bubbles.forEach(placeBubble);
    collisionEvents.forEach(handleBubbleCollision);
    bubbleFrame = requestAnimationFrame(animateBubbles);
}

if (homeSection && bubbleLayer) {
    const bounds = bubbleLayer.getBoundingClientRect();
    const initialVelocities = [[54, 31], [-42, 37], [38, -45], [-50, -29]];
    document.querySelectorAll('.home-orbs .orb').forEach((element, index) => {
        const [xRatio, yRatio] = initialBubblePositions[index] || [Math.random(), Math.random()];
        const [baseVx, baseVy] = initialVelocities[index] || [40, -35];
        const radius = element.offsetWidth / 2;
        const isNarrow = bounds.width <= 640;
        const x = isNarrow
            ? (index % 2 === 0 ? radius + 8 : bounds.width - radius - 8)
            : bounds.width * xRatio;
        const yRatioForViewport = isNarrow ? [0.11, 0.18, 0.84, 0.9][index] : yRatio;
        const y = Math.max(radius + 8, Math.min(bounds.height - radius - 8, bounds.height * yRatioForViewport));
        const velocityScale = isNarrow ? 0.72 : 1;
        addBubble(element, x, y, baseVx * velocityScale, baseVy * velocityScale);
    });

    homeSection.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        const layerBounds = bubbleLayer.getBoundingClientRect();
        pointerX = event.clientX - layerBounds.left;
        pointerY = event.clientY - layerBounds.top;
        pointerInsideHero = true;
    });

    homeSection.addEventListener('pointerleave', () => {
        pointerInsideHero = false;
    });

    const bubbleObserver = new IntersectionObserver(([entry]) => {
        bubbleLayerVisible = entry.isIntersecting;
        if (bubbleLayerVisible && !document.hidden && !bubbleFrame) {
            previousBubbleTime = 0;
            bubbleFrame = requestAnimationFrame(animateBubbles);
        } else if (!bubbleLayerVisible && bubbleFrame) {
            cancelAnimationFrame(bubbleFrame);
            bubbleFrame = 0;
        }
    });
    bubbleObserver.observe(homeSection);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && bubbleFrame) {
            cancelAnimationFrame(bubbleFrame);
            bubbleFrame = 0;
        } else if (!document.hidden && bubbleLayerVisible && !bubbleFrame) {
            previousBubbleTime = 0;
            bubbleFrame = requestAnimationFrame(animateBubbles);
        }
    });
    window.addEventListener('resize', resizeBubbles);
}

const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(link.getAttribute('href') === `#${entry.target.id}`, true);
                if (link.getAttribute('href') !== `#${entry.target.id}`) {
                    link.classList.remove('active');
                }
            });
            const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${entry.target.id}`);
            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });
}, { threshold: 0.45 });

sections.forEach(section => sectionObserver.observe(section));

const header = document.querySelector('.site-header');
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 120) {
        header.classList.remove('visible');
    } else {
        header.classList.add('visible');
    }
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

const navToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.nav-links');
const navClose = document.querySelector('.nav-close');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-nav');
});

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-nav');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-nav');
    });
});

const showMoreBtn = document.querySelector('.show-more-btn');
const projectGrid = document.querySelector('.project-grid');
const hiddenProjectCards = document.querySelectorAll('.project-card.hidden-card');

if (showMoreBtn && projectGrid) {
    showMoreBtn.addEventListener('click', event => {
        event.preventDefault();
        const isExpanded = projectGrid.classList.toggle('show-all');
        showMoreBtn.textContent = isExpanded ? 'Show Less' : 'Show More';

        hiddenProjectCards.forEach(card => {
            card.classList.toggle('hidden-card', !isExpanded);
        });

        if (isExpanded && hiddenProjectCards.length) {
            hiddenProjectCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
        navMenu.classList.remove('show-nav');
    }
});
