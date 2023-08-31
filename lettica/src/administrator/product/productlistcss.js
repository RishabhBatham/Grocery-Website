import {makeStyles}  from '@mui/styles'

export const useStyles = makeStyles({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      
        width:"auto",
        height:'76vh'
    
        },
      box:{
        width:'50vw',
        height:'auto',
        padding:15,
        background:'#fff',
        borderRadius:10,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        
      },
      headingstyles:{
        fontFamily:'Poppins',
        fontWeight:600,
        letterSpacing:1,
        fontSize:18
        
      },
      errorTxt:{
        fontSize:12,
        color:'red',
        paddingTop:5,
        paddingLeft:12
      },
    
      displaycontainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#dfe6e9',
        width:'100vw',
        height:'100vh'
    
        },
      displaybox:{
        width:'60vw',
        height:'auto',
        padding:15,
        background:'#fff',
        borderRadius:10
        
      },



    });
    
    