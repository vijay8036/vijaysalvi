const lenis = new Lenis({
    prevent: (node) => node.classList.contains('dialog-widget-content')
})
// el.addEventListener('mouseenter', () => lenis.stop())
//     el.addEventListener('mouseleave', () => lenis.start())
function lenisScroll() {
    lenis.on('scroll', (e) => { })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
}

// Function to set the header height
function setHeaderHeight() {
    jQuery('body').css('--headerHeight', jQuery('header').outerHeight() + 'px');
}

jQuery(document).ready(function ($) {
    lenisScroll();
    setHeaderHeight();
});
jQuery(window).on('resize', function ($) {
    setHeaderHeight();
});

// banner script
const banners = document.querySelectorAll('.topbanner');
const subTitleBanner = document.querySelectorAll('.top-subtitle');
document.addEventListener('DOMContentLoaded', function () {


    // Common function to split text, wrap lines, and animate
    function topanimation(elementSelector, typesSplit) {
        // Split text into lines
        const splitChar = new SplitType(elementSelector, { types: typesSplit });
    }

    // Apply the common function to different elements
    topanimation('.topbanner div.elementor-heading-title', 'char');
    topanimation('.topbanner h2.elementor-heading-title', 'lines');
    
    if (window.innerWidth >= 992) {
        topanimation('.top-subtitle h1.elementor-heading-title', 'char');
        topanimation('.top-subtitle div.elementor-heading-title', 'char');
        topanimation('.top-subtitle h2.elementor-heading-title', 'lines');

    }else{
        topanimation('.top-subtitle h1.elementor-heading-title', 'word');
        topanimation('.top-subtitle div.elementor-heading-title', 'word');
        topanimation('.top-subtitle h2.elementor-heading-title', 'lines');
    }
    // Create a GSAP timeline and set it to repeat infinitely
    const tl = gsap.timeline({ repeat: -1 });

    banners.forEach((banner, index) => {

        const chars = banner.querySelectorAll('.char');
        const charLength = chars.length;
        // Dynamically calculate the delay based on the number of characters
        const delayValue = 100;  // Base delay in milliseconds

        // Loop through each character and set the --delay property with reverse order
        chars.forEach((char, index) => {
            char.style.setProperty('--delay', `${delayValue * (index + 1)}ms`);
            // Reverse the delay by subtracting the index from charLength
            char.style.setProperty('--revdelay', `${delayValue * (charLength - index)}ms`);
        });

        tl.to(banner, {
            duration: 0.5, // Time to fade in the class
            onStart: () => {
                // Remove active class from the previous banner
                const prevIndex = index === 0 ? banners.length - 1 : index - 1;
                banners[prevIndex].classList.remove('active');
                // Add active class to the current banner
            },
            onComplete: () => {
                gsap.delayedCall(1, () => {
                    banner.classList.add('active');
                });
            },
            delay: 4.5 // Stay active for 2 seconds (0.5 for transition + 1.5 delay)
        });
    });

    // Initial trigger for the first banner
    tl.play();

    
    subTitleBanner.forEach((banner, index) => {
        var chars
        if (window.innerWidth >= 992) {
             chars = banner.querySelectorAll('.char');
            
        }else{
             chars = banner.querySelectorAll('.word');

        }
        console.log(chars)
        const charLength = chars.length;
        // Dynamically calculate the delay based on the number of characters
        const delayValue = 100;  // Base delay in milliseconds

        // Loop through each character and set the --delay property with reverse order
        chars.forEach((char, index) => {
            char.style.setProperty('--delay', `${delayValue * (index + 1)}ms`);
            // Reverse the delay by subtracting the index from charLength
            char.style.setProperty('--revdelay', `${delayValue * (charLength - index)}ms`);
        });
    
    });
});

//End banner script

const progressBar = document.getElementById('loading-bar');
const progressBarBlack = document.getElementById('loading-bar-black');
// const heavyContent = document.getElementById('heavy-content');
const mainheader = document.querySelector('header');
const mainfooter = document.querySelector('footer');
const elementorPage = document.querySelector('#pagetop') || document.querySelector('.post');


