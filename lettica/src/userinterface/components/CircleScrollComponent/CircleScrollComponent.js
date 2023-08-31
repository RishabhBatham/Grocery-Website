import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import { ArrowBackIosOutlined,ArrowForwardIosOutlined } from "@mui/icons-material";
import { createRef } from "react";
import './CircleScrollComponent.css'
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";










export default function CircleScrollComp(){


  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const md = useMediaQuery(theme.breakpoints.down('md'));

 
  

   var sliderRef = createRef()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: sm?2:md?3:lg?5:6,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:3000
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
        {id:1,image:'Dairy.png',name:'Dairy products'},
        {id:2,image:'Rice.png',name:'Rice'},
        {id:3,image:'Edible oil.png',name:"Oil and Jaggery"},
        {id:4,image:'Fruitsandvegetables.jpg',name:"Fruits and Vegetables"},
        {id:5,image:'SaltSugar.png',name:"Salt and ingredinets"},
        {id:6,image:'indianspices.png',name:"Indian Masala"},
        {id:7,image:'Noodles.jpg',name:"Noodles"}, 
      

      ]
       const showImages=()=>{
              return(
                  images.map((item)=>{
                      console.log("image fetched")
                      return(
                      <div className="smartcomp__images">
                            <div className="smartcomp__img" style={{background:colors[parseInt(Math.random()*(colors.length-1))]}}> 
                              <img src={`${serverURL}/images/${item.image}`} width='100%'/>
                          </div>
                          <div className="smartcomp__text">
                            {item.name}
                          </div>
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
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          
       <div  style={{ display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
       <div>
        <p className="headstyle" style={{fontSize:sm?17:30}}>Popular Categories</p>
       </div>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'var(--green)'}}>
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