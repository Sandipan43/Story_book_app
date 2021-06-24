const express=require('express');
const router=express.Router();
const passport=require('passport');

//@desc Auth with google
//@route GET /
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) =>{
    // Successful authentication, redirect home.
    res.redirect('/dashbord');
  });

//@desc Logout
//@route GET /
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/')
});

module.exports=router;
