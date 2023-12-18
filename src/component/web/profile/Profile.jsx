import React, { useContext } from 'react'
import { UserContext } from '../../context/UserFeture'
import { Link, Outlet } from 'react-router-dom';
import style from './Profile.module.css'
export default function Profile() {
    let {userData,loading}=useContext(UserContext);
    if(loading){
        return <p>...loading</p>
    }
    console.log(userData);
  return (
    <aside className='d-flex gap-5'>
<div>
    <nav className='d-flex flex-column'>
        <Link className='text-decoration-none' to='info'>Info</Link>
        <Link className='text-decoration-none' to='contact'>Contact</Link>
        <Link className='text-decoration-none' to='orders'>Orders</Link>
    </nav>
</div>

<div>
    <Outlet />
</div>
    </aside>
   
  )
}
