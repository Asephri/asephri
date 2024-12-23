document.addEventListener('mousemove', (e) => {
    if (e.target.tagName !== 'A') {
        document.querySelector('.cursor').style.cssText = `left: ${e.pageX - 15}px; top: ${e.pageY - 15}px;`;
        const trail = document.createElement('div');
        trail.classList.add('trail');
        trail.style.left = `${e.pageX + 5}px`;
        trail.style.top = `${e.pageY + 5}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 600);
    } else {
        document.querySelector('.cursor').style.display = 'none';
    }
});