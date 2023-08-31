var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');




router.post('/banners_image_submit',upload.any(), function(req,res,next){
     console.log(req.files)
    var pictures = ''
    req.files.map((item)=>{
        pictures+=item.filename+","
    })
     pictures = pictures.substring(0,pictures.length-1)
    console.log("value of pictures is  ",pictures)
    try{
        pool.query("insert into banners(banners,status) values (?,?) ",[pictures , req.body.status],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"Banners saved"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})














module.exports = router;