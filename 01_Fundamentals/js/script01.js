// Debuging to console
console.log("Hello World!");

// Variable declaration
// Camel case naming

// Data types
// number integer & float
let age = 23;

//string
let firstName = "Filip";

//boolean (true/false)
let fullAge = true;

//undefined - empty value
let children;

/*
null

symbol

bigInt
*/

// we dont need to specify let or const (!bad!)
lastName = "Ocian";

// get the type of variable
console.log(typeof firstName);

// Dynamic typing
firstName = 17;
console.log(typeof firstName);

/*  let for changing variables (reasigning)
    const for constant variables - cannot be changed
*/

firstName = "Filip";

const filip = "I'm " + firstName + " a Web Developer aged";

console.log(filip);

// * template literals
const tString = `I'm ${firstName} a Web Developer aged ${filip}`;
console.log(tString);

// * New line
console.log("String with \nmultiple \nlines \n");
console.log(`String with
 multiple
 lines`);

// * if statements
const ageIf = 11;

if (ageIf >= 18) {
  console.log("I am old enough to drive!");
} else {
  const yearsLeft = 18 - age;
  console.log(
    `I am not able to apply for a driver license. Wait for ${yearsLeft} years.`
  );
}
