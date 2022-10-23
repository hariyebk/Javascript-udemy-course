'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// *** BANKIST APP ***

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Variables
let currentAccount;
let sorted = false;

// forEach method
function calcDisplayMovements(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movementsList = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  movementsList.forEach((mov, index) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${index + 1} ${type}
        </div>
        <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// Reduce method
function calcDisplayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${account.balance} €`;
}

// Chaining methods
function calcDisplaySummary(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${incomes} €`;
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;
  labelSumInterest.textContent = `${interest} €`;
}

// Map method
function computeUsernames(accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
}
computeUsernames(accounts);

// Update UI function
function updateUI(account) {
  calcDisplayBalance(account);
  calcDisplayMovements(account.movements);
  calcDisplaySummary(account);
}

// Event handlers
// Login button
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();
  }

  updateUI(currentAccount);
});

// Transfer button
btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const ammount = Number(inputTransferAmount.value);
  const toAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    ammount > 0 &&
    toAccount &&
    currentAccount.balance >= ammount &&
    toAccount?.username !== currentAccount.username
  ) {
    toAccount.movements.push(ammount);
    currentAccount.movements.push(-ammount);

    updateUI(currentAccount);
  }

  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.blur();
});

// Loan button
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const ammount = Number(inputLoanAmount.value);

  if (
    ammount > 0 &&
    currentAccount.movements.some(mov => mov > ammount * 0.1)
  ) {
    currentAccount.movements.push(ammount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// Close button
btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentAccount.username),
      1
    );
  }

  containerApp.style.opacity = 0;

  inputClosePin.value = '';
  inputCloseUsername.value = '';
  inputClosePin.blur();
});

// Sort button
btnSort.addEventListener('click', e => {
  e.preventDefault();

  calcDisplayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// *** LECTURES ***

// ! Array methods
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// * Slice method
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(-1)); // ['e']

// * Splice method
// Mutates the original array and returns the extracted part
console.log(arr.splice(2)); // ['c', 'd', 'e']

// The mutated array without the extracted part
console.log(arr); // ['a', 'b']

// * Reverse method
// Mutates the original array and returns the reversed array
console.log(arr.reverse()); // ['e', 'd', 'c', 'b', 'a']

// * Concat method
// Returns a new array with the concatenation of the original array and the given array
const letters = arr.concat(['f', 'g', 'h']);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

// * Join method
console.log(arr.join('-')); // a-b-c-d-e

// * At method
// Does the same thing as arr[index]
// We can use -1 to get the last element
console.log(arr.at(2)); // c

// * ForEach method
// Iterates over the array and calls the given function for each element

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach((movement, index) => {
  movement > 0
    ? console.log(`Movement ${index}: In: ${movement}`)
    : console.log(`Movement ${index}: Out: ${Math.abs(movement)}`);
});

// * ForEach method Maps and Sets

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Set

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD']);

currenciesUnique.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

///////////////////////////////////////
// *** Coding Challenge #1 ***

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog 
owners about their dog's age, and stored the data into an array 
(one array for each). For now, they are just interested in knowing 
whether a dog is an adult or a puppy. A dog is an adult if it is at l
east 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs 
actually have cats, not dogs! So create a shallow copy of Julia's array,
and remove the cat ages from that copied array (because it's a bad 
practice to mutate function parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult 
("Dog number 1 is an adult, and is 5 years old") or a puppy 
("Dog number 2 is still a puppy 🐶")

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7],
Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3],
Kate's data [10, 5, 6, 1, 4]


