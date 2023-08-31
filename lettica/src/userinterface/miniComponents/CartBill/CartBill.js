import React from "react";
import './CartBill.css'


export default function CartBill(){


    var cartitems = [
        {id:1,image:'Dairy.png',name:'Amul Milk',quantity:'100 ml',price:'100',dprice:'90'},
        {id:2,image:'Rice.png',name:'New Basmati rice',quantity:'10kg',price:'900',dprice:'870'},
        {id:3,image:'Edible oil.png',name:"Fresh coconut oil",quantity:'100 ml',price:'100',dprice:'88'},

      ]



    return(
        <div className="cart__right_bill">
                         <div className="cart__right_billtext">
                           <p className="heading3"> item total</p>
                           <div style={{display:'flex'}}> <p className="subheading1"> Handling Charge</p> <p style={{color:'var(--lgreen)'}}>(₹ 10 saved)</p></div>
                           <div style={{display:'flex'}}> <p className="subheading1"> Delivery Charge</p> <p style={{color:'var(--lgreen)'}}>(₹ 20 saved)</p></div>
                         </div>
                         <div className="cart__right_billmoney">
                         <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5px',paddingBottom:'2px'}}><s style={{paddingLeft:'4px',color:'var(--gray)'}}>1200</s><p  style={{paddingLeft:'4px' ,color:'var(--lgreen)',fontWeight:'500'}}>1052</p></div>
                         <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5px',paddingBottom:'2px'}}><s style={{paddingLeft:'4px',color:'var(--gray)'}}>30</s><p  style={{paddingLeft:'4px' ,color:'var(--lgreen)'}}>20</p></div>
                         <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5px',paddingBottom:'2px'}}><s style={{paddingLeft:'4px',color:'var(--gray)'}}>40</s><p  style={{paddingLeft:'4px' ,color:'var(--lgreen)'}}>20</p></div>
                         </div>
                     </div>
    )
}