const express = require('express');
const path = require('path');
const ngApiMock = require('ng-apimock')();
const app = express();
const configuration = {'src': './mocks', 'outputDir': '.tmp/ngApimock'};
const bodyParser = require('body-parser');

/**
 * Register all available mocks and generate interface
 */
ngApiMock.run(configuration);
ngApiMock.watch(configuration.src);

app.set('port', (process.env.PORT || 3000));

// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);

// serve the mocking interface for local development
app.use('/mocking', express.static('.tmp/ngApimock'));

// add some additional custom mocking
let wishes = [];
app.use(bodyParser.json());

app.get('/backend/api', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let resBody = {'content': wishes};
  res.send(resBody);
});

app.post('/backend/api', function (req, res) {
  let wish = {
    'id': getRandomString(),
    'title': req.body.title,
    'description': req.body.description,
    'date': new Date()
  };

  wishes.push(wish);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).send(wish);
});

app.delete('/backend/api/:wishId', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let id = req.params.wishId;
  if (wishPresent(id)) {
    let resBody = {'content': getWish(id)};
    deleteWish(id);
    res.send(resBody);
  } else {
    res.status(404).send('Cannot be deleted: wish not found.');
  }
});

app.delete('/api/cleanmock', function (res) {
  wishes = [];
  res.status(200).send('Mock has been cleaned.');
});

function wishPresent(id) {
  return getWish(id) !== null;
}

function getWish(id) {
  let wish = null;
  for (let i = 0; i < wishes.length; i++) {
    if (wishes[i].id === id) {
      wish = wishes[i];
    }
  }
  return wish;
}

function deleteWish(id) {
  for (let i = 0; i < wishes.length; i++) {
    if (wishes[i].id === id) {
      wishes.splice(i, 1);
    }
  }
}

function getRandomString() {
  return Math.random().toString(36).substr(2, 10);
}

app.listen(app.get('port'), function () {
  console.log('app running on port', app.get('port'));
});
