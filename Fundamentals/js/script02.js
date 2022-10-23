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

// * Coding Challenges
// Challenge #1
/*
const calcAverage = (firstScore, secondScore, thirdScore) => {
    return (firstScore + secondScore + thirdScore) / 3;
};

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins > avgKoalas * 2) {
        console.log(`The Dolphins win (${avgDolphins} vs ${avgKoalas})`);
    } else if (avgKoalas > avgDolphins * 2) {
        console.log(`The Koalas win (${avgKoalas} vs ${avgDolphins})`);
    } else {
        console.log("No team wins ...");
    }
}

const dolphinsAvg = calcAverage(85, 54, 41);
const koalasAvg = calcAverage(23, 34, 27);

console.log(dolphinsAvg, koalasAvg);

checkWinner(dolphinsAvg, koalasAvg);
*/

// Challenge #2
/*
function calcTip(bill) {
    return bill < 300 && bill > 50 ? bill * 0.15 : bill * 0.2;
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totalAmmounts = [
    bills[0] + tips[0],
    bills[1] + tips[1],
    bills[2] + tips[2],
];

console.log(bills, tips, totalAmmounts);
*/

// Challenge #3
/*
const mark = {
    fullName: "Mark Miller",
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    },
};

const john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    },
};

console.log(
    john.calcBMI() > mark.calcBMI()
        [otaznik] `${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s (${mark.BMI})`
        : `${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s (${john.BMI})`
);
*/

// Challenge #4
/*
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bills) {
    bills.forEach(bill => {
        let tip = 0;

        bill > 50 && bill < 300 ? (tip = bill * 0.15) : (tip = bill * 0.2);

        tips.push(tip);
        totals.push(bill + tip);
    });
};

calcTip(bills);
console.log(bills, tips, totals);
*/
