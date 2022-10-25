## Notes for Mapty section

In this section I fully applied OOP concepts and created an app called Mapty.
In this app user can add their trainings and view them on a map.

- Mapty

- Working with Leaflet library
  - Popups
  - Moving map
- OOP architecture principles
- Geolocation API

```jsx
navigator.geolocation.getCurrentPosition(<success callback function>, <error callback function>);
```

- Local Storage API

```jsx
localStorage.setItem('workouts', JSON.stringify(this.#workouts));
// Storing a key-value pair (<key name>, data as string)

const data = JSON.parse(localStorage.getItem('workouts'));
// Retrieving a value (<key>)
```
