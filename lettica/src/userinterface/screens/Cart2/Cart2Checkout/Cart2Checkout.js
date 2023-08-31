import React from "react";
import { useMediaQuery } from "@mui/material";
import './Cart2Checkout.css'
import DialogueBox from "../../../components/DialogueBox/DialogueBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart2Checkout(props){
    const [status,setStatus]=useState(false)
    const [btnTitle,setBtnTitle]=useState('CHECKOUT')
    const [userAddress,setUserAddress]=useState({})

    const navigate = useNavigate();
    const handleCheckout=()=>{
        if(btnTitle=="CHECKOUT"){
          setStatus(true)
        }
        else{
              navigate('/payment',props.handlingCharge,props.deliveryCharge)
        }
        
      }
      
    return(
        <div className="cart2__checkout_container">

          {userAddress.username?<>
          <div className="cart2__userdetails">
            <div className="car2__userdetails_data">
            <p>Reciver's name</p><p>{userAddress.username}</p>
            </div>
            <div className="car2__userdetails_data">
            <p>Mobile no</p><p>{userAddress.mobileno}</p>
            </div>
            <div className="car2__userdetails_data">
            <p>Address</p><p>{userAddress.addressone} / {userAddress.city} / {userAddress.state}</p>
            </div>

          </div>
          
          
          </>:<></>}









          <button onClick={handleCheckout} className="cart2__checkout_button">
            <p className="heading3w">{btnTitle}</p>
          </button>
          <div>
          <DialogueBox status={status} setUserAddress={setUserAddress} set setBtnTitle={setBtnTitle} setStatus={setStatus}/>
         </div>
        </div>
    )
}