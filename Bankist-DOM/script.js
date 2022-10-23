'use strict';

///////////////////////////////////////
// Elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const header = document.querySelector('.header');

const imgTargets = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// Modal

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scroll

btnScrollTo.addEventListener('click', () => {
  const s1coordinates = section1.getBoundingClientRect();

  // Old Browsers
  // window.scrollTo({
  //   left: s1coordinates.left + window.scrollX,
  //   top: s1coordinates.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// Inefficient way
// document.querySelectorAll('.nav__link').forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Correct way
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  document
    .querySelector(e.target.getAttribute('href') || 'body')
    .scrollIntoView({ behavior: 'smooth' });
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return; // Guard clause

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  tabsContent[clicked.dataset.tab - 1].classList.add(
    'operations__content--active'
  );
});

// Menu fade animation
function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
function stickyNav(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

// Reavealing elements on scroll
function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
}
const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);

  section.classList.add('section--hidden');
});

// Lazy loading

function loadImg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(image => imgObserver.observe(image));

// Slider component
const slider = function () {
  let currentSlide = 0;

  function init() {
    updateSlides();
    createDots();
    updateDots();
  }
  init();

  function updateSlides(cSlide = currentSlide) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - cSlide)}%)`)
    );
  }

  function nextSlide() {
    if (currentSlide === slides.length - 1) currentSlide = 0;
    else currentSlide++;

    updateSlides();
    updateDots();
  }

  function prevSlide() {
    if (currentSlide === 0) currentSlide = slides.length - 1;
    else currentSlide--;

    updateSlides();
    updateDots();
  }

  function createDots() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  function updateDots(cSlide = currentSlide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${cSlide}"]`)
      .classList.add('dots__dot--active');
  }

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const slideNumber = e.target.dataset.slide;

      updateSlides(slideNumber);
      updateDots(slideNumber);
    }
  });
};
slider();

/////////////////////////////////////////
/////////////////////////////////////////
/*
// *** Lectures ***

// * Selecting elements

// Entire document
console.log(document.documentElement);

// Selecting the head and the body of the document
console.log(document.head);
console.log(document.body);

// Selecting the first el by a selector (class, id, ...)
const header = document.querySelector('.header');

// Selecting all els by a selector (class, id, ...)
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// Selecting the first el by it's id
console.log(document.getElementById('section--1'));

// Selecting all els by tag name
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Selecting all els by class name
console.log(document.getElementsByClassName('btn'));

// * Creating elements
// Inserting actaull html string
// .insertAdjecentHTML();

// Creating an element programatically
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analitycs.<button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

// * Deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

// * Styles
message.style.backgroundColor = '#37383d';
message.style.width = '100vw';

// Geting the computed style not programmed
console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// Changing custom properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// * Attributes
const logo = document.querySelector('.nav__logo');
// Standard attributes
logo.alt = 'Beatiful minimalist logo';

// Special non standard attributes
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// Links
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

const h1 = document.querySelector('h1');

const alerth1 = function (e) {
  alert('addEventListener: You are reading the heading');

  h1.removeEventListener('mouseenter', alerth1);
};

h1.addEventListener('mouseenter', alerth1);

// * Event propagation

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(document.querySelector('.nav__link'));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  console.log('LINK', e, e.currentTarget);

  // Stoping propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  console.log('CONTAINER', e, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  console.log('NAV', e, e.currentTarget);
});


// * DOM Traversing

const h1El = document.querySelector('h1');

console.log(h1El);

// Child elements
console.log(h1El.querySelectorAll('.highlight'));
console.log(h1El.childNodes);
console.log(h1El.children);
console.log(h1El.firstElementChild);
console.log(h1El.lastElementChild);

// Parent elements
console.log(h1El.parentNode);
console.log(h1El.parentElement);
console.log(h1El.closest('.header'));

// Sibling elements
console.log(h1El.previousElementSibling);
console.log(h1El.nextElementSibling);

// Intersection observer
// Callback func
function observerCallback(entries, observer) {
  entries.forEach(entry => console.log(entry));
}

// Options object
const observerOptions = {
  root: null,
  threshold: [0, 0.2],
};

// Initializing observer
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);


// DOM event lifecycle
document.addEventListener('DOMContentLoaded', e =>
  console.log('HTML parsed and DOM tree built!', e)
);

window.addEventListener('load', e => console.log('Page fully loaded', e));

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = '';
})
*/
