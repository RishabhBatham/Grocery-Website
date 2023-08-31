import { useState,useEffect } from "react"
import {makeStyles} from "@mui/styles"
import { IconButton ,Grid,TextField,Button, FormControl, InputLabel, Select, MenuItem, Avatar} from "@mui/material"
import { height, width } from "@mui/system"
import { PhotoCamera,FormatListBulletedOutlined, Send, ResetTv,InsertPhotoOutlined } from "@mui/icons-material"
import { postData,getData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
const useStyles = makeStyles({
               container:{
                 display:'flex',
                 alignItems:'center',
                 justifyContent:'center',
                 background:"#F1F6F9",
                 width:"auto",
                 height:'76vh'
             },
             box:{
                 width:'50vh',
                 height:'auto',
                 padding:10,
                 background:"#fff",
                 boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                 
             },
             headingstyles:{
                 fontFamily:'Libre Caslon Text,serif',
                 fontWeight:600,
                 letterSpacing:1.1,
                 fontSize:17.7,
             },
             errorTxt:{
               fontSize:'.76rem',
               padding:"2px",
               color:"#d32f2f",
               fontFamily:'"Roboto","Helvetica","Arial"',
               paddingLeft:'13px',
               paddingTop:'5px'
             }
});
export default function SubcategoryInterfce(){
  const navigate =  useNavigate()
    const classes = useStyles();
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''})
    const [subcategoryName,setsubcategoryName]=useState('')
    const [categoryName,setcategoryName]=useState('')
    const [categoryid,setcategoryid]=useState('');
    const [error,setError]=useState({})
    const [categoryList,setcategoryList]=useState([])

  useEffect(
  function(){fetchallCategory( )},[]
  )

    const fetchallCategory=async()=>{
      var result = await getData('category/category_list')
      setcategoryList(result.data)
      
      
    }
    const fillallCategory=()=>{
      return(
         categoryList.map((item)=>{
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
         })
      )

    }

    const handleError=(input,value)=>{
        setError(prev=>({...prev,[input]:value}))
     
    }
    const validation=()=>{
        var isValid=true;
        if(!categoryid){                     //its not category name from error its category name from itput itself
            handleError('categoryName',"pls input category name")
            isValid=false
       }
       if(!status){
        handleError('status',"pls input status")
           isValid=false
       }
       if(!icon.bytes){
        handleError('icon',"pls select icon for subcategory")
           isValid=false
       } 
       if(!subcategoryName){
        handleError('subcategoryName',"pls input subcategory name")
       }
        console.log(categoryName,status,subcategoryName,categoryid,icon)
        return isValid
    }
    const handleClick=async()=>{
        if(validation()){
          var formData = new FormData()
          formData.append("categoryName",categoryName )
          formData.append("status",status )
          formData.append("icon",icon.bytes )
          formData.append("subcategoryName",subcategoryName)
          formData.append('categoryid',categoryid)
          console.log(categoryid)
          var result = await postData('subcategory/subcategorysubmit',formData)
         
          if(result.status){
            Swal.fire({
              
                icon: 'success',
                title: 'Your work has been saved',
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
                       Add New Subcategory
                    </div>
                    <div onClick={()=>{
                    navigate('/dashboard/display_all_subcategory')
                   }} >
                         <FormatListBulletedOutlined/>
                    </div>
                  </div>
                   
                   </Grid>
           <Grid item xs={12}>
            <TextField label="Subcategory Name" error={error.subcategoryName?true:false } helperText={error.subcategoryName} onFocus={()=>handleError("subcategoryName",null)} onChange={(event)=>{setsubcategoryName(event.target.value)}} variant="outlined" fullWidth/>
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
      <Button variant="contained" onClick={handleClick} startIcon={<Send/>}  fullWidth>Submit</Button>
      </Grid> 
      <Grid item xs={6}>
      <Button variant="contained" fullWidth color='warning' startIcon={<ResetTv/>}>Reset</Button> 
      </Grid> 





            </Grid>
        </div>
    </div>
)



}