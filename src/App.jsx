import { RouterProvider} from "react-router-dom";

import { CartContext, CartContextProvider } from "./component/context/FetureCartContext.jsx";
import {router} from "./layout/Routes.jsx"
import { useContext, useEffect } from "react";
import { UserContext } from "./component/context/UserFeture.jsx";


export default function App() {
//let{getCartContext}=useContext(CartContext);
  let {setUserToken}=useContext(UserContext);
  
  useEffect(()=>{
   if(localStorage.getItem("userToken") !=null){
   setUserToken(localStorage.getItem("userToken"));
   // getCartContext();
  }
  },[])
  return (
    
<CartContextProvider>
   
    
    <RouterProvider router={router} />
    
    </CartContextProvider>
    
  )
}
