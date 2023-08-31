import { useState,useEffect } from "react"
import { IconButton ,Grid,TextField,Button, FormControl, InputLabel, Select, MenuItem, Avatar} from "@mui/material"
import { postData,getData,getDataWithQuery } from "../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useStyles } from "./poductlistniteshcss"
import { InsertPhoto } from "@mui/icons-material";

export default function AddProductList(){
  const classes = useStyles()
  const [status,setStatus]=useState('')
  const [description,setDescription]=useState('')
  const [rate,setRate]=useState('')
  const [offer,setOffer]=useState('')
  const [weight,setWeight]=useState('')
  const [stock,setStock]=useState('')
  const [productList,setproductList]=useState([])
  const [productid,setproductid]=useState('')
  const [productName,setproductName]=useState('')
  const [categoryList,setcategoryList]=useState([])
  const [categoryName,setcategoryName]=useState('')
  const [categoryid,setcategoryid]=useState('');    
  const [subcategoryName,setsubcategoryName]=useState('')
  const [subcategoryList,setsubcategoryList]=useState([])
  const [subcategoryid,setsubcategoryid]=useState('');
  const [productListName,setproductListName]=useState('')
  const [error,setError]=useState({})
  const [picture,setPicture]=useState({file:'/assets/blankimage.png',  bytes:''})



  useEffect(
    function(){
      fetchallCategory( )
    },[]
    )
     
    //  error
  const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))
  }
