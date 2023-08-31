import { useState } from "react"
import {makeStyles} from "@mui/styles"
import { IconButton ,Grid,TextField,Button, FormControl, InputLabel, Select, MenuItem, Avatar} from "@mui/material"
import { height, width } from "@mui/system"
import { PhotoCamera,FormatListBulletedOutlined, ResetTv, Send } from "@mui/icons-material"
import { postData } from "../services/FetchNodeServices"
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

export default function CategoryInterface(){ 
    const navigate = useNavigate()
    const classes = useStyles()
    const [status,setStatus]=useState('')
    const [icon,setIcon]=useState({file:'/assets/scarticon.png',  bytes:''})
    const [categoryName,setcategoryName]=useState('')
    const [error,setError]=useState({})
    const handleerror=(input,value)=>{
     setError(prev=>({...prev,[input]:value}))
     console.log(error)
    }
    const validation=()=>{
        var isValid=true;
        if(!categoryName){                     //its not category name from error its category name from itput itself
             handleerror('categoryName',"pls input category name")
             isValid=false
        }
        if(!status){
            handleerror('status',"pls input status")
            isValid=false
        }
        if(!icon.bytes){
            handleerror('icon',"pls select icon for category")
            isValid=false
        }
    
         return isValid
    }
    const handleClick=async()=>{
      if(validation()){
        var formData = new FormData()
        formData.append("categoryName",categoryName )
        formData.append("status",status )
        formData.append("icon",icon.bytes )
        var result = await postData('category/categorysubmit',formData)
        console.log(categoryName,status,icon.file.originalName)
        alert(result.message)
      }
     

    }
    const handlepicture=(event)=>{
         setIcon({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
         handleerror('icon',null)
    }

    return(
        <div className={classes.container}>
           <div className={classes.box}>
          
           <Grid container spacing={3}>

                   <Grid item xs={12}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div className={classes.headingstyles}>
                       Add New Category
                    </div>
                    <div onClick={()=>{
                    navigate('/dashboard/display_all_category')
                   }} >
                         <FormatListBulletedOutlined/>
                    </div>
                  </div>
                   
                   </Grid>
                   
                 

                <Grid item xs={12}>
                    <TextField label="Category Name" error={error.categoryName?true:false } helperText={error.categoryName} onFocus={()=>handleerror("categoryName",null)} onChange={(event)=>{setcategoryName(event.target.value)}} variant="outlined" fullWidth/>
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
              <Button variant="contained" onClick={handleClick} startIcon={<Send/>}   fullWidth>Submit</Button>
              </Grid> 
              <Grid item xs={6}>
              <Button variant="contained" color='warning' startIcon={<ResetTv/>} fullWidth>Reset</Button> 
              </Grid> 
     

            </Grid>
           </div>
            
        </div>
    );
}
