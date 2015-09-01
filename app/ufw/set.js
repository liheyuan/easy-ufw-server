var exec = require('child_process').exec;
var S = require('string');
var constants = require("./constants");

function enableUfw(callback){
    exec("ufw enable", constants.EXEC_OPTION, function(error, stdout, stderr){
        if(error){
            callback(constants.EXEC_ERR);
        }else{
            callback(null);
        }
    });
};

function disableUfw(callback){
    exec("ufw disable", constants.EXEC_OPTION, function(error, stdout, stderr){
        if(error){
            callback(constants.EXEC_ERR);
        }else{
            callback(null);
        }
    });
};

module.exports.enableUfw = enableUfw;
module.exports.disableUfw = disableUfw;

// Test
// getUfwStatus(function(error, data){
//     if(error){
//         console.log("error");
//         console.log(error);
//     }else{
//         console.log(data);
//     }
// });

// Test
// getUfwRules(function(error, data){
//     if(error){
//         console.log("error");
//         console.log(error);
//     }else{
//         console.log(data);
//     }
// });
