var express = require('express');
var router = express.Router();
var ufwGet = require('../ufw/get');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json('api server is alive.');
});

// get ufw status
router.get('/ufw/status', function(req, res, next) {
    ufwGet.getUfwStatus(function(error, data){
        if(error){
            res.status(500);
            res.json({'error': error});
        }else{
            res.json({'status': data});
        }
    });
});

// get ufw rules 
router.get('/ufw/rules', function(req, res, next) {
    ufwGet.getUfwRules(function(error, data){
        if(error){
            res.status(500);
            res.json({'error': error});
        }else{
            res.json({'rules': data});
        }
    });
});

module.exports = router;
