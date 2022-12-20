// Exporting Module

// Blocking code (top level await)
// console.log('start fetching');
// await fetch('https://jsonplaceholder.typicode.com/users');

// console.log('end fetching');

const shippingCost = 10;
export const cart = [];

export function addToCart(product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added.`);
}

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added.`);
}
