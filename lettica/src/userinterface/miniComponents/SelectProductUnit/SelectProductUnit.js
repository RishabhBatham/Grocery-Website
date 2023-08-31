import React from "react";
import './SelectProductUnit.css'
import { useEffect,useState } from "react";
import { postData } from "../../../administrator/services/FetchNodeServices";
import { useDispatch,useSelector } from "react-redux";
import PlusMinusComponent from "../../components/PlusMinusComponent/PlusMinusComponent";
export default function SelectProductUnit({product,refreshPage,selectedProduct,setSelectedProduct}){
    const [units,setUnits]=useState([])
   
    const cart =useSelector((state)=>state.products)
    const cartItems = Object.values(cart)

   

    const fetchAllProductList=async()=>{
         var result=await postData('userinterface/fetch_all_products_by_productid',{productid:product.productid})
        
         setUnits(result.data)
     
       }
  useEffect(function(){
     fetchAllProductList()
  },[])
  useEffect(()=>{
    searchInCart()
  },[])

  const searchInCart=()=>{
    var searchProduct = cartItems.filter((item)=>{
        
        return item.productlistid == product.productlistid
        
    })
    console.log("matched product",searchProduct)
    if(searchProduct?.length!=0){
      setSelectedProduct(searchProduct[0])
    }
    else{
      product['qty']=0
      setSelectedProduct(product)
    }
  }

  const dispatch = useDispatch()


  const handleQtyChange=(value)=>{
    var product=selectedProduct  
  if(value>=1)
  {
  
  
  product['qty']=value
  
  dispatch({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
  }
  else
  {product['qty']=0
    dispatch({type:'DELETE_PRODUCT',payload:[product.productlistid,product]})
  }
  refreshPage()
}

  






  const handleClick=(item,index)=>{
    setSelectedProduct(item)
   
 
     
   }
   const handleChanges=(item,index)=>{

   


    var currentProduct = item
    var searchProduct = cartItems.filter((itemm)=>{
        
      return itemm.productlistid == currentProduct.productlistid
      
  })
  console.log("matched product",searchProduct)
  if(searchProduct?.length!=0){
    setSelectedProduct(searchProduct[0])
  }
  else{
    currentProduct['qty']=0
    setSelectedProduct(currentProduct)
  }



  
   
   }
         
       const fillUnits=()=>{
          
        
           return(
            units.map((item,index)=>{
                return(
                    <div onClick={()=>handleChanges(item,index)} className="fetchallunit__container" style={{border:item.productlistid==selectedProduct.productlistid?'3px solid var(--dred)':'3px solid var(--lwhite)'}}>
                    {
                        item.offer==0?<></>:<><div className="fetchallunit__off">
                             <p className="subheading1" style={{color:'var(--lwhite)'}}> {parseInt(((item.rate-item.offer)/item.rate)*100)} % OFF</p>
                            </div></>
                    }




                    <div className="fetchallunit__weight">
                    <p className="subheading3">Quantity {item.weight}</p>
                    </div>
                    <div className="fetchallunit__price">
                    {
                         item.offer==0?<>
                           <div className="card4__text_rate"> <p className="subheading3g" >{item.rate} ₹ </p> </div>
                         </>:
                         <>
                          <div className="card4__text_rate"> <s className="subheading3" > {item.rate} </s><p className="subheading3g">{item.offer} ₹</p> </div>
                         </>


                        }
                    </div>
                    </div>
                )
            })
          )
       }




    return(
      <>
       <div className="selectproductunit__container">
            {fillUnits()}

           
        </div>
         <PlusMinusComponent qty={selectedProduct?.qty} onChange={handleQtyChange}/>
         </>  
    )
}