// *** Challenge #0.1 ***
const addTaxCh = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

// *** Challenge #1 ***

const poll = {
  question: 'What is your favorite programming language?',
  options: ['1: JavaScript', '2: Python', '3: Rust', '4: C++'],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const input = parseInt(
      prompt(
        `${this.question}\n${printOptions(this.options)}Write option number`
      )
    );

    if (input < 5 && input > 0 && typeof input == 'number') {
      this.answers[input - 1]++;
    } else {
      alert('Invalid vote!');
    }

    this.displayResults();
  },

  displayResults(type = 'array') {
    type === 'string'
      ? console.log('Poll results are', this.answers.join(', '))
      : console.log(this.answers);
  },
};

const printOptions = function (options) {
  let str = '';
  options.forEach(option => {
    str += `${option}\n`;
  });
  return str;
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS:
poll.displayResults.call({ answers: [2, 5, 3] }, 'string');

// *** Challenge #2 ***

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
