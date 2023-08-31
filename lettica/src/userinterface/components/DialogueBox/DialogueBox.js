import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid,FormControl,Select,TextField,InputLabel,MenuItem } from '@mui/material';
import './DialogueBox.css'
import Typography from '@mui/material/Typography';
import {postData, serverURL} from '../../../administrator/services/FetchNodeServices'
import { useDispatch } from "react-redux";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogueBox(props) {
  const [open, setOpen] = React.useState(props.status);
  const [addopen, setAddOpen] = React.useState(false)
  const [Number,setNumber]=React.useState('');
  const [Otp,setOtp]=React.useState('');
  const [time ,setTime]=React.useState(0)
  const [title,setTitle]=React.useState('');
  const [name,setName]=React.useState('');
  const [address,setAddress]=React.useState('');
  const [addressline2,setAddressLine2]=React.useState('');
  const [postalCode,setPostalCode]=React.useState('');
  const [addressType,setAddressType]=React.useState('');
  const [city,setCity]=React.useState('');
  const [state,setState]=React.useState('');
  const [userid,setUserId]=React.useState('');
  const [emailid,setEmailId]=React.useState('');

  const dispatch =useDispatch();


  const [error,setError]= React.useState({});
  
  const handleerror=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))
    console.log(error)
   }


   const handleInputChange=(inputval)=>{
    handleFilter(inputval)
   }

   const handleFilter=(inputval)=>{
    
    console.log('handle filter working')
    var splitvalues = inputval.split('');
    console.log(splitvalues)
    splitvalues.map((item,index)=>{
       
      
      if(!((item==1)||(item==2)||(item==3)||(item==4)||(item==5)||(item==6)||(item==7)||(item==8)||(item==9)||(item==0))){
        splitvalues.splice(index,1)
      }

    })
    var filteredsplitval= splitvalues.join('')
    document.getElementById('input').value = filteredsplitval
    setNumber(filteredsplitval)
    console.log(filteredsplitval)
   
   }

/* //////////////////////////////////// verify otp function//////////////////////////////////////////////////// */
const handleVerify=async()=>{
   var userOtp = document.getElementById("dialogbox_input1").value +
                 document.getElementById("dialogbox_input2").value +
                 document.getElementById("dialogbox_input3").value +
                 document.getElementById("dialogbox_input4").value 
   if(userOtp==Otp){
    var mobilenostatus = await postData('userinterface/check_mobile_no',{number:Number})
    if(mobilenostatus.status){
      setUserId(mobilenostatus.userid)
      setEmailId(mobilenostatus.emailid)

       var addressstatus = await postData('userinterface/check_address_by_mobile_no',{number:Number})
    
         if(addressstatus.status){
           props.setUserAddress(addressstatus.data[0])
           dispatch({type:'ADD_USER',payload:[addressstatus.data[0]]})
           console.log(addressstatus.data[0])
           props.setBtnTitle("PROCEED FOR PAYMENT")
           setOpen(false)
           props.setStatus(false)
         }else
         { 
          setOpen(false)
          props.setStatus(false)
          setAddOpen(true)

         }
   

    }
    else{
      setOpen(false)
      props.setStatus(false)
      setAddOpen(true)
    }
 

   }
}