GOOD LUCK 😀
*/
/*
function checkDogs(dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice();

  dogsJuliaCorrect.splice(0, 1);
  dogsJuliaCorrect.splice(-2);

  const allDogs = dogsJuliaCorrect.concat(dogsKate);

  allDogs.forEach((dog, index) => {
    console.log(
      dog >= 3
        ? `Dog number ${index + 1} is an adult, and is ${dog} years old`
        : `Dog number ${index + 1} is still a puppy 🐶`
    );
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// *** Map method ***

const euroToUsd = 1.1;
const movementsMap = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsUSD = movementsMap.map(mov => mov * euroToUsd);

console.log(movementsUSD);

// *** Filter method ***

const movementsFilter = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movementsFilter.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

// *** Reduce method ***

const movementsReduce = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movementsReduce.reduce((acc, curr) => acc + curr, 0);

console.log(balance);

// Practical Example
// Find the highest movement
const highestMovement = movementsReduce.reduce((acc, mov) => {
  if (acc > mov) return acc;
  return mov;
}, movementsReduce[0]);

console.log(highestMovement);

// *** Coding Challenge #2 ***

function calcAverageHumanAge(dogAges) {
  const humanAges = dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(humanAge => humanAge >= 18);

  const averageHumanAge =
    humanAges.reduce((acc, curr) => acc + curr, 0) / humanAges.length;

  return averageHumanAge;
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// *** Chaining Methods ***

const movementsChaining = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDespositsInUS = movementsChaining
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalDespositsInUS);

// *** Coding Challenge #3 ***

// Rewriting the function calcAverageHumanAge

function calcAverageHumanAge(dogAges) {
  return dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// *** Find Method ***

const movementsFind = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movementsFind.find(mov => mov < 0);
console.log(firstWithdrawal);

// *** Some Method ***

const movementsSome = [200, 450, -400, 3000, -650, -130, 70, 1300];

const anyDeposit = movementsSome.some(mov => mov > 0);

// *** Every Method ***

const movementsEvery = [200, 450, 400, 3000, 650, 130, 70, 1300];

const withoutOutstanding = movementsEvery.every(mov => mov > 0); // true

// *** Flat Method & FlatMap Method ***

const arrFlat = [1, 2, [3, 4, 5], 6, [7, 8, 9, 10]];

console.log(arrFlat.flat(4)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(arrFlat.flatMap(el => el * 2)); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// *** Sort Method ***

const owners = ['Julia', 'Kate', 'John', 'Mary'];
console.log(owners.sort()); // ['John', 'Julia', 'Mary', 'Kate']

const numbersSort = [10, -8, 21, 1300, 78, -100, 59];
console.log(
  numbersSort.sort((a, b) => {
    return a - b;
  })
); // [-100, -8, 10, 21, 59, 78, 1300]

console.log(
  numbersSort.sort((a, b) => {
    return b - a;
  })
); // [1300, 78, 59, 21, 10, -8, -100]

// *** Fill Method ***

const x = new Array(3);
console.log(x); // [empty x 3]

x.fill(1, 1, 2);
console.log(x); // [empty, 1, empty]

x.fill(2);
console.log(x); // [2, 2, 2]

// *** From Method ***

const y = Array.from({ length: 5 }, () => '🐶');
console.log(y); // ['🐶', '🐶', '🐶', '🐶', '🐶']

const z = Array.from({ length: 5 }, (_, index) => index + 1);
console.log(z); // [1, 2, 3, 4, 5]

// practical example

const movementsUINOTArr = document.querySelectorAll('.movements__value');
// ERROR
// movementsUINOTArr.map((e) => e.textContent.replace('0', ''));

// CORRECT
const movementsUIArr = Array.from(
  document.querySelectorAll('.movements__value'),
  el => el.textContent.replace('€', '')
);


///////////////////////////////////
// *** Array Methods Practice *** //
// 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);

console.log(bankDepositSum); // 25180

// 2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

console.log(numDeposits1000); // 5

// 3
const numDeposits1000Reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov > 1000 ? ++acc : acc), 0);

console.log(numDeposits1000Reduce); // 5

// 4
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums); // { deposits: 25180, withdrawals: -7340 }

// 5
const convertTitleCase = function (str) {
  const exceptions = ['of', 'the', 'and', 'a', 'an'];

  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return exceptions.includes(word)
        ? word
        : word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');
};

console.log(convertTitleCase('this is a nice title')); // This Is a Nice Title
*/

// *** Challenge #4 ***

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating
 too much or too little.
Eating too much means the dog's current food portion is larger than the recommended
 portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above
 and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the 
recommended food portion and add it to the object as a new property. Do NOT create a 
new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array,
and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and 
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that 
is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food 
(just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food 
(try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended
 food portion in an ascending order (keep in mind that the portions are inside the 
  array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

function howHeEats(dog) {
  if (dog.curFood > dog.recommendedFood + dog.recommendedFood * 0.1)
    return 'too much';
  else if (dog.curFood < dog.recommendedFood - dog.recommendedFood * 0.1)
    return 'too little';
  else if (dog.curFood === dog.recommendedFood) return 'exact ammount';
  else return 'okay ammount';
}

// 1.
dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

console.log(dogs);

// 2.
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(`Sarah's dog eats ${howHeEats(sarahsDog)}.`);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => howHeEats(dog) == 'too much')
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => howHeEats(dog) == 'too little')
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

// 4.
function logResultsOnEating(arr, message) {
  let log = '';

  arr.forEach((owner, index) => {
    log += index + 1 == arr.length ? `and ${owner}'s ` : `${owner} `;
  });

  log += `dogs eat ${message}.`;

  return log;
}

console.log(logResultsOnEating(ownersEatTooMuch, 'too much'));
console.log(logResultsOnEating(ownersEatTooLittle, 'too little'));

// 5.
function doesHeEatExactly() {
  return dogs.reduce(
    (acc, dog) => (howHeEats(dog) == 'exact ammount' ? true : false),
    false
  );
}

console.log(doesHeEatExactly());

// 6.
function doesHeEatOkay() {
  return dogs.reduce(
    (acc, dog) => (howHeEats(dog) == 'okay ammount' ? true : false),
    false
  );
}

console.log(doesHeEatOkay());

// 7.
const okayEater = dogs.filter(dog => howHeEats(dog) === 'okay ammount');

console.log(okayEater);

// 8.
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(sortedDogs);
*/
