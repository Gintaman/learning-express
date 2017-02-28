#!/usr/local/bin/node --harmony

//import samples below
//let sample1 = require('./samples/sample1');

import express from 'express';
import path from 'path';
import hbs from 'express-handlebars';

const app = express(),
      handlebars = hbs.create({
        defaultLayout: path.join(__dirname, '/client/views/layouts/main')
      });

/*const express = require('express'),
      path = require('path'),
      handlebars = require('express-handlebars').create({defaultLayout: 'main'}),
      app = express();*/


app.set('views', path.join(__dirname, '/client/views/'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

let logger = (req, res, next) => {
  console.log(`Accessed on: ${new Date()}`);
  //app.use() uses the root path "/" as a default.
  //we will be stuck here unless we send a response or call next() to invoke
  //the next middleware mounted on '/'
  //if we send a response with res.send() here, we will get an error if we try
  //to call res.send() again in the next middleware mounted on the same path

  //res.send('hello'); 
  //if we call res.send() here, our next piece of middleware
  //will throw a warning about not being able to set response headers after they've
  //been sent
  next();
};

app.use(logger);
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use(express.static(path.join(__dirname, 'client/public')));

//we can send json objects to make an api's
app.get('/api', (req, res) => {
  res.json({
    name: 'jeff',
    age: 26
  });
});

app.get('/home', (req, res) => {
  res.render('home', {message: "Greetings!"});
});

app.listen(1337, () => {
  console.log("Server started on port 1337...");
});
