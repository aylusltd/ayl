var express = require('express');
var jobs = require('../data/vacancies');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AYLUS, LTD' });
});

router.get('/rates', function(req,res,next) {
    res.render('rates', { title: 'AYLUS, LTD' });
})

router.get('/jobs', function(req,res,next) {
    res.render('jobs', { title: 'AYLUS, LTD', jobs: jobs.available });
})


module.exports = router;
