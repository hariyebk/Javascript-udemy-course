// Importing Module

// Normal import
// 1. import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// Import everything
import * as ShoppingCart from './shoppingCart.js'; // Creating a namespace ShoppingCart

// Default import
import add from './shoppingCart.js';

// 1. addToCart('butter', 3);
// 1. console.log(price, tq);

ShoppingCart.addToCart('butter', 3);

// using default import
add('product', 5);
add('product', 5);
add('product', 5);

console.log(ShoppingCart.cart);

// console.log('start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();

// console.log(data);
// console.log('end fetching');

async function getLastPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
}

//! Doesn't work
// const lastPost = getLastPost();
// console.log('🚀 ~ file: script.js ~ line 40 ~ lastPost', lastPost);

// * Correct way
// const lastPost = await getLastPost();
// console.log('🚀 ~ file: script.js ~ line 43 ~ lastPost', lastPost);

// * npm basics

import lodash from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateDeepClone = lodash.cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone); // No change in the object

// HMR
if (module.hot) {
  module.hot.accept();
}

import 'core-js/stable/array/find';
import 'regenerator-runtime/runtime';
