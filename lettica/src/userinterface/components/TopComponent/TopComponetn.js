import React from "react";
import './TopComponent.css'
import { serverURL } from "../../../administrator/services/FetchNodeServices";
export default function TopComponent(){
    return(
        <div className="topcomponent__container">
         <img src={`${serverURL}/images/banner6.jpg`} width='100%'/>
        </div>
    )
}