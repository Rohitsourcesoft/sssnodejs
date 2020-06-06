var userService = require(process.cwd()+'/models/userModel');
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
exports.gernatepassword = (method) => 
{       
    var password="123456";
    var hash = bcrypt.hashSync(password, 10);
   // console.log(hash);
}
exports.validate = (method) => 
{       
        switch (method) {
            case 'login': {
                    return [ 
                    check('userid','User id can not be left blank!!').not().isEmpty(),
                    check('password', 'Password can not be left blank!!').not().isEmpty()
                    ]   
                }
            }
}

exports.login = function(request, response) 
{
            const errors=validationResult(request);
            /**************Form validate****************/
            if(!errors.isEmpty())
            {
                return response.render('index', { title: 'Admin Login',error_message:'',
                                                  error: errors.mapped()});
            }
        
            /**********pass form validation then check user credintial*************/
            userService.authenticate(request.body.userid, request.body.password,function (error,data) {
            if (error==1) 
            {
                 //   response.json({ success: false, message: 'Invalid user ID and password' });
                return response.render('index', { title: 'Admin Login',
                                           error_message: 'User ID does not exist!!',error:''});
            }
            else if (error==2) 
            {
                 //   response.json({ success: false, message: 'Invalid user ID and password' });
                return response.render('index', { title: 'Admin Login',
                                           error_message: 'Password does not exist!!',error:''});
            }
            else if (error==3) 
            {
                 //   response.json({ success: false, message: 'Invalid user ID and password' });
                return response.render('index', { title: 'Admin Login',
                                                error_message: 'Your account had been inactive!!',
                                                error:''});
            }
            else 
            {
                var responsedata=JSON.stringify(data);
                var userdata=JSON.parse(responsedata);
                return response.redirect('/dashboard'); 
            }
    });
}

//sss