#!/usr/local/bin/node --harmony

const express = require('express'),
			app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

let middlewares = [
  (req, res, next) => {
    res.x = "First middleware added this string property in 'x' to the response object.";
    next();
  },
  (req, res, next) => {
    res.y = "Second middleware added a new string property in 'y' to the response object.";
  }
];

let middleWareGenerator = function*(req, res, next) {
  let x = 0;
  while(true) {
    yield function(req, res, next) {
      x++;
      console.log(`${x}: This is really really silly!`);
      next();
    };
  }
};

let factory = middleWareGenerator(10);

let middlewares2 = [
  factory.next().value,
  factory.next().value,
  factory.next().value,
  factory.next().value,
  factory.next().value,
  (req, res, next) => {
    res.send(`<h1>I hope you're happy with yourself...</h1>`);
  },
];

app.use('/test1',
       (req, res, next) => {
         res.x = "Hello from first middleware function!";
         next();
       },
       (req, res, next) => {
         res.x += "<br>Hello from second middleware function!";
         next();
       },
       (req, res) => {
         res.send(`<h1>Value of response.x: <br>${res.x}</h1>`);
       });

app.use('/test3', middlewares2);

app.get('/test1', (req, res) => {
  console.log('Above middleware is already using this path, and will not allow requests past this point. This route will never be reached.');
});

app.get('/test2', (req, res) => {
  let str = `What's the difference between use and get? use() is for binding middleware to our application. get() is for matching and handling a specific route when requested with GET.`;
  res.send(`<h2>${str}</h2>`);
});

app.get('/', (req, res) => {
	res.send('<h1>hello, world</h1>');
});
