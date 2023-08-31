import React from "react";
import './ShopByBrand.css'
import { useMediaQuery } from "@mui/material";
import {Divider} from "@mui/material";
import { serverURL } from "../../../administrator/services/FetchNodeServices";


export default function ShopByBrand(){

      var brands = [
        {name:'amul', image:'amul.webp' },
        {name:'dettol', image:'dettol.webp' },
        {name:'cocacola', image:'cocacola.webp' },
        {name:'loreal', image:'loreal.webp' },
        {name:'bauli', image:'bauli.webp' },
      ]


    const showimages=()=>{
        return(
            brands.map((item)=>{
                return(
                    <div className="shopbybrand__showimages__img">
                    <img src={`${serverURL}/images/brandimages/${item.image}`} />
            </div>
                )
            })
        )
    }


    return(
        <div className='shopbybrand__container'>
            <div className="shopbybrand__text" > 
            <p className="heading3" style={{color:'white'}}>SHOP FROM YOUR FAVORITE BRAND</p>
         
            </div>   


            <Divider style={{width:'50%'}} sx={{ borderBottomWidth: 2,bgcolor:'#a3a3a3' }} />
            <div className="shopbybrand__imagecontainer" >{showimages()}</div>    
        </div>
    )
}