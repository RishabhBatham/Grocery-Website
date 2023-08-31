import React from "react";
import { postData,getData } from "../../../administrator/services/FetchNodeServices";
import { useEffect,useState } from "react";
import { Grid } from "@mui/material"
import { useMediaQuery } from "@mui/material";
import Header from "../../components/headers/Header";
import Footer from "../../components/Footer/Footer";
import ScrollComponent from "../../components/ScrollComponent/ScrollComponent";
import Card2 from "../../miniComponents/Card2/Card2";
import './ProductViewWithCategory.css'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomList from "../../components/CustomList/CustomList";
import Card4 from "../../miniComponents/Card4/Card4";
import Header2 from "../../components/header2/Header2";

export default function ProductViewWithCategory(){
    

    const [subCategory,setSubcategory]=useState([])
    const [subCategoryId,setSubcategoryId]=useState('')
    const [subCategoryName,setSubcategoryName]=useState(' all items')
    const [productList,setProductList]=useState([])
    const location=useLocation()
    const navigate=useNavigate()

    const fetchAllSubcategory=async()=>{
        var result=await postData('userinterface/fetch_all_subcategory_by_categoryid',{categoryid:location.state.categoryid})
       
        setSubcategory(result.data)
    
      }
    
      const fetchAllProductsSubcategory=async(scid)=>{
        var result=await postData('userinterface/fetch_all_products_by_subcategory',{subcategoryid:scid})
        console.log(result.data) 
        setProductList(result.data)
    
      }
      const fetchAllProductByCategory=async()=>{
        var result=await postData('userinterface/fetch_all_products_by_categoryid',{categoryid:location.state.categoryid})
        console.log(result.data) 
        setProductList(result.data)
    
      }
     useEffect(function(){
      fetchAllProductByCategory()
    
      },[])
      const getSubCategoryId=(scid,sname)=>{
        setSubcategoryName(sname)
        setSubcategoryId(scid)
        fetchAllProductsSubcategory(scid)
      }
       
     
      useEffect(function(){
        
        fetchAllSubcategory()
    
    
      },[])
    
   const listofProducts=()=>{
      return productList.map((item)=>{
        console.log(item)
       
        return (<Card4 item={item} url={"/selectproduct"}/>)
    
      })
    
    } 
    
    
    return(
        <div>
            <Header2/>
            <div className="productview__container">
                <div className="productview__bgdiv"></div>   
                <div className="productview__bgdiv2"></div>   

                <div className="list__container" > 
               
                    <CustomList   data={subCategory} getSubCategoryId={getSubCategoryId}/>
                    
                </div> 
              
                <div className="productview__product_container">
                <div className="productview__heading">
               {/*  <p className="headstyle2">{subCategoryName} ({productList.length}) Items</p> */}


                  <div className="bannercomp2__textcontainer" >
                     <p></p> 
                     <div className="bannercomp2__bgicon" style={{paddingBottom:'8.9px',scale:.74,marginBottom:'2px'}}>
                    {/*  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M4.93682 29.748C4.4381 29.5952 3.75263 29.3189 3.41355 29.1339C2.41701 28.5905 1.08515 27.0564 0.522765 25.8043C0.0808977 24.8206 0 24.3457 0 22.7359C0 21.1266 0.0812228 20.6496 0.524131 19.6579C1.24735 18.0386 2.08385 17.1074 3.56958 16.2677C4.75145 15.5997 4.96397 15.5515 6.75035 15.5465C8.40629 15.5417 8.81821 15.6167 9.8027 16.1014C11.252 16.815 12.4891 18.1142 13.1686 19.6362C13.6219 20.6516 13.7022 21.1181 13.7022 22.7359C13.7022 24.3904 13.6286 24.7978 13.1417 25.8389C11.985 28.3126 9.8673 29.7956 7.28024 29.9437C6.44688 29.9914 5.4628 29.9092 4.93682 29.748ZM8.41077 28.4183C9.85735 27.992 11.3451 26.6717 12.0173 25.2177C12.6335 23.8848 12.6507 21.676 12.0556 20.2876C10.906 17.6052 7.95178 16.1851 5.24204 17.0124C3.66344 17.4943 1.92716 19.2667 1.50078 20.8314C0.716462 23.7097 1.85043 26.6757 4.23153 27.9737C5.77518 28.8152 6.72189 28.9159 8.41077 28.4183ZM20.7252 29.6143C19.0545 29.0395 17.6476 27.696 16.7813 25.8479C16.1973 24.6022 16.1211 24.2397 16.1277 22.7404C16.1373 20.5541 16.8234 18.8537 18.2687 17.434C19.7967 15.933 20.7904 15.5415 23.0721 15.5413C24.7561 15.5411 25.1231 15.6117 26.1231 16.1274C27.5148 16.8451 28.7787 18.2451 29.4767 19.8421C29.9038 20.8195 30.0013 21.3582 30 22.7359C29.9985 24.201 29.9122 24.6176 29.3579 25.8311C27.8242 29.1886 24.158 30.7953 20.7252 29.6143ZM25.2721 28.2159C26.188 27.8156 27.6114 26.3729 28.1732 25.2753C28.512 24.6133 28.6072 24.0598 28.6099 22.7359C28.613 21.2527 28.5397 20.9033 28.0182 19.9146C26.9065 17.8071 25.329 16.8204 23.0721 16.821C21.8242 16.8215 21.3804 16.9205 20.5255 17.3896C16.687 19.4961 16.3265 25.1808 19.8751 27.6469C21.4683 28.7542 23.5404 28.9726 25.2721 28.2159ZM10.5003 14.6789C10.426 14.4757 10.7219 13.8358 11.2586 13.0389C13.6552 9.48051 14.9982 5.80687 15.1666 2.34955C15.2929 -0.242407 15.399 -0.351549 16.9596 0.506495C20.1035 2.23511 22.3231 6.61544 22.6094 11.656C22.7215 13.6296 22.7101 13.7045 22.2597 13.9576C21.5751 14.3423 21.3154 13.8275 21.2799 12.0156C21.2108 8.48638 19.9995 5.18871 18.0062 3.103C16.7757 1.81557 16.7446 1.79805 16.6052 2.31532C16.5268 2.60629 16.4536 3.1908 16.4426 3.61423C16.3637 6.63864 12.4234 15.0121 11.0791 15.0121C10.8277 15.0121 10.5672 14.8621 10.5003 14.6789ZM4.80192 9.19268C4.47612 8.94249 4.46632 8.78629 4.69037 7.4142C4.82546 6.58689 5.13101 5.47427 5.36938 4.94171C5.96788 3.60459 7.5171 1.88536 8.76755 1.17063C10.6513 0.0939553 13.0883 -0.344341 13.5989 0.301726C13.9319 0.723202 13.5842 2.80963 12.9341 4.29028C12.3422 5.63849 10.8112 7.44919 9.69919 8.11624C8.03792 9.11281 5.44118 9.68357 4.80192 9.19268ZM8.29082 7.35739C9.71437 6.65467 10.8965 5.39872 11.6776 3.75907C12.0707 2.93374 12.3924 2.03557 12.3924 1.76316C12.3924 1.31989 12.3236 1.28092 11.7375 1.3923C9.05849 1.90143 6.41794 4.58023 6.02018 7.19251L5.88384 8.08788L6.65533 7.93589C7.07965 7.8523 7.81562 7.59196 8.29082 7.35739Z"
                      fill="#FF4152"/>
                    </svg> */}
                     <svg width="30" height="45" viewBox="0 0 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.9547 44.6533C11.1014 43.9687 9.43444 42.7582 7.34818 40.5821C3.32966 36.3906 0.735202 31.3774 0.113991 26.6034C-0.404613 22.618 0.874759 19.0849 3.37244 17.605L4.47082 16.9542H14.9628C25.2798 16.9542 25.4728 16.9645 26.5366 17.5527C28.7633 18.7846 29.7682 20.7143 29.9732 24.1518C30.2227 28.335 28.7269 32.7612 25.5806 37.1499C21.1449 43.337 16.6394 46.0146 12.9547 44.6533ZM11.8808 35.5786C12.3496 34.8633 12.7332 34.1986 12.7332 34.1015C12.7332 33.8354 11.0827 31.4676 10.8972 31.4676C10.7311 31.4676 9.06105 33.8217 9.06105 34.0558C9.06105 34.2744 10.7565 36.8835 10.8972 36.8812C10.9693 36.8802 11.4119 36.2939 11.8808 35.5786ZM20.185 35.5349L21.1285 34.1767L20.2752 32.827C19.8059 32.0847 19.3038 31.4773 19.1596 31.4773C19.0153 31.4773 18.5133 32.0847 18.044 32.827L17.1907 34.1767L18.1342 35.5349C18.6531 36.2819 19.1145 36.8931 19.1596 36.8931C19.2047 36.8931 19.6661 36.2819 20.185 35.5349ZM7.8251 23.7637C7.29649 23.0026 6.84681 22.3493 6.82582 22.3119C6.80481 22.2746 6.34765 22.9048 5.80986 23.7123L4.83207 25.1806L5.79608 26.5684L6.7601 27.9562L7.77316 26.5519L8.78622 25.1476L7.8251 23.7637ZM16.023 26.5692L16.9967 25.1973L16.0137 23.7212L15.0307 22.2451L14.0561 23.6689L13.0815 25.0926L14.0221 26.5136C14.5395 27.2951 14.9822 27.936 15.006 27.9378C15.0298 27.9398 15.4874 27.3237 16.023 26.5692ZM25.0613 25.1423C25.0613 24.8197 23.4968 22.5154 23.2782 22.516C23.1769 22.5163 22.6961 23.1205 22.2096 23.8587L21.3251 25.2009L22.3028 26.5785L23.2806 27.956L24.1709 26.6608C24.6607 25.9484 25.0613 25.2651 25.0613 25.1423ZM7.88071 14.3446C5.42676 13.4763 3.81 12.0408 2.60482 9.66031C1.7404 7.95288 1.93679 7.81153 4.99541 7.93958C6.92999 8.02058 7.6063 8.17147 8.74219 8.77558C10.4728 9.69598 11.9735 11.2747 12.8571 13.1044L13.5372 14.5128L12.8074 14.6842C11.3592 15.0242 9.42423 14.8908 7.88071 14.3446ZM17.6514 14.7486C16.0253 14.2529 19.4674 9.40564 22.3704 8.10303C23.7364 7.49011 26.1974 7.15152 27.2675 7.42928C28.149 7.65811 28.1286 8.2076 27.1749 9.92737C26.1619 11.754 24.1582 13.5797 22.4871 14.1989C21.1195 14.7056 18.4907 15.0044 17.6514 14.7486ZM14.0325 12.0077C12.0214 8.72796 12.0921 4.63094 14.2151 1.42369C14.7336 0.640376 15.232 -0.000286987 15.3226 9.64448e-08C15.7646 0.00102539 17.2297 2.78273 17.6348 4.38943C18.022 5.92529 18.0465 6.47579 17.7953 7.99257C17.3996 10.3821 15.888 13.292 15.0424 13.292C14.9201 13.292 14.4657 12.7141 14.0325 12.0077Z" fill="#FF4152"/>
                     </svg>



                      </div>  
                                   
                    <div style={{display:'flex',flexDirection:'column',paddingLeft:'10px',paddingBottom:'5px'}}>
                    <p className="subheading3" style={{color:'#989898'}}>{subCategoryName}</p>
                       <p className="heading3"style={{color:'var(--black)'}} >{productList.length} ITEMS</p>
                    </div>  
                    </div>


                </div>
                <div className="productview__product">
                 {listofProducts()} 
                </div>
                </div>
          
             
                 
             
          
            </div>
            <Footer/>

        </div>
    )
}