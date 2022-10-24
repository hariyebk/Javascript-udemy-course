// *** Challenge #1 ***

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;

function printGoals(...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
}

function printOdds(team1, team2) {
  team1 > team2 && console.log('Team 2 is favored');
  team1 < team2 && console.log('Team 1 is favored');
}

printOdds(team1, team2);
printGoals(...game.scored);

// *** Challenge #2 ***

// Object called game with array with 12 players
const game1 = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

for (const [type, odd] of Object.entries(game.odds)) {
  console.log(
    `Odd of`,
    game[type] ? `victory ${game[type]}` : `draw`,
    `: ${odd}`
  );
}

const scorers = {};

for (const player of game.scored) {
  scorers[player] = scorers[player] + 1 || 1;
}

console.log(scorers);

// *** Coding Challenge #3 ***

// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
const events = [...new Set(gameEvents.values())];
console.log(events);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4
for (const [minute, event] of gameEvents.entries()) {
  console.log(
    `[${minute <= 45 ? 'FIRST HALF' : 'SECOND HALF'}] ${minute}: ${event}`
  );
}

// *** Coding Challenge #4 ***

// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

// GOOD LUCK 😀

// Create the neccessary DOM elements
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// Get the reference for the elements
const inputEl = document.querySelector('textarea');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  // Get the user input
  const input = inputEl.value;

  // Split the input into separate names
  const vnames = input.split('\n');

  // Loop over every name
  for (const [index, vname] of vnames.entries()) {
    // Trim the word, put it to lower and split it into individual words
    const words = vname.trim().toLowerCase().split('_');
    const correctedWord = [];

    // Loop over every word
    for (const word of words) {
      // Skip the first word
      if (word === words[0]) correctedWord.push(word);
      // Turn the first letter uppercase
      else correctedWord.push(word.replace(word[0], word[0].toUpperCase()));
    }

    // Join the corrected words
    const camelCaseName = correctedWord.join('');
    // Create the full output as in the assignment
    const fullOutput = camelCaseName
      .padEnd(20, ' ')
      .concat('', '✅'.repeat(index + 1));

    console.log(fullOutput);
  }
});
