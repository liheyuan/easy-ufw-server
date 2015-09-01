var passport = require('passport');
var passportHttp = require('passport-http');

var config = require('../config'); 

// passport setup
passport.use(new passportHttp.BasicStrategy(
    function(username, password, done) {
        // config user & pass must be valid
        if(!config.username || !config.password){
            return done(null, false);
        }
        // check if equals
        if(username == config.username && password == config.password){
            return done(null, true);
        } else{
            return done(null, false);
        }
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
