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
