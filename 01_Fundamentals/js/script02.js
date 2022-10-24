/*
function getAge(birthYear) {
    const currentYear = new Date();
    return currentYear.getFullYear() - birthYear;
}

console.log(getAge(2004));

const getAgeArrow = birthYear => {
    const currentYear = new Date();
    return currentYear.getFullYear() - birthYear;
};

console.log(getAgeArrow(2004));
*/

//* Arrays
/*
const friends = ["Filip", "Peter", "Steven"];

friends.push("Jay"); // Adds an element to the end of an array
friends.unshift("Jay"); // Adds an element to the start of an array

friends.pop(); // Removes the last element of an array
friends.shift(); // Removes the first element of an array

const peterPos = friends.indexOf("Peter");
const isPeterInArray = friends.includes("Peter");
*/

//* Objects
/*
const filip = {
    firstName: "Filip",
    lastName: "Kocian",
    age: 17,
    job: "student",
    friends: ["Tom", "Peter", "Steven"],
};

console.log(filip);
console.log(filip.firstName);
console.log(filip["firstName"]);

const nameKey = "Name";
console.log(filip["first" + nameKey], filip["last" + nameKey]);


const interestedIn = prompt("What info do you want to know about me?");

if (filip[interestedIn]) {
    console.log(filip[interestedIn]);
} else {
    console.log("Incorrect request!");
}


filip.location = "Prague";
filip["email"] = "myemail@gmail.com";

console.log(filip);

console.log(
    `${filip.firstName} has ${filip.friends.length} friends, and his best friend is called ${filip.friends[0]}`
);
*/
/*
const filip = {
    firstName: "Filip",
    lastName: "Kocian",
    birthYear: 2004,
    job: "student",
    friends: ["Tom", "Peter", "Steven"],
    hasDriversLicense: false,

    // calcAge: function () {
    //     const date = new Date();
    //     return date.getFullYear() - this.birthYear;
    // },

    calcAge: function () {
        const date = new Date();
        this.age = date.getFullYear() - this.birthYear;

        return this.age;
    },

    logInfo: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${
            this.job
        }, and he has ${this.hasDriversLicense ? "a" : "no"} drivers license`;
    },
};

console.log(filip.logInfo());
*/

// * For loop
/*
for (let rep = 1; rep < 11; rep++) {
    console.log("I did my " + rep + " rep.");
}


// backwords loop
const filip = ["Filip", "Kocian", 17, ["Tom", "Peter"], "student"];

for (let i = filip.length - 1; i >= 0; i--) {
    console.log(filip[i]);
}

//nested loop
for (let i = 1; i < 4; i++) {
    console.log("------- Starting excercise --------- " + i);

    for (let k = 1; k < 5; k++) {
        console.log("Doing pushup " + k);
    }
}
*/

// * While loop
/*
let i = 1;

while (i < 11) {
    console.log("Doing my " + i + " rep.");

    i++;
}

let dice;

do {
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`you rolled a ${dice}`);
} while (dice !== 6);
*/

// * Foreach loop
/*
const filip = ["Filip", "Kocian", 17, ["Tom", "Peter"], "student"];

filip.forEach((info, index) => {
    console.log(info + " " + index);
});
*/
