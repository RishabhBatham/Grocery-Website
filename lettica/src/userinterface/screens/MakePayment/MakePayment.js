import { useEffect } from "react";
import useRazorpay from "react-razorpay";
import { serverURL } from "../../../administrator/services/FetchNodeServices";
import { useSelector,useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function MakePayment(){
    const Razorpay = useRazorpay();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    var user = useSelector((state)=>state.user)
    var userData = Object.values(user)[0]
    console.log(userData)
    const products = useSelector((state) => state.products);
    const productList=Object.values(products)
    var total= productList.reduce((a,b) => {
        return  a+b.offer*b.qty;
      },0); 
     total+=70

    const handlePayment=()=> {
        const options = {
       key: "rzp_test_GQ6XaPC6gMPNwH",
       amount: total*100,
       currency: "INR",
       name: "Quick Shopee",
       description: "Test Transaction",
       image: `http://${serverURL}/images/vegtables.svg`,
     
       handler: (res) => {
         console.log(res);
        
         dispatch({type:'CLEAR_CART',payload:[]})
         navigate("/home")
         
 
       },
       prefill: {
         name: userData.username,
         email: "youremail@example.com",
         contact: userData.mobileno,
       },
       notes: {
         address: "Razorpay Corporate Office",
       },
       theme: {
         color: "#3399cc",
       },
     };
     const rzpay = new Razorpay(options);
     rzpay.open();
   }

   useEffect(function(){
    var timeout=setTimeout(handlePayment,1000)
    
    },[])
    
      return (
        <div className="App">
         
        </div>
      );




}