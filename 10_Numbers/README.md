## Notes for the Number, Dates, Intl and Timers section

In this section I continued creating the web app called Bankist
The js is therefore divided into bankist code and lessons code.

- Numbers, Dates, Intl, Timers
  - Every number is represented by 64 bytes (max - 9007199254740991)
  - Converting numbers
    - Number(”30”) - converts the string to a number, returns NaN if not a number
    - +”30” - converts the string to a number, returns NaN if not a number
    - Number.parseInt(”30px”, <number system>) - converts the string to an int even if there is other text, returns NaN if the entire string is not a number
    - Number.parseFloat(”30.30px”, <number system>) - converts the string to a float even if there is other text, returns NaN if the entire string is not a number
    - isNaN(<value>) - checks if the argument is **NOT** a number
    - isFinite(<value>) - checks whether argument is finite and a number
    - isInteger(<value>) - checks whether argument is an integer and a number
  - Math operations
    - Remainder: 5 % 2 == 1
    - Squares: 2 \*\* 2
    - Roots: Math.sqrt(<number>) or 25 ** (1 / 2) or 8 ** (1 / 3)
    - Max value: Math.max(<number array>) - pereforms type cohersion
    - Min value: Math.min(<number array>) - pereforms type cohersion
    - Pi: Math.PI
    - Rounding integers:
      - Math.trunc(<float>) - removes the decimal point
      - Math.round(<float>) - round the float
      - Math.ceil(<float>) - round the float up
      - Math.floor(<float>) - round the float down
    - Rounding floats:
      - <float>.toFixed(<number of decimal points>) - returns a string with the given ammount of decimal points rounding the number
    - Random: Math.random() - return value between 0 and 1
    - Random int: `Math.floor(Math.random * (max - min) + 1) + min;`
  - Numeric separator
    - To make large numbers more readable or different numbers more meaningfull
    - We can separate the number with “\_”
    - The “\_” symbol in a number is ignored by the engine (can’t be place behind a dot)
    - Doesn’t work with converting from a string
    ```jsx
    const diametr = 287_460_000_000;
    console.log(diametr); // 287460000000
    ```
  - Big int
    - BigInt(<very long number>) or <very long number>n
    - All math operations work the same
    - Number methods do not work
    - Cannot be mixed with other types(eg. number)
  - Dates
    - Getting the current time: `const now = new Date()` (possible new Date(<year>, <month>, <day>, <hour>, <minutes>))
    - Current month, day, … : `now.getMonth() + 1;` or `now.getDate();`, …
    - We can pereform operations with them in miliseconds (like numbers)
  - Internationalizing
    - Currencies, Dates (changes the date, number to the given iso language code)
    - Intl API
      - Dates:
        - Init: `new Intl.DateTimeFormat(<iso language code>)`
        - To format: `.format(<date>, <options>)`
        - For options: `const options = {hour: ‘numeric’, minute: ‘numeric’, day: ‘numeric’, month: ‘numeric’, month: ‘long’}` - passed as 2. argument to init
        - Getting locale from the user: `const locale = navigator.language`
      - Numbers:
        - Init: `new Intl.NumberFormat(<iso language code>, ?<options>)`
        - To format: `.format(<number>)`
        - For options: `const options = {style: ‘currency’, currency: ‘EUR’, unit: ‘celsius’}` - passed as 2. argument to init
        - Getting locale from the user: `const locale = navigator.language`
  - Timers:
    - The execution is not stopped with intervals and timers (Async function)
    - **setTimeout**(<callback function>, <ammount of miliseconds>) - Runs ONCE after the specified ammount of time
      - `setTimeout(() => console.log('Delayed 3 seconds'), 3000);`
      - Arguments passed after the miliseconds will be passed into the callback function
        - `setTimeout((arg1, arg2) => console.log(`Delayed 3 seconds with ${arg1} & ${arg2}`), 3000, '1. argument', '2. argument');`
      - We can cancel a timeout before it’s execution if we assign the timout to a variable
        - `clearTimeout(<name of the variable with timeout>)`
    - **setInterval**(<callback function>, <interval>) - Runs EVERY itteration of the specified interval
      - Same as setTimeout ^^
