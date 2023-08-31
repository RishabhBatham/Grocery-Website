import { useState,useEffect } from "react";

import './Homecss.css'
import Header from "../../components/headers/Header";
import Bannercomp from "../../components/banner/banner";
import BannerComponent from "../../components/banner/BannerComponent";
import CircleScrollComp from "../../components/CircleScrollComponent/CircleScrollComponent";
import ListComponent from "../../components/ListComponent/ListComponent";
import ProductDisplay from "../../components/ProductDisplay/ProductDisplay";
import Cart from "../Cart/Cart";
import Footer from "../../components/Footer/Footer";
import ScrollComponent from "../../components/ScrollComponent/ScrollComponent";
import Card2 from "../../miniComponents/Card2/Card2";
import { Margin } from "@mui/icons-material";
import Categorybyicon from "../../components/CategorybyIcon/CategorybyIcon";
import TopComponent from "../../components/TopComponent/TopComponetn";
import BannerComponent2 from "../../components/BannerComponent2/BannerComponent2";
import { postData,getData,getDataWithQuery } from "../../../administrator/services/FetchNodeServices";
import Header2 from "../../components/header2/Header2";
import ScrollComponent2 from "../../components/ScrollComponent2/ScrollComponent2";
import StylishScrollComponent from "../../components/StylishScrollComponent/StylishScrollComponent";
import ShopByBrand from "../../components/ShopByBrand/ShopByBrand";





export default function Home(){
   
  const [trending,setTrending]=useState([])
  const [category,setCategory]=useState([])
  const [products,setProducts]=useState([])


  const fetchAllCategories=async(status)=>{
    var result=await postData('userinterface/fetch_all_category',{status:status})
    if(status=='Continue')
    setCategory(result.data)
    else if(status=="Trending")
    setTrending(result.data)

  }
 /*  const fetchallProducts=async(status)=>{
    var result = await postData('userinterface/')
  } */
  useEffect(function(){

    fetchAllCategories('Continue')
    fetchAllCategories('Trending')
  },[])



    return(
    
        <div>
           <Header2/>
  {/*          <TopComponent/> */}
           <Categorybyicon/>
           <BannerComponent2/>
           
           <ScrollComponent category={category}/>
           <ScrollComponent2 minititle={'some products'} title={'YOU MAY LIKE'} subcategoryid={4}/>
           <ShopByBrand/>

           <StylishScrollComponent/>
          {/*  <div style={{backgroundColor:'var(--themegreen)',width:'100%',height:'500px'}}>

           </div> */}

           <Footer/>
       
     
   

        </div>
    )
}