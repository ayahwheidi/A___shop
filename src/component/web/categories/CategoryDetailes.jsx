import axios from 'axios';
import React, {  useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'


export default function CategoryDetailes() {
   // console.log(useParams());
   const{categoryId}=useParams();
   //const categoryId=useParams().categoryId;
  //console.log(categoryId);

const getCategoryDetailes=async ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
   //console.log(data);
   return data.products;
  
}
const {data,isLoading}=useQuery('category_detailes',getCategoryDetailes);
//console.log(data);

if(isLoading){
    return <p> loading ...</p>
}


  return (
   <div className="products">


{data?.length ? data?.map((product)=>
    <div className="product" key={product._id}>
        <div className=' w-25' >
         <img  className =" img-fluid " src={product.mainImage.secure_url}/>
         </div>
    <h2>{product.name}</h2>
    <Link to={`/products/${product._id}`}> detailes</Link>
    </div>
):<p>no product</p>}

   </div>
  )
}
