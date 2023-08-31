var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/productlistlistbypid', function(req,res,next){
    try{
        pool.query("select * from productlist where productid=?",[req.body.productid],function(error,result){

            console.log("product id is",req.body.productid)
            if(error){
                return res.status(200).json({status:false,message:"server error",data:[]})
              
            }else{
                
                return res.status(200).json({status:true,message:"productlist fetched",data:result})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})



router.post('/picture__submit',upload.any(), function(req,res,next){
   
   var pictures = ''
   req.files.map((item)=>{
       pictures+=item.filename+","
   })
    pictures = pictures.substring(0,pictures.length-1)
  
   try{
       pool.query("insert into productpictures(categoryid,subcategoryid,productid,productlistid,pictures,status) values (?,?,?,?,?,?) ",[req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.productlistid,pictures , req.body.status],function(error,result){
        console.log(error)
        
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