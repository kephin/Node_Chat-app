const moment = require('moment');

// const date = moment();
// date.add(2, 'years').substract(3, 'months');
// console.log(date.format('MMM Do, YYYY'));

// console.log(date.format('h:mm a'));

// const someTimestamp = moment().valueOf();
// console.log(someTimestamp);

const createdAt = 159123141522;
const date = moment(createdAt);
console.log(date.format('h:mm a'));
