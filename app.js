#!/usr/local/bin/node --harmony

const express = require('express'),
			app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

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
