'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = user => spendingLimits[user] ?? 0;

const addExpense = (state, { value, description, user = 'jonas' }) => {
  const userLower = user.toLowerCase();

  return value <= getLimit(userLower)
    ? [...state, { value: -value, description, user: userLower }]
    : state;
};

// Function composition
const compose =
  (...fns) =>
  (state, expenses) =>
    fns.reduce((val, fn, i) => fn(val, expenses[i]), state);

const add3Expenses = compose(addExpense, addExpense, addExpense);

const expenses = [
  {
    value: 100,
    description: 'Going to movies 🍿',
    user: 'Matilda',
  },
  {
    value: 200,
    description: 'Stuff',
    user: 'Jay',
  },
  {
    value: 10,
    description: 'Pizza 🍕',
  },
];
const endBudget = add3Expenses(budget, expenses);

const checkExpenses = state => {
  return state.map(entry =>
    entry.value < -getLimit(entry.user) ? { ...entry, flag: 'limit' } : entry
  );
};
const finalBudget = checkExpenses(endBudget);

const getBigExpenses = (state, bigLimit = 500) =>
  state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

console.log(finalBudget);
console.log(getBigExpenses(finalBudget, 1000));
