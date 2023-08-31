import React from "react";
import './ProductDetails.css'
import ProductImages from "../ProductImages/ProductImages";

export default function ProductDetails(props){
    {console.log(props.product)}
    return(
        <>
          <div className='product__container' >
                   <ProductImages product={props.product}/>
                    <div className="product__topgrid__content">
                        <p className=" heading2"> Product Details</p>
                        <div>
                            <p className="subheading2w" style={{fontWeight:'600',color:'#444444'}}>Description</p>
                            <p className="subheading1" style={{color:'gray'}}>{props.product.description} </p>
                        </div>
                

                    </div>
          </div>
        </>
    )
}