var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');


router.post('/productsubmit',upload.single('icon'), function(req,res,next){
    try{
        pool.query("insert into products(categoryid,subcategoryid,productname,description,status,icon) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.productName,req.body.description,req.body.status,req.file.filename],function(error,result){
            console.log(error)
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
router.get('/product_list',function(req,res,next){
    try{
        pool.query("select P.*,(select C.categoryname from category C where P.categoryid=C.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from products P",function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error",data:[]})
            }else{
                return res.status(200).json({status:true,message:"record submitted",data:result})
                console.log(error)
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }


})

router.post('/product_edit', function(req,res,next){
    try{
        pool.query("update products set productname=?,categoryid=?,subcategoryid=?,description=?,status=? where productid=?",[req.body.productName, req.body.categoryid,req.body.subcategoryid,req.body.description,req.body.status,req.body.productid],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"record submitted"})
                console.log(error)
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})

router.post('/product_delete', function(req,res,next){
    try{
        pool.query("delete from products where productid=?",[req.body.productid],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"record delete"})
                console.log(error)
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})
router.post('/product_editicon',upload.single('icon'), function(req,res,next){
    try{
        pool.query("update products set icon=? where productid=?",[req.file.filename,req.body.productid],function(error,result){
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




router.post('/product_by_subcid', function(req,res,next){
    console.log(req.body.categoryid)
           
      try{
          pool.query("select * from products where subcategoryid=?",[req.body.subcategoryid],function(error,result){
  
              
              if(error){
                  return res.status(200).json({status:false,message:"server error",data:[]})
                
              }else{
                  
                  return res.status(200).json({status:true,message:"products fetched",data:result})
              }
          })
  
      }
      catch(e){
          return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
      }
  
  })
  /*   productlist ke functionssssssssssssssss */



  router.post('/productlistsubmit',upload.single('picture'), function(req,res,next){
    console.log(req.body)
    try{
        pool.query("insert into productlist(categoryid,subcategoryid,productid,productlistname,description,rate,offer,weight,stock,status,picture) values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.productListName,req.body.description,req.body.rate,req.body.offer,req.body.weight,req.body.stock,req.body.status,req.file.filename],function(error,result){
                
            if(error){
                console.log(error)
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


router.get('/table_list',function(req,res,next){


    try{
        pool.query(" select PL.*,(select C.categoryname from category C where PL.categoryid=C.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=PL.subcategoryid) as subcategoryname,(select P.productname from products P where P.productid=PL.productid) as productname from productlist PL",function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error", data:[]})
            }else{
                return res.status(200).json({status:true,message:"record submitted",data:result})
                console.log(error)
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }
})










router.post('/product_list_edit', function(req,res,next){
    try{
        pool.query("update productlist set productlistname=?,categoryid=?,subcategoryid=?,productid=?,description=?,rate=?,offer=?,weight=?,stock=?,status=? where productlistid=?",[req.body.productListName, req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.description,req.body.rate,req.body.offer,req.body.weight,req.body.stock,req.body.status,req.body.productlistid],function(error,result){
            console.log(error)
            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"record edited"})
                console.log(error)
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})

router.post('/product_list_delete', function(req,res,next){
    try{
        pool.query("delete from productlist where productlistid=?",[req.body.productlistid],function(error,result){

            if(error){
                return res.status(200).json({status:false,message:"server error"})
            }else{
                return res.status(200).json({status:true,message:"record delete"})
                console.log(error)
            }
        })

    }
    catch(e){
        return res.status(200).json({status:false,message:"server not responding please contact server administrators"})
    }

})


router.post('/product_list_editicon',upload.single('picture'), function(req,res,next){
    try{
        pool.query("update productlist set picture=? where productlistid=?",[req.file.filename,req.body.productlistid],function(error,result){
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