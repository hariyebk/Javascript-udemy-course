// *** Challenge #1 ***

const forecasts = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let forecast = "... ";

  arr.forEach((temp, index) => {
    forecast = forecast + temp + "°C in " + (index + 1) + " days ... ";
  });

  console.log(forecast);
}

printForecast(forecasts);
