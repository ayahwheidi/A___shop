import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserFeture.jsx';
import { useQuery } from 'react-query';


export default function UserOrders() {
  let [totalPrice,settotalPrice]=useState(0);
 
    let {userToken}=useContext(UserContext);
   console.log(userToken);
const UserOrders= async()=>{
const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,{headers:{ authorization: `Tariq__${userToken}` }});

console.log(data.orders[0].products);
return data;

}

  let {data,isLoading}=useQuery("userOrders",UserOrders);

  return (
<>

<table className="table table-striped table-hover">
  <thead >
    <tr scope="row"  >
      <th scope="col" className='text text-danger'>#</th>
      <th scope="col" className='text text-danger'>Address</th>
      <th scope="col" className='text text-danger'>paymentType</th>
      <th scope="col"  className='text text-danger' >status</th>
      <th scope="col" className='text text-danger'>Price</th>
    </tr>
  </thead>
{data?.orders.length ?data?.orders.map((ele,index)=>

  <tbody>
    <tr>
      <td colspan="2">{index}</td>
      <td>{ele.address}</td>
      <td>{ele.paymentType}</td>
      <td>{ele.status}</td>
      <td>{ele.finalPrice}</td>
      
    </tr>
  </tbody>
  ) 
 :<p>not found</p> }</table>



    </>
  )
}
