import {useEffect, useState} from 'react'
import MaterialTable from '@material-table/core'
import { useStyles } from './productscss'
import { postData,getData,getDataWithQuery,serverURL } from "../services/FetchNodeServices"
import { Grid,Avatar, Button, Dialog, DialogActions, DialogTitle,IconButton ,TextField, FormControl, InputLabel, Select, MenuItem, DialogContent} from '@mui/material'
import Swal from "sweetalert2"
import { render } from '@testing-library/react'
import { PhotoCamera } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'



function Displayallproducts(){
    const navigate = useNavigate()
    const [open,setOpen]=useState(false)
    const handleClose=()=>{
        
        setOpen(false)
      }

    /* product interface ke costantssssssssssssssss */
    const classes = useStyles()
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''})
    const [productid,setproductid]=useState('')
    const [productName,setproductName]=useState('')
    const [description,setDescription]=useState('')
    const [productList, setproductList]=useState([])
    const [categoryList,setcategoryList]=useState([])
    const [categoryName,setcategoryName]=useState('')
    const [subcategoryName,setsubcategoryName]=useState('')
    const [categoryid,setcategoryid]=useState('');
    const [subcategoryList,setsubcategoryList]=useState([])
    const [subcategoryid,setsubcategoryid]=useState('');
    const [error,setError]=useState({})
    const [buttonVisible,setbuttonVisible]=useState(false)
    const [oldicon,setOldicon]=useState('')


    const fetchproductList=async()=>{
        var result = await getData('products/product_list')
        setproductList(result.data)
    }
    useEffect(function(){
        fetchproductList()
      },[])


   /*  productinterface ke functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */   /*    errorrrrrrrrrrrrrrrrrrrrr */

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
          
          /*  if(!icon.bytes){
               handleError('icon',"pls select icon for category")
               isValid=false
           } */
           console.log(JSON.stringify(icon))
       
            return isValid
       }
       const handleEdit=async()=>{
           if(validation()){
              setOpen(false)
              setbuttonVisible(false)
             var body = {
              'productid':productid,
              'productName':productName,
              'categoryid':categoryid,
              'subcategoryid':subcategoryid,
              'status':status,
              'description':description
             }
             console.log(JSON.stringify(body))
             var result = await postData('products/product_edit',body)
            
            
           }
           if(result.status){
             Swal.fire({
               
                 icon: 'success',
                 title: result.message,
                 showConfirmButton: true,
                
               })
           }
           else{
             Swal.fire({
               
                 icon: 'error',
                 title: result.message,
                 showConfirmButton: true,
                
               })
         
           }
           fetchproductList()
     
         }


         const handleDelete=async()=>{
          if(validation()){
            setOpen(false)
            var body = {
             'productid':productid
            }
            console.log(JSON.stringify(body))
            var result = await postData('products/product_delete',body)
           
           
          }
          if(result.status){
            Swal.fire({
              
                icon: 'success',
                title: result.message,
                showConfirmButton: true,
               
              })
          }
          else{
            Swal.fire({
              
                icon: 'error',
                title: result.message,
                showConfirmButton: true,
               
              })
        
          }
          fetchproductList()
    
        }


        const handleiconEdit=async()=>{
          console.log("handle icon edit is working")
          setOpen(false)
          
          setbuttonVisible(false)
          var formData = new FormData()
          formData.append('productid',productid)
          formData.append('icon',icon.bytes)             
          
          var result = await postData('products/product_editicon',formData)
          setIcon({file:`${serverURL}/images/${icon}`, bytes:''})
          
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
          
         fetchproductList()
        
        
        }
        const handleremove=()=>{
          setIcon({file:`${serverURL}/images/${oldicon}`, bytes:''})
          setbuttonVisible(false)
          }



         const handlepicture=(event)=>{
           setIcon({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
           handleError('icon',null)
           setbuttonVisible(true)
      }






/*    product interface ka form
 */
        const showProductsForm=()=>{
          return(
            <div className={{ width:'30vw',
            height:'auto',
            padding:15,
            background:'#fff',
            borderRadius:10}}>

<Grid container spacing={3}>
                {/*///////////////////////////////////////////////   category dropdown///////////////////////////////////////// */}
                <Grid item xs={12}>
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
                      <Grid item xs={12}>
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
                   <Grid item xs={12}>
                    <div className={classes.headingstyles}>
                       Add New product
                    </div>
                   
                   </Grid>
            <Grid item xs={12}>
                    <TextField value={productName} label="Product Name" error={error.productName?true:false } helperText={error.productName} onFocus={()=>handleError("productName",null)} onChange={(event)=>{setproductName(event.target.value)}} variant="outlined" fullWidth/>
                </Grid>

              {/*   descriptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */}
              <Grid item xs={12}>
                    <div className={classes.headingstyles}>
                       Add Description
                    </div>
                   
                   </Grid>
            <Grid item xs={12}>
                    <TextField value={description
                    
                    
                    } label="Product Descriptions" error={error.description?true:false } helperText={error.productDescription} onFocus={()=>handleError("productDescription",null)} onChange={(event)=>{setDescription(event.target.value)}} variant="outlined" fullWidth/>
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

            <Grid item xs={4}>
         <IconButton onChange={handlepicture} color="primary" aria-label="upload picture" component="label">
         <input  hidden accept="image/*" type="file" />
         <PhotoCamera />
         </IconButton>
         
            </Grid>
            <Grid item xs={4}>
                <Avatar
                alt="icon"
                src={icon.file}
                style={{width:"50px",height:"40px"}}
                variant="rounded"
                ></Avatar>
                <div className={classes.errorTxt}>{error.icon}</div>
              </Grid>
              <Grid item xs={4}>
                {buttonVisible?<>
                <Button onClick={handleiconEdit}>save</Button>
                <Button  onClick={handleremove} >remove</Button></>:<></>}
              </Grid>



              
      <Grid item xs={6}> 
      <Button variant="contained" onClick={handleEdit}   fullWidth>Edit</Button>
      </Grid> 
      <Grid item xs={6}>
      <Button variant="contained" onClick={handleDelete} fullWidth>Delete</Button> 
      </Grid> 


              </Grid>    







                 </div> 
          )          
        }



/*  table ke function */
const handleOpen=(rowData)=>{
  fetchallSubcategoryWhere(rowData.categoryid)
    setStatus(rowData.status)
    setcategoryName(rowData.categoryname)
    setcategoryid(rowData.categoryid)
    setsubcategoryid(rowData.subcategoryid)
    console.log("subcategory id is ",subcategoryid)
    setsubcategoryName(rowData.subcategoryname)
    setDescription(rowData.description)
    setproductName(rowData.productname)
    setproductid(rowData.productid)
    console.log("product id is ",productid)

    setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
    setOldicon(rowData.icon) 
   
    setOpen(true)
    
     setOldicon(rowData.icon) 
     console.log(rowData.icon)
     console.log("handle open worked")
   }


/*  actual tablelllllllllllllllllllllllllll */

   function showProducts() {
    return (

      <div style={{width:'auto',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#F1F6F9'}}>
      <div style={{backgroundColor:'#fff',padding:'3.9px',borderRadius:'10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
      <MaterialTable
        title="Product data"
        columns={[
          { title: 'Product Name', field: 'productname' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Subcategory Name', field: 'subcategoryname' },
          { title: 'Product Description', field: 'description' },
          { title: 'Status', field: 'status' },
          { title: 'Icon', field: 'icon',render:rowData=> <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded' />}
          
        ]}
        data={productList}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'edit data here',
             onClick: (event, rowData) => handleOpen(rowData) 
          },
             
          {
      icon: 'add',
      tooltip: 'Add User',
      isFreeAction: true,
      onClick: (event) => navigate('/dashboard/productinterface')
        }
        ]}
      />
      </div>
      </div>
    )
  }
  /* table ka dialouge box */
  const DisplayallproductsDialog=()=>{
    console.log("dialog box is running")
    return(
      <Dialog
      open={open}
      onClose={handleClose}>
  
        
        <DialogContent>
          {showProductsForm()}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    )

  }



               return(
                 <div >
                      <div >
                            {showProducts()}
                            {DisplayallproductsDialog()}
                            
                            
                    
                     </div>
                   
                 </div>
                  )

    
}
export default Displayallproducts;