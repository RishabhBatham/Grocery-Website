import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './Card3.css'


export default function Card3(props){
    return(
     <div className="card3__container">
      <div className="card3__img">
      <img src={`${serverURL}/images/${props.image}`} />
      </div>
      <div className="card3__name">
      <p className="card2__name_title subheading4">{props.title}</p>
      </div>
     </div>
    )
}