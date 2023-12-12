
import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
const navigate=useNavigate();
    const initialValues={
      
        email:'',
        password:'',
        code:''
      
    }
  
    const onSubmit=async (values)=>{
 //console.log(values);

 const {email,password,code}=values;

 const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,{email,password,code});
//console.log(data);
if(data.message=='success'){

    toast.success('Password aupdated successfuly', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

   navigate('/login');
}
    }

    
    const formik=useFormik({
        initialValues,
        onSubmit,
    })


  


  return (
   <>
 <form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label"> Enter your Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email'  value={formik.values.email} onChange={formik.handleChange} />
    
    <label htmlFor="password" className="form-label"> Enter your Password</label>
    <input type='password' className="form-control" id="password" aria-describedby="emailHelp" name='password'  value={formik.values.password} onChange={formik.handleChange} />
   
    <label htmlFor="code" className="form-label"> Enter The Code</label>
    <input type="text" className="form-control" id="code" aria-describedby="emailHelp" name='code'  value={formik.values.code} onChange={formik.handleChange} />

  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

   </>
  )
}