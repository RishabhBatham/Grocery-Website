var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');


router.post('/subcategorysubmit',upload.single('icon'), function(req,res,next){
    try{
        pool.query("insert into subcategory(categoryid,subcategoryname,status,icon) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryName,req.body.status,req.file.filename],function(error,result){
             console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"server error"})
                console.log(error)
            }else{
                return res.status(200).json({status:true,message:"record submitted"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})


router.get('/subcategory_list',function(req,res,next){
    try{
        pool.query("select S.*,(select categoryname from category C where C.categoryid = S.categoryid) as categoryname from subcategory S",function(error,result){
             console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"server error" ,  data:[]})
                console.log(error)
            }else{
                return res.status(200).json({status:true,message:"record submitted",  data:result})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }


})


router.post('/subcategory_edit', function(req,res,next){
    try{
        pool.query("update subcategory set subcategoryname=?, categoryid=?,status=? where subcategoryid=?",[req.body.subcategoryName,req.body.categoryid,req.body.status,req.body.subcategoryid],function(error,result){
            console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"Server error"})
            }else{
                return res.status(200).json({status:true,message:"subcategory edited"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
router.post('/subcategory_delete',function(req,res,next){
    try{
        pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
            
            if(error){
                return res.status(200).json({status:false,message:"Server error"})
            }else{
                return res.status(200).json({status:true,message:"subcategory deleted"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }
})
router.post('/subcategory_editicon',upload.single('icon'), function(req,res,next){
    try{
        pool.query("update subcategory set icon=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
               console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                console.log(req.file.filename)
                return res.status(200).json({status:true,message:"Picture changed"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})













module.exports = router;