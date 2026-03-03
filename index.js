// 1. DROPDOWN MENU TOGGLE
const menuBtn = document.getElementById('menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

menuBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents page jump
    if (dropdownMenu.classList.contains('dropdown-hidden')) {
        dropdownMenu.classList.remove('dropdown-hidden');
        dropdownMenu.classList.add('dropdown-visible');
    } else {
        dropdownMenu.classList.remove('dropdown-visible');
        dropdownMenu.classList.add('dropdown-hidden');
    }
});

// 2. VIEW PROJECTS BUTTON SMOOTH SCROLL
const viewProjectsBtn = document.getElementById('view-projects-btn');
if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', () => {
        document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
    });
}

// 3. DOWNLOAD CV BUTTON
const cvBtn = document.getElementById('cv-btn');
if (cvBtn) {
    cvBtn.addEventListener('click', () => {
        // Replace 'Injamam_CV.pdf' with the actual name of your PDF file in your folder
        window.open('Injamam_CV.pdf', '_blank'); 
    });
}
// 4. GOOGLE SHEETS FORM SUBMISSION
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');

// PASTE YOUR URL HERE!
const scriptURL = 'https://script.google.com/macros/s/AKfycbz95jTdrEb9u8DLhHKe6DY3tCSiI_wIuySZ10UOnlM9XWl1kaY0EtS94qlHLurbqvT6Fw/exec';

if(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.innerHTML = "SENDING..."; // Changes button text while loading
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                submitBtn.innerHTML = "MESSAGE SENT!";
                submitBtn.style.backgroundColor = "#fff";
                form.reset(); // Clears the form
                setTimeout(() => {
                    submitBtn.innerHTML = "SUBMIT MESSAGE";
                    submitBtn.style.backgroundColor = "#c4ff00";
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitBtn.innerHTML = "ERROR. TRY AGAIN.";
            });
    });
}