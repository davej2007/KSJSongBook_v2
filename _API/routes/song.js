const express = require('express');
const router  = express.Router();
const fs=require('fs');
const csv=require('fast-csv');
const Song = require('../models/song');

router.get('/', (req,res) =>{
    res.send('from API / Song Upload route');
});

router.get('/allSongs/:christmas', (req,res)=>{
    if(req.params.christmas=='true'){
        xmas=true
    }else{
        xmas=false
    }

    Song.find({christmas:false}).select('_id artist title location christmas').exec(function (err, allSongs) {
        if (err) {
            res.status(401).send('DB error'+err);
        } else {
            if (xmas){
                Song.find({christmas:true}).select('_id artist title location christmas').exec(function (err, xmasSongs) {
                    if (err) {
                        res.status(401).send('DB error'+err);
                    } else {
                        var totalSongs = allSongs.concat(xmasSongs);
                        res.status(200).send(totalSongs);
                    }
                });
            } else {
                res.status(200).send(allSongs);
            }
            
        }
    });
});
router.get('/importCsv',(req,res)=>{
    let songs= [];
    console.log('import CSV');
    var stream = fs.createReadStream('./public/Songs.csv');
 
    csv
        .fromStream(stream, {headers : ['artist','title','discID','file','trackNo','christmas']})
        .on('data', function(data){
            console.log(data);
            songs.push(data);
        })

        .on('end', function(data){
            songs.shift();
            res.status(200).json(songs);
        });
});
router.post('/newSong', (req,res)=>{
    console.log('body :', req.body);
    Song.findOne({artist:req.body.artist, title:req.body.title}).select('_id artist title location christmas').exec(function (err, foundSong) {
        if (err) {
            res.status(401).send('DB error'+err);
        } else {
            if (foundSong) {
                console.log('duplicate entry : ', foundSong);
                let location = {
                    discID:req.body.discID,
                    file:req.body.file,
                    trackNo:req.body.trackNo};
                foundSong.location.push(location);
                foundSong.save(function(err, savedSong){
                    if (err) {
                        res.status(401).send('DB error'+err);
                    } else {
                        res.status(200).send(savedSong);
                    }
                })    
            } else {                
                let newSong = new Song();
                let location = {
                    discID:req.body.discID,
                    file:req.body.file,
                    trackNo:req.body.trackNo};
                newSong.artist=req.body.artist;
                newSong.title=req.body.title;
                newSong.location = []; 
                newSong.location.push(location);
                if(req.body.christmas==='christmas'){
                    newSong.christmas=true
                }else{
                    newSong.christmas=false
                }                
                console.log('New Song', newSong);
                newSong.save((err,savedSong)=>{
                    if (err) {
                        console.log('err',err);
                        res.status(401).send('DB error'+err);
                    } else {
                        console.log('saved Song',savedSong)
                        res.status(200).send(savedSong);
                    }
                });
            }
        }
    });
});

module.exports = router;