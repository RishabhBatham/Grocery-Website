import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './Card2.css'


export default function Card2(props){
    return(
     <div className="card2__container">
        <div className="card2__img">
        <img src={`${serverURL}/images/${props.image}`} />
        </div>
        <div className="card2__text">
        <p className="card2__text_title">{props.title}</p>
        <div className="card2__text_price"><s >{props.price}</s><p >{props.offer}</p></div>
        </div> 
     </div>
    )
}