const handleSubmit=async()=>{
 var body={
  /*   userid:userid, */
    emailid:emailid==''?'Not available':emailid,
    mobileno:Number,
    username:title+" "+name,
    addressone:address,
    addresstwo:addressline2,
    state:state,
    city:city,

    pincode:postalCode,
    addressstatus:addressType,

  }
  console.log(body)
  var result = await postData('userinterface/add_address',body)
}









  React.useEffect(function(){
    setOpen(props.status)
  },[props])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    props.setStatus(false);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  
  };


  const validation=()=>{
    var isValid=true;
    if(!Number){                     //its not category name from error its category name from itput itself
         handleerror('Number',"pls input Number")
         isValid=false
    }
    else if(Number.length<10){
      handleerror('Number',"Phone Number cant have less than 10 digit")
      isValid=false
    }
    else if(Number.length<10){
      handleerror('Number',"Phone Number cant have less than 10 digit")
      isValid=false
    }
    else{
      return isValid
    }

  
  }
  const handleOtpInputChange=(inputval,id)=>{
     var str = inputval.charCodeAt(0)+"in"
     console.log(str)
      console.log("hanlde opt input has been called",inputval.charCodeAt(0))
     

     if((inputval.charCodeAt(0)>=48)||(inputval.charCodeAt(0)<=57)){
       if(id+1<=4){
       
        document.getElementById("dialogbox_input"+(id+1)).focus()
       }
     }
     else{
       if(str=="NaNin"){
        if(id-1>=1){
          console.log('focused back')
          document.getElementById("dialogbox_input"+(id-1)).focus()
         }
       }
       else{
        document.getElementById('dialogbox_input'+id).value=null
       }
     }

  }



  const startTimer=(tl)=>{
    var timeLeft = tl;
               
                  
                  var timerId = setInterval(countdown, 1000);
                  
                  function countdown() {
                    if (timeLeft == 0) {
                      clearTimeout(timerId);
                      if( document.getElementById('dialogbox__timertext')){
                        document.getElementById('dialogbox__timertext').style.display='none'
                      }
                       if(document.getElementById('dialogbox__sendagain')){
                      document.getElementById('dialogbox__sendagain').style.display='block'
                       }
                    } else {
                     
                      timeLeft--;
                      setTime(timeLeft)
                    }
                  }
                 
  }


  const handleClick=()=>{
    if(validation()){
      var otpset =Math.floor(Math.random() * 9000 + 1000)
      setOtp(otpset)
      alert(otpset)
      document.getElementById('panel1').style.display ='none'
      document.getElementById('panel2').style.display='block'
      startTimer(30)
    }
  }

  return (
    <div>
     
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
       {/*  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle> */}
        <DialogContent style={{padding:0}} dividers>
          <div className='dialogbox__container'>
          
          <div className='dialogbox__heading'>
          <p>Phone Number Verification </p>
          </div> 

          <div className='dialogbox__content' id='panel1'>
          <p>Enter your Number to Login/Signup</p>

           <div className='dialogbox__phoneno'>
           <svg width="15" height="25" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.47729 24.9308C0.744811 24.7594 0.21933 24.2447 0.0620573 23.5447C-0.0206477 23.1766 -0.0207065 1.82649 0.0620051 1.45801C0.142838 1.09787 0.284823 0.848005 0.565026 0.572809C0.842242 0.300545 1.15519 0.136081 1.54447 0.0580792C1.93094 -0.0193598 13.0691 -0.0193598 13.4555 0.0580792C13.8448 0.136081 14.1578 0.300545 14.435 0.572809C14.7152 0.848005 14.8572 1.09787 14.938 1.45801C15.0207 1.82649 15.0206 23.1766 14.9379 23.5447C14.7762 24.2645 14.2177 24.792 13.4555 24.9447C13.046 25.0267 1.83175 25.0137 1.47729 24.9308ZM7.99112 23.1015C8.92772 22.6957 8.96704 21.4526 8.05682 21.0242C6.99797 20.5259 5.87657 21.5718 6.41414 22.5562C6.53587 22.7791 6.80493 23.0216 7.03472 23.1155C7.28453 23.2175 7.73863 23.2108 7.99112 23.1015ZM13.5485 11.1588V3.07891H7.49999H1.45145V11.1588V19.2387H7.49999H13.5485V11.1588ZM10.3913 1.87621C10.5209 1.72056 10.5346 1.39184 10.4179 1.23457L10.3375 1.12607H7.50339C4.32013 1.12607 4.55584 1.0961 4.51458 1.50605C4.49605 1.69013 4.51391 1.76327 4.60363 1.87059L4.71586 2.00485H7.49999H10.2841L10.3913 1.87621Z" fill="#5E5E5E"/>
           </svg>
           <p>+91</p>
          <input error={error.Number?true:false } 
          
          id='input'
          helperText={error.Number}
          onFocus={()=>handleerror("Number",null)} 
          onChange={(event)=>{handleInputChange(event.target.value)}} maxLength={10} inputMode='numeric' type='text'/>
           </div>
           <div className='dialogbox__numerror'>
           <p>{error.Number}</p>
           </div>
             
           <div className='dialogbox__content_btn'>
              <button id='dialoguebutton' onClick={handleClick} >next</button>
           </div>

          </div>   






           <div  id='panel2'>
            <div className='dialogbox__conainer2'>
            <p className=''> Enter opt sent to +91XXXXXXX{Number.substring(8,10)}</p>
            </div>
            <div className='dialogbox__inputcontainer'>
              <input type='text' id='dialogbox_input1' onChange={(event)=>{handleOtpInputChange(event.target.value,1)}} maxLength={1}/>
              <input type='text' id='dialogbox_input2' onChange={(event)=>{handleOtpInputChange(event.target.value,2)}} maxLength={1}/>
              <input type='text' id='dialogbox_input3' onChange={(event)=>{handleOtpInputChange(event.target.value,3)}} maxLength={1}/>
              <input type='text' id='dialogbox_input4' onChange={(event)=>{handleOtpInputChange(event.target.value,4)}} maxLength={1}/>
            </div>

            <div className='dialogbox__content_btn'>
              <button id='otpverifybutton'  onClick={handleVerify}  >Verify</button>
           </div>



              <div className='dialogbox__timer' style={{display:'flex',justifyContent:'center'}}>
                <p id='dialogbox__timertext'>Send otp again in {time} seconds</p>
                <p id='dialogbox__sendagain'>Click here to send otp again</p>

              </div>
           </div>




















          
          <div className='dialogbox__content_tnc'>
            <p>by continuing you agree to our</p>
             <div className='dialogbox__content_links'>
              <a href='#'>Termps of service</a>
              <a href='#'>Privacy Policy</a>
             </div>
           </div>        



          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>


      <BootstrapDialog
      onClose={handleAddClose}
      aria-labelledby="customized-dialog-title"
      open={addopen}
      style={{padding:0/* ,maxWidth:'873px' */}}
      
      >
        
        <DialogContent style={{padding:'0px'}}>
        
         <div className='addressdialog__container'>
        
          <div className='addressdialog__map'>
           <img src={`${serverURL}/images/staticasset/mumbai.jpg`}/>
          </div>
          <div className='addressdialog__form'>
           
            <div className='dialogbox__addresscontent'>
            <Grid container spacing={3}>
            <Grid item xs={12}>
              <p className='dialogbox__addressheading'>Enter Complete Address</p>
              <p className='dialogbox__addresssubheading'>This Allow us to find you easily and give you timely delivery experience</p>
            </Grid>


       
       <Grid item xs={5}>
       <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">select title</InputLabel>
                <Select
                id="demo-simple-select"
                value={title}
                label="Status"
                error={error.title?true:false } helperText={error.title} 
                onFocus={()=>handleerror("title",null)}
                onChange={(event)=>{setTitle(event.target.value)}}
                >
                    <MenuItem value='Select-state'>title</MenuItem>
                    <MenuItem value='Mr'>Mr</MenuItem>
                    <MenuItem value='Mrs'>Mrs</MenuItem>
                    <MenuItem value='ms'>Ms</MenuItem>
                </Select>

    
            </FormControl>
            <div >{error.title}</div>
          </Grid>
           <Grid item xs={7}>
                <TextField label="Your Name" error={error.name?true:false } helperText={error.name} onFocus={()=>handleerror("name",null)} onChange={(event)=>{setName(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Address line 1" error={error.address?true:false } helperText={error.address} onFocus={()=>handleerror("address",null)} onChange={(event)=>{setAddress(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Address line 2" error={error.addressline2?true:false } helperText={error.addressline2} onFocus={()=>handleerror("addressline2",null)} onChange={(event)=>{setAddressLine2(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField label="City" error={error.city?true:false } helperText={error.city} onFocus={()=>handleerror("city",null)} onChange={(event)=>{setCity(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField label="State" error={error.state?true:false } helperText={error.state} onFocus={()=>handleerror("state",null)} onChange={(event)=>{setState(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField label="Postal Code" error={error.postalcode?true:false } helperText={error.postalcode} onFocus={()=>handleerror("postalcode",null)} onChange={(event)=>{setPostalCode(event.target.value)}} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={6}>
             <div className='dialogbox__addresstype'>
              <p onClick={()=>{setAddressType('Home')}} style={{border:addressType=='Home'?'1px solid #aaaaaa':'none'}} className='dialogbox__addresstype_text'>Home</p>
              <p onClick={()=>{setAddressType('Office')}} style={{border:addressType=='Office'?'1px solid #aaaaaa':'none'}} className='dialogbox__addresstype_text'>Work</p>
              <p onClick={()=>{setAddressType('Other')}} style={{border:addressType=='Other'?'1px solid #aaaaaa':'none'}} className='dialogbox__addresstype_text'>Other</p>
             </div>
            
            </Grid>

            <Grid item xs={12}> 
              <Button variant="contained"  onClick={handleSubmit}    fullWidth>Save Address</Button>
              </Grid> 
       
       
        </Grid>


            </div>



          </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}