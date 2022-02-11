// Scroll to the top before the page loads
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// }

let slideUp = (target, duration=500) => {

  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        //alert("!");
  }, duration);
}

let slideDown = (target, duration=500) => {

  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

var slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

window.onload = () => {
  // Variabels
  let burger = document.querySelector(".burger");
  let header = document.querySelector(".header");
  let technologyCard = document.querySelectorAll('.technology-card');
  let technologyCardBody = document.querySelectorAll('.technology-card__body')
  let tabContent = document.querySelectorAll(".tabs__item");
  let tabItem = document.querySelectorAll(".tabs__trigger");
  let tabDropdownTrigger = document.querySelector(".treatments .dropdown__trigger .dropdown__trigger-text");
  let treatmentsDropdown = document.querySelector(".treatments .dropdown");
  let treatmentsDropdownList = document.querySelector(".treatments .dropdown__list")

  // Manipulations with header classes on scroll
  let scrollChange = 1;

  window.addEventListener("scroll", () => {
    let scroll = $(window).scrollTop();

    if (scroll >= scrollChange) {
      header.classList.add("js-scroll-down");
      header.classList.remove("js-scroll-top");
    } else {
      header.classList.add("js-scroll-top");
      header.classList.remove("js-scroll-down", "js-nav-open", "js-nav-close");
    }
  });

  // Treatments page tabs
  for (let i = 0; i < tabItem.length; i++) {
    tabItem[i].addEventListener("click", () => {

      tabContent.forEach((item) => {
        item.classList.remove("js-active");
      });

      tabItem.forEach((item) => {
        item.classList.remove("js-active");
      });

      tabContent[i].classList.add("js-active");
      tabItem[i].classList.add("js-active");

      tabDropdownTrigger.textContent = document.querySelector(".tabs__trigger.js-active").textContent
    });
  }
  
  // Ломает всё!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // tabDropdownTrigger.textContent = document.querySelector(".tabs__trigger.js-active").textContent

  // Media 992 =====>
  if (window.matchMedia("(min-width: 992px)").matches) {
    // Opening desktop menu with burger
    burger.addEventListener("click", () => {
      if (header.classList.contains("js-nav-open")) {
        header.classList.remove("js-nav-open");
        header.classList.add("js-nav-close");
      } else {
        header.classList.add("js-nav-open");
        header.classList.remove("js-nav-close");
      }
    });

    // Opening technology accordion
    $('.technology-card').click(function () {
      $(".technology-card").not($(this).closest(".technology-card")).removeClass("js-active");
      $(this).closest(".technology-card").addClass("js-active");
      if ($(this).hasClass('js-active')) {
        $('.technology-card__body').not($(this).find('.technology-card__body')).slideUp(300);
        $(this).find('.technology-card__body').slideDown(300);
      }
    })

    // for (let i = 0; i < technologyCard.length; i++) {
    //   technologyCard[i].addEventListener("click", () => {
    //     technologyCard.forEach((element) => {
    //       element.classList.remove("js-active");
    //     });

    //     technologyCard[i].classList.add('js-active');

    //     // Add class to the element that was clicked
    //     slideDown(technologyCardBody[i], 300)
    //   });
    // }
    
    // Checking if the active page is the home page
    window.homepagecheck = () => {
      var check = false;
      if(document.location.pathname === "/" || document.location.pathname === "/index.html"){
        check=true;
        }
      return check;
    }
  
    if(window.homepagecheck()){
      // Horizontal scroll in Treatments =====>
      gsap.registerPlugin(ScrollTrigger);
  
      const sections = gsap.utils.toArray(".treatments-horizontal");
      let maxWidth = 0;
  
      const getMaxWidth = () => {
        maxWidth = 0;
        sections.forEach((section) => {
          maxWidth += section.offsetWidth;
        });
      };
      getMaxWidth();
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);
  
      let triggerItem = document.querySelector('.treatments');
  
      gsap.to(sections, {
        x: () => `-${maxWidth - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
          start: "-120px top",
          trigger: triggerItem,
          pin: true,
          scrub: true,
          end: () => `+=${maxWidth}`,
          invalidateOnRefresh: true
        }
      });
  
      sections.forEach((sct, i) => {
        ScrollTrigger.create({
          trigger: sct,
          start: () => 'top top-=' + (sct.offsetLeft - window.innerWidth/2) * (maxWidth / (maxWidth - window.innerWidth)),
          end: () => '+=' + sct.offsetWidth * (maxWidth / (maxWidth - window.innerWidth)),
          toggleClass: {targets: sct, className: "active"}
        });
      });
    } else {
      null
    }

  } else {
    // Treatments page tabs navigation
    window.addEventListener("scroll", () => {
      let offsetItem1 = document.querySelector('.header').offsetHeight
  
      if (window.scrollY > offsetItem1 + 64 ) {
        treatmentsDropdown.classList.add("js-scroll-down");
        treatmentsDropdownList.style.display = 'none'
      } else {
        treatmentsDropdown.classList.remove("js-scroll-down");
        treatmentsDropdownList.style.display = 'block'
      }
    });

    treatmentsDropdown.addEventListener('click', () => {
      if (treatmentsDropdown.classList.contains("js-scroll-down")) {
        slideToggle(treatmentsDropdownList, 300);
      } else {
        null
      }
    });

    // Opening mobile menu with burger
    burger.addEventListener("click", () => {
      header.classList.toggle("js-nav-open");
      document.body.classList.toggle("js-lock");
    });

    // Opening technology accordions !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // $('.technology__wrapper .technology-card').not($('.technology__wrapper.secondary .technology-card')).removeClass('js-active')
    for (let i = 0; i < technologyCard.length; i++) {
      technologyCard[i].addEventListener("click", () => {
        // Remove class from all elements
        technologyCard.forEach((element) => {
          element.classList.remove("js-active");
        });

        // Add class to the element that was clicked
        technologyCard[i].classList.add("js-active");
      });
    }

    // Block slider 'Treatments'
    const sliderTreatments = new Swiper('.treatments-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".treatments-button-next",
        prevEl: ".treatments-button-prev",
      },
      pagination: {
        el: ".treatments-pagination",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      }
    })
  }

  // Block slider 'Practices'
  const sliderPractices = new Swiper('.practices-slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
      nextEl: ".practices-button-next",
      prevEl: ".practices-button-prev",
    },
    pagination: {
      el: ".practices-pagination",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    }
  })

  // Block slider 'Testimonials'
  const sliderTestimonials = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".testimonials-button-next",
      prevEl: ".testimonials-button-prev",
    },
    pagination: {
      el: ".testimonials-pagination",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 'auto',
        centeredSlides: true,
      }
    }
  })

  // Block slider 'Cases'
  const sliderCases = new Swiper('.cases-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".cases-button-next",
      prevEl: ".cases-button-prev",
    },
    pagination: {
      el: ".cases-pagination",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    }
  })

  // Block slider 'Socials'
  const sliderSocials = new Swiper('.socials__slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".socials-button-next",
      prevEl: ".socials-button-prev",
    },
    pagination: {
      el: ".socials-pagination",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    }
  })
}
