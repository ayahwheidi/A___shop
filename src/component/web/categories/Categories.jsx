import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import Swiper core and required modules
import { Navigation, Pagination , Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import 'swiper/css/scrollbar';

import './categories.css'
import { Link } from "react-router-dom";
import { CartContext } from "../../context/FetureCartContext";



export default function Categories() {
  //console.log(import.meta.env.VITE_API_URL);
  const x =useContext(CartContext);
  //console.log(x);
const getCategories=async ()=>{
const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=6`);
return data;
}


const query=useQuery('web_categories',getCategories);
const {data,isLoading}=query;
//console.log(data?.categories);
//console.log(data?.categories.length);

  //const [categories, setCategories] = useState([]);

  //const getCategories = async () => {
   // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`
   // );import categories from './../../dashpord/categories/Categories';

    //console.log(data.categories);
    //setCategories(data.categories);
   // console.log(categories);
  //};

  //useEffect(() => {
   // getCategories();
  //}, []);
if(isLoading){
  return <p>...Loading</p>
}
return (
<div className='container'>
  <Swiper className="mt-5"
  // install Swiper modules
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={50}
  slidesPerView={3.3}
  loop={true}
 autoplay={{
    delay:3000
  }}
  navigation
  pagination={{ clickable: true }}
  
  //onSlideChange={() => console.log('slide change')}
  //onSwiper={(swiper) => console.log(swiper)}
>
   {data?.categories.length?data?.categories.map((category)=>
     
     <SwiperSlide key={category._id}>
      <Link to={`/products/category/${category._id}`}>
      <img  src={category.image.secure_url}/>
      </Link>
     </SwiperSlide>
      
     ):<p>no category found</p>}
     
  ...
</Swiper>

</div>


   );
}
