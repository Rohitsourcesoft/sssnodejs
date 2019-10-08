var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var loginController = require(process.cwd()+'/controllers/loginController');
/**************Login Post and get menthod***************/

router.get('/', function(request, response, next) { 
		response.render('index', { title: 'Admin Login',error_message:'',error:''});
});
router.get('/login', function(request, response, next) { 
		response.render('index', { title: 'Admin Login',error_message:'',error:''});
});
router.post('/login',loginController.validate('login'),loginController.login);


module.exports = router;
