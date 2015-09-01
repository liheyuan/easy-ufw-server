var express = require('express');
var passport = require('passport');
var router = express.Router();

var ufwGet = require('../ufw/get');
var ufwSet = require('../ufw/set');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json('api server is alive.');
});

// get ufw status
router.get('/ufw/status', 
        passport.authenticate('basic', { session: false }), 
        function(req, res, next) {
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

// set ufw enable
router.get('/ufw/enable', function(req, res, next) {
    ufwSet.enableUfw(function(error){
        if(error){
            res.status(500);
            res.json({'error': error});
        }else{
            res.json({'result': "succ"});
        }
    });
});

// set ufw disable
router.get('/ufw/disable', function(req, res, next) {
    ufwSet.disableUfw(function(error){
        if(error){
            res.status(500);
            res.json({'error': error});
        }else{
            res.json({'result': "succ"});
        }
    });
});

module.exports = router;
