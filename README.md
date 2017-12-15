# openstreetmap-date-parser
A parser for date values as they are used for start_date and similar tags.

## Installations
```sh
npm install --save openstreetmap-date-parser
```

## API
It will return an array with the lower and upper boundaries for the year in
which the event took place.

```js
var osmDateParser = require('openstreetmap-date-parser')

console.log(osmDateParser('1984-10-20'))
// [ 1984, 1984 ]

console.log(osmDateParser('1914..1918'))
// [ 1914, 1918 ]

console.log(osmDateParser('early 1920s'))
// [ 1920, 1923 ]

console.log(osmDateParser('before 1855'))
// [ null, 1854 ]
```
