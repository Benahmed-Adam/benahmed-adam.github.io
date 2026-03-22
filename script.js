const titles = ["Développeur C++", "Développeur PHP", "Étudiant I.T.", "Développeur BackEnd"];
let titleIndex = 0, charIndex = 0, isDeleting = false;
const typeElement = document.getElementById('typewriter');

function typeWriter() {
    const current = titles[titleIndex];
    
    if (isDeleting) { 
        typeElement.textContent = current.substring(0, charIndex - 1); charIndex--; 
    } else { 
        typeElement.textContent = current.substring(0, charIndex + 1); charIndex++; 
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) { 
        speed = 2000; isDeleting = true; 
    } else if (isDeleting && charIndex === 0) { 
        isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; speed = 500; 
    }
    setTimeout(typeWriter, speed);
}

function updateClock() { 
    document.getElementById('clock').textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); 
}

let activeSection = null;

function setFocus(section) {
    const allCards = document.querySelectorAll('[data-section]');
    
    if (activeSection === section) { 
        allCards.forEach(c => c.classList.remove('blur-mode', 'focus-mode')); 
        activeSection = null; 
        return; 
    }
    
    activeSection = section;
    let targetElement = null;
    
    allCards.forEach(c => { 
        if (c.dataset.section === section) { 
            c.classList.remove('blur-mode'); 
            c.classList.add('focus-mode'); 
            if (!targetElement) targetElement = c;
        } else { 
            c.classList.remove('focus-mode'); 
            c.classList.add('blur-mode'); 
        } 
    });

    if (targetElement) {
        if (section === 'about') {
            document.querySelector('.main-scroll').scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'projects' && targetElement.previousElementSibling && targetElement.previousElementSibling.tagName === 'DIV') {
                targetElement.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
                targetElement.scrollIntoView({ behavior: 'smooth', block: section === 'stack' ? 'center' : 'start' });
        }
    }
}

document.addEventListener('click', (e) => { 
    if (!e.target.closest('[data-section]') && !e.target.closest('button')) { 
        document.querySelectorAll('[data-section]').forEach(c => c.classList.remove('blur-mode', 'focus-mode')); 
        activeSection = null; 
    } 
});

document.querySelectorAll('.group').forEach(card => { 
    const video = card.querySelector('video'); 
    if(video) { 
        card.addEventListener('mouseenter', () => video.play().catch(e => {})); 
        card.addEventListener('mouseleave', () => video.pause()); 
    } 
});

const navTooltips = {
    'about': 'À propos de moi',
    'stack': 'Ma stack technique',
    'projects': 'Mes projets'
};

let tooltipTimeout = null;

document.querySelectorAll('button[class*="nav-btn"], nav button').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const match = this.getAttribute('onclick')?.match(/setFocus\('(\w+)'\)/);
        if (!match) return;
        const section = match[1];
        
        tooltipTimeout = setTimeout(() => {
            const tooltip = document.createElement('div');
            tooltip.className = 'nav-tooltip';
            tooltip.textContent = navTooltips[section];
            tooltip.id = 'active-tooltip';
            this.appendChild(tooltip);
            requestAnimationFrame(() => tooltip.classList.add('visible'));
        }, 250);
    });

    btn.addEventListener('mouseleave', function() {
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = null;
        }
        const tooltip = this.querySelector('.nav-tooltip');
        if (tooltip) {
            tooltip.classList.remove('visible');
            setTimeout(() => tooltip.remove(), 200);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => { 
    typeWriter(); 
    setInterval(updateClock, 1000); 
    updateClock(); 

    const backToTop = document.getElementById('backToTop');
    const mainScroll = document.querySelector('.main-scroll');
    
    mainScroll.addEventListener('scroll', () => {
        if (mainScroll.scrollTop > 300) {
            backToTop.classList.remove('opacity-0', 'pointer-events-none');
            backToTop.classList.add('opacity-100');
        } else {
            backToTop.classList.add('opacity-0', 'pointer-events-none');
            backToTop.classList.remove('opacity-100');
        }
    });
});