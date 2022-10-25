## Notes for the Arrays section

In this section I created a web app called Bankist, simulating a banking app.
The js is therefore divided into bankist code and lessons code.

- Simple methods:
  - slice(_startindex , endindex_) - Slices the array and returns a new array without changing the original one
  - splice(_startindex , numberofelements_) - Mutates the original array and returns the extracted part
  - reverse() - Mutates the original array and returns the reversed array
  - concat(_1. array, 2. array_) - Return a new array with both arrays
  - at(index) - Return the value on the given index
    - Makes accessing last element of an array much faster (-1)
  - ForEach(_function(each element, current index, the array)_) - Iterates over an array and calls the given function for each element
    - Can be used also with maps and sets (sets are used without keys, just values)
- Data Transformation for Arrays

  - Map - loop over an array which creates a brand new array based on the function
  - Filter - filters the array and returns a brand new array with the elements which satisfy the function
  - Reduce - creates a single value from the array based on the given function
  - Find - Retrieve THE FIRST element from an array based on the given function
  - FindIndex - Finds the index of an element based on the given function
  - Some - Return true if at least one element satisfies the given function (used with conditions, otherwise use Includes Method)
  - Every - Return true if all elements satisfy the given function
  - Flat - Returns a new array without all nested arrays to the given depth

  ```jsx
  const arrFlat = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

  arrFlat.flat(4); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ```

  - FlatMap - Map method that flattens the array at the end of the operation (only one level deep)
  - Sort - Mutates the array by sorting all elements based on strings OR accepts a callback function for sorting
    - takes two arguments a, b (consecutive numbers):
      - returns a, b if value is < 0
      - returns b, a if value is > 0

- Creating and populating arrays
  - Bracket initialization `const arr = [1, 2, 3]`
  - New Array function `const arr = new Array(1, 2, 3)`
    - If we specify only one argument - `const arr = new Array(3)` we get _[empty x 3]_
  - Fill method - fills the chosen part of an array to the specified value and mutates the array
    - Used with empty arrays
    - Array.fill(_value_, _startIndex_, _endIndex_)
  - From method - creates an array with the given length and specified mapping function
    - Used for converting iterables
- Adding html markup through code

  - We can write HTML in JS and then add it to the DOM
    - Element.insertAdjacentHTML(_where_, _what_)

  ```jsx
  const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${index + 1} ${type}
          </div>
          <div class="movements__value">${mov} €</div>
        </div>
      `;

  containerMovements.insertAdjacentHTML('afterbegin', html);
  ```

- **\_** - used as a throwaway variable
