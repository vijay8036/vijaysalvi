// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    prevent: (node) => node.classList.contains('dialog-widget-content')
});

// Smooth scroll animation loop
function lenisScroll() {
    lenis.on('scroll', () => { }); // Placeholder for scroll event listener
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Function to set the header height dynamically in a CSS variable
function setHeaderHeight() {
    jQuery('body').css('--headerHeight', jQuery('header').outerHeight() + 'px');
}
const progressBar = document.querySelector('.loader-bar');
const loader = document.querySelector('.loader');
const loading = document.querySelector('.loading');
const loaderText = document.querySelector('.loader-text');
const sal = document.querySelector('.sal');
const vi = document.querySelector('.vi');
const jay = document.querySelector('.jay');
// Reusable function for animating the progress bar and loader
function animateProgressBar(barElement, delay = 0.5) {
    gsap.fromTo(barElement, {}, {
        duration: 1,
        delay: delay,
        ease: "expo.inOut",
        onComplete: () => {
            const tl = gsap.timeline();

            tl.to(loading, {
                scale: 1, opacity: 1, duration: 1
            })
                .to(sal, { opacity: 1, x: 0, duration: 1 }, 0.25)
                .to(jay, { opacity: 1, x: 0, duration: 1 }, 0.25)
                .to(vi, { y: 0, duration: 1.5, ease: "expo.inOut", onComplete: () => loader.classList.add('active') }, 0.25)
                .to(loading, {
                    scale: 300, duration: 1.5,  ease: "expo.inOut",
                    onComplete: function () {
                      loader.style.display = 'none'
                      jQuery('body').addClass("activepage");
                    //   const
                    const tl2 = gsap.timeline();
                      tl2.to(document.querySelector('.hero-title'), { y: 0, duration: 1 }, 1)
                      tl2.to(document.querySelector('.hero-title-name'), {  y: 0, duration: 1 }, 1.2)
                      tl2.to(document.querySelector('.subtitle'), { 
                        opacity: 1,
                        visibility: 'visible',
                        x:0,
                        filter: 'blur(0px)',                         
                        duration: 0.1,
                      }, 1.2)
                    
                    //   logo animation

                        setInterval(() => {
                            jQuery('.logo-text').toggleClass("active")
                        }, 8000);

                    }
                }, 3);
        }
    });
}

// Function to start the page loading counter and animations
function startPageLoadingCounter() {
    let count = 0;
    const counterInterval = setInterval(() => {
        loaderText.textContent = `${++count}%`;

        if (count === 100) {
            clearInterval(counterInterval);
            gsap.to(loaderText, {
                opacity: 0, duration: 0.5, ease: "power1.inOut",
                onComplete: () => loaderText.style.display = 'none'
            });

            // Start the animations after the counter finishes
            animateProgressBar(progressBar);
        }
    }, 30); // Adjust speed to control the counter's duration
}

// jQuery document ready function
jQuery(document).ready(function ($) {
    lenisScroll();       // Initialize smooth scrolling
    // setHeaderHeight();   // Set initial header height
    startPageLoadingCounter(); // Start page loading animations

    // Smooth scroll for back-to-top button
    jQuery('#back-to-top a').click(function (e) {
        e.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, 1000); // 1-second smooth scroll
    });
});

// Adjust header height on window resize
// jQuery(window).on('resize', setHeaderHeight);

// Elements used in animations


// Header add class on scroll



document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor__circle');
    const sectionMain = document.querySelector('.round-circal');

    const mouse = { x: -100, y: -100 }; // Set initial position off-screen
    let isMoving = false;
    gsap.set(cursor, { xPercent: -20, yPercent: 0 });

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        isMoving = true; // Mouse is moving
        // Update the HTML elements
        document.querySelector('.p-x').textContent = mouse.x.toFixed(2);
        document.querySelector('.p-y').textContent = mouse.y.toFixed(2);
    }

    const stopMoving = () => {
        isMoving = false; // Mouse is not moving (e.g., after click)
    }

    window.addEventListener('mousemove', updateCoordinates);

    const x = localStorage.getItem('cursorX');
    const y = localStorage.getItem('cursorY');

    if (x !== null && y !== null) {
        gsap.set(cursor, { x: x, y: y });
    }

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('cursorX', mouse.x);
        localStorage.setItem('cursorY', mouse.y);
    });

    function animateCursor() {
        if (isMoving) {
            gsap.to(cursor, { duration: 0.5, x: mouse.x, y: mouse.y, ease: 'power2.out' });
        }
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    window.addEventListener('mousedown', stopMoving);
    window.addEventListener('mouseup', updateCoordinates); // Resume tracking after mouseup


    jQuery('.round-circal').on({
        mouseenter: function() {
            // Add the 'active' class when the mouse enters
            jQuery('.round-shap-cursar').addClass('cursaractive');
        },
        mouseleave: function() {
            // Remove the 'active' class when the mouse leaves
            jQuery('.round-shap-cursar').removeClass('cursaractive');
        },
        mousemove: function(event) {
            // Get the X and Y coordinates relative to the section
            let x = event.pageX - jQuery(this).offset().left;
            let y = event.pageY - jQuery(this).offset().top;

            // Update the section content with X and Y
            jQuery('.round-shap-cursar').css({ top: y + 'px', left: x + 'px' });
        }
    });

});

