'use strict';

// Constructor function
function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // ! never declare a method in the constructor
  //    this.calcAge = function () {
  //        console.log(2037 - this.birthYear);
  //    };
}

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

Person.prototype.species = 'Homo sapiens sapiens';

// Creating a new object
const filip = new Person('Filip', 2004);
const matilda = new Person('Matilda', 2017);

console.log(filip.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(filip));
console.log(filip.hasOwnProperty('species'));
console.log(filip instanceof Person);
console.dir(filip.__proto__.constructor); // Points back to the constructor func

console.log(filip);
console.log(matilda);
filip.calcAge();

// Built-in Objects
console.log(Object.prototype); // The object prototype
console.log(filip.__proto__.__proto__); // The object prototype

const arr = [1, 2, 3, 4, 2, 2, 3];
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__); // The object prototype

// Bad practice
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

console.dir(document.querySelector('h1'));
console.dir(x => x + 1);

// ES6 Classes

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);

// Getters and Setters

const account = {
  owner: 'filip smith',
  movements: [200, 530, 120, 300],

  set owner(name) {
    if (name.includes(' ')) this._owner = name;
    else alert(`${name} is not valid!`);
  },

  get owner() {
    return this._owner;
  },
};

console.log(account.movements); // Output: [..., 300, 100]

// Calling a setter
account.owner = 'Filip S';
account.owner = 'Filip Smith';

// Calling a getter
console.log(account.owner); // Output: 'filip smith'

// Static methods
class PersonStatic {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  // Static method
  static hey() {
    console.log('Hey there!');
  }
}

const jessicaStatic = new PersonStatic('Jessica', 1996);

// Static for constructor functions
PersonStatic.hey = function () {
  console.log('Hey there!');
};

// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // Not a constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Manually setting properties
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge();
console.log(steven);

// Programatically setting properties
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// Inheritance between classes (constructor funcs)
const PersonInheritance = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonInheritance.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  PersonInheritance.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(PersonInheritance.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);

mike.introduce();
mike.calcAge();

// Inheritance between classes (ES6 classes)

class PersonClInheritance {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there!');
  }
}

class StudentClInheritance extends PersonClInheritance {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // calling the constructor func of the parent
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }

  // Polymorphism
  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear} years old, but I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentClInheritance(
  'Martha Jones',
  2012,
  'Computer Science'
);
console.log(martha);
martha.introduce();
martha.calcAge();

// *** Encapsulation ***

class Account {
  //* Public field
  locale = navigator.language;

  //* Private field
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //this.locale = navigator.language;
    //* Protected property
    //this._pin = pin;
    // this._movements = [];

    this.#pin = pin;
  }

  //* Public method
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);

    return this;
  }

  withdraw(value) {
    this.deposit(-value);

    return this;
  }

  //* Protected method
  _approveLoan() {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan()) {
      this.deposit(value);
      console.log(`Loan approved`);
    }
  }

  /*
  //* Private method
  #approveLoan() {
    return true;
  }
  */
}

const acc1 = new Account('Filip', 'EUR', 1234);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(400);

// Chaining methods
acc1.deposit(300).deposit(500).withdraw(35);
