// *** Challenge #1 ***

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

// *** Challenge #2 ***

function calcTip(bill) {
  return bill < 300 && bill > 50 ? bill * 0.15 : bill * 0.2;
}

const bills2 = [125, 555, 44];
const tips2 = [calcTip(bills2[0]), calcTip(bills2[1]), calcTip(bills2[2])];
const totalAmmounts = [
  bills2[1] + tips2[1],
  bills2[2] + tips2[2],
  bills2[0] + tips2[0],
];

console.log(bills2, tips2, totalAmmounts);

// *** Challenge #3 ***

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
    ? `${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s (${mark.BMI})`
    : `${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s (${john.BMI})`
);

// *** Challenge #4 ***

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bills) {
  bills.forEach((bill) => {
    let tip = 0;

    bill > 50 && bill < 300 ? (tip = bill * 0.15) : (tip = bill * 0.2);

    tips.push(tip);
    totals.push(bill + tip);
  });
};

calcTip(bills);
console.log(bills, tips, totals);
