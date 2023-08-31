import { useState } from "react";
import { useStyles } from "./BannerCss";
import { Grid,Button } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Send,ResetTv } from "@mui/icons-material";


function BannerInterface(){
/* ////////////////banner ke consts ////////////////////////////*/
const classes = useStyles()
const [banners, setBanners]=useState('')
const [status, setStatus]=useState('')
const [error,setError]=useState({})

/* ////////////////////////////////banner ke functions /////////////////////////////*/
const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))
}

const validation=()=>{
    console.log("validation is running")
    var isValid = true
    if(!banners){
        console.log("entered in first loop")
        handleError('banners',"please add atleast 1 image")
        isValid = false
    }
    if(!status){
        console.log("went inside second loop")
       handleError('status','pls select status of banner')
       isValid = false
    }
    console.log(isValid)
}



const handleClick=async()=>{
    
 
   if(validation()){
    var formData = new FormData()
    formData.append('status',status)

    banners.map((item,index)=>{
        formData.append('picture'+index,item)
    })
    var result = await postData('banners/banners_image_submit',formData)
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
      
   console.log(JSON.stringify(error))
   

}


return(
         <div className={classes.container}>
            <div className={classes.box}>
                  <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <div className={classes.headingStyle}>
                            Banner Images 
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => setBanners(files)}
                        filesLimit={6}
                         
                       />
                       
                    </Grid>
                  
                    <Grid item xs={12}>
                    <FormControl>

                          <FormLabel id="demo-row-radio-buttons-group-label">Banner Status</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel value="show"  onClick={()=>handleError("status",null)} control={<Radio onChange={(event)=>{setStatus(event.target.value)}}/>} label="Show Banner" />
                            <FormControlLabel value="hide" onClick={()=>handleError("status",null)} control={<Radio onChange={(event)=>{setStatus(event.target.value)}}/>} label="hide Banner" />
                          </RadioGroup>
                        </FormControl>
                        <div className={classes.errorText}>{error.status}</div>
                    </Grid>
               
                      
                    <Grid item xs={6}>
                            <Button onClick={handleClick} startIcon={<Send/>} variant='contained' fullWidth>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='contained' startIcon={<ResetTv/>} color='warning'  fullWidth>Reset</Button>
                        </Grid>




                  </Grid>



            </div>
         </div>
)




}




export default BannerInterface;