jQuery(document).ready(function ($) {
   // Reusable function to handle adding and removing cursor classes
    function handleCursorHover(selector, addClass, removeClass) {
        $(selector).hover(
            function () {
                $('#cursor').addClass(addClass).removeClass(removeClass);
            },
            function () {
                $('#cursor').removeClass(addClass);
            }
        );
    }

    // General hover effect for all 'a' elements, excluding those inside '.recent-work-links'
    $('a').not('.recent-work-links a').hover(
        function () {
            $('#cursor').addClass('overlay')
                .removeClass('explore-overlay service-overlay case-overlay overlayHide');
        },
        function () {
            $('#cursor').removeClass('overlay');
        }
    );

    // Specific hover effects (selector, addClass, removeClass)

    handleCursorHover('.splide__track', 'explore-overlay', 'overlay');
    handleCursorHover('.sub-form', 'overlay', '');
    handleCursorHover('.service-card', 'service-overlay', 'overlay');
    handleCursorHover('.work-hover', 'work-overlay', 'overlay');
    handleCursorHover('.cs-card-box', 'case-overlay', 'overlay');
    handleCursorHover('.testimonial-lists .paginationSlider .slick-track', 'swipe-overlay', 'overlay');
    handleCursorHover('.round-circal', 'overlayHide', 'overlay');
});



function animTransformY(triggerElemet, valueY) {

    var point = $(triggerElemet).hasClass('top-point')
        ? { start: 'top top', end: 'bottom top' }
        : { start: 'top bottom', end: 'bottom top' };

    gsap.fromTo(
        triggerElemet,
        { y: '0vh' }, // Start BgColor
        {
            y: valueY, // End BgColor
            duration: 0.5, // Duration for each character
            scrollTrigger: {
                trigger: triggerElemet, // Animate when this line enters the viewport
                start: point.start, // Start animation when the line reaches the center of the viewport
                end: point.end, // End animation when the line leaves the center
                scrub: true,  // Smooth scrubbing effect
                // markers: true // Set to true for debugging
            }
        }
    );
}

// Loop to apply transformation from 1 to 100
for (let i = 1; i <= 100; i++) {
    let selector = `.down-${i}`;  // Create selector like .down-1, .down-2, ..., .down-100
    let value = `${i}vh`;         // Create value like 1vh, 2vh, ..., 100vh
    if ($(selector).length) {
        animTransformY(selector, value);
    }
}

// Loop to apply transformation from 1 to 100
for (let i = 1; i <= 100; i++) {
    let selector = `.up-${i}`;  // Create selector like .up-1, .up-2, ..., .up-100
    let value = `${-i}vh`;         // Create value like 1vh, 2vh, ..., 100vh
    if ($(selector).length) {
        animTransformY(selector, value);
    }
}



// 

function animateText(elementSelector, gsapTriggerSelector) {
    // Split text into lines
    const splitText = new SplitType(elementSelector, { types: 'lines' });

    // Get the lines array
    const lines = document.querySelectorAll(`${elementSelector} .line`);

    lines.forEach(line => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('line-wrapper');

        // Insert the wrapper before the line and append the line inside the wrapper
        line.parentNode.insertBefore(wrapperDiv, line);
        wrapperDiv.appendChild(line);
    });

    // Animate the lines
    gsap.utils.toArray(gsapTriggerSelector).forEach(section => {
        gsap.from(section.querySelectorAll('.line'), {
            scrollTrigger: {
                trigger: section,
                start: "top 55%",
                end: "bottom 55%",
                toggleActions: "play none none reverse",
                // markers:true
            },
            duration: 1,
            yPercent: 200,
            ease: "power4.out",
            stagger: 0.15,
            opacity: 1,
            onStart: function () {
                // Add the 'active' class to each line when the animation starts
                section.classList.add('activeAnimation');
            }
        });
    });
}
animateText('.title-animation', '.title-animation');


// Loop through each .bg-change section
document.querySelectorAll('.bg-change-dark').forEach((section, index) => {
    gsap.to("body", {
      "--white": "#000000", // Alternate new values
      "--black": "#ffffff", // Alternate new values
      "--line-light": "#ffffff29", // Alternate new values
      scrollTrigger: {
        trigger: section,
        start: "top center", // Trigger when the section reaches the center of the viewport
        end: "bottom center", // Reset when it leaves the center
        toggleActions: "play reverse play reverse", // Smooth transitions in and out
        // markers: true, // Enable markers for debugging
      },
      duration: 1, // Smoothly transition over 1 second
      ease: "power2.out",
    });
  });

  

  jQuery('.color-open').on("click",function(){
    jQuery('.colorbox').toggleClass("show");
});
jQuery('.colorbox ul li').on("click",function(){
    var thisColor = jQuery(this).data("color")
    jQuery('html').css("--color-primary","var("+ thisColor +")")
});
// document.querySelectorAll('.bg-change-light').forEach((section, index) => {
//     gsap.to("body", {
//       "--white": "#ffffff", // Alternate new values
//       "--black": "#000000", // Alternate new values
//       scrollTrigger: {
//         trigger: section,
//         start: "top 55%", // Trigger when the section reaches the center of the viewport
//         // end: "bottom center", // Reset when it leaves the center
//         toggleActions: "play none none reverse", // Smooth transitions in and out
//         markers: true, // Enable markers for debugging
//       },
//       duration: 1, // Smoothly transition over 1 second
//       ease: "power2.out",
//     });
//   });