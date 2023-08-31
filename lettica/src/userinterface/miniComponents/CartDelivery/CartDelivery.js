import React from "react";
import './CartDelivery.css'
export default function CartDelivery(){
   
   
    return(
          <div>
              <div className="cart__left_delivery">
                                  <div className="cart__left__delivery_content">
                                  <p className="heading3">Delivery partner tip</p>
                                    <p className="subheading1">The entire amount will be sent to your delivery partner</p>
                                  </div>
                                  <div className="cart__left__delivery_button">
                                  <button className="regularbutton1">₹ 10</button>
                                  <button className="regularbutton1">₹ 20</button>
                                  <button className="regularbutton1">₹ 30</button>
                                  <button className="regularbutton1">₹ 50</button>
                                  <button className="regularbutton1">₹ 100</button>

                                  </div>
                 </div>
          </div>
    )
}