'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics ';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';
header.prepend(message);
header.after(message);
header.before(message);
header.append(message);

const btnCloseCookie = document.querySelector('.btn--close-cookie');
btnCloseCookie.addEventListener('click', function () {
  //message.remove();
  message.parentElement.removeChild(message);
});

message.style.backgroundColor = '#37383d';
message.style.width = '102%';

console.log(message.style.height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orange');

// smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log('current scroll x, y', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Event Deligation to smooth scrolling in the navigation

// page navigation
// without using event deligation (not very efficient)
// we are making copies of eventhandler call back fns it will effect the performance

// const navLinks = document.querySelectorAll('.nav__link');
// navLinks.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     //console.log(id);
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// with eventdeligation

// 1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click' () => console.log('TAB')));
tabsContainer.addEventListener('click', function (e) {
  // const clicked = e.target;
  // console.log(clicked); // problem
  // select
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);
  // guard clause
  if (!clicked) return;

  // active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Pass arguments into event handler fn
// select parent
const nav = document.querySelector('.nav');
// mouseover bublles up

// menu fade animation
const handHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });
nav.addEventListener('mouseover', function (e) {
  handHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handHover(e, 1);
});

// sticky navigation bar
// not efficient - scroll event fires every time
// const initialcoords = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialcoords) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
//   //console.log(window.scrollY);
// });

// intersection observer api
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
//   //console.log('observed');
// };
// const obsOptions = {
//   root: null, // null-> entire viewport
//   threshold: [0.1, 0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// whenever, target element intersect the root element at the threshold the callback function get called
// use in sticky navigation - when header is not visible
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const head = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // box of 90px that will be applied outside to our target
});
headerObserver.observe(head);

// lazy loading images effect for performance - images loading should be optimized
// we have very low resolution image that load in the beginning

const imgTargets = document.querySelectorAll('img[data-src]'); // selects the images which have data src attribute
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  // replace src eith data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  // when image is loaded it will emmit the load event
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '50px', // make image loads earlier
});
imgTargets.forEach(img => imageObserver.observe(img));

// Slider component

const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

let currSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));
  const dot = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
  dot.classList.add('dots__dot--active');
};
goToSlide(0);
activateDot(0);
const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else currSlide++;
  goToSlide(currSlide);
  activateDot(currSlide);
};
const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else currSlide--;
  goToSlide(currSlide);
  activateDot(currSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  // if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowRight' && nextSlide();
});
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
// -100, 0, 100, 200
// lifecycle dom events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
  console.log('HTML parsed and DOM tree built!');
});
document.addEventListener('load', function (e) {
  console.log('All images and external resources loaded');
});
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log('User is about to leave!');
// });

// Defer and async script loading
