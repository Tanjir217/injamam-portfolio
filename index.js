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
// AUTO-CLOSE DROPDOWN ON LINK CLICK
// FORCED SAFARI SMOOTH SCROLL FOR DROPDOWN LINKS
const dropdownLinks = document.querySelectorAll('#dropdown-menu a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Stop the instant snap
        
        // Hide the menu
        dropdownMenu.classList.remove('dropdown-visible');
        dropdownMenu.classList.add('dropdown-hidden');
        
        // Get the target section ID (e.g., "#about")
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Force smooth scroll using JavaScript math
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
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
        window.open('documents/Injamamul Hoq.pdf', '_blank');
    });
}
// 4. GOOGLE SHEETS FORM SUBMISSION
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');

// PASTE YOUR URL HERE!
const scriptURL = 'https://script.google.com/macros/s/AKfycbz95jTdrEb9u8DLhHKe6DY3tCSiI_wIuySZ10UOnlM9XWl1kaY0EtS94qlHLurbqvT6Fw/exec';

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.innerHTML = "SENDING..."; // Changes button text while loading

        // Replace the old fetch() code with this inside your form listener
        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form),
            mode: 'no-cors' // This line forces the browser to bypass security blocks
        })
            .then(() => {
                submitBtn.innerHTML = "MESSAGE SENT!";
                submitBtn.style.backgroundColor = "#fff";
                form.reset();
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
// 5. SCROLL-TRIGGERED FLOATING MENU (DESKTOP)
const menuBtnContainer = document.getElementById('menu-btn');
const dropdownContainer = document.getElementById('dropdown-menu');

// 1. Identify all the dark sections on your website
const darkSections = document.querySelectorAll('#services, #contact-section, #footer-section');

window.addEventListener('scroll', () => {
    // Only run on desktop
    if (window.innerWidth > 768) {
        
        if (window.scrollY > 150) {
            menuBtnContainer.classList.add('floating-btn');
            dropdownContainer.classList.add('floating-dropdown');
            
            // --- THE RADAR: COLOR DETECT LOGIC ---
            // Get the exact vertical center of the floating button on the screen
            const btnRect = menuBtnContainer.getBoundingClientRect();
            const btnCenterY = btnRect.top + (btnRect.height / 2);
            
            let isOverDark = false;
            
            // Check if the button's center is currently inside the borders of any dark section
            darkSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (btnCenterY >= rect.top && btnCenterY <= rect.bottom) {
                    isOverDark = true;
                }
            });
            
            // If it's over a dark section, turn white. Otherwise, stay black.
            // If it's over a dark section, turn BOTH white. Otherwise, stay black.
            if (isOverDark) {
                menuBtnContainer.classList.add('floating-btn-light');
                dropdownContainer.classList.add('floating-dropdown-light'); // Added this
            } else {
                menuBtnContainer.classList.remove('floating-btn-light');
                dropdownContainer.classList.remove('floating-dropdown-light'); // Added this
            }
            // -------------------------------------
            
        }  else {
            // Reset everything when scrolled back to the absolute top
            menuBtnContainer.classList.remove('floating-btn');
            menuBtnContainer.classList.remove('floating-btn-light'); 
            
            dropdownContainer.classList.remove('floating-dropdown');
            dropdownContainer.classList.remove('floating-dropdown-light'); // Added this reset
            
            dropdownContainer.classList.remove('dropdown-visible');
            dropdownContainer.classList.add('dropdown-hidden');
        }
    }
});
// 6. SCROLLSPY (HIGHLIGHT ACTIVE MENU ITEM)
// Get all the sections and all the dropdown links
const allSections = document.querySelectorAll('#home, #about, #services, #works, #contact-section');
const allNavLinks = document.querySelectorAll('#dropdown-menu a, .mobile-bottom-nav a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    // Loop through each section to see where we are on the page
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        // We subtract 200 pixels so it highlights the next section right as it enters the screen
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    // Loop through the links and apply the active class
    allNavLinks.forEach(link => {
        // First, remove the active class from ALL links
        link.classList.remove('active-link');
        
        // Then, add the active class ONLY to the link that matches the current section
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active-link');
        }
    });
});