


import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { CartContext } from '../../context/FetureCartContext.jsx';

export default function Product() {
   const {addToCartContext,count}=useContext(CartContext);

 const addToCart= async(productId)=>{
   // console.log(productId)
   const result= await addToCartContext(productId);
   //console.log(result);
 }

   // console.log(useParams());
   const{productId}=useParams();
   //const categoryId=useParams().categoryId;
  //console.log(categoryId);

const getProductDetailes=async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
   //console.log(data);
   return data.product;
  
}
const {data,isLoading}=useQuery('product_datailes',getProductDetailes);
//console.log(data);

if(isLoading){
    return <p> loading ...</p>
}


  return (
<div className="container">
<div className="row">

    <div className="col-lg-4">
{data.subImages.map((img)=>
<div  className="w-25">
<img className=" img-fluid mt-3" src={img.secure_url}/>
</div>
)}
    </div>
    <div className="col-lg-8">
    <h2>{data.name}</h2>
    <p>{data.price}</p>  
    <button className='btn btn-outline-info 'onClick={()=>addToCart(data._id)}>Add To Cart</button>
    </div>
</div>

</div>

 
  )
}
