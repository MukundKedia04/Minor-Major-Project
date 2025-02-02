//Gsap Animation

gsap.from(".navbar", {
    invalidateOnRefresh: true,  // Reset the trigger on refresh to avoid any scroll issues
    opacity: 0,
    duration: 1,
})

gsap.from("#page1 .hero-text", {
    opacity: 1,
    y: 80,
    duration: 1,
    scrollTrigger: {
        trigger: "#page1",
        start: "top 30%",  // Trigger when page1 enters the viewport
        scrub: true,
    }
});

gsap.from("#page1 .map-container", {
    delay:1,
    opacity: 0,
    y: 80,
    duration: 2,
})

gsap.from("#page1 .image-container", {
    opacity: 0,
    delay:2,
    x: 30,
    duration: 1.5,
})

gsap.from("#page2", {
    // delay:0.5,
    y:300,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#page2",
        scroller: "body",  // Ensure the scroll is being controlled by the body
        //markers: true,  // Optional for debugging
        scale:0,
        start: "top 50%", // Trigger starts when the top of #page2 reaches 60% of the viewport height
        end:"top 50", 
        scrub: 5,
        once:true,
        invalidateOnRefresh: true,  // Reset the trigger on refresh to avoid any scroll issues
    }
})

gsap.from("#page3", {
    delay:0.5,
    y:300,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
        trigger: "#page3",
        scroller: "body",  // Ensure the scroll is being controlled by the body
        //markers: true,  // Optional for debugging
        scale:0,
        start: "top 50%", // Trigger starts when the top of #page2 reaches 60% of the viewport height
        end:"top 80",
        scrub: 3,
        // once:true,
        invalidateOnRefresh: true,  // Reset the trigger on refresh to avoid any scroll issues
    }
})

gsap.from("#page4", {
    delay:0.5,
    y:500,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
        trigger: "#page4",
        scroller: "body",  // Ensure the scroll is being controlled by the body
        //markers: true,  // Optional for debugging
        scale:0,
        start: "top 50%", // Trigger starts when the top of #page2 reaches 60% of the viewport height
        end:"top 80",
        scrub: 3,
        // once:true,
        invalidateOnRefresh: true,  // Reset the trigger on refresh to avoid any scroll issues
    }
})

gsap.from("#page5", {
    delay:0.5,
    y:500,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
        trigger: "#page4",
        scroller: "body",  // Ensure the scroll is being controlled by the body
       // markers: true,  // Optional for debugging
        scale:0,
        start: "top 50%", // Trigger starts when the top of #page2 reaches 60% of the viewport height
        end:"top 80",
        scrub: 3,
        // once:true,
        invalidateOnRefresh: true,  // Reset the trigger on refresh to avoid any scroll issues
    }
})




document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const toggleSwitch = document.querySelector('#checkbox');
    const logo = document.querySelector('#logo');
    
    // Toggle hamburger menu on click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Move auth buttons into nav-links when menu is open (for mobile)
        if (window.innerWidth <= 768) {
            if (navLinks.classList.contains('active')) {
                navLinks.appendChild(authButtons);
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dark Mode Toggle functionality
    const currentTheme = localStorage.getItem('theme');

    // If a theme is saved in localStorage, apply it
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            logo.src = 'img/Logo LL(Black).png';  // White logo for dark mode
        } else {
            logo.src = 'img/Logo LL(White).png';  // Black logo for light mode
        }
    } else {
        // Default theme (light) if nothing is saved in localStorage
        document.documentElement.setAttribute('data-theme', 'light');
        logo.src = 'img/Logo LL(Black).png';  // Black logo for light mode
    }

    // Function to switch theme and logo when the checkbox is toggled
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            logo.src = 'img/Logo LL(Black).png';  // White logo for dark mode
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            logo.src = 'img/Logo LL(White).png';  // Black logo for light mode
        }
    }

    // Add event listener to toggle the theme
    toggleSwitch.addEventListener('change', switchTheme);

    // Initialize map and other features
    initializeMap();
});

// // Initialize the map for Mappls API
// function initMap1() {
//     map = new mappls.Map('map', {center:[28.638698386592438,77.27604556863412]});
// }

// // Initialize MapmyIndia Map with autocomplete for pickup and dropoff locations
// function initializeMap() {
//     const map = new MapmyIndia.Map('map', {
//         center: [28.61, 77.23], // Center of Delhi
//         zoom: 12,
//         search: false
//     });

//     // Pickup location autocomplete
//     const pickupInput = document.getElementById('pickup-input');
//     const options = {
//         types: ['(cities)'],
//         componentRestrictions: { country: 'in' },
//         fields: ['formatted_address', 'geometry', 'name']
//     };
//     const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, options);

//     pickupAutocomplete.addListener('place_changed', function () {
//         const place = pickupAutocomplete.getPlace();
//         if (!place.geometry) {
//             pickupInput.value = '';
//             return;
//         }
//         pickupInput.value = place.formatted_address;
//         console.log('Pickup Location:', {
//             address: place.formatted_address,
//             lat: place.geometry.location.lat(),
//             lng: place.geometry.location.lng()
//         });
//     });

//     // Prevent form submission on enter
//     pickupInput.addEventListener('keydown', function (e) {
//         if (e.key === 'Enter') e.preventDefault();
//     });

//     // Dropoff location autocomplete
//     const dropoffInput = document.getElementById('dropoff-input');
//     const dropoffAutocomplete = new google.places.Autocomplete(dropoffInput, {
//         types: ['(cities)'],
//         componentRestrictions: { country: 'in' }
//     });

//     dropoffAutocomplete.addListener('place_changed', function () {
//         const place = dropoffAutocomplete.getPlace();
//         if (!place.geometry) {
//             dropoffInput.value = '';
//             return;
//         }
//         dropoffInput.value = place.formatted_address;
//     });
// }

// Captain Registration Redirection
document.getElementById('registerButton').addEventListener('click', function () {
    window.location.href = 'Registration.html';
});

document.getElementById('loginButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});
