import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './Card4.css'
import { useNavigate } from "react-router-dom";


export default function Card4(props){

    var item=props.item
   var navigate=useNavigate()
   const handleClick=(item)=>{
   {console.log(item)}
   navigate(props.url,{state:{product:item}})

   }

    return(
     <div className="card4__container">
      <div className="card4__img">
      <img src={`${serverURL}/images/${item.picture}`} />
      </div>
      <div className="card4__text">
      <div>
      <div className="card4__text_name"><p className="subheading2">{  item.productlistname}</p> </div>
       {
        item.offer==0?<>
          <div className="card4__text_rate"> <p className="subheading3g" >{item.rate}  ₹ </p> </div>
        </>:
        <>
         <div className="card4__text_rate"> <s className="subheading3" >{item.rate} </s><p className="subheading3g">{item.offer}  ₹</p> </div>
        </>


       }
      </div>

      <div className="card4__text_button" onClick={()=>handleClick(item)}>
        <img width='20px' src={`${serverURL}/images/staticasset/addicon.svg`}/>
      </div>
      </div>
      </div>
        )




}