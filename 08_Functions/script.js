'use strict';

// * Default parameter

const bookings = [];

function createBooking(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);

  bookings.push(booking);
}

createBooking('LH123', 5);
// Skiping a parameter
createBooking('LH123', undefined, 1000);

// * How passing arguments works

// Primitive type
const flight = 'LH234';
// Object
const filip = {
  name: 'Filip Kocian',
  passport: 12345678987,
};

// flight is passed by value to flightNum (flight won't be changed)
// filip is passed by reference to passenger (the object's properties will change)
function checkIn(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 12345678987) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
}

checkIn(flight, filip);
console.log(flight);
console.log(filip);

function newPassport(person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
}

newPassport(filip);
checkIn(flight, filip);

// * High-order function
// JS uses callbacks everywhere

function oneWord(str) {
  return str.replace(/ /g, '').toLowerCase();
}

function upperFirstWord(str) {
  const [first, ...others] = str.split(' ');

  return [first.toUpperCase(), ...others].join(' ');
}

// High order function
function transformer(str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
}

// Passing a function as an argument
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('👋');
};

// Passing a function as an argument
document.body.addEventListener('click', high5);
['Anna', 'Filip'].forEach(high5);

// * Function returning a function

function greet(greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}

// OR

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Filip');

// OR

greet('Hello')('Filip');

// * Call and apply method
// Call specifies what the THIS keyword stands for
// Apply is simmilar to call but the argumnts must be passed in an array

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Copying book method into a function
// THIS keyword becomes undefined
const book = lufthansa.book;

book.call(eurowings, 23, 'Sarah Williams');
book.apply(eurowings, [999, 'George Cooper']);

// * Bind method
// Returns a new function with the THIS keyword assigned to the given object
// Binds the THIS keyword to a given object

book.bind(eurowings)(24, 'James Smith');

// Binding an argument(s) as well
const bookEW23 = book.bind(eurowings, 23)('James Joyce');

// Using bind with Event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this, this.planes);
};

// ! THIS keyword in Event listeners is always the element
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// Fixing the issue (binding the THIS keyword)
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;

// Preseting only an argument
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// * Immidiately invoked functions (IIFE)

(function () {
  console.log('This will never run again');
})();

// * Closures

function secureBooking() {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
}

const booker = secureBooking();

booker(); // 1
booker(); // 2
booker(); // 3

console.dir(booker);
