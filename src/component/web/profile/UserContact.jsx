import React, { useContext } from 'react'
import { UserContext } from '../../context/UserFeture';

export default function UserContact() {
    let {userData,loading}=useContext(UserContext);

    if(loading){
        return <p>...loading</p>
    }
  return (

    <div>
        <h2>{userData.email}</h2>
        <p>{userData.phone}</p>
    
    </div>
  )
}
