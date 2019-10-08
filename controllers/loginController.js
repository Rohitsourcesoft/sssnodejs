var userService = require(process.cwd()+'/models/userModel');
const { check, validationResult } = require('express-validator');
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
            if (error) 
            {
                 //   response.json({ success: false, message: 'Invalid user ID and password' });
                return response.render('index', { title: 'Admin Login',
                                           error_message: 'Invalid user ID and password!!',error:''});
            }
            else 
            {
                    var responsedata=JSON.stringify(data);
                    var json=JSON.parse(responsedata);
                    if(json[0].status!=1)
                    {
                        return response.render('index', { title: 'Admin Login',
                                                error_message: 'Your account had been inactive!!',
                                                error:''});
                    }
                    else
                    {
                        return response.redirect('/dashboard'); 
                    }
            }
    });
}

