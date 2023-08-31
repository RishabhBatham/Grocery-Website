import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
   container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    background:'#dfe6e9',
    width:'100vw',
    height:'100vh'
   },
   box:{
    width:'50vw',
        height:'auto',
        padding:15,
        background:'#fff',
        borderRadius:10,
        boxShadow:'1px 2px 9px grey'
   },
   headingStyle:{
    fontFamily:'Poppins',
    fontWeight:600,
    letterSpacing:1,
    fontSize:18
   },
   errorText:{
    fontSize:12,
    color:'red',
    letterSpacing:1,
    paddingTop:5,
    paddingLeft:12
  }
})