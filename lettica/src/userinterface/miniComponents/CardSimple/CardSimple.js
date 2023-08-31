import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './CardSimple.css'
import { Divider } from "@mui/material";


export default function CardSimple(props){
    return(
     <div className="cardsimple__container">
    
      <div className="cardsimple__name">
      <div className="cardsimple__img">
      <img src={`${serverURL}/images/${props.image}`} />
      </div>
      <div style={{color:'#4e4e4e',width:'80%'}}>
      <Divider  sx={{ borderBottomWidth: 2,bgcolor:'#4e4e4e' }} />
      </div>
      <p className="cardsimple__name_title subheading4" style={{color:'#4e4e4e'}}>{props.title}</p>
      </div>
     </div>
    )
}