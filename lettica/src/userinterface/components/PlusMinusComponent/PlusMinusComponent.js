import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import './PlusMinusComponent.css'


export default function PlusMinusComponent(props){
    const [value,setValue]=useState('')
    const [refresh,setRefresh]=useState(false)
    useEffect(()=>{
        setValue(props.qty)
    },[props])

    const handlePlusClick=()=>{
        setValue((prev)=>{
            if(prev<5)
            { props.onChange(prev+1)
            return prev+1}
            else 
            { props.onChange(prev)
                return prev}
        })
    }
    const handleMinusClick=()=>{
        setValue((prev)=>{
            if(prev>=1){
                props.onChange(prev-1)
                setRefresh(!refresh)
                
                return prev-1
            }
            else{
                setRefresh(!refresh)
                return prev
            }
        })
    }
    
    
    return(
       <div className="plusminuscomponent__container">
        {value==0?<><button className="regularbutton2" onClick={handlePlusClick} >ADD</button></>:<>
        <div style={{width:70,display:'flex',justifyContent:'space-between',backgroundColor:'#505050'}}>
                <div onClick={handlePlusClick} style={{cursor:'pointer', fontWeight:'800',background: '#D9D9D9',color:'#444444',width:20,display:'flex',alignItems:'center',justifyContent:'center'}} >+</div>
                <div style={{fontWeight:20,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:'Dongle',fontSize:'20px'}}>{value}</div>
                <div onClick={handleMinusClick}style={{cursor:'pointer', fontWeight:'800',background: '#D9D9D9',color:'#444444',width:20,display:'flex',alignItems:'center',justifyContent:'center'}}>-</div>
               </div>
        </>}
             
       </div>
    )
}


{/* <div style={{ paddingRight: 10, marginLeft: '4%', marginTop: '3%' }}>
               {value==0?<Button onClick={handlePlusClick} variant='outlined' color='success' >ADD</Button>:
               <div style={{border:'1px solid #70a1ff',width:125,display:'flex',justifyContent:'space-between',borderRadius:5}}>
                <div onClick={handlePlusClick} style={{cursor:'pointer', fontWeight:20,background: '#70a1ff',color:'#fff',width:25,padding:10,display:'flex',alignItems:'center',justifyContent:'center'}} >+</div>
                <div style={{fontWeight:20,display:'flex',alignItems:'center',justifyContent:'center'}}>{value}</div>
                <div onClick={handleMinusClick} style={{cursor:'pointer', background: '#70a1ff',color:'#fff',fontWeight:20, width:25,padding:10,alignItems:'center',display:'flex',justifyContent:'center'}}>-</div>
               </div>}
            </div> */}