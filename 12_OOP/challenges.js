// *** Coding Challenge #1 ***

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw1 = new Car('BMW', 120);
const mercedes1 = new Car('Mercedes', 95);

bmw1.accelerate();
bmw1.accelerate();
bmw1.brake();

// *** Coding Challenge #2 ***

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const bmw = new CarCl('BMW', 120);
const mercedes = new CarCl('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
console.log(bmw.speedUS);
bmw.speedUS = 50;

// *** Coding Challenge #3 ***

const CarIn = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarIn.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarIn.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  CarIn.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(CarIn.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;

  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);

tesla.accelerate();
tesla.brake();
tesla.chargeBattery(58);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(58);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(58);

// *** Coding challenge #4

class CarClES6 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;

    console.log(`The ${this.make} is going at ${this.speed} km/h.`);
  }

  break() {
    this.speed -= 5;

    console.log(`The ${this.make} is going at ${this.speed} km/h.`);

    return this;
  }
}

class EVCl extends CarClES6 {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;

    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;

    console.log(`The ${this.make} is going at ${this.speed} km/h.`);

    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate();
rivian.break();
rivian.chargeBattery(99);
rivian.accelerate().break().break().break();
console.log(rivian);
