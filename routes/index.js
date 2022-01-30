var express = require('express');
var router = express.Router();
var axios = require('axios');

// Old Tavle (Will change URL)
router.get('/', async function(req, res) {
    res.render('index');
});

// New Tavle (Will change URL)
router.get('/new', async function(req,res) {
    res.render('index-new');
})

// Export router module
module.exports = router;