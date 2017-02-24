#!/usr/local/bin/node --harmony

const express = require('express'),
			app = express();

let sample1 = require('./samples/sample1');

app.use('/', (req, res) => {
  res.send('hello, world');
});

app.listen(1337, () => {
  console.log("Server started on port 1337...");
});
