/*
const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

function calcTempAmplitude(temps) {
    let highestTemp = temps[0];
    let lowestTemp = temps[0];

    // - Find the highset temperature
    temps.forEach(temp => {
        if (typeof temp === "number") {
            if (highestTemp < temp) {
                highestTemp = temp;
            }
        }
    });

    // - Find the lowest temperature
    temps.forEach(temp => {
        if (typeof temp === "number") {
            if (lowestTemp > temp) {
                lowestTemp = temp;
            }
        }
    });

    console.log(highestTemp, lowestTemp);

    // - Calculate the amplitude
    const amplitude = highestTemp - lowestTemp;

    // - Return amplitude
    console.log(amplitude);
    return amplitude;
}

const amplitude = calcTempAmplitude(temperatures);
*/

//* Challenges
//Challenge #1
/*
const forecasts = [12, 5, -5, 0, 4];

function printForecast(arr) {
    let forecast = "... ";

    arr.forEach((temp, index) => {
        forecast = forecast + temp + "°C in " + (index + 1) + " days ... ";
    });

    console.log(forecast);
}

printForecast(forecasts);
*/
