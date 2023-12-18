import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


 export const CartContext= createContext(null);
 export function CartContextProvider({children}){

  let[cart,setCart]=useState([]);
  let[count,setCount]=useState(0);
  let[increascount,setIncreasCount]=useState(0);
  const [loading,setLoading]=useState(true);


  const addToCartContext= async(productId)=>{
try{
  const token =localStorage.getItem("userToken");
   //console.log(token);
   //console.log(productId);
   const {data} =await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{productId},{headers:{Authorization: `Tariq__${token}`}})
   //console.log(data);
   //console.log(data.cart.products.length)
  setCount(data.cart.products.length);
   if(data.message=='success'){
    toast.success('product added successfuly', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    
   }
   return data;
}
catch(error){
console.log(error);
}

  }

  const getCartContext=async ()=>{
    try{
      const token =localStorage.getItem("userToken");
      const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,{headers:{Authorization:`Tariq__${token}`}});
console.log(data);
      setCount(data.count);
      setLoading(false);
      
      //setCart(data.products);
      //console.log(cart);
      return data;
    }
    catch {(error)
    console.log(error);
    }
   

  }
  
  const clearCartContext=async ()=>{
    try{
      const token =localStorage.getItem("userToken");
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{},{headers:{Authorization:`Tariq__${token}`}});
console.log(data);
      //setCount(data.count);
      //setLoading(false);
      //setCart(data.products);
      //console.log(cart);
      return data;
    }
    catch {(error)
    console.log(error);
    }
   

  }



  const increaseContext=async (productId)=>{
    try{
      //console.log('increase');
      const token =localStorage.getItem("userToken");
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId:productId},{headers:{Authorization:`Tariq__${token}`}});
     
     console.log(data);
     getCartContext();
     setIncreasCount(increascount++);
     //console.log(increascount);
      //return data;
    }
    catch {
    console.log(error);
    }
  }
  const decreaseContext=async (productId)=>{
    try{
      //console.log('decreas');
      const token =localStorage.getItem("userToken");
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId:productId},{headers:{Authorization:`Tariq__${token}`}});
     
     console.log(data);
     
      //return data;
    }
    catch {
    console.log(error);
    }
  }

  

  const removeItemContext=async (productId)=>{
    try{
      const token =localStorage.getItem("userToken");
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId:productId},{headers:{Authorization:`Tariq__${token}`}});
     
     // console.log(data.cart.products);
     //setCart(data.cart.products);
     //console.log(cart);
     setCount(data.cart.products.length);
     setCart(data.cart.products);
     //console.log(data.cart.products);
      return data;
    }
    catch {(error)
    console.log(error);
    }
  }
  useEffect(()=>{
    getCartContext();
},[count])


return <CartContext.Provider value={{addToCartContext,getCartContext,removeItemContext,count,cart,loading,clearCartContext,increaseContext,decreaseContext}}>
    {children}
</CartContext.Provider>

 }