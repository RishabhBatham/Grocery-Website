import {useEffect, useState} from 'react'
import MaterialTable from '@material-table/core'
import { useStyles } from './subcategorycss'
import { useNavigate } from 'react-router-dom'

import { Grid,Avatar, Button, Dialog, DialogActions, DialogTitle,IconButton ,TextField, FormControl, InputLabel, Select, MenuItem, DialogContent} from '@mui/material'
import Swal from "sweetalert2"
import { render } from '@testing-library/react'
import { PhotoCamera } from "@mui/icons-material"
import { postData,getData,serverURL } from "../../services/FetchNodeServices"


function DisplayAllSubcategory(){
  const navigate=useNavigate()
    useEffect(function(){
        fetchSubcateogryList()
        fetchallCategory()
      },[])




    const [CategoryList, setCategoryList]=useState([])
    const [open,setOpen]=useState(false)
    const [subcategoryList,setSubcategoryList]=useState([])
    const [buttonVisible,setbuttonVisible]=useState(false)
    const [oldicon,setOldicon]=useState('')
    const classes = useStyles()

     /* //////////////////////////////subcategory interface ke consts /////////////////////////////////////*/
     const [status,setStatus]=useState('')
     const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''})
     const [subcategoryName,setsubcategoryName]=useState('')
     const [categoryName,setcategoryName]=useState('')
     const [categoryid,setcategoryid]=useState('');
     const [subcategoryid , setsubcategoryid]=useState('')
     const [error,setError]=useState({})





     /*   //////////////////////////// subcategory interface ke functions////////////////////////////// */
     const fetchallCategory=async()=>{
      var result = await getData('category/category_list')
      setCategoryList(result.data)
      
      
    }
    const fillallCategory=()=>{
      return(
         CategoryList.map((item)=>{
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
         })
      )

    }

    const handleError=(input,value)=>{
        setError(prev=>({...prev,[input]:value}))
     
    }
    const validation=()=>{
        var isValid=true;
        console.log('subcategoryname value on validation',subcategoryName)
        if((!subcategoryName)||subcategoryName==''){
         handleError('subcategoryName',"pls input subcategory name")
         isValid =false
        }
        if(!categoryid){                     //its not category name from error its category name from itput itself
            handleError('categoryName',"pls input category name")
            isValid=false
       }
       if(!status){
        handleError('status',"pls input status")
           isValid=false
       }
       
        
        return isValid
    }
    const handleEdit=async()=>{
              console.log("current value of validation is ",validation())
        if(validation()){
            setOpen(false)
           
            var body={
                'categoryid':categoryid,
                'subcategoryid':subcategoryid,
                'subcategoryName':subcategoryName,
                'status':status
            }
           console.log('value of subcategoryName before submit  ',subcategoryName)
          var result = await postData('subcategory/subcategory_edit',body)
         
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
        }
       
          fetchSubcateogryList()
      }


      const handleDelete=async()=>{
        setOpen(false)
        setbuttonVisible(false)
  
        var body ={
            'subcategoryid':subcategoryid
        }
        console.log("handle delet working",body.subcategoryid)
        var result = await postData('subcategory/subcategory_delete',body)
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
        
        fetchSubcateogryList()
         
      }
      const handleiconEdit=async()=>{
        console.log("handle icon edit is working")
        setOpen(false)
        
        setbuttonVisible(false)
        var formData = new FormData()
        formData.append('subcategoryid',subcategoryid)
        formData.append('icon',icon.bytes)             
        
        var result = await postData('subcategory/subcategory_editicon',formData)
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
        
       fetchSubcateogryList()
      
      
      }
      const handleremove=()=>{
        setIcon({file:`${serverURL}/images/${oldicon}`, bytes:''})
        setbuttonVisible(false)
        }
    const handlepicture=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        console.log(icon.file)
        handleError('icon',null)
        setbuttonVisible(true)
        console.log("handle picture in runing",buttonVisible)
     
   }







    /*  ///////////////////////////////////subcategory ka form///////////////////////////////////// */
   const showSubcategoryForm=()=>{
       
    return(
        <div  className={{ width:'30vw',
        height:'auto',
        padding:15,
        background:'#fff',
        borderRadius:10}}>
        <Grid container spacing={3}>
                
           <Grid item xs={12}>
            <div className={classes.headingstyles}>
               Add New Subategory
            </div>
           
           </Grid>
           <Grid item xs={12}>
            <TextField label="Subcategory Name" value={subcategoryName} error={error.subcategoryName?true:false } helperText={error.subcategoryName} onFocus={()=>handleError("subcategoryName",null)} onChange={(event)=>{setsubcategoryName(event.target.value)}} variant="outlined" fullWidth/>
           </Grid>
           <Grid item xs={12}>
            <div className={classes.headingstyles}>
               To Category
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
            onFocus={()=>handleError("categoryName",null)}
            onChange={(event)=>{setcategoryid(event.target.value)}}
            >
              <MenuItem>Select Category</MenuItem>
              {fillallCategory()}
             
            </Select>


        </FormControl>
        <div className={classes.errorTxt}>{error.categoryName}</div>
           </Grid>
           <Grid item xs={12}>
            <div className={classes.headingstyles}>
              select status 
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
        src={icon.file}
        style={{width:"50px",height:"40px"}}
        variant="rounded"
        ></Avatar>
        <div className={classes.errorTxt}>{error.icon}</div>
      </Grid>
      <Grid item xs={4}>
                {buttonVisible?<>
                <Button onClick={handleiconEdit}>save</Button>
                <Button onClick={handleremove}>remove</Button></>:<></>}
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





 /*  ////////////////////////////  table ke function///////////////////////// */
 const fetchSubcateogryList=async()=>{
    var result = await getData('subcategory/subcategory_list')
    setSubcategoryList(result.data)
}

const handleClose=()=>{
        
    setOpen(false)
  }
  const handleOpen=(rowData)=>{
    fillallCategory()
    setStatus(rowData.status)
    setsubcategoryName(rowData.subcategoryname)
    setcategoryName(rowData.categoryname)
    setcategoryid(rowData.categoryid)
    setsubcategoryid(rowData.subcategoryid)
    setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
   
     setOpen(true)
     
     setOldicon(rowData.icon) 
     console.log("handle open worked")
   }




/* ////////////////////////// actual table ////////////////////////////////*/
function showSubcategory() {
    return (
      <div style={{width:'auto',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#F1F6F9'}}>
      <div style={{backgroundColor:'#fff',padding:'3.9px',borderRadius:'10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
      <MaterialTable
        title="Subcategory's data"
        columns={[
          { title: 'Subcategory Name', field: 'subcategoryname' },
          { title: 'category Name', field: 'categoryname' },
          { title: 'Status', field: 'status' },
          { title: 'Icon', field: 'icon',render:rowData=> <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded' />}
          
        ]}
        data={subcategoryList}        
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
      onClick: (event) => navigate('/dashboard/subcategoryinterface')
        }
        ]}
      />
      </div>
      </div>
    )
  }
/*  /////////////////////////////////  dialog box //////////////////////////////////////*/
const DisplayallSubcategoryDialog=()=>{
    return(
      <Dialog
      open={open}
      onClose={handleClose}>
  
        
        <DialogContent>
          {showSubcategoryForm()}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    )

  }
  return(
    <div>
         <div>
               {showSubcategory()}
               {DisplayallSubcategoryDialog()}
               
           
       
        </div>
      
    </div>
     )




}

export default DisplayAllSubcategory;