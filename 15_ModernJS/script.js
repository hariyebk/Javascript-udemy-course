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
