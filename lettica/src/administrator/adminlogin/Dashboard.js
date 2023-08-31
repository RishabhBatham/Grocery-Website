
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import { Toolbar,Grid, Paper,Avatar } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Routes,Route, useNavigate } from "react-router-dom";

/* routes */
import CategoryInterface from '../categories/CategoryInterface'
import Displayallcategory from '../categories/Displayallcategory'
import SubcategoryInterfce from '../categories/subcategories/SubcategoryInterface'
import DisplayAllSubcategory from '../categories/subcategories/Displayallsubcategory'
import ProductInterface from '../product/products'
import Displayallproducts from '../product/Displayallproducts'
import ProductList from '../product/productlist'
import DisplayProductsList from "../product/displayallproductslist";

import BannerInterface from '../banners/BannerInterface'
import { Navigate } from "react-router-dom";
import { Apps } from "@mui/icons-material";
import { SubjectOutlined,Inventory2Outlined,ViewCarouselOutlined,FeaturedPlayListOutlined,PanoramaOutlined,ExitToAppOutlined } from "@mui/icons-material";
import ProductPictures from "../productpictures/productpictures";



export default function Dashboard(){
  var admin =JSON.parse(localStorage.getItem('ADMIN'))
  const navigate = useNavigate()
    return(
        <div style={{width:'auto'}}>
            <AppBar style={{background:'#fff'}}>
                <Toolbar style={{color:'#000',fontFamily:'Playfair Display',letterSpacing:1,fontWeight:500,fontSize:'20px'}}>
                    <div>
                        Lettica
                    </div>
                </Toolbar>
           
            </AppBar>
             <div style={{ marginTop:'5%'}}>
             <Grid container spacing={3}>
                    <Grid item xs={3}>
                       <div style={{paddingTop:'10px', display:'flex',flexDirection:'column',justifyContent:'space-between' ,padding:'10px',margin:'5px',fontWeight:'bold', fontFamily:'Almarai'}}>

                        <Paper elevation={3} style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'300', width:200,padding:'10px',fontFamily:'Almarai',margin:'5px'}}>
                            <div style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                           <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'left'}}>
                           <Avatar width='30px' src={`${serverURL}/images/admin1.png`}/>
                            <span style={{marginLeft:'10px',fontFamily: 'Sarala', fontSize:'1.4rem'}}>{admin.adminname} </span>
                           </div>
                           {/* <div>
                           <span style={{paddingTop:'11px', padding:'8px', fontFamily: 'Sarala',color:'grey',fontSize:'.9rem'}}>{admin.emailid} </span> 
                           </div> */}
                           </div>
                        </Paper>
                        <List>
                        <ListItem disablePadding>
                          <ListItemButton onClick={()=>navigate('/dashboard/display_all_category')}>
                            <ListItemIcon>
                            <Apps/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Category</span>} />
                          </ListItemButton>
                        </ListItem>

                       

                        <ListItem disablePadding>
                          <ListItemButton onClick={()=>navigate('/dashboard/display_all_subcategory')}>
                            <ListItemIcon>
                           <SubjectOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Sub category</span>} />
                          </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                          <ListItemButton  onClick={()=>navigate('/dashboard/display_all_products')}>
                            <ListItemIcon>
                              <Inventory2Outlined/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Products</span>} />
                          </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                          <ListItemButton onClick={()=>navigate('/dashboard/display_all_productlist')}>
                            <ListItemIcon>
                            <FeaturedPlayListOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Product List</span>} />
                          </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                          <ListItemButton onClick={()=>navigate('/dashboard/productpictures')}>
                            <ListItemIcon>
                            <PanoramaOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Product Pictures</span>} />
                          </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                          <ListItemButton onClick={()=>navigate('/dashboard/bannerinterface')}>
                            <ListItemIcon>
                             <ViewCarouselOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Banner</span>} />
                          </ListItemButton>
                        </ListItem>
                        
                        <ListItem disablePadding>
                          <ListItemButton  onClick={()=>{
                            localStorage.removeItem("ADMIN")
                            navigate('/adminlogin')
                          }}>
                            <ListItemIcon>
                            <ExitToAppOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={<span style={{fontWeight:'300',fontFamily:'Almarai'}}>Logout</span>} />
                          </ListItemButton>
                        </ListItem>

                    
                        </List>


                        
                       </div>
                    </Grid>
                    <Grid style={{backgroundColor:'#F1F6F9',height:'95vh',width:'auto'}} item xs={9}>
                         {/*  dashboard ke routes */}
                            <Routes>
                                  <Route element={<CategoryInterface/>} path="/categoryinterface"/>
                                  <Route element={<Displayallcategory/>} path="/display_all_category"/>

                                  <Route element={<SubcategoryInterfce/>} path="/subcategoryinterface"/>
                                  <Route element={<DisplayAllSubcategory/>}  path="/display_all_subcategory"/>

                                  <Route element={<ProductInterface/>}  path="/productinterface"/>
                                  <Route element={<Displayallproducts/>}  path="/display_all_products"/>
                                 
                                  <Route element={<ProductList/>} path="/productlistinterface"/>
                                  <Route element={<DisplayProductsList/>} path="/display_all_productlist"/>
                              
                                  <Route element={<ProductPictures/>} path="/productpictures"/>
                                  <Route element={<BannerInterface/>} path="/bannerinterface"/>
                      
                            </Routes>
                    </Grid>
                </Grid>
             </div>



           

        </div>
    )

}