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

// *** Challenge 1 *** \\

function whereAmI(lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
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

whereAmI(-33.933, 18.474);

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

// *** Challenge 2 *** \\

function waitChallenge(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

let currentImg;

function createImg(imgPath) {
  return new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;

    imgEl.addEventListener('load', function () {
      document.querySelector('.images').appendChild(imgEl);
      resolve(this);
    });

    imgEl.addEventListener('error', () => {
      reject(new Error('An unexpected error has occured!'));
    });
  });
}

createImg('img/img-1.jpg')
  .then(img => {
    currentImg = img;

    return waitChallenge(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImg('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;

    return waitChallenge(2);
  })
  .then(() => (currentImg.style.display = 'none'))
  .catch(err => console.error(err));

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

// *** Coding Challenge #3 ***
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time 
using async/await (only the part where the promise is consumed). Compare the two versions, 
think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the 
dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function 
  (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'].
To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');

    console.log('Image 1 loaded');

    await wait(2);

    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');

    console.log('Image 2 loaded');

    await wait(2);

    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

//loadNPause();

// PART 2
async function loadAll(imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);

    imgsEl.forEach(el => el.classList.add('parallel'));
    console.log(imgs);
  } catch (err) {
    console.error(err);
  }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
