const express = require('express');
const router  = express.Router();
const TEAM = require('../models/team');

router.get('/', (req,res) =>{
    res.send('from API / Team route');
});

router.post('/newTeam', (req,res)=>{
    if(req.body.teamName == '' || req.body.teamName == undefined){
        res.status(401).send('Error : Please enter your Team Name');
    } else if(req.body.teamPin == '' || req.body.teamPin == undefined){
        res.status(401).send('Error : Please enter your Security Pin');
    } else if(req.body.member1 == '' || req.body.member1 == undefined){
        res.status(401).send("Error : Please enter your Singer's Name.");
    } else {
        TEAM.findOne({teamName:req.body.teamName}).select().exec((err,team)=>{
            if (err) {
                res.status(401).send('DB error'+err);
            } else {
                if(!!team){
                    res.status(401).send('Error : Please choice a different Team Name');
                } else {
                    team = new TEAM();
                    team.teamName= req.body.teamName;
                    team.teamPin = req.body.teamPin;
                    team.partyID = req.body.partyID;
                    team.singers = [req.body.member1];
                    team.save((err,newTeam)=>{
                        if (err) {
                            res.status(401).send('DB error'+err);
                        } else {
                            res.status(200).send({teamID:newTeam._id, partyID:newTeam.partyID});
                        }
                    });
                }                
            } 
        })
    }

});

router.post('/returningTeam', (req,res)=>{
    if(req.body.teamName == '' || req.body.teamName == undefined){
        res.status(402).send('Error : Please enter your Team Name');
    } else if(req.body.teamPin == '' || req.body.teamPin == undefined){
        res.status(402).send('Error : Please enter your Security Pin');
    } else {
        TEAM.findOne({teamName:req.body.teamName}).select('_id teamName teamPin partyID').exec((err, team)=>{
            if(err){
                res.status(401).send('DB error'+err);
            } else {
                if(!team){
                    res.status(401).send('Error : Team Name or Pin Not Found.'); 
                } else {
                    if(req.body.teamPin != team.teamPin){
                        res.status(401).send('Error : Team Name or Pin Not Found.');
                    } else {
                        res.status(200).json({teamID:team._id, partyID:team.partyID});
                    }
                }
            }
        });
    }
});

router.post('/teamDetails', (req,res)=>{
    if(req.body._id == '' || req.body._id == undefined){        
        res.status(401).send('No ID provided');
    } else {
        TEAM.findById(req.body._id).select('_id teamName singers').exec((err, team)=>{
            if(err){
                res.status(401).send('Incorrect ID provided');
            } else {                
                res.status(200).json({'_id':team._id, 'teamName':team.teamName, 'singers':team.singers});
            }
        })
    }
});
router.post('/teamUpdate', (req,res)=>{
    if(req.body.teamID == '' || req.body.teamID == undefined){        
        res.status(401).send('No ID provided');
    } else {
        let members = [];
        if (req.body.member1!="" && req.body.member1!=null) members.push(req.body.member1);
        if (req.body.member2!="" && req.body.member2!=null) members.push(req.body.member2);
        if (req.body.member3!="" && req.body.member3!=null) members.push(req.body.member3);
        if (req.body.member4!="" && req.body.member4!=null) members.push(req.body.member4);
        if (req.body.member5!="" && req.body.member5!=null) members.push(req.body.member5);
        if (req.body.member6!="" && req.body.member6!=null) members.push(req.body.member6);
        if (req.body.member7!="" && req.body.member7!=null) members.push(req.body.member7);
        if (req.body.member8!="" && req.body.member8!=null) members.push(req.body.member8);
        TEAM.findByIdAndUpdate(req.body.teamID).select('_id partyID singers').exec((err,team)=>{
            if(err){
                res.status(401).send('Incorrect ID provided');
            } else {
                team.singers = members;
                team.save((err,update)=>{
                    if(err){
                        res.status(401).send('Incorrect ID provided');
                    } else {
                        res.status(200).json({'teamID':update._id, 'partyID':update.partyID});;
                    }
                })
            }
        })
    }
})
module.exports = router;