import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


 export const CartContext= createContext(null);
 export function CartContextProvider({children}){
  let[cart,setCart]=useState([]);
  let[count,setCount]=useState(0);


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

      setCount(data.count);
      
      //setCart(data.products);
      //console.log(cart);
      return data;
    }
    catch {(error)
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


return <CartContext.Provider value={{addToCartContext,getCartContext,removeItemContext,count,cart}}>
    {children}
</CartContext.Provider>

 }