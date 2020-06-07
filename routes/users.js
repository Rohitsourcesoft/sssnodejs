var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var loginController = require(process.cwd()+'/controllers/loginController');
/**************Login Post and get menthod***************/
router.get('/', function(request, response, next) { 
   response.render('index', {layout: false,title: 'Admin Login',error_message:'',error:''});
});
router.get('/login', function(request, response, next) { 
   response.render('index', {layout: false,title: 'Admin Login',error_message:'',error:''});
});
router.post('/login',loginController.validate('login'),loginController.login);
router.get('/gernatepassword',loginController.gernatepassword);
/**************Admin Route***************/

router.get('/user-management', function(request, response, next) { 
   response.render('user_management/add_user', {title:'User Management',error_message:'',error:''});
});

module.exports = router;
