document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 1280) {
        if (e.target.tagName !== 'A') {
            //Move cursor
            document.querySelector('.cursor').style.cssText = `left: ${e.pageX - 15}px; top: ${e.pageY - 15}px;`;

            //Create the trail effect
            const trail = document.createElement('div');
            trail.classList.add('trail');
            trail.style.left = `${e.pageX + 5}px`;
            trail.style.top = `${e.pageY + 5}px`;
            document.body.appendChild(trail);
            
            //Remove the trail after 600ms
            setTimeout(() => trail.remove(), 600);
        } else {
            //Hide cursor when hovering over a link
            document.querySelector('.cursor').style.display = 'none';
        }
    } else {
        // Hide cursor on mobile
        document.querySelector('.cursor').style.display = 'none';
    }
});
