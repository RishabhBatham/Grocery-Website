import './Cart2Tip.css'
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material'




export default function Cart2Tip({tip,setTip,pageRefresh}){
    const handleClick=(tipval)=>{
         
         setTip(tipval)
        console.log(tipval)
        console.log("btnnn clicked")
    }
    return(
        <div className='cart2tip__container'>
            <div className='cart2tip__heading'>       
            
            <div style={{display:'flex',flexDirection:'column',paddingLeft:'30px',paddingTop:'2%',paddingBottom:'5px'}}>
                    <p className="subheading3" style={{color:'#989898'}}>Give a Tip to our Delivery Partner</p>
                    <p className="heading3"style={{color:'rgb(25 25 25)'}} >100% of amount will be given to delivery parter</p>
                    </div>  
            
            
            
            </div>
            <div className='cart2tip__btns'>
                <button className='cart2__button' ><p className='subheading3' onClick={()=>handleClick(20)} >20</p></button>
                <button className='cart2__button' ><p className='subheading3' onClick={()=>handleClick(30)} >30</p></button>
                <button className='cart2__button' ><p className='subheading3' onClick={()=>handleClick(40)} >40</p></button>
                <button className='cart2__button' ><p className='subheading3' onClick={()=>handleClick(50)} >50</p></button>
                <button className='cart2__button' ><p className='subheading3' onClick={()=>handleClick(70)} >70</p></button>
            </div>
            <div className='cart2__removetip'>
                <p className='subheading3' onClick={()=>handleClick(0)} >remove tip</p>
            </div>
        </div>
    )
}