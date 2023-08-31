import { useState,useEffect } from "react"

import {makeStyles} from "@mui/styles"
import { IconButton ,Grid,TextField,Button, FormControl, InputLabel, Select, MenuItem, Avatar} from "@mui/material"
import { height, width } from "@mui/system"
import { PhotoCamera, Send,ResetTv } from "@mui/icons-material"
import { postData,getData,getDataWithQuery } from "../services/FetchNodeServices"
import Swal from "sweetalert2"
import {useStyles} from './productpicturescss'
import { DropzoneArea } from "material-ui-dropzone"



export default function ProductPictures(){
     /*  //////////////////////// use effect priority functions /////////////////////////*/
     useEffect(
        function(){
          fetchallCategory( )
        },[]
        )
        const classes = useStyles()

        const [status,setStatus]=useState('')

        const [productList,setproductList]=useState([])
        const [productid,setproductid]=useState('')
        const [productName,setproductName]=useState('')
    
        
        const [categoryList,setcategoryList]=useState([])
        const [categoryName,setcategoryName]=useState('')
        const [categoryid,setcategoryid]=useState('');
        
        const [subcategoryName,setsubcategoryName]=useState('')
        const [subcategoryList,setsubcategoryList]=useState([])
        const [subcategoryid,setsubcategoryid]=useState('');

        const [productlistList,setproductlistList]=useState([])
        const [productlistid,setproductlistid]=useState('')
        const [productlistName,setproductlistName]=useState('')

        const [pictures,setPictures]=useState('')
        const [error,setError]=useState({})


        
  /* /////  error ///// */
  const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))
  }

  /* //////////////// category dropdown ke functions ////////////////*/
const fetchallCategory=async()=>{
    var result = await getData('category/category_list')
    setcategoryList(result.data)
    console.log(result.data)
    
    
  }
 const fillallCategory=()=>{
          return(
             categoryList.map((item)=>{
              return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
             })
          )
    
        }
        const handlechangescategory=(catid)=>{
            console.log("handle changes"+catid)
            setcategoryid(catid)
             fetchallSubcategoryWhere(catid) 
          }


          /* //////////////// subcategory dropdown ke functions ////////////////*/
  const fetchallSubcategoryWhere=async(catid)=>{
    var body={
      categoryid:catid
    }
  
    console.log("fetchallsubcategorywhere"+catid)
    var result = await getDataWithQuery('category/subcategorybycid',body)
    setsubcategoryList(result.data)
    console.log(result.message)
    console.log(result.data)
   
  }


  const fillallSubcategory=()=>{
    return(
       subcategoryList.map((item)=>{
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
       })
    )

  }
  const handlechangessubcategory=(subcatid)=>{
    console.log("handle changes subcat"+subcatid)
    setsubcategoryid(subcatid)
      fetchallProductsWhere(subcatid)  
  }
   /* //////////////////////////////////////////////// product dropdown ke functions//////////////////////////////////// */
   const fetchallProductsWhere=async(subcatid)=>{
    var body={
      subcategoryid:subcatid
    }
  
    console.log("fetchall products where subcat"+subcatid)
    var result = await getDataWithQuery('products/product_by_subcid',body)
    setproductList(result.data)
    console.log(result.message)
    console.log(result.data)
   
  }



  const fillallProducts=()=>{
    return(
       productList.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
       })
    )

  }
  const handlechangesproduct=(pid)=>{
    console.log("handle changes subcat"+pid)
    console.log("subcat current list is",subcategoryList)
    setproductid(pid)
      fetchallProductlistListWhere(pid)   

  }
