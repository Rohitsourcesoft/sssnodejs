var md5 = require('md5');
var bcrypt = require('bcryptjs');
var connection = require(process.cwd()+'/config/database');
var User = {};
User.authenticate = function authenticate(userid, password, callback) {
    var userData = '';
    var queryString = 'SELECT * FROM user WHERE userid="' + userid + '"';
    connection.query(queryString, function (err, result) {
     //   var temp=JSON.stringify(result);
     //   var manager = JSON.parse(temp)[0];
     //   console.log(result[0].password);
        if (result.length == 0) {
            return callback(1); //invalid user ID
        } 
        else if (result && bcrypt.compareSync(password, result[0].password) == false)
        {
            return callback(2); //invalid password
        } 
        else if (result && result[0].status == 0)
        {
            return callback(3); //user inactive
        }
        else
        {
            return callback(null, result);
        }
    });
}
module.exports= User;
