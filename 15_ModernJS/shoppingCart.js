// Exporting Module

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
