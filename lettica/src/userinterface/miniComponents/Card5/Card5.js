import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './Card5.css'
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Divider} from "@mui/material";

export default function Card5(props){
  var item = props.item
  var navigate=useNavigate()
  const handleClick=(item)=>{
  {console.log(item)}
  navigate(props.url,{state:{product:item}})

  }




      var title = props.title
    if(title.length>24){
       title = title.substring(0,20)+"..."
    }
    return(
        <div>
            <div className="card5__container" /* onClick={handleClick} */ style={{margin:`${props.margin}`,scale:`${props.scale}`}}>


         
               <svg width="11" height="3" viewBox="0 0 11 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="1.5" cy="1.5" r="1.5" fill="#988B8B"/>
                 <circle cx="5.5" cy="1.5" r="1.5" fill="#988B8B"/>
                 <circle cx="9.5" cy="1.5" r="1.5" fill="#988B8B"/>
                </svg>

              


              <div className="card5__head">
                <div className="card5__image"> 
              <img src={`${serverURL}/images/${props.image}`} />

                  </div>
                  
                  <div className="card5__text"> 
                  <Divider style={{width:'100%'}} sx={{ borderBottomWidth: 1.5,bgcolor:'black' }} />
                    <p style={{color:'#a4a4a4'}} className="card5__text_title">{title}</p>
                    <p className="subheading3" style={{scale:1.3,fontWeight:'bold'}}>{props.price} ₹ </p>
                    
                  </div>

              </div>

       
              <div className="card5__bottom">
                  <input type="button" value="Add" placeholder="Add"/>
              </div>

            </div>
           
        </div>
    )
}