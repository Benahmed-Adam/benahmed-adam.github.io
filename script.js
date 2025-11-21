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
        if (section === 'projects' && targetElement.previousElementSibling && targetElement.previousElementSibling.tagName === 'DIV') {
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

const videoCards = document.querySelectorAll('.group');
videoCards.forEach(card => { 
    const video = card.querySelector('video'); 
    if(video) { 
        card.addEventListener('mouseenter', () => video.play().catch(e => {})); 
        card.addEventListener('mouseleave', () => video.pause()); 
    } 
});

function copyEmail() { 
    navigator.clipboard.writeText("adam.benahmeed@gmail.com").then(() => { 
        const t = document.getElementById('toast'); 
        t.classList.remove('opacity-0', 'translate-y-[-20px]'); 
        setTimeout(() => t.classList.add('opacity-0', 'translate-y-[-20px]'), 3000); 
    }); 
}

document.addEventListener('DOMContentLoaded', () => { 
    typeWriter(); 
    setInterval(updateClock, 1000); 
    updateClock(); 
});