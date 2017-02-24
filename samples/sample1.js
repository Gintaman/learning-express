
let sample1 = (function() {
  let express = require('express'),
    app = express();
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
        if(!res.message) {
          res.message = "";
        }
        res.message += `<p>${x}: You shouldn't be creating functions in a loop! This is silly!</p>`;
        next();
      };
    }
  };

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


  let factory = middleWareGenerator(10);

  let middlewares2 = [
    factory.next().value,
    factory.next().value,
    factory.next().value,
    factory.next().value,
    factory.next().value,
    (req, res, next) => {
      res.send(`<br>${res.message}<br><h1>I hope you're happy with yourself...</h1>`);
    },
  ];
          
  app.use('/test3', middlewares2);
  app.get('/test1', (req, res) => {
    console.log('Above middleware is already using this path, and will not allow requests past this point. This route will never be reached.');
  });

  app.get('/test2', (req, res) => {
    let str = `What's the difference between use and get? use() is for binding middleware to our application. get() is for matching and handling a specific route when requested with GET.`;
    res.send(`<h2>${str}</h2>`);
  });

  app.listen(3000, () => {
    console.log("Running exmple1 on port 3000...");
  });
}());

module.exports.sample1 = sample1;
