import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';
import { loginSchema } from '../validate/Validate.js';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserFeture.jsx';


export default function Login() {
    const navigate=useNavigate();
   let {userToken,setUserToken}=useContext(UserContext);
console.log(userToken);
if(userToken){
   navigate(-1);
}
    const initialValues={
        
        email:'',
        password:'',
      
    }
const onSubmit=async (values)=>{
   // console.log(values);

const {data}=await axios.post('https://ecommerce-node4.vercel.app/auth/signin',values);
//console.log(data);
if(data.message=='success'){
 localStorage.setItem("userToken",data.token);
 setUserToken(data.token);
console.log(userToken);
 toast.success('login succesfuly', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
    navigate('/');

}

        }



const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema:loginSchema

})

const inputs =[

{
    id:'email',
    type:'email',
    name:'email',
    title:'user email',
    value:formik.values.email,
},
{
    id:'password',
    type:'password',
    name:'password',
    title:' user password',
    value:formik.values.password,
},

];
const renderInputs=inputs.map((ele,index)=>{
    return <Input
      type={ele.type}
       id={ele.id}
        name={ele.name}
         title={ele.title} 
         key={index} 
         value={ele.value}
         errors={formik.errors}
         onChangee={ formik.handleChange}
        onBluree={formik.handleBlur}
        touched={formik.touched}
         />
}


);
  return (
    <>
    <div className='container mt-5 '>
    
     <h2>Login</h2>

     <form onSubmit={formik.handleSubmit} encType='multipart/form-data'  className='bg-primary-subtle bg-opacity-25 mt-3 w-auto d-flex align-items-center justify-content-center flex-column'>
        {renderInputs}
      <button type='submit' className='d-flex align-items-center justify-content-center m-auto btn btn-primary' disabled={!formik.isValid}>  Login</button>
     </form>
     <Link to='/sendcode ' className='text text-decoration-none text-danger ' >Forget Passwod</Link>
     </div>
     </>
  )
}