/* 
  product list list ke functions */

  const fetchallProductlistListWhere=async(pid)=>{

    console.log("fetchall productlists where pid"+pid)
    var body={
      productid:pid
    }
  

    var result = await getDataWithQuery('productlist/productlistlistbypid',body)
    setproductlistList(result.data)
    console.log(result.message)
    console.log(result.data)
   
  }


  const fillallProductlistList=()=>{
    return(
       productlistList.map((item)=>{
        return <MenuItem value={item.productlistid}>{item.productlistname}</MenuItem>
       })
    )

  }
  const handlechangesproductlist=(plid)=>{

    setproductlistid(plid)
      

  }








                                            /*    functions */

                                          
   


 /* ////////////////////////////////////////////////validation/////////////////////////////////////////////// */
 const validation=()=>{
    var isValid=true;
    if(!categoryid){                     //its not category name from error its category name from itput itself
        handleError('categoryid',"pls input category name")
        isValid=false
   }
   if(!subcategoryid){                     //its not category name from error its category name from itput itself
    handleError('subcategoryid',"pls input subcategory name")
    isValid=false
}
     if(!productid){                     //its not category name from error its category name from itput itself
      handleError('productid',"pls input  productname")
      isValid=false
     }

     if(!productlistid){                     //its not category name from error its category name from itput itself
        handleError('productlistid',"pls input  productlistname")
        isValid=false
       }
     
       if(!status){
        handleError('status',"pls select statuss")
           isValid=false
       } 
     
     if(!pictures){
      handleError('picture',"pls select picture")
         isValid=false
     } 
       
       

   
  
    return isValid
}

   /* //////////////////////////submit function //////////////////////////////////////////*/
   const handleClick=async()=>{
    if(validation()){
      var formData = new FormData()
      formData.append("categoryid",categoryid)
      formData.append("subcategoryid",subcategoryid)
      formData.append("productid",productid)
      formData.append("productlistid",productlistid)
      formData.append("status",status)

     pictures.map((item,index)=>{
        formData.append('picture'+index,item)
    })

      
      
    

      
      var result = await postData('productlist/picture__submit',formData)
     
      if(result.status){
        Swal.fire({
          
            icon: 'success',
            title: 'Productpictures has been saved',
            showConfirmButton: false,
            timer: 800
          })
      }
      else{
        Swal.fire({
          
            icon: 'error',
            title: 'Server Error',
            showConfirmButton: false,
            timer: 800
          })

      }
    }
   

  }


  return(
    <div className={classes.container}>
        <div className={classes.box}>
            <Grid container spacing={3}>

             {/*    //////////////////////////////    CATEGORY dropdown form ////////////////////////////*/}
             <Grid item xs={12}>
                         <div className={classes.headingstyles}>
                            Add New Product pictures
                         </div>
                        
                        </Grid>
                     
               
               
                <Grid item xs={6}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
               id="demo-simple-select"
               value={categoryid}
               label="Category "
               error={error.categoryid?true:false } helperText={error.categoryid} 
               onFocus={()=>handleError("categoryid",null)}
               onChange={(event)=>{
                    handlechangescategory(event.target.value) 
                 }}
                  >
                    <MenuItem>Select Category</MenuItem>
                   
                    {fillallCategory()}
                   
                  </Select>


                    </FormControl>
                    <div className={classes.errorTxt}>{error.categoryid}</div>
                </Grid>


{/*    //////////////////////////////    SUBCATEGORY dropdown form ////////////////////////////*/}
              
              <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Subcategory</InputLabel>
                    
                    
                     <Select
                     value={subcategoryid}
                     label="Subcategory"
                     error={error.subcategoryid?true:false} helperText={error.subcategoryid}
                     onFocus={()=>{handleError('subcategoryid',null)}}

                     onChange={(event)=>{
                        handlechangessubcategory(event.target.value)  
                    }}

                     >
                        <MenuItem>Select Subcategory</MenuItem>
                     {fillallSubcategory()}

                     </Select>
                  

                </FormControl>
                <div className={classes.errorTxt}>{error.subcategoryid}</div>
              </Grid>



                      {/*    //////////////////////////////    Product dropdown form ////////////////////////////*/}
                
                      <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                    
                    
                     <Select
                     value={productid}
                     label="Subcategory"
                     error={error.productid?true:false} helperText={error.productid}
                     onFocus={()=>{handleError('productid',null)}}

                     onChange={(event)=>{
                        handlechangesproduct(event.target.value)  
                    }}

                     >
                        <MenuItem>Select Product</MenuItem>
                     {fillallProducts()}

                     </Select>
                  

                </FormControl>
                <div className={classes.errorTxt}>{error.subcategoryid}</div>
              </Grid>



                   {/*    //////////////////////////////    Productlist dropdown form ////////////////////////////*/}
                
                   <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                    
                    
                     <Select
                     value={productlistid}
                     label="Subcategory"
                     error={error.productlistid?true:false} helperText={error.productlistid}
                     onFocus={()=>{handleError('productlistid',null)}}

                     onChange={(event)=>{
                        handlechangesproductlist(event.target.value)  
                    }}

                     >
                        <MenuItem>Select Product</MenuItem>
                     {fillallProductlistList()}

                     </Select>
                  

                </FormControl>
                <div className={classes.errorTxt}>{error.productlistid}</div>
              </Grid>


              <Grid item xs={12}>
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => setPictures(files)}
                        filesLimit={12}
                         
                       />
                         <div className={classes.errorTxt}>{error.pictures}</div>
                    </Grid>




                        {/*//////////////////////////  status//////////////////////////////////// */}
             
                  <Grid item xs={12}>
       <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
            <Select
            id="demo-simple-select"
            value={status}
            label="Status"
            error={error.status?true:false } helperText={error.status} 
            onFocus={()=>handleError("status",null)}
            onChange={(event)=>{setStatus(event.target.value)}}
            >
                <MenuItem value='Select-state'>Select-state</MenuItem>
                <MenuItem value='Discontinue'>Discontinue</MenuItem>
                <MenuItem value='Continue'>Continue</MenuItem>
                <MenuItem value='Popular'>Popular</MenuItem>
                <MenuItem value='Trending'>Trending</MenuItem>
            </Select>


        </FormControl>
        <div className={classes.errorTxt}>{error.status}</div>
       </Grid>
           




<Grid item xs={6}> 
<Button variant="contained" onClick={handleClick} startIcon={<Send/>}  fullWidth>Submit</Button>
</Grid> 
<Grid item xs={6}>
<Button variant="contained" startIcon={<ResetTv/>} color='warning'  fullWidth>Reset</Button> 
</Grid> 








            </Grid>
        </div>
    </div>
 )




}