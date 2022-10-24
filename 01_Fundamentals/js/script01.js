// // Debuging to console
// console.log("Hello World!");

// // Variable declaration
// // Camel case naming

// // Data types
// // number integer & float
// let age = 23;

// //string
// let firstName = "Filip";

// //boolean (true/false)
// let fullAge = true;

// //undefined - empty value
// let children;

// /*
//  null

//  symbol

//  bigInt
// */

// // we dont need to specify let or const (!bad!)
// lastName = "Ocian";

// // get the type of variable
// console.log(typeof firstName);

// // Dynamic typing
// firstName = 17;
// console.log(typeof firstName);

// /*  let for changing variables (reasigning)
//     const for constant variables - cannot be changed
// */

// firstName = "Filip";

// const filip = "I'm " + firstName + " a Web Developer aged";

// console.log(filip);

// // * template literals
// const tString = `I'm ${firstName} a Web Developer aged ${filip}`;
// console.log(tString);

// // * New line
// console.log("String with \nmultiple \nlines \n");
// console.log(`String with
// multiple
// lines`);

// // * if statements
// const age = 11;

// if (age >= 18) {
//     console.log("I am old enough to drive!");
// } else {
//     const yearsLeft = 18 - age;
//     console.log(
//         `I am not able to apply for a driver license. Wait for ${yearsLeft} years.`
//     );
// }

// ** Challanges ** \\
//* Coding Challenge #1 and #2

// const markHeight = 1.69;
// const markWeight = 10;

// const johnHeight = 1.95;
// const johnWeight = 92;

// const markBMI = markWeight / markHeight ** 2;
// const johnBMI = johnWeight / johnHeight ** 2;

// if (markBMI > johnBMI) {
//     console.log(
//         `Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`
//     );
// } else {
//     console.log(
//         `Mark's BMI (${markBMI}) is lower than John's BMI (${johnBMI})`
//     );
// }

//* Coding Challenge #3

// const dolphins = [109, 95, 123];
// const koalas = [109, 95, 123];

// const sumDolphins =
//     dolphins.reduce((partialsum, a) => partialsum + a, 0) / dolphins.length;
// const sumKoalas =
//     koalas.reduce((partialsum, a) => partialsum + a, 0) / koalas.length;

// if (sumDolphins < 100 && sumKoalas < 100)
//     console.log("Nobody wins - nobody reached the limit of 100 points.");
// else {
//     if (sumDolphins > sumKoalas) {
//         console.log("Dolphins win!");
//     } else if (sumKoalas > sumDolphins) {
//         console.log("Koalas win!");
//     } else if (sumDolphins === sumKoalas) {
//         console.log("Match ended in a draw!");
//     }
// }

//* Coding Challenge #4
// const price = 275;

// const tip = price < 300 && price > 50 ? price * 0.15 : price * 0.2;

// const total = price + tip;

// console.log(
//     `The bill was ${price}, the tip was ${tip}, and the total value is ${total}`
// );
