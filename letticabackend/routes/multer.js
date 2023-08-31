const { diskStorage } = require('multer');
const ULID = require('ulid')
var multer = require('multer')
var storage= multer.diskStorage({

destination:(req,file,path)=>{
    path(null,'public/images')
},
filename:(req,file,path)=>{
    ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    path(null,ULID.ulid()+ext)
}



});
var upload = multer({storage:storage})
module.exports=upload;
