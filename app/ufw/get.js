var exec = require('child_process').exec;
var S = require('string');

var EXEC_ERR = "execute command failed!"
var PARSE_ERR = "parse result failed!"

function getUfwStatus(callback){
    exec("sudo ufw status", function(error, stdout, stderr){
        if(error){
            callback(EXEC_ERR);
        }else{
            match = stdout.match("^Status:\s*(.*)\s*");
            if(match && match.length >= 2){
                // success
                callback(null, match[1].trim());
            }else{
                callback(PARSE_ERR);
            }
        }
    });
};

function getUfwRules(callback){
    exec("sudo ufw status", function(error, stdout, stderr){
        if(error){
            callback(EXEC_ERR);
        }else{
            var ruleStart = false;
            var NF = 3;
            var title = [];
            var rules = [];
            lines = stdout.split("\n");
            for(var i=0; i<lines.length; i++){
                var line = lines[i];
                // judge start of rule
                if(S(line).startsWith("--")){
                    ruleStart = true;
                    // Get Head
                    if(i >= 1){
                        var parts = lines[i-1].split(/\s+/);
                        if(parts.length == NF){
                            title = parts;
                        }
                    }
                    continue;
                }
                // Get Rules
                if(ruleStart){
                    var parts = line.split(/ {2,}/);
                    if(parts && parts.length == NF){
                        // Make rule map
                        var rule = {};
                        for(var j=0; j<NF; j++){
                            rule[title[j]] = parts[j];
                        }
                        rules.push(rule);
                    }
                }
            }
            callback(null, rules);
        }
    });
}

module.exports.getUfwStatus = getUfwStatus;
module.exports.getUfwRules = getUfwRules;

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
