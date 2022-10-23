'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza(mainIng, ...otherIngs) {
    console.log(mainIng, otherIngs);
  },
};
/*
// * Real-world application
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

restaurant.orderPizza('mushrooms', 'onions', 'cheese', 'meat');

// * Destructuring arrays

const arr = [2, 3, 4];

// Wrong way
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Correct way
const [x, y, z] = arr;
console.log(x, y, z);

// Skipping a value in array
const [first, , third] = restaurant.categories;
console.log(first, third);

// Changing position of elements from the array
const [secondary, main] = restaurant.categories;
console.log(main, secondary);

// Using deconstruction
const [starter, mainMenu] = restaurant.order(2, 0);
console.log(starter, '&', mainMenu);

// Nested arrays
const nested = [2, 4, [5, 6]];
// Nested deconstructuring
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values - used when we don't know the exact length of array
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// * Destructuring objects

// using the exact same name as in the  object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// giving the properties different names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Mutating variables
let aa = 111;
let bb = 999;

const obj = { a: 23, b: 7, c: 14 };
// !must be in brackets
({ a: aa, b: bb } = obj);
console.log(aa, bb);

// Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

// * Spread operator - gets all values from array individualy
// Can be used only when building arrays or passing values to a function
// Always on the right of the equal sign
const array = [7, 8, 9];
const newArr = [1, 2, ...array];
console.log(newArr, ...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// spread operator usage: shallow copies of arrays & merging two arrays
// Shallow copy
const mainMenuCopy = [...restaurant.mainMenu];
// Joining together
const menuFull = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menuFull);

// Spread operator works on all iterables (sets, arrays, maps, strings)
const str = 'Filip';
const letters = [...str, '', 'K.'];
console.log(letters);

const ingredients = [
  prompt("Let's make pasta! first ingedient:"),
  prompt('Second ingredient:'),
  prompt('Third ingredient:'),
];
restaurant.orderPasta(...ingredients);

// ! NOW works also on objects
const newRestaurant = { ...restaurant, founded: '1988', founder: 'Filip K.' };
console.log(newRestaurant);

// * Rest operator - collect multiple elements and put them together into an array
// Always on the left of the equal sign
// The rest operator is always at the end when destructuring
const [ar, br, ...others] = [1, 2, 3, 4, 5];
console.log(ar, br, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Rest operator with objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// Rest parametr in functions
const add = function (...numbers) {
  let sum = 0;
  numbers.forEach(number => {
    sum += number;
  });
  console.log(sum);
};

add(1, 2);
add(5, 3, 7, 2);

// * Short-circuting
// Boolean expressions can use any data type and return any datatype
// Or operator (||)
// Emits falsy epressions and shows the first truthy expression
console.log(3 || 'Filip');
console.log('' || 'Filip');
console.log(true || 0);
console.log(undefined || null);

const guests = restaurant.numGuests || 10;
console.log(guests);

// And operator (&&)
// Returns the first falsy value, otherwise the last truthy value
console.log(0 && 'Filip');

restaurant.orderPizza && restaurant.orderPizza('bananas');

// * Nullish coalescing operator (??)
// Works with NULLISH values NOT falsy values
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// * Logical assignment operators
const restaurant2 = {
  name: 'Capri',
  numGuests: 20,
};

const restaurant3 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// ||= - short-circuting OR
// Asigns a value if the variable is falsy
// Bad way
restaurant2.numGuests = restaurant2.numGuests || 10;
restaurant3.numGuests = restaurant3.numGuests || 10;

// Correct way
// Doesn't work with nullish values
restaurant2.numGuests ||= 10;
restaurant3.numGuests ||= 10;

// \??= - nullish coalescing operator
// Works also with nullish values
restaurant2.numGuests ??= 10;
restaurant3.numGuests ??= 10;

// &&= - short-circuting AND
// Assign a value if the variable is truthy
restaurant2.owner &&= '<ANONYMOUS>';
restaurant3.owner &&= '<ANONYMOUS>';

console.log(restaurant2, restaurant3);

// * Challenge #1

// Object called game with array with 12 players
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;

function printGoals(...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
}

function printOdds(team1, team2) {
  team1 > team2 && console.log('Team 2 is favored');
  team1 < team2 && console.log('Team 1 is favored');
}

printOdds(team1, team2);
printGoals(...game.scored);

// * Looping over arrays - for-of loop
const menuLoopArr = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const dish of menuLoopArr) {
  console.log(dish);
}

// Bad way
for (const dish of menuLoopArr.entries()) {
  console.log(`${dish[0] + 1}: ${dish[1]}`);
}

// Correct way
for (const [index, dish] of menuLoopArr.entries()) {
  console.log(`${index + 1}: ${dish}`);
}

console.log(...menuLoopArr.entries());

// * Optional chaining - ?.
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  console.log(
    `On ${day}, we open at ${restaurant.openingHours[day]?.open ?? 'Closed'}`
  );
}

// Looping objects
// key values
const keys = Object.keys(restaurant.openingHours);
// Property values
const values = Object.values(restaurant.openingHours);
// Entire object (array with the key and the value in an array)
const entries = Object.entries(restaurant.openingHours);

let messageLoopingO = `We are open on ${keys.length} days:`;
for (const day of keys) {
  messageLoopingO += `${day}, `;
}

console.log(messageLoopingO);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day}, we open at ${open} and close at ${close}`);
}

// * Challenge #2

// Object called game with array with 12 players
const game1 = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

for (const [type, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of`,
    game[type] ? `victory ${game[type]}` : `draw`,
    `: ${odd}`
  );
}

const scorers = {};

for (const player of game.scored) {
  scorers[player] = scorers[player] + 1 || 1;
}

console.log(scorers);

// * Sets
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Rissoto', 'Pasta']);
console.log(ordersSet);

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
ordersSet.add('Bread');
ordersSet.delete('Pizza');

console.log(ordersSet);

const staff = ['Chef', 'Waiter', 'Cook', 'Bartender', 'Bartender'];
const staffUnique = [...new Set(staff)];

console.log(staffUnique);

// * Maps
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy').set(2, 'Rome, Italy').set(3, 'Milan, Italy');
rest.set(true, 'Open').set(false, 'Closed').set('open', 11).set('close', 23);

console.log(rest.get('name'));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

const arrM = [1, 2];
rest.set(arrM, 'Array');
rest.set(document.querySelector('h1'), 'Heading');

console.log(rest.get(arrM));
console.log(rest);

// * Console quiz game using maps

const question = new Map([
  ['question', 'What is the official name of the latest major JS version?'],
  [1, 'ES6'],
  [2, 'ES5'],
  [3, 'ES7'],
  ['correct', 1],
  [true, 'Correct!'],
  [false, 'Wrong!'],
]);

console.log(question.get('question'));

for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

const answer = Number(prompt('Your answer:'));

console.log(question.get(answer === question.get('correct')));

// * Coding Challenge #3

// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
const events = [...new Set(gameEvents.values())];
console.log(events);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4
for (const [minute, event] of gameEvents.entries()) {
  console.log(
    `[${minute <= 45 ? 'FIRST HALF' : 'SECOND HALF'}] ${minute}: ${event}`
  );
}

// * Strings
const plane = 'A320';
const airline = 'TAP Air Portugal';

// Getting a letter at ceartain position
console.log(plane[1]); // "3"

// Getting the length of a string
console.log(plane.length); // "4"

//TODO IndexOf & lastIndexOf
// Getting the position of a letter or a string (case sensitive)
console.log(airline.indexOf('r')); // "6" - first occurance
console.log(airline.lastIndexOf('r')); // "10" - last occurance
console.log(airline.indexOf('Portugal')); // "8" - entire word

// ! ALL string method return the mutated substring - can be chaned
// !with a string method we are creating a substring not mutating the original string

// ? How it works
// When we call a method on a string the string primitive is 'boxed'
// Boxing: the string is converted into a String object
console.log(new String('Filip')); // String object
console.log(typeof new String('Filip')); // object
// The object is after the method reverted back to a string primitive
//? ---------------------

// Extracting parts of a string
//TODO Slice (extract) part of a string
console.log(airline.slice(4)); // "Air Portugal" - slice starts at 4
console.log(airline.slice(4, 7)); // "Air" - slice starts at 4 end at 7 (exclusive)
console.log(airline.slice(0, airline.indexOf(' '))); // "TAP" - slice starts at 0 end at the first "space"
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // "Portugal" - slice starts at last "space"
console.log(airline.slice(-2, -1)); // "a" - slice starts at the second character from the end and ends on the second to last character

// Practical example
function checkMiddleSeat(seat) {
  const s = seat.slice(-1);

  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat');
  } else {
    console.log('You got lucky');
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//TODO ToLowerCase & toUpperCase
// Converting strings to lower case or upper case
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Practical example
const passenger = 'fILiP';

function fixPassName(name) {
  const fixedName = name[0].toUpperCase() + name.toLowerCase().slice(1);

  return fixedName;
}

console.log(fixPassName(passenger));

const loginEmail = '  Hello@FiLip.CoM  \n';

//TODO Trim
// Gets rid of all whitespace (spaces, enters, ...)
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

//TODO Replace
// Replaces a specified string with a different one
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');

console.log(priceUS);

// Replace all occurances with a regular expression
const announcment = 'All passengers go to door number 23. Boarding door 23.';

console.log(announcment.replace(/door/g, 'gate'));

const planeB = 'Airbus A320neo';

//TODO Includes
// Return true/false if string includes a specified string

console.log(planeB.includes('A320'));

//TODO StartsWith
// Return true/false if string starts with a specified string
console.log(planeB.startsWith('Airb'));

//TODO EndsWith
// Return true/false if string ends with a specified string
console.log(planeB.endsWith('neo'));

if (planeB.startsWith('Airbus') && planeB.endsWith('neo'))
  console.log('Part of the new Airbus family');

//TODO Split
// splits a string according to a given string (divider) into an array
console.log('a+very+nice+string'.split('+'));
console.log('Filip Kocian'.split(' '));

const [firstName, lastName] = 'Filip Kocian'.split(' ');

//TODO Join
// Joins two or more strings in an array into a one with a specified divider
const fullCorrectName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');

console.log(fullCorrectName);

// Practical example
function capitalizeFirstLetter(name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  return namesUpper.join(' ');
}

console.log(capitalizeFirstLetter('ann maria smith davis'));

//TODO PadStart & padEnd
// Adds a specified string before/after a string
console.log('Filip'.padStart(25, '-'));
console.log('Filip'.padEnd(25, '-'));

// Practical example
function maskCreditCard(number) {
  const str = number + '';
  const last = str.slice(-4);

  return last.padStart(str.length, '*');
}

console.log(maskCreditCard(456123456785121546));

//TODO Repeat
// Repeat the same string a given number of times
const message = 'Bad wheather ... All Departures Delayed ... ';

console.log(message.repeat(5));

// * Coding Challenge #4

// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

// GOOD LUCK 😀

// Create the neccessary DOM elements
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// Get the reference for the elements
const inputEl = document.querySelector('textarea');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  // Get the user input
  const input = inputEl.value;

  // Split the input into separate names
  const vnames = input.split('\n');

  // Loop over every name
  for (const [index, vname] of vnames.entries()) {
    // Trim the word, put it to lower and split it into individual words
    const words = vname.trim().toLowerCase().split('_');
    const correctedWord = [];

    // Loop over every word
    for (const word of words) {
      // Skip the first word
      if (word === words[0]) correctedWord.push(word);
      // Turn the first letter uppercase
      else correctedWord.push(word.replace(word[0], word[0].toUpperCase()));
    }

    // Join the corrected words
    const camelCaseName = correctedWord.join('');
    // Create the full output as in the assignment
    const fullOutput = camelCaseName
      .padEnd(20, ' ')
      .concat('', '✅'.repeat(index + 1));

    console.log(fullOutput);
  }
});

//* String practice

const flightLogs =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

for (const log of flightLogs.split('+')) {
  const [type, from, to, time] = log.split(';');

  const output = `${type.startsWith('_Delayed') ? '♦' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`.padStart(45);

  console.log(output);
}
*/
