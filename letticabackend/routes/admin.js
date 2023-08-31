var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
const { routes } = require('../app');




router.post('/checkadminlogin',function(req,res,next){
    try{
        pool.query("select * from adminlogin where (emailid=? or mobileno =?) and password=? ",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
           console.log(req.body)
           console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
               
                if(result.length ==1){
                    return res.status(200).json({status:true,data:result[0]})
                }
                else{
                    return res.status(200).json({status:false,message:"invalid emailid or password"}) 
                }
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
module.exports = router;