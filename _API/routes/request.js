const express = require('express');
const router  = express.Router();
const REQUEST = require('../models/request');
const SONG = require('../models/song');
const TEAM = require('../models/team');

router.get('/', (req,res) =>{
    res.send('from API / request route');
});

router.post('/newRequest', (req,res)=>{
    if(req.body.teamID == '' || req.body.teamID == undefined){
        res.status(401).send('Error : Please enter your Team Details');
    } else if(req.body.songID == '' || req.body.songID == undefined){
        res.status(401).send('Error : Please enter your Song Details');
    } else if(req.body.partyID == '' || req.body.partyID == undefined){
        res.status(401).send('Error : Please enter your Party Details');
    } else if(req.body.singers == '' || req.body.singers == undefined){
        res.status(401).send('Error : Please enter your Singers Details');
    } else {
        song=SONG.findById(req.body.songID, function(err,song){
            if(err){
                res.status(401).send('DB error'+err);
            } else {
                team=TEAM.findByID(req.body.teamID, function(err,team){
                    if(err){
                        res.status(401).send('DB error'+err);
                    } else {
                        request = new REQUEST();
                        request.partyID = req.body.partyID;                        
                        request.team = team;
                        request.song = song;
                        request.singers = req.body.singers;
                        request.status = 0;
                        request.save((err,newrequest)=>{
                            if (err) {
                                res.status(401).send('DB error'+err);
                            } else {
                                res.status(200).send(newrequest);
                            }
                        });
                    }    
                });                
            }
        });                            
    }
});

router.get('/allRequest/:party', (req,res)=>{
    let party = req.params.party;
    REQUEST.find({partyID:party}).populate('song team').exec(function(err, request){
        if (err) {
            res.status(401).send('DB error'+err);
        } else {
            res.status(200).send(request);
        }
    });
});

router.get('/requestDetails/:id', (req,res)=>{
    let id = req.params.id;
    REQUEST.findById(id).populate('song').exec(function(err, request){
            if (err) {
                res.status(401).send('DB error'+err);
            } else {
                res.status(200).send(request);
            }
        });
});

module.exports = router;