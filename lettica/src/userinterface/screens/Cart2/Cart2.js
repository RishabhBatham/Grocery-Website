import React from "react";
import { serverURL } from "../../../administrator/services/FetchNodeServices";
import './Cart2.css'
import { useTheme } from "@mui/material/styles";
import { List, useMediaQuery,ListItem,ListItemButton,ListItemText } from "@mui/material";
import { Grid} from "@mui/material"
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart2Products from "./Cart2Products/Cart2Products";
import Header2 from "../../components/header2/Header2";
import Cart2bill from "./Cart2Bill/cart2bill";
import Cart2Tip from "./Cart2Tip/Cart2Tip";
import Cart2Checkout from "./Cart2Checkout/Cart2Checkout";
import EmptyCartPage from "../../miniComponents/EmptyCartPage/EmptyCartPage";
import Footer from "../../components/Footer/Footer";







export default function Cart2(){
    const [refresh,setRefresh]=useState(false)
    
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('md'));
  const cart=useSelector((state)=>state.products)
  const cartData=Object.values(cart)
  console.log(cartData.length)

  const pageRefresh=()=>{
    setRefresh(!refresh)
  
    }

    var handlingCharge=30
    var deliveryCharge=40


    //tip management
     const [tip,setTip]=useState(0)
    return(
      <>
      <Header2/>
        {
          cartData.length==0?<>
          
          <EmptyCartPage/>

          
          </>:<>
             <div className="Cart2__container" >
         <div className="cart2__heading" >
             {/*  copied from banner comp */}
             
            <div className="bannercomp2__textcontainer">
                     <p></p> 
                     <div style={{paddingTop:'0px'}} className="bannercomp2__bgicon">
                     <svg width="33" height="45.75" viewBox="0 0 44 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.0614 15.3155C-0.192105 14.2581 -0.370241 11.7238 0.713987 10.373C1.65122 9.20529 8.03746 6.74312 12.8656 5.68799C17.7302 4.62491 25.0754 4.53099 30.0849 5.4678C32.8909 5.99254 33.6043 6.01249 33.8463 5.57305C36.474 0.800133 38.0188 -0.568986 39.9074 0.201055C42.2149 1.14186 42.6505 3.37363 41.0554 6.08332C40.5155 7.00038 40.0738 7.91517 40.0738 8.11617C40.0738 8.31717 40.7913 8.82856 41.6682 9.2526C43.5105 10.1435 44 10.9243 44 12.9721C44 14.0595 43.7304 14.6703 42.9655 15.3155C41.5631 16.4984 40.7731 16.4245 36.8945 14.7473C32.3415 12.7785 28.0389 11.9778 22.0135 11.9778C15.988 11.9778 11.6854 12.7785 7.13245 14.7473C3.25382 16.4245 2.46378 16.4984 1.0614 15.3155Z" fill="#5BAC3E"/>
<path d="M12.1087 59.7319C11.0345 59.2678 10.4144 58.0572 10.4144 56.4243C10.4144 54.2632 12.2255 52.9983 15.3196 52.9983C17.741 52.9983 18.2667 52.277 18.2667 48.9549C18.2667 47.4517 17.9948 45.5367 17.6588 44.6745C17.0273 43.0536 16.8419 42.7183 11.787 34.0518C3.76504 20.2985 4.32048 21.498 5.07608 19.5587C5.5562 18.3265 6.02273 18.0076 9.09651 16.8106C11.1178 16.0236 14.3038 15.1262 16.9907 14.7865C19.9151 14.4168 22.9002 14.4168 25.8246 14.7865C28.5116 15.1262 31.6976 16.0236 33.7188 16.8106C36.7926 18.0076 37.2591 18.3265 37.7392 19.5587C38.038 20.3254 38.1626 21.2949 38.0162 21.7131C37.8698 22.1313 35.8171 25.789 33.4546 29.8415C24.4269 45.3273 24.5486 45.0661 24.5486 48.9549C24.5486 52.277 25.0744 52.9983 27.4957 52.9983C30.5563 52.9983 32.4009 54.2633 32.4009 56.3622C32.4009 59.8685 31.5391 60.1617 21.329 60.1292C16.7296 60.1145 12.5804 59.9357 12.1087 59.7319Z" fill="#EE2D32"/>
<path d="M14.9332 24.7252C14.9332 24.7252 15.4885 19.2572 13.2672 19.7445C11.6558 20.0979 10.9954 22.5596 14.9332 24.7252Z" fill="black" stroke="black" stroke-width="0.174926"/>
<path d="M29.2665 24.5629C29.2665 24.5629 28.3578 19.3114 30.9325 19.5821C32.5694 19.7542 33.2043 22.3973 29.2665 24.5629Z" fill="black" stroke="black" stroke-width="0.174926"/>
<path d="M21.9057 23.1376C21.9057 23.1376 24.5462 18.4222 22.3389 17.8666C20.7376 17.4636 19.1762 19.4021 21.9057 23.1376Z" fill="black" stroke="black" stroke-width="0.174926"/>
</svg>


                      </div>  
                                   
                    <div style={{display:'flex',flexDirection:'column',paddingLeft:'10px',paddingBottom:'5px'}}>
                    <p className="subheading3" style={{color:'#989898'}}>My cart</p>
                       <p className="heading3"style={{color:'rgb(25 25 25)'}} >{cartData.length} ITEMS</p>
                    </div>  
                    </div>
         </div>
         <div className="cart2__cart2products"> 
           <Cart2Products cartData={cartData } pageRefresh={pageRefresh}/>
         </div>
         <div className="cart2__cart2bill">
           <Cart2bill cartData={cartData} tip={tip} handlingCharge={handlingCharge} deliveryCharge={deliveryCharge}/>
         </div>
         <div className="cart2__cart2tip"> 
          <Cart2Tip tip={tip} setTip={setTip} pageRefresh={pageRefresh}/>
         </div>
         <div className="cart2__cart2checkout">
          <Cart2Checkout  handlingCharge={handlingCharge} deliveryCharge={deliveryCharge} />
         </div>
         

        </div>
       
          
          
          
          
          
          
          
          </>
        }
         <Footer/>
        </>
    )
}