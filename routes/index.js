const express=require('express');
const router=express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');
const Story=require('../models/Story');

//@desc Login/Landing page
//@route GET /

router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    });
});

//@desc Dashbord/Landing page
//@route GET /

router.get('/dashbord',ensureAuth,async(req,res)=>{
    //console.log(req);
    try {
        const stories=await Story.find({user:req.user.id}).lean();
        res.render('dashbord',{
            name:req.user.firstName,
            stories
        });
    } catch (err) {
        //console.error(err);
        res.render('error/500');
    }
    
});

module.exports=router;