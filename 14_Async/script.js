'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function renderCountry(data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
              <div class="country__data">
                  <h3 class="country__name">${data.name}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                  ).toFixed(1)} people</p>
                  <p class="country__row"><span>🎤</span>${
                    data.languages[0].name
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                  }</p>
          </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
}

// * Error Handling
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}

// * Get Data
function getJSON(url, errorMsg = 'Something went wrong...') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
}

// * Btn Listener
//btn.addEventListener('click', whereAmIOptimised);

// !!! OLD WAY !!!
// * AJAX Call

function getCountryData(country) {
  const request = new XMLHttpRequest();

  // AJAX Call
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🎤</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
        </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  });
}

getCountryData('portugal');
getCountryData('usa');
getCountryData('czech');

// Chaining AjAX Calls
function getCountryDataAndNeighbour(country) {
  const request = new XMLHttpRequest();

  // AJAX Call
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    renderCountry(data);

    const [neighbour] = data.borders;
    if (!neighbour) return;

    const requestN = new XMLHttpRequest();

    //! Callback Hell
    // AJAX Call
    requestN.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    requestN.send();

    requestN.addEventListener('load', function () {
      const dataN = JSON.parse(this.responseText);

      renderCountry(dataN, 'neighbour');
    });
  });
}

getCountryDataAndNeighbour('germany');

///////////////////////////////////////
// *** Correct way ***
// * Fetch API

function getCountryDataP(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json()) // Also returns a promise
    .then(data => renderCountry(data[0]));
}

getCountryDataP('portugal');

function getCountryDataAndNeighbourP(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    }) // Also returns a promise
    .then(data => {
      renderCountry(data[0]);

      // Chaining promises
      const neighbour = data[0].borders[0];

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); // Returns a promise
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // * Error Handling
      renderError(`Something went wrong... (${err.message}) Please try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', function () {
  getCountryDataAndNeighbourP('ssssssssssss');
});

//* Refactoring code

function getJSON(url, errorMsg = 'Something went wrong...') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
}

function getCountryDataAndNeighbourPR(country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      if (!data[0].borders) throw new Error('No neighbour found!');
      const neighbour = data[0].borders[0];

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong... (${err.message}) Please try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', function () {
  getCountryDataAndNeighbourPR('usa');
});

// * Event loop Example

console.log('Test Start'); // 1
setTimeout(() => console.log('0 sec timer'), 0); // 5
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3 (Microtasks Queue)

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000; i++) {}

  console.log(res); // 4
});
console.log('Test End'); // 2

// * Building a Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🎲');

  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🎇');
    } else reject(new Error('You lost your money 😞'));
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');

    return wait(2);
  })
  .then(() => console.log('I waited for one second'));

// * Promisifying Geolocation API

// Standard way
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);

// Promise
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

getPosition().then(pos => console.log(pos));

function whereAmIOptimised() {
  getPosition()
    .then(pos => {
      const { lattitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error('Invalid request');

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      const country = data.countryCode;

      return fetch(`https://restcountries.com/v2/alpha/${country}`);
    })
    .then(request => request.json())
    .then(data => renderCountry(data))
    .catch(err => console.log(`Error has occured (${err.message})`))
    .finally(() => (countriesContainer.style.opacity = 1));
}

// * Async Await

// Promise
function getPositionAwait() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function WhereAmIAsync() {
  try {
    const { latitude: lat, longitude: lng } = await getPositionAwait();

    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (!resGeo.ok) throw new Error('Problem getting position');

    const { countryName: country } = await resGeo.json();

    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    const data = await res.json();

    renderCountry(data[0]);

    // Returning data
    return `I am in ${country}`;
  } catch (err) {
    renderError('Something went wrong!');

    // Throwing error to prapagate to the returned promise
    throw err;
  } finally {
    countriesContainer.style.opacity = 1;
  }
}
// Simple call
// WhereAmIAsync();

console.log('1: Getting your location');

// With return call IIF
// prettier-ignore
(  async function () {
    try {
      const returnedValue = await WhereAmIAsync();
      console.log('2: ' + returnedValue);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('3: Finished execution');
    }
  }
)();

// * Try / Catch

try {
  const x = 1;
  // ...
  x = 2;
} catch {
  // Handle the error
}

// Running promises in parallel
async function get3Countries(c1, c2, c3) {
  try {
    // Promises in sequence
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
}

get3Countries('portugal', 'canada', 'usa');

// Other Promise Combinators
// Promise.race()
(async function () {
  const res = await Promise.race([
    getJSON('https://restcountries.com/v2/name/italy'),
    getJSON('https://restcountries.com/v2/name/usa'),
  ]);

  console.log(res[0]);
})();

// usage (setting a timeout error)
function timeout(sec) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request took too long')), sec);
  });
}

Promise.race([
  getJSON('https://restcountries.com/v2/name/italy'),
  timeout(5000),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Hooray'),
]); // ['Success', 'Error', 'Hooray']

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Hooray'),
]); // 'Success'
