var md5 = require('md5');
var connection = require(process.cwd()+'/config/database');
var User = {};
User.authenticate = function authenticate(userid, password, callback) {
		    var userData='';
			var queryString = 'SELECT * FROM user WHERE userid="'+userid+'" AND password="'+md5(password)+'"';
			connection.query(queryString, function(err,result) {
			    if(result.length > 0){
			    	return callback(null,result);
			    }
		        else
		        {			
					return callback(true);
				}
			});
}
module.exports= User;
