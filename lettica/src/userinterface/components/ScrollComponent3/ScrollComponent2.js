import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {postData, serverURL} from '../../../administrator/services/FetchNodeServices'
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { createRef } from "react";
import './ScrollComponent2.css'
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Card from "../../miniComponents/Card/Card";
import Card3 from "../../miniComponents/Card3/Card3";
import { useNavigate } from "react-router-dom";
import Card5 from "../../miniComponents/Card5/Card5";


export default function ScrollComponent2(props){


    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
     var navigate = useNavigate()
     const [products,setProducts]=useState([])
   



     const fetchallproductbyscid=async(status)=>{
      var result = await postData('userinterface/fetch_all_products_by_subcategory',{subcategoryid:props.subcategoryid})
      setProducts(result.data)
      console.log(result.data)
     }
    useEffect(function(){
      fetchallproductbyscid()
    },[] )
  
     var sliderRef = createRef()
      var settings = {
          dots: false,
          infinite: false,
          arrows:false,
          speed: 500,
          slidesToShow: sm?1:md?2:lg?3:5,
          slidesToScroll: 1,
          autoplay:false,
          autoplaySpeed:3000
        };
      

        const handleClick=(item)=>
{
  /* navigate("/selectproduct",{state:{product:''}}) */
}



    
         const showImages=()=>{
          console.log(products)
                return(
                    products.map((item,index)=>{
                        
                        return(
                           <div className="scroll__padding" onClick={()=>handleClick(item)}>
                                <Card5 image={item.picture} title={item.productlistname}  weight={item.weight}  price={item.rate} margin='5px'/*  *//>
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
          <div className="scrollcomp2__container">
            <div className="scrollcomp2__div">

            </div>
            
         <div  style={{ display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
         <div>
        

               <div className="bannercomp2__textcontainer" style={{paddingLeft:'70px'}}>
                     <p></p> 
                     <div className="bannercomp2__bgicon" style={{paddingBottom:'15px'}}>
                     <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1419 34.5419C6.18852 33.3058 1.90779 29.39 0.469799 24.7796C-0.348753 22.1552 -0.064904 17.4561 1.06656 14.9002C2.58161 11.4778 5.57568 8.98214 8.18586 8.96605C9.62125 8.95753 12.5061 9.62719 12.5061 9.96941C12.5061 10.1099 12.2124 10.3869 11.8535 10.585C10.9392 11.0895 8.75651 13.16 8.75651 13.5229C8.75651 13.6885 9.22072 13.459 9.78807 13.0128C11.0302 12.036 14.1618 10.5697 15.0058 10.5697C15.7737 10.5697 18.8015 11.9411 20.0383 12.8491C20.5555 13.2287 21.0475 13.4683 21.1317 13.3815C21.3057 13.2021 18.1131 10.2476 17.7452 10.2476C17.6134 10.2476 17.5055 10.1224 17.5055 9.96945C17.5055 9.51878 21.1344 8.85747 22.5405 9.05191C25.3616 9.44203 28.4964 12.7214 29.5132 16.3463C30.2094 18.8281 30.1513 22.9135 29.3873 25.2029C27.0453 32.2211 18.785 36.4492 11.1419 34.5419Z" fill="#FF4152"/>
<path d="M10.0876 7.74731C8.50123 7.03025 7.02483 6.44135 6.80678 6.43863C6.49498 6.43498 6.49731 6.37679 6.81764 6.16733C7.20428 5.9145 9.1464 6.11923 11.0191 6.61026C11.5526 6.75013 11.8784 6.70632 11.8784 6.49483C11.8784 6.04537 10.0978 4.65964 8.73994 4.05234L7.66015 3.56939L8.91001 3.56332C10.2175 3.55723 12.2223 4.35265 13.7759 5.49319L14.6906 6.16467V4.99924C14.6906 3.7429 13.9627 2.01852 13.1584 1.36913C12.7068 1.00455 12.717 0.920725 13.2661 0.483229C13.5997 0.217459 14.0341 0 14.2315 0C14.8628 0 15.3155 1.57874 15.3155 3.78013V5.91921L16.1748 5.09035C17.2835 4.0209 18.5952 3.36223 20.1587 3.08986L21.4086 2.87214L19.8462 3.81481C18.2656 4.76853 16.9658 5.99672 17.239 6.27835C17.3209 6.36285 17.8698 6.28931 18.4588 6.11531C19.9823 5.66482 21.1002 5.72172 22.4341 6.31768L23.5958 6.83671L21.721 7.2583C20.6899 7.49017 19.2135 7.91801 18.4402 8.20906C17.6668 8.50011 16.1201 8.80848 15.0031 8.89433C13.1438 9.03724 12.7281 8.94085 10.0876 7.74731Z" fill="#FF4152"/>
</svg>



                      </div>  
                                   
                    <div style={{display:'flex',flexDirection:'column',paddingLeft:'10px',paddingBottom:'5px'}}>
                    <p className="subheading3" style={{color:'rgb(206 206 206)'}}>{props.minititle}</p>
                       <p className="heading3"style={{color:'rgb(25, 24, 25)'}} >{props.title}</p>
                    </div>  
                    </div>
            
            
            
            
         </div>
         <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'var(--lwhite)',paddingRight:'10px'}}>
         {!md?<><ArrowBackIosOutlined onClick={handleback}/>
         <ArrowForwardIosOutlined  onClick={handlenext}/></>:<></>}
         </div>
         </div>
  
  
         <div className="scrollcomp2__slider"  >
         <Slider {...settings} ref={sliderRef}>
              {showImages()}
          </Slider>
         </div>
          
       
        </div>
        
      )
  }