// Reusable animation function
function animateProgressBar(barElement, delay = 0) {
    gsap.fromTo(barElement, { width: '0%' }, {
        width: '100%', duration: 1, delay: delay, ease: "expo.inOut", onComplete: function () {
            var tl = gsap.timeline();

            tl.to(barElement, {
                clipPath: 'inset(0 0 0 0)', height: '100%', duration: 1, ease: "expo.inOut"
            })
                .to(mainheader, {
                    opacity: 1, duration: 0.5, onStart: function () {
                        mainheader.style.display = 'block';
                    }, onComplete: function () {
                        mainheader.classList.add('animationActive');
                    }
                }, 0.5)
                .to(mainfooter, {
                    opacity: 1, duration: 0.5, onStart: function () {
                        mainfooter.style.display = 'block';
                    }
                }, 0.5)
                .to(elementorPage, {
                    opacity: 1, duration: 0.5, onStart: function () {
                        elementorPage.style.display = 'block';
                    }, onComplete: function () {
                        elementorPage.classList.add('pageAnimationActive');
                        if (banners.length) {
                            banners[0].classList.add('active');
                        }
                        if (subTitleBanner.length) {
                            subTitleBanner[0].classList.add('active');
                        }
                    }
                }, 0.5)
                .to(barElement, {
                    clipPath: 'inset(100% 0 0 0)', duration: 1, ease: "expo.inOut", onComplete: function () {
                        barElement.style.display = 'none';
                    }
                }, 0.25);
        }
    });
}

// Call the animation function for both bars
jQuery(document).ready(function ($) {
    animateProgressBar(progressBar);           // No delay for the first bar
    animateProgressBar(progressBarBlack, 0.1); // 0.1s delay for the black bar

    jQuery('#back-to-top a').click(function (e) {
        e.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, 1000); // 800ms for smooth scroll
    });
});

// Header add class on scroll
window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
        // header.classList.add('scrolled');
    } else {
        // header.classList.remove('scrolled');
    }
});


// Header add class on scroll



// document.addEventListener('DOMContentLoaded', function () {
//     const cursor = document.querySelector('#cursor');
//     const cursorCircle = cursor.querySelector('.cursor__circle');
//     const sectionMain = document.querySelector('.round-circal');

//     const mouse = { x: -100, y: -100 }; // Set initial position off-screen
//     let isMoving = false;
//     gsap.set(cursor, { xPercent: -50, yPercent: -50 });

//     const updateCoordinates = e => {
//         mouse.x = e.clientX;
//         mouse.y = e.clientY;
//         isMoving = true; // Mouse is moving
//     }

//     const stopMoving = () => {
//         isMoving = false; // Mouse is not moving (e.g., after click)
//     }

//     window.addEventListener('mousemove', updateCoordinates);

//     const x = localStorage.getItem('cursorX');
//     const y = localStorage.getItem('cursorY');

//     if (x !== null && y !== null) {
//         gsap.set(cursor, { x: x, y: y });
//     }

//     window.addEventListener('beforeunload', () => {
//         localStorage.setItem('cursorX', mouse.x);
//         localStorage.setItem('cursorY', mouse.y);
//     });

//     function animateCursor() {
//         if (isMoving) {
//             gsap.to(cursor, { duration: 0.5, x: mouse.x, y: mouse.y, ease: 'power2.out' });
//         }
//         requestAnimationFrame(animateCursor);
//     }

//     animateCursor();

//     window.addEventListener('mousedown', stopMoving);
//     window.addEventListener('mouseup', updateCoordinates); // Resume tracking after mouseup


//     jQuery('.round-circal').on({
//         mouseenter: function() {
//             // Add the 'active' class when the mouse enters
//             jQuery('.round-shap-cursar').addClass('cursaractive');
//         },
//         mouseleave: function() {
//             // Remove the 'active' class when the mouse leaves
//             jQuery('.round-shap-cursar').removeClass('cursaractive');
//         },
//         mousemove: function(event) {
//             // Get the X and Y coordinates relative to the section
//             let x = event.pageX - jQuery(this).offset().left;
//             let y = event.pageY - jQuery(this).offset().top;

