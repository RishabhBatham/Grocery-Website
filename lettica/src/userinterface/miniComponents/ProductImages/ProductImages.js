import React from "react";
import Slider from "react-slick";
import './ProductImages.css'
import { serverURL } from "../../../administrator/services/FetchNodeServices";
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { createRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { postData } from "../../../administrator/services/FetchNodeServices";
import { useEffect } from "react";
export default function ProductImages(props){

  const [getImages,setImages]=useState([])
  const [image,setImage]=useState('')
  
  const fetchAllPictures=async()=>{
    var result=await postData('userinterface/fetch_all_multipleimages_by_productid',{productlistid:props.product.productlistid})
    var pic=result.data[0].pictures.split(",")
    setImages(pic)
    setImage(`${serverURL}/images/${pic[0]}`)


}
  {console.log(getImages)}
useEffect(function(){
  fetchAllPictures()

   },[])



   const handleChangeImage=(item)=>{
    setImage(`${serverURL}/images/${item}`)
   } 
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
  

  
    var sliderRef = createRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sm?3:md?6:lg?6:6,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:3000,
        arrows:false
      };
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

 
       const showImages=()=>{
              return(
                  getImages.map((item)=>{
                      console.log("image fetched")
                      return(
                      <div className="productimages__images" onClick={()=>handleChangeImage(item)}>
                            <div className="productimages__image"> 
                              <img src={`${serverURL}/images/${item}`} width='100%'/>
                          </div>
                          
                      </div>
                      )
                   })
              )
       }







    return(
        <>
            <div className="product__image">
                    <img src={`${image}`} width='100%'/>
                        
                    </div>
                    <div className='product__slickcontainer'>
                    <div style={{position:'relative'}}>
                       <div className="productimages__leftarrow">
                        <ArrowBackIosOutlined style={{color:'#fff'}} onClick={handlenext} />   
                        </div>
                        <div className='productimages__product__slider'>
                        <Slider style={{marginRight:'18px'}} {...settings} ref={sliderRef}>
                           {showImages()}  
                        </Slider>
                        </div>
                       <div className="productimages__rightarrow">
                        <ArrowForwardIosOutlined style={{color:'#fff'}} onClick={handleback} />   
                        </div>   
                        </div>   
                        
             </div>
        </>
    )
}