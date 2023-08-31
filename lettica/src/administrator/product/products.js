import { useState,useEffect } from "react"

import {makeStyles} from "@mui/styles"
import { IconButton ,Grid,TextField,Button, FormControl, InputLabel, Select, MenuItem, Avatar} from "@mui/material"
import { height, width } from "@mui/system"
import { PhotoCamera,FormatListBulletedOutlined, ResetTv,Send } from "@mui/icons-material"
import { postData,getData,getDataWithQuery } from "../services/FetchNodeServices"
import Swal from "sweetalert2"
import {useStyles} from './productscss'
import { useNavigate } from "react-router-dom"



export default function ProductInterface(){
  const navigate = useNavigate()
    const classes = useStyles()
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''})
    const [productName,setproductName]=useState('')
    const [description,setDescription]=useState('')
    const [categoryList,setcategoryList]=useState([])
    const [categoryName,setcategoryName]=useState('')
    const [subcategoryName,setsubcategoryName]=useState('')
    const [categoryid,setcategoryid]=useState('');
    const [subcategoryList,setsubcategoryList]=useState([])
    const [subcategoryid,setsubcategoryid]=useState('');
    const [error,setError]=useState({})
    const [buttonVisible,setbuttonVisible]=useState(false)
    const [oldicon,setOldicon]=useState('')

   /*    errorrrrrrrrrrrrrrrrrrrrr */

    const handleError=(input,value)=>{
     setError(prev=>({...prev,[input]:value}))
    }
     /* category dropdown functions   */
     useEffect(
      function(){
        fetchallCategory( )
      },[]
      )
    
        const fetchallCategory=async()=>{
          var result = await getData('category/category_list')
          setcategoryList(result.data)
          
          
          
        }
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


        const fillallCategory=()=>{
          return(
             categoryList.map((item)=>{
              return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
             })
          )
    
        }
        const fillallsubcategory=()=>{
          return(
             subcategoryList.map((item)=>{
              return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
             })
          )
    
        }
        const handlechanges=(catid)=>{
          console.log("handle changes"+catid)
          setcategoryid(catid)
          fetchallSubcategoryWhere(catid)
        }

            







   /////////////////validation///////////////////

    const validation=()=>{
        var isValid=true;
        if(!productName){
            handleError('productName','pls enter product name')
        }
      
        if(!categoryid){
          handleError('categoryid','pls select a category')
        }
        if(!subcategoryid){
          handleError('subcategoryid','pls select subcategory')
        }
        if(!description){
          handleError('description','Pls enter Description')
        }
        if(!status){
          handleError('status','pls select status')
        }
       
        if(!icon.bytes){
            handleError('icon',"pls select icon for category")
            isValid=false
        }
        console.log(JSON.stringify(icon))
    
         return isValid
    }
    const handleClick=async()=>{
        if(validation()){
          var formData = new FormData()
          formData.append("productName",productName )
          formData.append("categoryid",categoryid);
          formData.append("subcategoryid",subcategoryid)
          formData.append('status',status)
          formData.append("icon",icon.bytes )
          formData.append('description',description)
          var result = await postData('products/productsubmit',formData)
          console.log(productName)
         
        }
        if(result.status){
          Swal.fire({
            
              icon: 'success',
              title: result.message,
              showConfirmButton: false,
              timer: 800
            })
        }
        else{
          Swal.fire({
            
              icon: 'error',
              title: result.message,
              showConfirmButton: false,
              timer: 800
            })
      
        }
       
  
      }
      const handlepicture=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        handleError('icon',null)
   }

     return(
      <div className={classes.container}>
        <div className={classes.box}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div className={classes.headingstyles}>
                       Add New Product
                    </div>
                    <div onClick={()=>{
                    navigate('/dashboard/display_all_products')
                   }} >
                         <FormatListBulletedOutlined/>
                    </div>
                  </div>
                   
                   </Grid>
                {/*///////////////////////////////////////////////   category dropdown///////////////////////////////////////// */}
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
                handlechanges(event.target.value)
            }}
            >
              <MenuItem>Select Category</MenuItem>
             
              {fillallCategory()}
             
            </Select>


        </FormControl>
        <div className={classes.errorTxt}>{error.categoryid}</div>
           </Grid>
               
                      {/*    ////////////////////////   subcategory dropdown  //////////////////////////    */}
                      <Grid item xs={6}>
           <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Subcategory</InputLabel>
            <Select
            id="demo-simple-select"
            value={subcategoryid}
            label="subcategory "
            error={error.subcategoryid?true:false } helperText={error.subcategoryid} 
            onFocus={()=>handleError("subcategoryid",null)}
            onChange={(event)=>{setsubcategoryid(event.target.value)}}
            >
              <MenuItem>Select Subcategory</MenuItem>
              {fillallsubcategory()}
        
             
            </Select>


        </FormControl>
        <div className={classes.errorTxt}>{error.subcategoryid}</div>
           </Grid>



                {/*     producttttttttttttttttttttttttttt */}
                
            <Grid item xs={6}>
                    <TextField label="Product Name" error={error.productName?true:false } helperText={error.productName} onFocus={()=>handleError("productName",null)} onChange={(event)=>{setproductName(event.target.value)}} variant="outlined" fullWidth/>
                </Grid>

              {/*   descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
              
            <Grid item xs={6}>
                    <TextField label="Product Descriptions" error={error.description?true:false } helperText={error.productDescription} onFocus={()=>handleError("productDescription",null)} onChange={(event)=>{setDescription(event.target.value)}} variant="outlined" fullWidth/>
                </Grid>
               {/*    statussssssssssssssssssssssssssss */}
               <Grid item xs={12}>
           <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select status</InputLabel>
            <Select
            id="demo-simple-select"
            value={status}
            label="subcategory "
            error={error.status?true:false } helperText={error.status} 
            onFocus={()=>handleError("status",null)}
            onChange={(event)=>{setStatus(event.target.value)}}
            >
              
              <MenuItem value='Select-state'>Select-state</MenuItem>
                        <MenuItem value='Discontinue'>Discontinue</MenuItem>
                        <MenuItem value='Continue'>Continue</MenuItem>
                        <MenuItem value='Popular'>Popular</MenuItem>
                        <MenuItem value='New'>New</MenuItem>
              
        
             
            </Select>


        </FormControl>
        <div className={classes.errorTxt}>{error.status}</div>
           </Grid>


            
         {/*  //////////////////////////  imageeeeeeeeeeeeeeeeeeeeeeeeeee section ///////////////////////////////////////*/}

            <Grid item xs={6}>
         <IconButton onChange={handlepicture} color="primary" aria-label="upload picture" component="label">
         <input  hidden accept="image/*" type="file" />
         <PhotoCamera />
         </IconButton>
         
            </Grid>
            <Grid item xs={6}>
                <Avatar
                alt="icon"
                src={icon.file}
                style={{width:"50px",height:"40px"}}
                variant="rounded"
                ></Avatar>
                <div className={classes.errorTxt}>{error.icon}</div>
              </Grid>



              
      <Grid item xs={6}> 
      <Button variant="contained" startIcon={<Send/>} onClick={handleClick}   fullWidth>Submit</Button>
      </Grid> 
      <Grid item xs={6}>
      <Button variant="contained" startIcon={<ResetTv/>} color='warning' fullWidth>Reset</Button> 
      </Grid> 


              </Grid>    

        </div>

      </div>

     )
}