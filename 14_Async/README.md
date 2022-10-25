## Notes for Asynchronous JS section

In this section I was introduced to the concept of asynchronous code and the Event loop.

- Asynchronous JS

  - Synchronous code
    - Executed line by line and waits for the previous line to be executed
    - Blocking code: long-running tasks that block the code execution
  - Asynchronous code
    - Runs in the “background”
    - Non-blocking code: other code can run during the execution
    - Coordinating the behaviour of the program over time
  - AJAX calls

    - Asynchronous JavaScript And XML
    - Allows communication with remote web servers in an asynchronous way
    - Allows data dynamic requesting from web servers

    ```jsx
    const request = new XMLHttpRequest();

      // AJAX Call
      request.open('GET', `https://restcountries.com/v2/name/${}`);
      request.send();

      request.addEventListener('load', function () {})
    ```

  - API
    - Application Programming Interface
    - Software that can be used by another piece of software
    - Allows applications to talk to each other
    - WebAPI (3rd-party API): Application running on a server recieving requests and sending responses
  - XML
      <aside>
      ❗ Redundant data format
      
      </aside>
      
      - Most API’s use JSON data format
  - How the web works
    - DNS Server transforms the domain into an IP address
    - TCP/IP connection established
      - Transfer protocols for chunking and routing requests and responses respectively
    - HTTP/HTTPS request to the server
      - Start line: HTTP method, request target, HTTP version
      - Headers
      - Body
    - HTTP/HTTPS response
      - Start line: HTTP version, status code, status message
      - Headers
      - Body (the response)
  - Callback Hell
    - A lot of nested callbacks to execute in order
  - Promises and Fetch API
    - Object that is used as a placeholder for the future result of an asynchronous operation
    ```jsx
    const request = fetch('https://restcountries.com/v2/name/portugal');
    console.log(request); // Promise
    ```
    - Not relying on events and callback functions like old AJAX Calls
    - Ability to chain promises and escape Callback hell
    - Time sensitive (different states)
      - Pending - asynchronous task still ongoing
      - Settled - Asynchronous task has finished
        - Fullfilled - The Async task was successful
        - Rejected - The Async task failed
      - Every promise can be settled only once and remains in the given state
    - Consuming promises - Using the promise to get data
    - Building a promise - Creating a promise (Fetch API)
  - Consuming Promises
    ```jsx
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then(response => response.json()) // Also returns a promise
      .then(data => renderCountry(data[0]));
    ```
    - `promise.then(<callback func>, <callback func>)` method
      - Available on all promises
      - Handels the success and failure of the promise
      - Returns a promise (anything returned will become the value of the fullfilled promise)
    - `response.json()` method
      - Returns a promise
      - Transforms the response from the promise to an object
  - Chaining Promises

    - Creating and **returning** a new promise in the `then()` method and consuming it with more `then()` methods

    ```jsx
    .then(data => {
          renderCountry(data[0]);

          // Chaining promises
          const neighbour = data[0].borders[0];

          return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); // Returns a promise
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'));
    ```

  - Handling Errors
    - The promise rejects only when internet connection is lost
    - Using `then`’s second callback function for rejected promises
    - Using `promise.catch(<callback func>)` - Only called when the promise is rejected
  - Promise functions (recap)
    - `promise.then(<callback func>, <callback func>)` - Called when promise is **fullfilled**
      - Consuming the promise
    - `promise.catch(<callback func>)` - Called when promise is **rejected**
    - `promise.finally(<callback func>)` - Called **always** at the end
    ```jsx
    ...
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => { // * Error Handling
    		renderError(`Something went wrong... (${err.message}) Please try again!`);
     })
     .finally(() => {
         countriesContainer.style.opacity = 1;
     });
    ```
  - Throwing errors manually
    - The `Response` object has a key ok and a staus code
    - `throw new Error`
      - Used in `then` methods
      - Returns a rejected promise that is captured by the `catch` method
      ```jsx
      fetch(`https://restcountries.com/v2/name/${country}`)
         .then(response => {
      	    if (!response.ok)
      				throw new Error(`Country not found ${response.status}`);
      		   return response.json(); // Rejected promise
          })
      ...
      .catch() // Handling the Error
      ```
  - Event Loop
    - JS has only one thread
    1. Async tasks related to Web APIs run in the browsers envirovment
    2. When an async task finishes the callback func is put in the Callback Queue
    3. Callback queue: ordered list of funcs for the call stack to complete
    4. The event loop looks into the call stack (orchestration of calls)
    5. If the call stack is empty it executes the first func in the Callback queue (Tick)
    - Promises are put into the Microtasks Queue
    - Microtasks Queue has precedence over the Callback Queue
  - Building a promise
    - Promise is an object
    ```jsx
    const lotteryPromise = new Promise(function (resolve, reject) {
      if (Math.random() >= 0.5) {
        resolve('You WIN 🎇');
      } else {
        reject('You lost your money 😞');
      }
    });
    ```
    - `Promise(<executer func>)`
    - The `executer` function takes two arguments (resolve, reject)
  - Promisifying
    - Process of wraping old callback functions to promises
    - Getting rid of callback hell
    ```jsx
    // Promisifying setTimeout
    function wait(seconds) {
      return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
      });
    }
    ```
  - Async / Await
    - Different way to consume promises
    - Syntactical sugar over `.then` methods
    - First we need to declare the async function
    ```jsx
    async function asyncFunction() {}
    ```
    - Using the `await` keyword we can consume promises
    - Causes the async function to be paused
    - `Await` returns:
      - The value if it is not a promise
      - The fullfilled value of the promise on fullfilment
      - Throws the rejected value on rejection
    ```jsx
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    ```
  - Try / Catch
    - Used for any error handling
    ```jsx
    try {
      const x = 1;
      // ...
      x = 2;
    } catch (err) {
      // Handle the error
    } finally {
      // Optional
      // What to do always
    }
    ```
    - JS tries to execute the code in the `try` block
    - If any errors occure the `catch` block is executed
    - The `finally` block is executed always
  - Returning values from async functions
    - If we specify a return value it will become the result of the fullfilled promise
    - Rethrowing an error to propagate to “lower” promises
  - Running promises in parallel
    - We use `Promise.all()`: Takes in an array of promises and returns a new promise than runs all the promises in parallel
    - On rejection of one of the promises the `Promise.all()` function short circutes and rejects
  - Promise combinators
    - `race(<promise array>)`: Settles once the first promise gets settled, the resolved value will be the first promise’s settled value
      - Used for timeouts
    - `allSettled(<promise array>)`: returns an array of the resolved values of all promises
      - Simmilar to `.all()` but this waits for all promises
    - `any(<promise array>)`: returns the value of the first fullfilled promise
