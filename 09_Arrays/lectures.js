// ! Array methods

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

// *** Chaining Methods ***

const movementsChaining = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDespositsInUS = movementsChaining
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, curr) => acc + curr, 0);

console.log(totalDespositsInUS);

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
