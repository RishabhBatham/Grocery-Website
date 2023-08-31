import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './Card.css'


export default function Card(props){
    return(
        <div>
            <div className="card__container" style={{margin:`${props.margin}`,scale:`${props.scale}`}}>
              <div className="card__head">
                <div className="card__image"> 
              <img src={`${serverURL}/images/${props.image}`} />
                  </div>
                  <div className="card__text"> 
                    <p className="card__text_title">{props.title}</p>
                    <p className="card__text_weight">{props.weight}</p>
                  </div>

              </div>

       
              <div className="card__bottom">
                 <p className="subheading3g" style={{scale:1.3,fontWeight:'bold'}}>{props.price} ₹ </p> <input type="button" value="Add" placeholder="Add"/>
              </div>

            </div>
           
        </div>
    )
}