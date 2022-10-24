## Notes for the section A CLoser Look at Functions

- Default parameters
  ```jsx
  function createBooking(
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
  ) {}
  ```
  - Any expression
- Passing Arguments
  - By reference x By value
- First-class functions
  - Functions are just another type of objects
    - We can pass them as arguments or return them
    - Functions have their own methods (example: bind)
- Higher-order function

  - Function that recieves a function as an argument (callback function)
  - Function that return a function

    ```jsx
    function greet(greeting) {
      return function (name) {
        console.log(`${greeting} ${name}`);
      };
    }

    greet('Hello')('Filip'); // Hello Filip
    ```

- Call method
  - Changes the THIS keyword to a different object
  - `Function.call(Object, Argument1, Argument2, ...)`
- Apply method
  - Simmilar to call (**depricated**)
  - Arguments must be passed in an array
  - `Function.apply(Object, [Argument1, Argument2, ...])`
- Bind method
  - Returns a new function with the THIS keyword assigned to the given object
  - Binds the THIS keyword to a given object
  - `book.bind(Object)(Argument1, Argument2, ...)`
  - Binding also works on given arguments
  - `book.bind(Object, Argument1)(Argument2, Argument3, ...)`
  - Partial application (setting only arguments)
  - `book.bind(null, Argument1)(Argument2, Argument3, ...)`
- IIFE - Immidiately invoked function expressions
  ```jsx
  (function () {
    console.log('This will never run again');
  })();
  ```
- Closures
  - Every function has access to the variable environment of the execution context in which it was created
