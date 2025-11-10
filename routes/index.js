const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('http-auth');
const Registration = require('../models/Registration');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  res.render('form', { title: 'Register' });
});

router.post('/', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.send('Thank you for your registration!');
  } catch (err) {
    console.log(err);
    res.send('Sorry! Something went wrong.');
  }
});

router.get('/registrations', basic.check(async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.render('index', { title: 'Listing registrations', registrations });
  } catch (e) {
    res.send('Sorry! Something went wrong.');
  }
}));

module.exports = router;
