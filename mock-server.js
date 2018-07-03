const express = require('express');
const bodyParser = require('body-parser');

/**
 * mock server
 */

// TODO: needs some fixes
const app = express();
const baseUrl = '/api/wishes';
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());

let wishes = [];
app.get(baseUrl, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({'content': wishes}); // spring boot res
});

app.post(baseUrl, (req, res) => {
  let wish = {
    'id': getRandomString(),
    'title': req.body.title,
    'description': req.body.description,
    'date': new Date()
  };

  wishes.push(wish);
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.send(wish);
});

app.put(baseUrl, (req, res) => {
  let wish = getWish(req.body.id);
  wish.title = req.body.title;
  wish.description = req.body.description;
  wish.date = new Date();
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(wish);
});

app.delete(`${baseUrl}/:wishId`, (req, res) => {
  let id = req.params.wishId;
  res.setHeader('Content-Type', 'application/json');
  if (wishPresent(id)) {
    const toBeDeleted = getWish(id);
    deleteWish(toBeDeleted.id);
    res.send({'content': toBeDeleted});
  } else {
    res.status(404).send('Cannot be deleted: wish not found.');
  }
});

app.delete(baseUrl, (req, res) => {
  wishes = [];
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send('');
});

// helpers
const wishPresent = (id) => getWish(id) !== null;
const getWish = (id) => wishes.find((wish) => wish.id === id);
const deleteWish = (id) => wishes = wishes.filter((wish) => wish.id !== id);
const getRandomString = () => Math.random().toString(36).substr(2, 10);

app.listen(app.get('port'), function () {
  console.log('app running on port', app.get('port'));
});
