// *** Coding Challenge #1 and #2 ***

const markHeight = 1.69;
const markWeight = 10;

const johnHeight = 1.95;
const johnWeight = 92;

const markBMI = markWeight / markHeight ** 2;
const johnBMI = johnWeight / johnHeight ** 2;

if (markBMI > johnBMI) {
  console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`);
} else {
  console.log(`Mark's BMI (${markBMI}) is lower than John's BMI (${johnBMI})`);
}

// *** Coding Challenge #3 ***

const dolphins = [109, 95, 123];
const koalas = [109, 95, 123];

const sumDolphins =
  dolphins.reduce((partialsum, a) => partialsum + a, 0) / dolphins.length;
const sumKoalas =
  koalas.reduce((partialsum, a) => partialsum + a, 0) / koalas.length;

if (sumDolphins < 100 && sumKoalas < 100)
  console.log("Nobody wins - nobody reached the limit of 100 points.");
else {
  if (sumDolphins > sumKoalas) {
    console.log("Dolphins win!");
  } else if (sumKoalas > sumDolphins) {
    console.log("Koalas win!");
  } else if (sumDolphins === sumKoalas) {
    console.log("Match ended in a draw!");
  }
}

// *** Coding Challenge #4 ***

const price = 275;

const tip = price < 300 && price > 50 ? price * 0.15 : price * 0.2;

const total = price + tip;

console.log(
  `The bill was ${price}, the tip was ${tip}, and the total value is ${total}`
);
