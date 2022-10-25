// *** Dates operations ***

const calcDaysPassed = (date1, date2) =>
  (date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)));

const num = 388954.32;
const options = {
  style: 'currency',
  currency: 'EUR',
};
console.log('US:', Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:', Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:', Intl.NumberFormat('ar-SY').format(num));

setTimeout(
  (arg1, arg2) => console.log(`Delayed 3 seconds with ${arg1} & ${arg2}`),
  3000,
  '1. argument',
  '2. argument'
);
