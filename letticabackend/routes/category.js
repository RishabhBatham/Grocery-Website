var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');




router.post('/categorysubmit',upload.single('icon'), function(req,res,next){
    try{
        pool.query("insert into category(categoryname,status,icon) values(?,?,?)",[req.body.categoryName,req.body.status,req.file.filename],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"record submitted"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})

router.get('/category_list', function(req,res,next){
    try{
        pool.query("select * from category",function(error,result){
           
            if(error){
                return res.status(200).json({status:false,data:[]})
            }else{
                console.log(error)
                return res.status(200).json({status:true,data:result})
            }
        })


    }
    catch(e){
        return res.status(200).json({status:false,data:[]})
    }

})

router.post('/categoryedit', function(req,res,next){
    try{
        pool.query("update category set categoryname=?,status=? where categoryid=?",[req.body.categoryname,req.body.status,req.body.categoryid],function(error,result){
            console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"Server error"})
            }else{
                return res.status(200).json({status:true,message:"Category edited"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
router.post('/category_iconedit',upload.single('icon'), function(req,res,next){
    try{
        pool.query("update category(icon) where categoryid=? values(?)",[req.file.filename,req.body.categoryid],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"icon updated"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
router.post('/category_edit_data', function(req, res, next) {
  try{
   pool.query("update category set categoryname=?,status=? where categoryid=?",[req.body.categoryname,req.body.status,req.body.categoryid],function(error,result){
    if(error)
    {
       return res.status(200).json({status:false,message:'Server Error(Database).......'})  
    }
    else
    {
        return res.status(200).json({status:true,message:'Category Edited Successfully.......'})  

    }

   })


  }
  catch(e)
  {
    return res.status(200).json({status:false,message:'Server not respoding pls contact server administrator....'})  

  }
});
router.post('/category_editicon',upload.single('icon'), function(req,res,next){
    try{
        pool.query("update category set icon=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                console.log(req.file.filename)
                return res.status(200).json({status:true,message:"record submitted"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
router.post('/category_delete', function(req,res,next){
    try{
        pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
              
                return res.status(200).json({status:true,message:"category deleted"})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
/* subcategory */

router.post('/subcategorybycid', function(req,res,next){

         
    try{
        pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){

            
            if(error){
                return res.status(200).json({status:false,message:"server error",data:[]})
              
            }else{
                
                return res.status(200).json({status:true,message:"sub fetched",data:result})
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})

module.exports= router;