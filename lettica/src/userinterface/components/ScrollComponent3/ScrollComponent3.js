import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {postData, serverURL} from '../../../administrator/services/FetchNodeServices'
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { createRef } from "react";
import './ScrollComponent3.css'
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Card5 from "../../miniComponents/Card5/Card5";

export default function ScrollComponent3(props){


    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
     var navigate = useNavigate()
     const [products,setProducts]=useState([])

   
   
    
  
     var sliderRef = createRef()
      var settings = {
          dots: false,
          infinite: false,
          arrows:false,
          speed: 500,
          slidesToShow: sm?2:md?3:lg?6:7,
          slidesToScroll: 1,
          autoplay:false,
          autoplaySpeed:3000
        };




        const fetchallproductbyscid=async(status)=>{
            var result = await postData('userinterface/fetch_all_products_by_subcategory',{subcategoryid:props.subcategoryid})
            setProducts(result.data)
            console.log(result.data)
           }
          useEffect(function(){
            fetchallproductbyscid()
          },[] )
        




      

        const handleClick=(item)=>
{
   navigate("/selectproduct",{state:{product:item}}) 
}



    
         const showImages=()=>{
                return(
                    products.map((item)=>{
                        console.log("image fetched")
                        return(
                           <div className="scroll3__padding" style={{marginLeft:'-19px'}}  onClick={()=>handleClick(item)} >
                          <Card5  item={item} url={"/selectproduct"} image={item.picture} title={item.productlistname} price={item.rate} scale={.6} />
                           </div>
                        )
                     })
                )
         }
  
   const handleback=()=>{
    console.log(props.category)
      return(
          sliderRef.current.slickPrev()

      )
   }
  const handlenext=()=>{
    return(
      sliderRef.current.slickNext()
    )
  }
  
   
  
  
  
      return(
          <div className="scrollcomp3__container" >
            
         <div  style={{ display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',position:'relative'}}>
         
         <div className="scrollcomp3__keys" style={{display:'flex',justifyContent:'center',alignItems:'center',color:'var(--lwhite)',paddingRight:'10px'}}>
         {!md?<><ArrowBackIosOutlined onClick={handleback}/>
         <ArrowForwardIosOutlined  onClick={handlenext}/></>:<></>}
         </div>
         </div>
  
  
         <div style={{width:'100%'}}>
         <Slider {...settings} ref={sliderRef}>
              {showImages()}
          </Slider>
         </div>
          
       
        </div>
        
      )
  }