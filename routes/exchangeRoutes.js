const express = require('express');
const router = express.Router();

const {
    getExchangeRates
} = require('../Controllers/exchangeController');

router.get('/rates', getExchangeRates);

module.exports = router;