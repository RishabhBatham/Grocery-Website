import React from "react";
import './CartProduct.css'
import { serverURL } from "../../../administrator/services/FetchNodeServices";

export default function CartProduct(){


    var cartitems = [
        {id:1,image:'Dairy.png',name:'Amul Milk',quantity:'100 ml',price:'100',dprice:'90'},
        {id:2,image:'Rice.png',name:'New Basmati rice',quantity:'10kg',price:'900',dprice:'870'},
        {id:3,image:'Edible oil.png',name:"Fresh coconut oil",quantity:'100 ml',price:'100',dprice:'88'},

      ]



    return(
        <div>
              <div className="cart__left_items" id="cartitems"> 
                   
                   {
                     cartitems.map((item)=>{
                        console.log("image fetched")
                        return(
                            <div className="cart__item">
                                <div className="cart__itemcontent">
                                <div className="cart__itemcontent_img">
                                <img src={`${serverURL}/images/${item.image}`} width='100%'/>
                                </div>
                                <div className="cart__itemcontent_price" >
                                    <p className="heading3">{item.name}</p>
                                    <p className="subheading1">{item.quantity}</p>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5px',paddingBottom:'2px'}}><s style={{paddingLeft:'4px'}}>{item.price}</s><p style={{paddingLeft:'4px'}}>{item.dprice}</p></div>
                                </div>

                                </div>
                                <div className="cart__item_btn">
                                    
                                </div>

                            </div>
                        )
                     })
                   }

                 </div>
        </div>
    )
}