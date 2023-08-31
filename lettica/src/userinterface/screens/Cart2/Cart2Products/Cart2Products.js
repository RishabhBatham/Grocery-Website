import React from "react";
import { serverURL } from "../../../../administrator/services/FetchNodeServices";
import './Cart2Products.css'
import { useDispatch } from "react-redux";
import PlusMinusComponent from "../../../components/PlusMinusComponent/PlusMinusComponent";


export default function Cart2Products({cartData,pageRefresh}){
   var dispatch = useDispatch()


       const handleQtyChange=(item,value)=>{
         
         var product = item
         if(value>=1){
            product['qty']=value
            dispatch({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
            
         }
         else
         {
            product['qty']=0
            dispatch({type:'DELETE_PRODUCT',payload:[product.productlistid,product]})
         }
         pageRefresh()
       }


    return(
        <div className="cart2__products__container">
           {
            cartData.map((item)=>{

                var title = item.productlistname
                if(title.length>24){
                   title = title.substring(0,20)+"..."
                }

                return(
                    <div className="cart2__product__container">
                    <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                    <div className="cart2__product_image">
                    <img src={`${serverURL}/images/${item.picture}`} />
                    <p>{title}</p>
                    </div>
                    <div className="cart2__product__divider">
                    </div>
                    <div className="cart2__product__content">
                       {
                        item.offer>0?<>
                         <div className="cart2__product__price">
                            <s>{item.rate}</s><p>{item.offer} </p><p>x {item.qty}  </p><h6>&#8377;</h6>
                         </div>
                         </>:<>  <div className="cart2__product__price">
                            <p>{item.rate}</p><p>x {item.qty}  </p>
                         </div></>
                       }
                       <p className="cart2__product__save">saved {(item.rate-item.offer)*(item.qty)}</p>
                       <p className="cart2__product__quantity">{item.weight} </p>
                       

                    </div>
                    </div>

                       <div>
                       <PlusMinusComponent qty={item?.qty} 
                                onChange={(value)=>handleQtyChange(item,value)}
                                
                                />
                       </div>

                    
                    </div>
                )
            })
           }
        </div>
    )
}