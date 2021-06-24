const express=require('express');
const router=express.Router();
const {ensureAuth}=require('../middleware/auth');
const Story=require('../models/Story');

router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add');
});

router.post('/',ensureAuth,async(req,res)=>{
    //console.log(req.user);    
    const newStory={
        title:req.body.title,
        status:req.body.status,
        body:req.body.body,  
        user:req.user._id           
    };
    
    try {
    await Story.create(newStory);
    res.redirect('/dashbord');
    } catch (err) {
        //console.error(err);
        res.render('error/500');
    }
});

router.get('/',ensureAuth,async(req,res)=>{    
    //console.log(req.user._id);
    try {
        const stories= await Story.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean();            
        res.render('stories/index',{
            authUserId:req.user._id,
            stories,            
        });

    } catch (err) {
        //console.error(err);
        res.render('error/500');
    }
    
});

router.get('/:id',ensureAuth,async(req,res)=>{
    try {
        const story=await Story.findById(req.params.id).populate('user').lean();
        res.render('stories/show',{
            story,
            authId:req.user._id
        });
    } catch (err) {
        //console.error(err);
        res.render('error/500');
    }
})

router.get("/edit/:id",ensureAuth,async(req,res)=>{
    const story=await Story.findOne({_id:req.params.id}).lean();
    if(!story){
        return res.render('error/404');
    }
    if(story.user!=req.user.id){
        res.redirect('/stories');
    }else{
        res.render('stories/edit',{
            story,            
        });
    }
});

router.put("/edit/:id",ensureAuth,async(req,res)=>{
    const story=await Story.findByIdAndUpdate(req.params.id,req.body,(err,doc)=>{
        if(err){
        //console.log(err);
        res.render('error/404');
        }
    });
    res.redirect('/dashbord');
});

router.delete('/:id',ensureAuth,async(req,res)=>{
    try {
        await Story.deleteOne({_id:req.params.id});
        res.redirect('/dashbord');
    } catch (err) {
        //console.error(err);
        res.render('error/404');
    }
});

router.get("/user/:id",ensureAuth,async(req,res)=>{    
    try {
        const stories= await Story.find({status:'public',user:req.params.id}).populate('user').sort({createdAt:'desc'}).lean();            
        res.render('stories/index',{
            authUserId:req.user._id,
            stories,            
        });
    } catch (err) {
        //console.error(err);
        res.render('error/500');
    }
})
module.exports=router;