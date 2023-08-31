import React from "react";
import {serverURL} from '../../../administrator/services/FetchNodeServices'
import './ListComponent.css'
import { useTheme } from "@mui/material/styles";
import { List, useMediaQuery,ListItem,ListItemButton,ListItemText } from "@mui/material";
import { Grid} from "@mui/material"
import Card from "../../miniComponents/Card/Card";
import Card2 from "../../miniComponents/Card2/Card2";



export default function ListComponent(){
    
    var listimages = [
        {id:1,image:'toppicks.png',name:'Top Picks'},
        {id:2,image:'organic.png',name:'Organic and healthy'},
        {id:3,image:'dryfruits.png',name:"Dry fruits and Nuts"},
        {id:4,image:'papad.png',name:"Papad and Pickles"},
        {id:5,image:'SaltSugar.png',name:"Salt and ingredinets"},
        {id:6,image:'indianspices.png',name:"Indian Masala"},
    
      

      ]
      var carddata = [
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},
        {id:1,image:'cheetoss.png',title:'Cheetos snacks',weight:'200 g',price:'₹30'},

      ]







    
    return(
      <div className="listcomponent__container" >
        <Grid container spacing={3}>
          
 
        <Grid item xs={3}>
        <div className="listcomponent__box">
            <List>
                    {
                        listimages.map((item)=>{
                            return(
                                <div>
                                        <ListItem disablePadding>
                                         <ListItemButton>
                                     <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
                                     <div className="listcomponent__img flexcc"> 
                                        <img src={`${serverURL}/images/${item.image}`} width='100%'/>
                                      </div>
                                      <div>
                                     <p  className="listcomponent__p" style={{fontWeight:'bold',padding:'10px',fontFamily:'Almarai'}}>{item.name}</p>
                                      </div>
                                     </div>
                                        </ListItemButton>
                                       </ListItem>
                                </div>
                            )
                        })
                    }
            </List>

        </div>
        </Grid>
         <Grid item xs={9}>
         <div>
            <p className="cardcontainer_p">Masala,Dry Fruits & More(1292)</p>
            <div  className="cardcontainer">
               
            {
                carddata.map((item)=>{
                    return(
                      
                            <Card image={item.image} title={item.title} weight={item.weight} price={item.price}/>
                       
                    )
                })
            }
          
            </div>

        </div>
         </Grid>


        </Grid>
      </div>
    )
}