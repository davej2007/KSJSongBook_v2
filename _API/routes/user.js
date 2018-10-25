const express = require('express');
const router  = express.Router();
const USER = require('../models/user');

router.get('/', (req,res) =>{
    res.send('from API / USER route');
});

router.post('/newUser', (req,res)=>{
    if(req.body.teamName == '' || req.body.teamName == undefined){
        res.status(401).send('Error : Please enter your User Name');
    } else if(req.body.teamPin == '' || req.body.teamPin == undefined){
        res.status(401).send('Error : Please enter your Security Pin');
    } else {
        USER.findOne({userName:req.body.teamName}).select().exec((err,user)=>{
            if (err) {
                res.status(401).send('DB error'+err);
            } else {
                if(!!user){
                    res.status(401).send('Error : Please choice a different User Name');
                } else {
                    user = new USER();
                    user.userName = req.body.teamName;
                    user.password = req.body.teamPin;
                    user.save((err,newUser)=>{
                        if (err) {
                            res.status(401).send('DB error'+err);
                        } else {
                            res.status(200).send(newUser._id);
                        }
                    });
                }                
            } 
        })
    }

});

router.post('/logInUser', (req,res)=>{
    if(req.body.teamName == '' || req.body.teamName == undefined){
        res.status(401).send('Error : Please enter your Team Name');
    } else if(req.body.teamPin == '' || req.body.teamPin == undefined){
        res.status(401).send('Error : Please enter your Security Pin');
    } else {
        USER.findOne({userName:req.body.teamName}).select('_id userName password').exec((err, user)=>{
            if(err){
                res.status(401).send('DB error'+err);
            } else {
                if(!user){
                    res.status(401).send('Error : User Name or Security Pin Not Found.'); 
                } else {
                    if(req.body.teamPin != user.password){
                        res.status(401).send('Error : User Name or Security Pin Not Found.');
                    } else {
                        res.status(200).json({userID:user._id});
                    }
                }
            }
        });
    }
});

router.post('/userDetails', (req,res)=>{
    if(req.body._id == '' || req.body._id == undefined){        
        res.status(401).send('No ID provided');
    } else {
        USER.findById(req.body._id).select('_id userName password').exec((err, user)=>{
            if(err){
                res.status(401).send('Incorrect ID provided');
            } else {
                
                res.status(200).json({'_id':user._id, 'userName':user.userName});
            }
        })
    }
});


module.exports = router;