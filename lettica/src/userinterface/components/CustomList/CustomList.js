import React from "react";
import { useState } from "react";
import { AppBar,Toolbar,Grid, Paper, Avatar, Button } from "@mui/material";
import { serverURL } from "../../../administrator/services/FetchNodeServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import './CustomList.css'


export default function CustomList({data,getSubCategoryId}){
    const navigate=useNavigate()
   const handleClick=(item)=>{
    getSubCategoryId(item.subcategoryid,item.subcategoryname)

   }
  



   const listview=()=>{
    return data.map((item)=>{
      
      
          return(
            <div className="listview__container" onClick={()=>handleClick(item)}>
              <div className="listview__img">
              <img src={`${serverURL}/images/${item.icon}`} />
              </div>
              <div className="listview__text">
                <p className="subheading4" style={{color:'var(--lblack)',width:'101%'}}>{item.subcategoryname} </p>
              </div>
            </div>
          )


    })
   }
     
   return(
    <div className="customlist__container">
        <div className="customlist__title" >
          <p className="heading2g" style={{color:'white'}}>Top Categories</p>
        </div>
        <div className="customlist__content">
          {listview()}
        </div>
    </div>
   )
}