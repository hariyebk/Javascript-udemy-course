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