//             // Update the section content with X and Y
//             jQuery('.round-shap-cursar').css({ top: y + 'px', left: x + 'px' });
//         }
//     });

// });

// jQuery(document).ready(function ($) {
//    // Reusable function to handle adding and removing cursor classes
//     function handleCursorHover(selector, addClass, removeClass) {
//         $(selector).hover(
//             function () {
//                 $('#cursor').addClass(addClass).removeClass(removeClass);
//             },
//             function () {
//                 $('#cursor').removeClass(addClass);
//             }
//         );
//     }

//     // General hover effect for all 'a' elements, excluding those inside '.recent-work-links'
//     $('a').not('.recent-work-links a').hover(
//         function () {
//             $('#cursor').addClass('overlay')
//                 .removeClass('explore-overlay service-overlay case-overlay overlayHide');
//         },
//         function () {
//             $('#cursor').removeClass('overlay');
//         }
//     );

//     // Specific hover effects (selector, addClass, removeClass)

//     handleCursorHover('.splide__track', 'explore-overlay', 'overlay');
//     handleCursorHover('.sub-form', 'overlay', '');
//     handleCursorHover('.service-card', 'service-overlay', 'overlay');
//     handleCursorHover('.work-hover', 'work-overlay', 'overlay');
//     handleCursorHover('.cs-card-box', 'case-overlay', 'overlay');
//     handleCursorHover('.testimonial-lists .paginationSlider .slick-track', 'swipe-overlay', 'overlay');
//     handleCursorHover('.round-circal', 'overlayHide', 'overlay');
// });


jQuery(function () {
    jQuery(".elementor-button").append("<span class='label label-important'></span>");
    jQuery('.elementor-button')
        .on('mouseenter', function (e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            jQuery(this).find('span.label').css({ top: relY, left: relX })
        })
        .on('mouseout', function (e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            jQuery(this).find('span.label').css({ top: relY, left: relX })
        });
});



