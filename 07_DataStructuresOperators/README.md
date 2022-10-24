## Notes for Data Structures, Modern Operators and Strings section

- Data Structures, Modern Operators and Strings
  - Destructuring arrays
  - Destructuring objects
  - Spread operator
  - Rest operator
  - Short circuiting
  - The nullish coalescing operator
  - Logical assignment operator
  - The for - of loop
  - Enhanced object literals
    - Referencing other objects: `~~openingHours: openingHours~~` X `openingHours` is enough
    - Declaring methods: ~~`order: function () {};`~~ X `order () {};`
    - We can compute key names in any way with [ ... ]
  - Optional chaining
  - Looping objects
    - `Object.keys(Object)` for keys
    - `Object.values(Object)` for values
    - `Object.entries(Object)` for keys and values
  - Sets
    - Stores ONLY UNIQUE values in random order
    - Initialization: `const newSet = new Set(ANY ITERABLE)`
    - Size of the set: `Set.size`
    - Does the set include x: `Set.has(x)`
    - Add a value: `Set.add(x)`
    - Delete a value: `Set.delete(x)`
    - Delete all values: `Set.clear()`
    - Values CANNOT be retrieved
    - Used for creating arrays with no duplicates: `const uniqueArr = [... new Set (arr)];`
  - Maps
    - Maps values to keys
    - Keys can have ANY type
    - Initialization: `const newMap = new Map()`
    - Assigning keys & values: `Map.set(key, value)`
      - `Map.set` also returns the Map so we can chain .set functions:
      ```jsx
      const rest = new Map();
      rest
        .set('name', 'Classico Italiano')
        .set(1, 'Firenze, Italy')
        .set(2, 'Rome, Italy');
      ```
    - Reading values: `Map.get(KEY)`
    - Does map include x: `Map.has(KEY)`
    - Delete a value: `Map.delete(KEY)`
    - Delete all values: `Map.clear()`
    - Convert map into array: `const arr = [... Map]`
    - Length of the map: `Map.size`
  - Choosing the correct data structure:
    - Where can data come from:
      - Program itself (hardcoded)
      - User input (DOM)
      - External sources (API)
    - Arrays - ordered list of values, for manipulating objects
    - Sets - High performance, removes all duplicates
    - Objects - when we need methods inside, when working with JSON
    - Maps - simple key/value pairs, keys different then strings
  - Strings
    ```jsx
    // HOW IT WORKS
    // When we call a method on a string the string primitive is 'boxed'
    // Boxing: the string is converted into a String object
    console.log(new String('Filip')); // String object
    console.log(typeof new String('Filip')); // object
    // The object is after the method reverted back to a string primitive
    ```
    - ALL string method return the mutated substring - can be chaned
    - With a string method we are creating a substring not mutating the original string
    - Methods
      - IndexOf & lastIndexOf
      - Slice - extract part of a string
      - ToLowerCase & toUpperCase
      - Trim
      - Replace
      - Includes
      - StartsWith
      - EndsWith
      - Split
      - Join
      - PadStart & padEnd
      - Repeat
