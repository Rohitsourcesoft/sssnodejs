var userService = require(process.cwd()+'/models/userModel');
var bcrypt = require('bcryptjs');
var connection = require(process.cwd()+'/config/database');
const { check, validationResult } = require('express-validator');
exports.viewuser = function() 
{
    return response.redirect('/user_management/index',{title:'E-Learning',layout:true}); 
}

