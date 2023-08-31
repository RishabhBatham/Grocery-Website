import {useEffect, useState} from 'react'
import MaterialTable from '@material-table/core'
import { useStyles } from './productscss'
import { postData,getData,getDataWithQuery,serverURL } from "../services/FetchNodeServices"
import { Grid,Avatar, Button, Dialog, DialogActions, DialogTitle,IconButton ,TextField, FormControl, InputLabel, Select, MenuItem, DialogContent} from '@mui/material'
import Swal from "sweetalert2"
import { render } from '@testing-library/react'
import { PhotoCamera } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'



import {makeStyles} from "@mui/styles"




 function  DisplayProductsList(){
  const navigate = useNavigate()

    useEffect(function(){
        fetchtableList()

      },[])
      useEffect(function(){
      fetchallCategory()

      },[])


    const [open,setOpen]=useState(false)
    const handleClose=()=>{
        
        setOpen(false)
      }
    /*////////////////////////////////////////////  table ke constants ///////////////////////////////*/
    const [buttonVisible,setbuttonVisible]=useState(false)
    const [oldpicture,setOldpicture]=useState('')



    const [tableList,setTableList]=useState([]) //this is table of productlist query




    /*  ///////////////////////////////////// productlist ke constants /////////////////////////////////// */
    const classes = useStyles()
    const [status,setStatus]=useState('')
    const [description,setDescription]=useState('')
    const [rate,setRate]=useState('')
    const [offer,setOffer]=useState('')
    const [weight,setWeight]=useState('')
    const [stock,setStock]=useState('')
   /*  const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''}) */
   const [picture,setPicture]=useState({file:'/assets/scarticon.png',  bytes:''})

    const [productlistid,setproductlistid]=useState('')

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


   /* //////////////////////fetching table data ///////////////////////////////////*/
   const fetchtableList=async()=>{
    var result = await getData('products/table_list')
    setTableList(result.data)
    console.log(JSON.stringify(result.data))



    
}

/*////////////////////////////////// productlist ke functions ////////////////////////////////////////*/

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
        /*   fetchallProductsListWhere(subcatid)   */
      }
          
                                             /*    functions */

           const handlepicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        handleError('picture',null)
        setbuttonVisible(true)
     
   }
    /* ////////////////////////////////////////////////validation/////////////////////////////////////////////// */
    const validation=()=>{
        var isValid=true;
        if(!categoryid){                     
            handleError('categoryid',"pls input category name")
            isValid=false
       }
       if(!subcategoryid){                     
        handleError('subcategoryid',"pls input category name")
        isValid=false
   }
         if(!productid){                     
          handleError('productid',"pls input  name")
          isValid=false
         }
         if(!productListName){                     
            handleError('productListName',"pls input productlist name")
            isValid=false
           }
           if(!description){                     
            handleError('description',"pls input description")
            isValid=false
           }
           if(!rate){                     
            handleError('rate',"pls input rate")
            isValid=false
           }
           if(!offer){                     
            handleError('offer',"pls input offer")
            isValid=false
           }
           if(!weight){                     
            handleError('weight',"pls input weight")
            isValid=false
           }
           if(!stock){                     
            handleError('stock',"pls input stock")
            isValid=false
           }

           if(!status){
            handleError('status',"pls input status")
               isValid=false
           }

       
      
        return isValid
    }
        /* //////////////////////////submit function //////////////////////////////////////////*/
        const handleEdit=async()=>{
            if(validation()){
                setOpen(false)
                setbuttonVisible(false)
              var body={
                 'productlistid':productlistid,
                "categoryid":categoryid,
                "subcategoryid":subcategoryid,
                "productid":productid,
                "productListName":productListName,
                "description":description,
                "rate":rate,
                "offer":offer,
                "weight":weight,
                "stock":stock,
                
                "status":status 
              }
          
        
              
              var result = await postData('products/product_list_edit',body)
             
              if(result.status){
                Swal.fire({
                  
                    icon: 'success',
                    title: 'Productlist has been saved',
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
           
            fetchtableList()
          }

          const handleDelete=async()=>{
            if(validation()){
              setOpen(false)
              var body = {
               'productlistid':productlistid
              }
              console.log(JSON.stringify(body))
              var result = await postData('products/product_list_delete',body)
             
             
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
            fetchtableList()
      
          }
          const handleiconEdit=async()=>{
            console.log("handle icon edit is working")
            setOpen(false)
            
            setbuttonVisible(false)
            var formData = new FormData()
            formData.append('productlistid',productlistid)
            formData.append('picture',picture.bytes)             
            
            var result = await postData('products/product_list_editicon',formData)
            setPicture({file:`${serverURL}/images/${picture}`, bytes:''})
            
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
            
          fetchtableList()
          
          
          }
          const handleremove=()=>{
            setPicture({file:`${serverURL}/images/${oldpicture}`, bytes:''})
            setbuttonVisible(false)
            }
  
  




/*////////////////////////////////// table ke functions///////////////////////////////////////////// */
const handleOpen=(rowData)=>{
     fetchallSubcategoryWhere(rowData.categoryid)
     fetchallProductsWhere(rowData.subcategoryid)
    setcategoryid(rowData.categoryid)
    setsubcategoryid(rowData.subcategoryid)
    setproductid(rowData.productid)
    setproductlistid(rowData.productlistid)

    setproductListName(rowData.productlistname)
    setDescription(rowData.description)
    setRate(rowData.rate)
    setOffer(rowData.offer)
    setWeight(rowData.weight)
    setStock(rowData.stock)
    setStatus(rowData.status)


      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setOldpicture(rowData.picture) 
     
      setOpen(true)
       console.log("handle open worked")
     }
  



/*/////////////////////////////////////productlist ka form//////////////////////////////////////////////////////*/
 const showProductsListForm=()=>{
    return(
        <div className={{ width:'30vw',
        height:'auto',
        padding:15,
        background:'#fff',
        borderRadius:10}}>

<Grid container spacing={3}>

{/*    //////////////////////////////    CATEGORY dropdown form ////////////////////////////*/}
<Grid item xs={12}>
            <div className={classes.headingstyles}>
               Add New Categorys
            </div>
           
           </Grid>
        
  
  
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
    <Grid item xs={12}>
            <div className={classes.headingstyles}>
               Add New SubCategory
            </div>
           
           </Grid>
 <Grid item xs={12}>
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
         <Grid item xs={12}>
            <div className={classes.headingstyles}>
               Add New Product
            </div>
           
           </Grid>
        
        
        
        
        
         <Grid item xs={12}>
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


{/* /////////////////////////////////   Product Name//////////////////////////////// */}
<Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList Name
            </div>
           
           </Grid>

<Grid item xs={12}>
<TextField label="Productlist Name" value={productListName} error={error.productListName?true:false } helperText={error.productListName} onFocus={()=>handleError("productListName",null)} onChange={(event)=>{setproductListName(event.target.value)}} variant="outlined" fullWidth/>
</Grid>
   {/* /////////////////////////////////   Product Descrption//////////////////////////////// */}
   <Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList Description
            </div>
           
           </Grid>

<Grid item xs={12}>
<TextField label="Productlist Description" value={description} error={error.description?true:false } helperText={error.description} onFocus={()=>handleError("description",null)} onChange={(event)=>{setDescription(event.target.value)}} variant="outlined" fullWidth/>
</Grid>
      {/* /////////////////////////////////   Product Rate//////////////////////////////// */}
      <Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList rate
            </div>
           
           </Grid>

<Grid item xs={12}>
<TextField label="Productlist Rate" value={rate} error={error.rate?true:false } helperText={error.rate} onFocus={()=>handleError("rate",null)} onChange={(event)=>{setRate(event.target.value)}} variant="outlined" fullWidth/>
</Grid>
        {/* /////////////////////////////////   Product Offer//////////////////////////////// */}
        <Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList Offer
            </div>
           
           </Grid>

           <Grid item xs={12}>
           <TextField label="Productlist Rate" value={offer} error={error.offer?true:false } helperText={error.offer} onFocus={()=>handleError("offer",null)} onChange={(event)=>{setOffer(event.target.value)}} variant="outlined" fullWidth/>
           </Grid>

           {/* /////////////////////////////////   Product weight//////////////////////////////// */}
           <Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList weight
            </div>
           
           </Grid>

            <Grid item xs={12}>
            <TextField label="Productlist Weight" value={weight} error={error.weight?true:false } helperText={error.weight} onFocus={()=>handleError("weight",null)} onChange={(event)=>{setWeight(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>

                     {/* /////////////////////////////////   Product stockkkkkk//////////////////////////////// */}
            <Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList Stock
            </div>
           
           </Grid>

            <Grid item xs={12}>
            <TextField label="Productlist Stock"  value={stock} error={error.stock?true:false } helperText={error.stock} onFocus={()=>handleError("stock",null)} onChange={(event)=>{setStock(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            {/*//////////////////////////  status//////////////////////////////////// */}
            <Grid item xs={12}>
            <div className={classes.headingstyles}>
            Enter ProductList Status
            </div>
           
           </Grid>


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

<Grid item xs={4}>
<IconButton onChange={handlepicture} color="primary" aria-label="upload picture" component="label">
<input  hidden accept="image/*" type="file" />
<PhotoCamera />
</IconButton>

</Grid>

<Grid item xs={4}>
<Avatar
alt="icon"
src={picture.file}
style={{width:"50px",height:"40px"}}
variant="rounded"
></Avatar>
<div className={classes.errorTxt}>{error.picture}</div>
</Grid>


 <Grid item xs={4}>
    {buttonVisible?<>
    <Button onClick={handleiconEdit}>save</Button>
    <Button   onClick={handleremove}  >remove</Button></>:<></>}
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

/* //////////////////////////////////////////// actual table/////////////////////////////////////// */
function showProductsList() {
    return (

      <div style={{width:'auto',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#F1F6F9'}}>
      <div style={{backgroundColor:'#fff',padding:'3.9px',borderRadius:'10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
      <MaterialTable
        title="Product List  data"
        columns={[
          { title: 'Product List Name', field: 'productlistname', render:rowData=><div><div>{rowData.productlistname}</div><div>{rowData.productname}</div></div> },
        
          { title: 'Category Name', field: 'categoryname',render:rowData=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div> },
         
          { title: 'Product Description', field: 'description' },
          { title: 'Rate/offer', field: 'rate',render:rowData=><div><div>{rowData.rate}</div><div>{rowData.offer}</div></div>  },
          
          { title: 'Weight', field: 'weight' },
          { title: 'Stock/status', field: 'stock',render:rowData=><div><div>{rowData.stock}</div><div>{rowData.status}</div></div>  },
         
          { title: 'Picture', field: 'picture',render:rowData=> <Avatar src={`${serverURL}/images/${rowData.picture}`} style={{width:75}} variant='rounded' />}
          
        ]}
      data={tableList}   
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
      onClick: (event) => navigate('/dashboard/productlistinterface')
        }
        ]}
      />
      </div>
      </div>
    )
  }
    /* table ka dialouge box */
    const DisplayallproductsListDialog=()=>{
        console.log("dialog box is running")
        return(
          <Dialog
          open={open}
          onClose={handleClose}>
      
            
            <DialogContent>
              {showProductsListForm()}
    
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
               {showProductsList()}
        {DisplayallproductsListDialog()} 
               
               
       
        </div>
      
    </div>
     )












}

export default DisplayProductsList;

