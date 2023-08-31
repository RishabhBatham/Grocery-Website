import './cart2bill.css'
import { useMediaQuery } from '@mui/material'


export default function Cart2bill({cartData,tip,handlingCharge,deliveryCharge}){
    
    var itemtotal=0
  
    

     cartData.map((item)=>{
         if(item.offer==0){
            itemtotal+=item.rate*item.qty

         }
         else{
           itemtotal+= item.offer*item.qty
         }
     })
     var grandTotal= itemtotal+handlingCharge+deliveryCharge +tip
    
    return(
        <div className='cart2bill__container'>
          <div className='cart2bill__heading'>
            <p className='heading3w'>ITEM NAME</p>
            <p className='heading3w'>PRICE</p>
          </div>
          <div className='cart2bill__content'>
           <div className='cart2bill__content_line'>
           <p className='heading3'>Item Total</p><p className='heading3'>{itemtotal}</p>
           </div>
           <div className='cart2bill__content_line'>
           <p className='heading3'>Handling Charge</p><p className='heading3'>{handlingCharge}</p>
           </div>
           <div className='cart2bill__content_line'>
           <p className='heading3'>Delivery Charge</p><p className='heading3'>{deliveryCharge}</p>
           </div>
           
           {
            tip==0?<></>:<>
             <div className='cart2bill__content_line'>
           <p className='heading3'>Tip</p><p className='heading3'>{tip}</p>
           </div>
            </>
           }

           <div className='cart2bill__divider'></div>
           <div className='cart2bill__content_line'>
           <p className='heading3'>Grand Total</p><p className='heading3'>{grandTotal}</p>
           </div>
          </div>
        </div>
    )
}