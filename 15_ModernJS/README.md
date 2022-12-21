## Notes for Modules, Tooling and Functional Programming section

In this section I was introduced to the concept of functional programming as well as to npm, bundling, modules, transpiling and most importantly to writing clean code.

- ES Modules:
  - More organizable and cleaner codebase
  - Using 3rd party modules (npm)
  - Must be build with a bundler
    - Bundling
    - Transpiling and Polyfilling
- ES Module:
  - Imported values are live connections (change)
  - Standalone file
  - Reusable piece of code that encapsulates details
  - Used for building large scale software
  - Isolating components
  - Abstracting code
  - Export - public API (hoisted)
  - Import - dependecy (hoisted)
    - Only top-level imports and exports
  - Variables are scoped to the **Module**
  - Always run in `strict` mode
  - The imported values are live (just pointers to the actual variables/functions)
  - Exports:
    - Named exports (importing with the exact name in curly braces)
      - Renaming with `as` keyword
    - Default exports (w/o curly braces imports the default export)
      - Only one per module
  - Imports:
    - Named imports
    - Import all with `*` - creates a namespace for the module vars and funcs
    - Bad practice to import default and named values
- Top-level Await
  - Only in modules
  - Blocks execution of the entire module
  - Importing module waits for the module for top-level awaits
- Command Line Basics
  - Commands: `ls`, `dir`, `mkdir`, `rm`, `rmdir`, `rm -R <folder>`, `cd`
- Module Pattern (legacy)
  - IIFEs and Closures
  ```jsx
  const ShoppingCart = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(`${quantity} ${product} added.`);
    };

    const orderStock = function (product, quantity) {
      console.log(`${quantity} ${product} ordered from supplier.`);
    };

    return {
      addToCart,
      cart,
      totalPrice,
      totalQuantity,
    };
  })();
  ```
- CommonJS Modules (legacy)
  - 1 file is 1 module
  - Used in Node.js
  ```jsx
  // CommonJS Modules
  // Exporting
  export.addToCart = function (product, quantity) {
  	cart.push({product, quantity});
  	console.log(`${quantity} ${product} added.`)
  	};

  // Importing
  const {addToCart} = require('./shoppingCart.js');
  ```
- npm Basics
  - Need Node.js runtime
  - Installing and using 3rd party code
  - Dependencies / Devdependencies
  - Script runner
  - Bundling with Parcel
    - HMR (hot module reloading)
    - Automatic minifications
- Babel
  - Transpiling into older versions of our code
  - Parcel automaticaly supports Babel
  - Doesn’t include new features (polyfilling)
- Polyfilling
  - Rebuilds the new function with old functions
  - `core-js` package
  - `regenerator-runtime/runtime` for async functions
- Writing clean code
  - Readable code - you and even others should understand it
  - DRY Principle - Don’t Repeat Yourself
  - Not polluting the global namespace
  - Strong typechecking
  - Functions:
    - No more than 3 arguments
    - 1 function does 1 thing
    - Return the same data type as recieved
  - OOP:
    - ES6 classes
    - Encapsulate data
    - API
    - Implement chaining
  - Aviod nested code (guard clauses)
  - Avoid for loops (array methods are prefered)
  - Async:
    - Always use `async / await`
    - Run promises in parallel
    - Handle errors and promise rejections
- Declarative and Functional JS Principles
  - Imperative x Declarative paradigm
  - Imperative: telling the computer step-by-step how to do things
  - Declarative: telling the computer what to do (the HOW is abstracted)
  - Functional programming:
    - Declarative paradigm
    - Pure functions without side effects
    - Immutability: Data is never modified, instead it is copied
