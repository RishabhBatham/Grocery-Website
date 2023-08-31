import React,{createRef} from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import { useTheme } from "styled-components";
import { useMediaQuery } from "@mui/material";
export default function BannerComponent(props)


{  
    
    const theme = useTheme();
    

    
    
    var sliderRef=createRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,

      };
 var images=[
    {id:1,images:'b1.jpg'},
    {id:2,images:'b2.jpg'},
    {id:3,images:'b3.jpg'},
    {id:4,images:'b4.jpg'},
    {id:5,images:'b5.jpg'},
    {id:6,images:'b6.jpg'},
]
const showImages=()=>{

    return images.map((item)=>{
      return(<div>
         <img src={`${serverURL}/images/${item.images}` } width='100%'/>
      </div>)

    })
}
const handleBackClick=()=>{
  sliderRef.current.slickPrev()
}

const handleForwardClick=()=>{
    sliderRef.current.slickNext()

}

    return(
 <div style={{position:'relative'}}>
<div style={{position:'absolute',top:'45%',left:'1%',zIndex:1,width:40,height:40,borderRadius:20,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center' }}>
 <ArrowBackIosNewIcon style={{color:'#000'}} onClick={handleBackClick} />   
 </div>
<Slider {...settings} ref={sliderRef}>
    {showImages()}  
</Slider>
<div style={{position:'absolute',top:'45%',right:'1%',zIndex:1,width:40,height:40,borderRadius:20,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center' }}>
 <ArrowForwardIos style={{color:'#000'}} onClick={handleForwardClick} />   
 </div>   
 </div>   
    )
}