/*category dropdown functions*/
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
  


  /* subcategory dropdown functions */
  const fetchallSubcategoryWhere=async(catid)=>{
    var body={
      categoryid:catid
    }
  
    console.log("fetchallsubcategorywhere"+catid)
    var result = await getDataWithQuery('category/subcategorybycid',body)
    setsubcategoryList(result.data)
    
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
    /*product dropdown functions */
    const fetchallProductsWhere=async(subcatid)=>{
        var body={
          subcategoryid:subcatid
        }
      
        console.log("fetchall products where subcat"+subcatid)
        var result = await getDataWithQuery('products/product_by_subcid',body)
        setproductList(result.data)
        
      }



      const fillallProducts=()=>{
        return(
           productList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
           })
        )
    
      }
      const handlechangesproduct=(pid)=>{
        setproductid(pid)
        /*   fetchallProductsListWhere(subcatid)   */
      }
        
           const handlepicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        handleError('picture',null)
     
   }
    const validation=()=>{
        var isValid=true;
        if(!categoryid){                     //its not category name from error its category name from itput itself
            handleError('categoryid',"pls input category name")
            isValid=false
       }
       if(!subcategoryid){                     //its not category name from error its category name from itput itself
        handleError('subcategoryid',"pls input category name")
        isValid=false
   }
         if(!productid){                     //its not category name from error its category name from itput itself
          handleError('productid',"pls input  name")
          isValid=false
         }
         if(!productListName){                     //its not category name from error its category name from itput itself
            handleError('productListName',"pls input productlist name")
            isValid=false
           }
           if(!description){                     //its not category name from error its category name from itput itself
            handleError('description',"pls input productlist name")
            isValid=false
           }
           if(!rate){                     //its not category name from error its category name from itput itself
            handleError('rate',"pls input productlist name")
            isValid=false
           }
           if(!offer){                     //its not category name from error its category name from itput itself
            handleError('offer',"pls input productlist name")
            isValid=false
           }
           if(!weight){                     //its not category name from error its category name from itput itself
            handleError('weight',"pls input productlist name")
            isValid=false
           }
           if(!stock){                     //its not category name from error its category name from itput itself
            handleError('stock',"pls input productlist name")
            isValid=false
           }

           if(!status){
            handleError('status',"pls input status")
               isValid=false
           }

           if(!picture.bytes){
            handleError('picture',"pls select icon for subcategory")
               isValid=false
           } 
       
      
        return isValid
    }
         const handleClick=async()=>{

             console.log(categoryid,subcategoryid,productid,productListName,rate,offer,weight,stock,status)

            if(validation()){
              var formData = new FormData()
              formData.append("categoryid",categoryid)
              formData.append("subcategoryid",subcategoryid)
              formData.append("productid",productid)
              formData.append("productListName",productListName)
              formData.append("description",description)
              formData.append("rate",rate)
              formData.append("offer",offer)
              formData.append("weight",weight)
              formData.append("stock",stock)
              formData.append("picture",picture.bytes)
              formData.append("status",status)
              console.log(JSON.stringify(formData))
            var result = await postData('products/productlistsubmit',formData)
             
              if(result.status){
                Swal.fire({
                  
                    icon: 'success',
                    title: 'Productlist has been saved',
                    showConfirmButton: true,
                    timer: 3000
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
                    <Grid container spacing={2}>
                     <Grid item xs={12} className={classes.headingStyle}style={{display:'flex',justifyContent:'center'}}>
                      Add Product List
                      </Grid>         
                                             
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select
                       id="demo-simple-select"
                       value={categoryid}
                       label="Category "
                       error={error.categoryid?true:false } 
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

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                            
                             <Select
                             value={subcategoryid}
                             label="Subcategory"
                             error={error.subcategoryid?true:false}
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



                              <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            
                            
                             <Select
                             value={productid}
                             label="Product"
                             error={error.productid?true:false}
                             onFocus={()=>{handleError('productid',null)}}

                             onChange={(event)=>{
                                handlechangesproduct(event.target.value)  
                            }}

                             >
                                <MenuItem>Select Product</MenuItem>
                             {fillallProducts()}

                             </Select>
                          

                        </FormControl>
                        <div className={classes.errorText}>{error.productid}</div>
                      </Grid>


                   
                   <Grid item xs={12}>
                     <TextField label="Productlist Name" error={error.productListName?true:false } helperText={error.productListName} onFocus={()=>handleError("productListName",null)} onChange={(event)=>{setproductListName(event.target.value)}} variant="outlined" fullWidth/>
                   </Grid>
                     
                   <Grid item xs={12}>
                     <TextField label="Description" error={error.description?true:false } helperText={error.description} onFocus={()=>handleError("description",null)} onChange={(event)=>{setDescription(event.target.value)}} variant="outlined" fullWidth/>
                   </Grid>
                     
                   <Grid item xs={4}>
                     <TextField label="Rate" error={error.rate?true:false } helperText={error.rate} onFocus={()=>handleError("rate",null)} onChange={(event)=>{setRate(event.target.value)}} variant="outlined" fullWidth/>
                   </Grid>
                     
                   <Grid item xs={4}>
                     <TextField label="offer" error={error.offer?true:false } helperText={error.offer} onFocus={()=>handleError("offer",null)} onChange={(event)=>{setOffer(event.target.value)}} variant="outlined" fullWidth/>
                   </Grid>

                     
                   <Grid item xs={4}>
                     <TextField label="Weight" error={error.weight?true:false } helperText={error.weight} onFocus={()=>handleError("weight",null)} onChange={(event)=>{setWeight(event.target.value)}} variant="outlined" fullWidth/>
                   </Grid>
                   
                     
                   <Grid item xs={6}>
                     <TextField label="Stock" error={error.stock?true:false } helperText={error.stock} onFocus={()=>handleError("stock",null)} onChange={(event)=>{setStock(event.target.value)}} variant="outlined" fullWidth/>
                   </Grid>
                  
                  
                  <Grid item xs={6}>
       <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
            <Select
            id="demo-simple-select"
            value={status}
            label="Status"
            error={error.status?true:false } 
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
         <IconButton onChange={handlepicture} color="primary" aria-label="upload picture" component="label">
         <input  hidden accept="image/*" type="file" />
         <InsertPhoto />
         </IconButton><span className={classes.headingStyle} style={{fontSize: 12}}>Upload Picture</span>
         
      </Grid>
      
      <Grid item xs={6}>
        <Avatar
        alt="icon"
        src={picture.file}
        style={{width:"50px",height:"50px"}}
        variant="rounded"
        ></Avatar>
        <div className={classes.errorTxt}>{error.picture}</div>
      </Grid>



      <Grid item xs={6}> 
      <Button variant="contained" onClick={handleClick} fullWidth>Submit</Button>
      </Grid> 
      <Grid item xs={6}>
      <Button variant="contained" color="error" fullWidth>Reset</Button> 
      </Grid> 
      </Grid>   
   </div>
  </div>
         )
}




