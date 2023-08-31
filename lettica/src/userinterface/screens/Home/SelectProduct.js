import { useState } from "react";
import Header2 from "../../components/header2/Header2";
import Footer from "../../components/Footer/Footer";
import './SelectProduct.css'
import { useLocation,useNavigate } from "react-router-dom";
import ProductDisplay from "../../components/ProductDisplay/ProductDisplay";



export default function SelectProduct(props) {
  
    const location=useLocation()
    const navigate=useNavigate()
    //console.log("location",location.state.categoryid)
    const [refresh,setRefresh ]=useState(false)
    var product=location.state.product
    console.log(location.state)

    const refreshMainPage=()=>{
    setRefresh(!refresh)

    }
    return (
        <div >
            <Header2/>
            <div className="selectproduct__container">
             <ProductDisplay refreshMainPage={refreshMainPage} product={product}/>
            </div>
            <Footer/>

        </div>

    )
}