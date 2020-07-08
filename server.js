'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { stock, customers } = require('./data/promo');
const { validateData } = require('./data/handlers');
let customerName, product, province;

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .post('/order', (req, res) => {
    // console.log(req.body)
    const msg = validateData(req.body);
    if (msg === 'success') {
      res.json({status: msg}),
      customerName = req.body.givenName;
      product = req.body.order;
      province = req.body.province;
    } else {
      res.json({status: 'error', error: msg})
    }
  })

  .get('/order-confirmed', (req, res) => {
    res.render('index', {
      name: customerName,
      product: product,
      province: province
    })
  })

  .get('*', (req, res) => res.send('Dang. 404.'))
  .listen(8000, () => console.log(`Listening on port 8000`));
