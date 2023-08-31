import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './ProductDisplay.css'
import { useTheme } from "@mui/material/styles";
import { List, useMediaQuery,ListItem,ListItemButton,ListItemText } from "@mui/material";
import { Grid} from "@mui/material"
import Card from "../../miniComponents/Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { createRef } from "react";
import WhyShop from "../../miniComponents/WhyShop/WhyShop";
import ProductImages from "../../miniComponents/ProductImages/ProductImages";
import ProductDetails from "../../miniComponents/ProductDetails/ProductDetails";
import Card2 from "../../miniComponents/Card2/Card2";
import SelectProductUnit from "../../miniComponents/SelectProductUnit/SelectProductUnit";
import PlusMinusComponent from "../PlusMinusComponent/PlusMinusComponent";
import { useState } from "react";






export default function ProductDisplay(props){

    const [refresh,setRefresh ]=useState(false)
    const [selectedProduct,setSelectedProduct]=useState(props.product)
    
    const refreshPage=()=>{
        setRefresh(!refresh)
        props.refreshMainPage()
    
    }
   

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
  

   

    var colors = [
        '#7C96AB',
        "#EDC6B1",
        "#B7B7B7",
        "#C0DBEA",
        "#E8A0BF",
        "#FFF2CC",
        "#FFDEB4"
 
 
       ]
     





    return(
        <div className="product__maincontainer">
            <Grid container spacing={3}>
             <Grid item xs={md?12:6}>
              <ProductDetails  product={selectedProduct}/>

             </Grid>
             <Grid item xs={md?12:6}>
             <div className="product__gridright_container">
             <div className="product__gridright_top">
            <div className="product__gridright_box">
            <p className="product__gridright_subheading">
             Home / / {selectedProduct.productlistname}
             </p>
             <p className="product__gridright_heading heading1">
             {selectedProduct.productlistname}
            </p>   
            </div>
            <div>
                <p className="product__gridright_link subheading2" style={{color:'#78a65e'}}> 
                View all by {props.product.productlistname}
                </p>
                <div>
                   <SelectProductUnit  product={props.product} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} refreshPage={refreshPage} />
                 
                </div>

            </div>
            <div className="product__gridright_line">

            </div>
            </div>
            <div className="product__gridright_bot">
            
             <WhyShop/>
           
            </div>
             </div>


             </Grid>

            </Grid>
           
        </div>
    )
}