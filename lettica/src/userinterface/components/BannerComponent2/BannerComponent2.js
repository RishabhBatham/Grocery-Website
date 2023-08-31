import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { createRef } from "react";
import './BannerComponent2.css'
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function BannerComponent2(){


    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
  
   
    
  
     var sliderRef = createRef()
      var settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: sm?2:md?3:lg?5:6,
          slidesToScroll: 1,
          autoplay:false,
          autoplaySpeed:3000,
          arrows:false
          
        };
        var colors = [
         '#7C96AB',
         "#EDC6B1",
         "#B7B7B7",
         "#C0DBEA",
         "#E8A0BF",
         "#FFF2CC",
         "#FFDEB4"
  
  
        ]
        var images = [
          {id:1,image:'food square banner.jpg',link:"#link"},
          {id:2,image:'food square banner2.jpg',link:"#link"},
          {id:3,image:'food square banner3.jpg',link:"#link"},
          {id:4,image:'food square banner4.jpg',link:"#link"},
          {id:5,image:'food square banner5.jpg',link:"#link"},
          {id:6,image:'food square banner6.jpg',link:"#link"},
          {id:7,image:'food square banner7.jpg',link:"#link"},
     
  
        ]
         const showImages=()=>{
                return(
                    images.map((item)=>{
                      
                        return(
                           <div className="bannercomp2__img">
                            <img src={`${serverURL}/images/staticasset/${item.image}`} width='100%'/>
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
              
         <div className="bannercomp2__container">

                    



            <div style={{marginLeft:'5%'}}>

                   

            <div className="bannercomp4__textcontainer" id="bannertext">
                     <p></p> 
                     <div className="bannercomp4__bgicon">
                       <svg width="28.9" height="35.2" viewBox="0 0 289 352" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M137.514 350.792C116.999 347.372 93.9021 337.405 73.3842 323.117C62.1736 315.31 42.3571 296.469 33.7045 285.39C11.8853 257.453 -0.173084 225.791 0.00187765 196.897C0.150942 172.278 6.98634 154.966 22.705 139.397C36.7403 125.495 55.1175 118.632 78.2371 118.657C97.8947 118.679 114.433 122.725 135.088 132.57L144.439 137.028L153.588 132.574C173.32 122.969 190.51 118.687 209.737 118.586C232.51 118.466 250.102 124.695 264.719 138.054C280.958 152.896 288.677 172.114 288.553 197.397C288.461 216.026 284.506 232.769 275.797 251.397C254.02 297.976 209.192 336.181 162.191 348.219C150.337 351.254 144.157 351.899 137.514 350.792ZM151.164 315.412C178.257 309.713 209.34 288.213 229.733 261.067C237.715 250.441 247.302 231.468 250.788 219.397C255.614 202.689 254.995 185.184 249.175 173.776C235.238 146.456 193.517 146.201 152.455 173.186C139.762 181.528 119.561 201.155 111.584 212.897C105.048 222.518 99.0572 233.723 96.2127 241.647C94.9787 245.084 93.6607 247.897 93.2837 247.897C92.0242 247.897 82.1995 233.981 78.2789 226.645C76.1486 222.658 73.8533 217.507 73.178 215.196C71.9834 211.11 72.0644 210.804 76.169 203.895C82.6166 193.042 93.1539 179.523 102.825 169.695C108.046 164.391 111.193 160.458 110.648 159.92C110.147 159.425 105.687 157.815 100.737 156.342C89.2856 152.935 71.0455 152.369 62.341 155.151C26.4036 166.637 25.0026 215.344 59.2849 261.397C78.6592 287.423 108.204 308.256 135.138 314.882C144.595 317.209 142.89 317.153 151.164 315.412Z" fill="#FF4152"/>
                       <path d="M74.8734 84.0994C55.7021 64.7534 44.7575 35.5581 46.9245 9.54414L47.6364 0.997615L53.3018 0.274622C61.5007 -0.771626 79.5643 1.29304 89.4671 4.40828C108.249 10.3169 126.514 22.62 137.909 37.0401C141.241 41.256 144.245 44.631 144.585 44.5401C144.926 44.449 148.061 40.8111 151.553 36.4553C165.351 19.2447 186.482 6.68642 209.967 1.73921C216.712 0.318293 239.848 -0.0754881 241.133 1.20872C241.592 1.66737 241.936 8.41737 241.898 16.2087C241.842 27.5784 241.384 32.0418 239.577 38.8193C232.364 65.8671 216.909 86.4775 193.249 100.601C184.053 106.09 167.248 111.489 155.257 112.808C127.964 116.342 95.1318 104.013 74.8734 84.0994ZM126.136 77.9712C125.101 72.7958 119.671 62.5205 114.736 56.3991C106.408 46.0688 91.9315 36.1177 82.4816 34.2278C79.4231 33.6161 79.2788 33.7156 79.9479 35.977C81.5854 41.5112 87.8963 53.0057 92.2692 58.4185C98.3989 66.0059 109.068 74.0509 117.905 77.7493C126.787 81.4667 126.836 81.4681 126.136 77.9712ZM172.344 77.2756C179.975 73.8606 189.44 66.8482 195.314 60.2576C200.211 54.7627 207.793 41.1765 209.056 35.6315L209.681 32.8882L205.515 34.358C189.196 40.1156 174.959 52.3703 167.735 66.8764C165.408 71.5506 163.209 76.6621 162.849 78.2355C162.243 80.8851 162.371 81.0439 164.581 80.389C165.893 80.0001 169.387 78.5992 172.344 77.2756Z" fill="#FF4152"/>
                       </svg>

                      </div>  
                                   
                    <div style={{display:'flex',flexDirection:'column',paddingLeft:'10px',paddingBottom:'5px'}}>
                    <p className="subheading3" style={{color:'#989898'}}>Here's some</p>
                       <p className="heading3"style={{color:'rgb(25 25 25)'}} >HOT DEALS</p>
                    </div>  
                    </div>


         <Slider {...settings} ref={sliderRef}>
              {showImages()}
          </Slider>
         </div>
        </div>
      )
  }