import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rigester from '../register/Rigester'
import { CartContext } from '../../context/FetureCartContext';
import { UserContext } from '../../context/UserFeture';

export default function Navbar() {
  const { count } = useContext(CartContext);

  let { userToken,setUserToken,userData ,setUserData} = useContext(UserContext);

  let navigate = useNavigate();
 
  const logout = () => {
   // console.log('hhh');
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate('/');
  }
  //console.log(user);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary text-bg-danger ">
        <div className="container">
          <a className="navbar-brand" href="#">A-shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>


              <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li>


              <li className="nav-item">
                <a className="nav-link" href="#">Products</a>
              </li>
              {userToken ? <><li className="nav-item">
                <Link className="nav-link" to='/cart'>Cart({count})</Link>
              </li> </> : null}




            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userData!=null?userData.userName:'Account'}

                </a>
                <ul className="dropdown-menu ">
                  {userToken == null ? <>
                    <li><Link className="dropdown-item" to="/register">register</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/login">login</Link></li>

                  </> : <>
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                  </>}

                </ul>
              </li>
            </ul>

          </div>
        </div>
      </nav>





    </>
  )
}
