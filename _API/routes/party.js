const express = require('express');
const router  = express.Router();
const PARTY= require('../models/party');

router.get('/', (req,res) =>{
    res.send('from API / party route');
});

router.post('/newParty', (req,res)=>{
    if(req.body.partyName == '' || req.body.partyName == undefined){
        res.status(401).send('Error : Please enter your Party Name');
    } else if(req.body.partyDate == '' || req.body.partyDate == undefined){
        res.status(401).send('Error : Please enter your Party Date');
    } else if(req.body.partyType == '' || req.body.partyType == undefined){
        res.status(401).send('Error : Please enter your Party Type');
    } else if(req.body.partyPin == '' || req.body.partyPin == undefined){
        res.status(401).send('Error : Please enter your Party Pin');
    } else {
        PARTY.findOne({partyName:req.body.partyName, partyDate:req.body.partyDate, partyType:req.body.partyType, partyPin:req.body.partyPin}).select('_id partyName partyDate partyType').exec((err, party)=>{
            if (err) {
                res.status(401).send('DB error'+err);
            } else {
                if(party !==null ){
                    res.status(401).send('Error : Details Already Entered.');
                } else {
                    party = new PARTY();
                    party.partyName = req.body.partyName;
                    party.partyDate = req.body.partyDate;
                    party.partyType = req.body.partyType;
                    party.partyPin = req.body.partyPin;
                    party.christmas = req.body.christmas;
                    party.description = req.body.description;
                    party.save((err,newparty)=>{
                        if (err) {
                            res.status(401).send('DB error'+err);
                        } else {
                            res.status(200).send(newparty);
                        }
                    });                    
                }        
            }        
        });    
    }
});

router.post('/checkParty', (req,res)=>{
    if(req.body.partyPin == '' || req.body.partyPin == undefined){
        res.status(401).send('Error : Please enter your Party Pin');
    } else {
        PARTY.findOne({partyPin:req.body.partyPin}).select('_id').exec((err, party)=>{
            if(err){
                res.status(401).send('DB error'+err);
            } else {                
                if(!party){
                    console.log('No Party Found');
                    res.status(401).send('Error : Party Pin Not Found');
                } else {
                    res.status(200).json({'partyID':party._id, 'teamID':null});
                }
                
            }
        });
    }
});

router.post('/partyDetails', (req,res)=>{
    if(req.body._id == '' || req.body._id == undefined){        
        res.status(401).send('No ID provided');
    } else {
        PARTY.findById(req.body._id).select('_id partyName partyDate partyType partyPin christmas description').exec((err, party)=>{
            if(err){
                res.status(401).send('Incorrect ID provided');
            } else {                
                res.status(200).json({'_id':party._id,
                    'partyName':party.partyName,
                    'partyDate':party.partyDate,
                    'partyType':party.partyType,
                    'christmas':party.christmas,
                    'description':party.description});
            }
        })
    }
});
module.exports = router;