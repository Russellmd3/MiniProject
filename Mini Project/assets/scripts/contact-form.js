document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been submitted.\nEmail: ${email}\nMessage: ${message}\n\n(Note: This is a demo - no real email sent yet!)`);
            form.reset();
        } else {
            alert('Please fill out all fields!');
        }
    });
});