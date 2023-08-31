import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { createRef } from "react";









export default function Bannercomp(){

   var sliderRef = createRef()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000
      };
      var images = [
        {id:1,image:'banner1.jpg'},
        {id:2,image:'banner2.jpg'},
        {id:3,image:'banner3.jpg'},
        {id:4,image:'banner4.jpg'},
        {id:4,image:'banner6.jpg'},
      

      ]
       const showImages=()=>{
              return(
                  images.map((item)=>{
                      console.log("image fetched")
                      return(
                          <div>
                              <img src={`${serverURL}/images/${item.image}`} width='100%'/>
                          </div>
                      )
                   })
              )
       }

 const handleback=()=>{
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
        <div style={{position:'relative'}}>
          
       <div  style={{ display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',zIndex:'2',left:'.7%',opacity:'.7',top:'46%',borderRadius:'80%',padding:'7px',backgroundColor:'white',backgroundBlendMode:'color-dodge'}}>
       <ArrowBackIosOutlined onClick={handleback}/>
       </div>
        <Slider {...settings} ref={sliderRef}>
            {showImages()}
        </Slider>
        
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center',opacity:'.7',position:'absolute',zIndex:'2',left:'97%',top:'46%',borderRadius:'80%',padding:'7px',backgroundColor:'white',backgroundBlendMode:'color-dodge'}}>
        <ArrowForwardIosOutlined  onClick={handlenext}/>
        </div>
      </div>
      
    )
}