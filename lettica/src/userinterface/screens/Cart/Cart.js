import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './Cart.css'
import { useTheme } from "@mui/material/styles";
import { List, useMediaQuery,ListItem,ListItemButton,ListItemText } from "@mui/material";
import { Grid} from "@mui/material"
import Card from "../../miniComponents/Card/Card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIosOutlined,ArrowForwardIosOutlined,LocalOfferOutlined,ArrowRightOutlined } from "@mui/icons-material";
import { createRef } from "react";
import CartDelivery from "../../miniComponents/CartDelivery/CartDelivery";
import CartProduct from '../../miniComponents/CartProduct/CartProduct'
import CartOffers from "../../miniComponents/CartOffers/CartOffers";
import CartBill from "../../miniComponents/CartBill/CartBill";
import CartLocation from "../../miniComponents/CartLocation/CartLocation";

export default function Cart(){

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('md'));

   



    return(
        <div className="cart__container">
            <div className="cart__top">
                <div>
                <p className="heading1">Cart(3 Items)</p>
                </div>
                <div>
               <button className="regularbutton1">Empty</button>
                </div>
            </div>
         <Grid container spacing={3}>
            <Grid item xs={sm?12:6}>
                <div className="cart__left">
                <CartProduct/>
                <CartDelivery/>
                </div>
            </Grid>
            <Grid item xs={sm?12:6}>
                <div className="cart__right">
                     
                     
                      <CartOffers/>

                      <CartBill/>

                      <CartLocation/>


                 
                

                </div>
            </Grid>


         </Grid>
        </div>
    )
}

