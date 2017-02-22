#!/usr/local/bin/node --harmony

const express = require('express'),
			app = express();

app.listen(3000, () => {
	console.log("Server started on port 3000");
});

//app.use(express.static('client/public/img/'));
//app.use(express.static('client/public/'));

//app.use('')

app.use('/test1',
       (req, res, next) => {
         console.log("first middleware");
         res.x = "Hello from first middleware function!";
         next();
       },
       (req, res, next) => {
         console.log("second middleware");
         res.x += "\nHello from second middleware function!";
         next();
       },
       (req, res) => {
         console.log("third middleware");
         res.send(`<h1>Value of response.x: ${res.x}</h1>`);
       });

app.get('/', (req, res) => {
	res.send('<h1>hello, world</h1>');
});
