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

window.addEventListener('beforeunload', e => {
  e.preventDefault();
  e.returnValue = '';
});
