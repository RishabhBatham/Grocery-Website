
import {useEffect, useState} from 'react'
import MaterialTable from '@material-table/core'
import { useStyles } from './CategoryCss'
import { getData,serverURL } from '../services/FetchNodeServices'
import { Grid,Avatar, Button, Dialog, DialogActions, DialogTitle,IconButton ,TextField, FormControl, InputLabel, Select, MenuItem, DialogContent} from '@mui/material'
import Swal from "sweetalert2"
import { render } from '@testing-library/react'
import { PhotoCamera } from "@mui/icons-material"
import { postData } from "../services/FetchNodeServices"
import { useNavigate } from 'react-router-dom'


function Displayallcategory(){
    const [CategoryList, setCategoryList]=useState([])
    const [open,setOpen]=useState(false)
    const classes = useStyles()
    const navigate =useNavigate()
    

    /* category interface ke consts */
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''})
    const [categoryName,setcategoryName]=useState('')
    const [error,setError]=useState({})
    const [categoryid,setcategoryid]=useState('')
    const [buttonVisible,setbuttonVisible]=useState(false)
    const [oldicon,setOldicon]=useState('')
    
 


/*    category interface ke functions */
const handleerror=(input,value)=>{
  setError(prev=>({...prev,[input]:value}))
  console.log(error)
 }
 const validation=()=>{
     var isValid=true;
     console.log("category value before validation",categoryName)
     if(!categoryName){                     //its not category name from error its category name from itput itself
          handleerror('categoryName',"pls input category name")
          isValid=false
     }
     if(!status){
         handleerror('status',"pls input status")
         isValid=false
     }
/*      if(!icon.bytes){
         handleerror('icon',"pls select icon for category")
         isValid=false
     } */
 
      return isValid
 }
 const handlepicture=(event)=>{
  setIcon({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
  handleerror('icon',null)
  setbuttonVisible(true)
}
const handleremove=()=>{
setIcon({file:`${serverURL}/images/${oldicon}`, bytes:''})
setbuttonVisible(false)
}
const handledelete=async()=>{
  setOpen(false)
  setbuttonVisible(false)
  var body ={categoryid}
  var result = await postData('category/category_delete',body)
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
  
  fetchCateogryList()

}

const handeiconEdit=async()=>{
  setOpen(false)
  setbuttonVisible(false)
  var formData = new FormData()
  formData.append('categoryid',categoryid)
  formData.append('icon',icon.bytes)             
  
  var result = await postData('category/category_editicon',formData)
  setIcon({file:`${serverURL}/images/${icon}`, bytes:''})
  setbuttonVisible(false)
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
  
  fetchCateogryList()


}
 const handleEdit=async()=>{
  console.log("value of isvalid ",validation())
   if(validation()){
    setOpen(false)
     var body= {
      categoryid:categoryid,
      categoryname:categoryName,
      status:status
     }
     var result = await postData('category/categoryedit',body)
     console.log(categoryName,status,icon.file.originalName)
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
  fetchCateogryList()

 }
 const showCategoryForm=()=>{
  return(
    <div className={{ width:'30vw',
    height:'auto',
    padding:15,
    background:'#fff',
    borderRadius:10}}>
          
           <Grid container spacing={3}>

                   <Grid item xs={12}>
                    <div className={classes.headingstyles}>
                       Add New Category
                    </div>
                   
                   </Grid>
                 

                <Grid item xs={12}>
                    <TextField value={categoryName} label="Category Name" error={error.categoryName?true:false } helperText={error.categoryName} onFocus={()=>handleerror("categoryName",null)} onChange={(event)=>{setcategoryName(event.target.value)}} variant="outlined" fullWidth/>
                </Grid>
                
              
               <Grid item xs={12}>
               <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
                    <Select
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    error={error.status?true:false } helperText={error.status} 
                    onFocus={()=>handleerror("status",null)}
                    onChange={(event)=>{setStatus(event.target.value)}}
                    >
                        <MenuItem value='Select-state'>Select-state</MenuItem>
                        <MenuItem value='Discontinue'>Discontinue</MenuItem>
                        <MenuItem value='Continue'>Continue</MenuItem>
                    </Select>

        
                </FormControl>
                <div className={classes.errorTxt}>{error.status}</div>
               </Grid>
                    


              <Grid item xs={4}>
                 <IconButton  color="primary" aria-label="upload picture" component="label">
                 <input onChange={handlepicture}  hidden accept="image/*" type="file" />
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
                <Button onClick={handeiconEdit}>save</Button>
                <Button onClick={handleremove}>remove</Button></>:<></>}
              </Grid>

               
              <Grid item xs={6}> 
              <Button variant="contained" onClick={handleEdit}   fullWidth>Edit</Button>
              </Grid> 
              <Grid item xs={6}>
              <Button variant="contained" onClick={handledelete} fullWidth>Delete</Button> 
              </Grid> 
     

            </Grid>
           </div>
            
  )
 }





    const fetchCateogryList=async()=>{
        var result = await getData('category/category_list')
        setCategoryList(result.data)
    }
    function showCategory() {
        return (
        <div style={{width:'auto',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#F1F6F9'}}>
         <div style={{backgroundColor:'#fff',padding:'3.9px',borderRadius:'10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
         <MaterialTable
            title="Category data"
            columns={[
              { title: 'Category id', field: 'categoryid' },
              { title: 'category Name', field: 'categoryname' },
              { title: 'Status', field: 'status' },
              { title: 'Icon', field: 'icon',render:rowData=> <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded' />}
              
            ]}
            data={CategoryList}        
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
          onClick: (event) => navigate('/dashboard/categoryinterface')
            }
            ]}

                   
             
                        


          
          />
         </div>
        </div>
        )
      }


      const handleClose=()=>{
        
        setOpen(false)
      }
      const handleOpen=(rowData)=>{
       setStatus(rowData.status)
       setcategoryName(rowData.categoryname)
       setcategoryid(rowData.categoryid)
       setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setOpen(true)
        setOldicon(rowData.icon)
        console.log(rowData.icon)
        console.log("handle open worked")
      }
    useEffect(function(){
      fetchCateogryList()
    },[])
    const DisplayallcategoryDialog=()=>{
      return(
        <Dialog
        open={open}
        onClose={handleClose}>
    
          
          <DialogContent>
            {showCategoryForm()}

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
           {showCategory()}
           
           {DisplayallcategoryDialog()}
   
    </div>
  
</div>
 )



}

export default Displayallcategory;