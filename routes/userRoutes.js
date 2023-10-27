const express=require('express');
const userControllers=require('../controllers/userControllers')
const router=express.Router();
const check=require('../middlewares/auth-middleware')
// route level middleware - to protect route

router.use('/changePassword',check.checkUserAuth)
// public route
router.post('/register',userControllers.userRegistration)
router.post('/login',userControllers.userLogin)


// protected routes
router.post('/changePassword',userControllers.changePassword)

module.exports=router