jQuery(document).ready(function () {
    jQuery(".elementor-menu-toggle").on('click', function () {
        jQuery('body').toggleClass('menu-active');
        if (jQuery('body').hasClass("menu-active") == true) {
            // lenis.stop();
        } else {
            // lenis.start();
        }
    });
    // *************************  Round Circle Animation *************************

    let currentX = jQuery(window).width() / 2 - 25; // Start in the center
    let currentY = jQuery(window).height() / 2 - 25; // Start in the center

    function moveCircle() {
        let windowWidth = jQuery(window).width() - 50; // Circle width is 50px
        let windowHeight = jQuery(window).height() - 50; // Circle height is 50px

        // Set a maximum change distance to avoid large jumps
        let maxMoveDistance = 100;


        // Define the 20% and 80% limits for movement
        let minX = windowWidth * 0.2;
        let maxX = windowWidth * 0.8;
        let minY = windowHeight * 0.2;
        let maxY = windowHeight * 0.8;

        // Generate new positions within the 20% to 80% range
        let newX = Math.random() * (maxX - minX) + minX;
        let newY = Math.random() * (maxY - minY) + minY;

        // Animate the movement smoothly
        jQuery('.svgshap').animate({
            left: newX + 'px',
            top: newY + 'px'
        }, 3000, "swing"); // Smooth animation over 1.5 seconds with easing

        // Update current position
        currentX = newX;
        currentY = newY;
    }

    // Call the function every 1.5 seconds
    setInterval(moveCircle, 3000);

    // End  ************************* Round Circle Animation *************************

    // ************************* Service Card Animation *************************
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Get the heading content
        const heading = card.querySelector('.elementor-widget-heading').innerHTML;

        // Append the heading content to the text editor
        const textEditor = card.querySelector('.elementor-widget-text-editor');
        textEditor.innerHTML += heading;
    });

    jQuery('.service-card')
        .on('mouseenter', function (e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left + 'px',
                relY = e.pageY - parentOffset.top + 'px';
            jQuery(this).css({ '--stop': relY, '--sleft': relX })
        })
        .on('mouseout', function (e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left + 'px',
                relY = e.pageY - parentOffset.top + 'px';
            jQuery(this).css({ '--stop': relY, '--sleft': relX })
        });


    jQuery('.team-card')
        .on('mouseenter', function (e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left + 'px',
                relY = e.pageY - parentOffset.top + 'px';
            jQuery(this).css({ '--stop': relY, '--sleft': relX })
        })
        .on('mouseout', function (e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left + 'px',
                relY = e.pageY - parentOffset.top + 'px';
            jQuery(this).css({ '--stop': relY, '--sleft': relX })
        });
    jQuery('.team-card').each(function () {
        const titleHeight = jQuery(this).find('.team-title .elementor-heading-title').outerHeight();
        const detailsHeight = jQuery(this).find('.team-details').outerHeight();

        jQuery(this).css({
            '--hTitle': `${titleHeight}px`,
            '--hdetailshover': `${detailsHeight}px`,
            '--hdetails': '0px'
        });
    });

    // End ************************* Service Card Animation *************************


    // Set default value for CSS variable --y to 100% on page load
    document.querySelectorAll('.work-hover').forEach(item => {
        gsap.set(item, { "--y": '-100%' });

        item.addEventListener('mouseenter', () => {
            // console.log(item)
            gsap.to(item, {
                "--y": '0%',
                duration: 0.20,

                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', (e) => {
            const bounds = item.getBoundingClientRect();
            const mouseY = e.clientY;
            const exitTop = mouseY < bounds.top + bounds.height / 2;

            gsap.to(item, {
                "--y": exitTop ? '-100%' : '100%',
                duration: 0.20,
                ease: 'power2.out',
                delay: 0.10,
            });
        });
    });


    // Set default value for CSS variable --y to 100% on page load
    document.querySelectorAll('.list-box-hover').forEach(item => {
        gsap.set(item, { "--list-y": '-100%' });

        item.addEventListener('mouseenter', () => {
            console.log(item)
            gsap.to(item, {
                "--list-y": '0%',
                duration: 0.20,

                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', (e) => {
            const bounds = item.getBoundingClientRect();
            const mouseY = e.clientY;
            const exitTop = mouseY < bounds.top + bounds.height / 2;

            gsap.to(item, {
                "--list-y": exitTop ? '-100%' : '100%',
                duration: 0.20,
                ease: 'power2.out',
                delay: 0.10,
            });
        });
    });

});

jQuery(document).ready(function ($) {
    if (jQuery('body').hasClass('elementor-editor-active') == false) {
        //  Testimonial Animation ****************************************************************************************


        let slideItem = "";
        let paginationItem = document.querySelectorAll(".testimonial-list");

        paginationItem.forEach((item, index) => {
            let img = item.querySelector("img").outerHTML;
            slideItem += `<div class="paginationItem"><div class='paginationSliderinner' >${img}</div></div>`;
            item.querySelector("img").remove()

        })

        jQuery(".testimonial-wrap").append("<div class='paginationSlider'>" + slideItem + "</div>")

        $('.paginationSlider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.testimonial-lists',
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            prevArrow: $('.prev-slick'),
            nextArrow: $('.next-slick'),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        $('.testimonial-lists').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.paginationSlider',
            adaptiveHeight: true,
            fade: true,
            dots: false,
            arrows: false,
            // customPaging: function(slick,index) {
            // 	return '<button>'+$(slick.$slides[index]).find(".mark-img figure").html()+'</button>';
            // }		
        });

        // End Testimonial Animation *************************************************************************************

    }

});

jQuery(document).ready(function ($) {
  
    // ************************* Comman Text and Title Animation *************************

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
                    start: "top 85%",
                    end: "bottom 85%",
                    toggleActions: "play none none reverse",
                    // markers:true
                },
                duration: 1.2,
                yPercent: 200,
                ease: "power4.out",
                skewY: 6,
                stagger: 0.15,
                opacity: 1,

                onStart: function () {
                    // Add the 'active' class to each line when the animation starts
                    section.classList.add('activeAnimation');
                    if (jQuery(section).parents('.elementor-widget-container').length) {
                        jQuery(section).parents('.elementor-widget-container').addClass('activeAnimation');
                    }
                }
            });
        });
    }
    animateText('.fadeInUp.elementor-widget-text-editor .elementor-widget-container', '.fadeInUp.elementor-widget-text-editor');
    animateText('.fadeInUp .elementor-heading-title', '.fadeInUp .elementor-heading-title');
    animateText('.fadeInUp.elementor-widget-image .elementor-widget-container', '.fadeInUp.elementor-widget-image .elementor-widget-container');

    // End ************************* Comman Text and Title Animation *************************

    // *************************  Mission Text animation Effact *************************    

    const missionsplitLine = new SplitType('.mission-text .elementor-heading-title', { types: 'lines' });
    const missionsSplitWord = new SplitType('.mission-text .elementor-heading-title .line', { types: 'words' });
    const missionsplitTextlines = document.querySelectorAll(`${'.mission-text .elementor-heading-title'} .line`);



    // // Target each line
    document.querySelectorAll('.mission-text .line').forEach((line, index) => {

        const words = line.querySelectorAll('.word');
        // Check if the parent line has the 'line-invert' class
        let keyframes;

        if (line && line.querySelector('.line-invert')) {
            keyframes = [
                { color: '#000000', duration: 0.05 },  // First step to black
                { color: '#5300f9', duration: 0.05 },  // Then step to blue
            ];
        } else {
            keyframes = [
                { color: '#5300f9', duration: 0.05 },  // First step to blue
                { color: '#000000', duration: 0.05 },  // Final step to black
            ];
        }

        gsap.fromTo(words,
            { color: 'rgba(0,0,0,0.1)' },  // Initial color
            {
                keyframes: keyframes,
                duration: 0.5, // Duration for each character
                stagger: 0.1, // Stagger the animation for each character
                scrollTrigger: {
                    trigger: line, // Animate when this line enters the viewport
                    start: 'top 75%', // Start animation when the line reaches the center of the viewport
                    end: 'bottom 75%', // End animation when the line leaves the center
                    // scrub: true,  // Smooth scrubbing effect
                    toggleActions: "play none none reverse",
                    // markers: true // Set to true for debugging
                }
            }
        );
    });






    //End  *************************  Mission Text animation Effact


    // Change Background Color on scroll
    function changeColor(perColorChange, triggerElemet) {
        gsap.fromTo(
            perColorChange,
            { backgroundColor: "#F0F4FC" }, // Start BgColor
            {
                backgroundColor: "#FFFFFF", // End BgColor
                duration: 1, // Duration for each character
                stagger: 0.1, // Stagger the animation for each character
                scrollTrigger: {
                    trigger: triggerElemet, // Animate when this line enters the viewport
                    start: 'top 85%', // Start animation when the line reaches the center of the viewport
                    end: 'top 50%', // End animation when the line leaves the center
                    scrub: true,  // Smooth scrubbing effect
                    // markers: true // Set to true for debugging
                }
            }
        );
    }

    document.querySelectorAll('.animation-white').forEach((colorChange) => {
        changeColor(colorChange, colorChange);
        var animationWhite = jQuery(colorChange)[0];
        var animationPrev = jQuery(animationWhite).siblings('.previsSection')[0];
        // Animate the background color for the corresponding previsSection
        if (animationPrev) {
            changeColor(animationPrev, colorChange);
        }
    });

    // Case Study Animation ****************************************************************************************

    var $caseStudySection = $('.casestudy-section');
    var $caseStudies = $('.casestudy');

    // Create a new div with class .casestudy-inner and move all .casestudy elements inside it
    var $caseStudyInner = $('<div class="casestudy-inner"></div>');
    $caseStudies.appendTo($caseStudyInner);

    // Prepend the .casestudy-inner inside the .casestudy-section
    $caseStudySection.css('--count', $caseStudies.length.toString().padStart(2, '0'))
    $caseStudySection.prepend($caseStudyInner);

    // Create a .caseTriggers div
    var $caseTriggers = $('<div class="caseTriggers"></div>');

    // Loop through the .casestudy elements and assign reverse z-index values
    var zIndex = $caseStudies.length; // Start with the highest z-index
    $caseStudies.each(function (index) {
        // Assign z-index in reverse order
        $(this).css('z-index', zIndex);
        zIndex--; // Decrease z-index for the next element

        // Create corresponding divs for triggers
        var $trigger = $('<div class="trigger trigger-' + index + '"> </div>');
        $caseTriggers.append($trigger);
    });

    // Append the .caseTriggers to the .casestudy-section
    $caseStudySection.append($caseTriggers);


    // Select all casestudy and trigger elements
    const caseStudies = document.querySelectorAll('.casestudy');

    // Loop through each casestudy section
    caseStudies.forEach((caseStudy, index) => {

        if ($caseStudies.length - 1 > index)
            var triggerAction = document.querySelector('.trigger-' + index);

        // GSAP animation to animate --h CSS variable on scroll
        gsap.to(caseStudy, {
            scrollTrigger: {
                trigger: triggerAction,   // Element to track scroll
                start: "bottom bottom",   // Animation starts when bottom of caseStudy is at the bottom of the viewport
                end: "bottom top",        // Animation ends when bottom of caseStudy is at the top of the viewport
                scrub: true,              // Smooth animation on scroll
                // markers: true,            // Show markers for debugging
                onUpdate: (self) => {     // Function called on each scroll update
                    let progress = self.progress; // Get scroll progress (0 to 1)
                    let newHeight = (1 - progress) * 100; // Calculate height from 100vh to 0vh
                    caseStudy.style.setProperty('--h', `${newHeight}vh`); // Update --h value
                }
            },
            ease: "none",// Linear animation
        });

    });
    // End Case Study Animation ****************************************************************************************

});







jQuery(document).ready(function ($) {

    // End Testimonial Animation ****************************************************************************************

    function animTransformY(triggerElemet, valueY) {

        var point = $(triggerElemet).hasClass('top-point')
            ? { start: 'top bottom', end: 'bottom top' }
            : { start: 'bottom bottom', end: 'bottom top' };

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

    var defaultScale = 0.775 / 2240 * 2240;
    if (window.innerWidth >= 992) {
        var  scrollScale = 1.2
    }else{
        var  scrollScale = 1
    }
    if ($('.video-section > div').length) {
        gsap.fromTo(
            '.video-section > div',
            { scale: defaultScale }, // Start scale value
            {
                scale: scrollScale, // End scale value (replace valueScale with your desired scale value)
                duration: 0.5, // Duration for each character
                scrollTrigger: {
                    trigger: '.video-section > div', // Animate when this line enters the viewport
                    start: 'top 85%', // Start animation when the line reaches the center of the viewport
                    end: 'top top', // End animation when the line leaves the center
                    scrub: true,  // Smooth scrubbing effect
                    // markers: true // Set to true for debugging
                }
            }
        );
    }

    // if ($('.video-section > div').length) {
    //     gsap.fromTo(
    //         '.video-section > div',
    //         { width: '1720px' }, // Start width value
    //         {
    //             width: '100%', // End width value (replace with your desired width)
    //             duration: 0.5, // Duration for the animation
    //             scrollTrigger: {
    //                 trigger: '.video-section > div', // Animate when this element enters the viewport
    //                 start: 'top 85%', // Start animation when the top reaches 85% of the viewport
    //                 end: 'top top', // End animation when the top reaches the top of the viewport
    //                 scrub: true,  // Smooth scrubbing effect
    //                 // markers: true // Uncomment for debugging
    //             }
    //         }
    //     );
    // }
    

});
