import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SendCode() {
const navigate=useNavigate();
    const initialValues={
      
        email:'',
      
    }
  
    const onSubmit=async (values)=>{
 //console.log(values.email);
 const userEmail=values.email;
 //console.log(userEmail);
 const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{email:userEmail});
//console.log(data);
if(data.message=='success'){

    navigate('/forgetPassword');
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
    <label htmlFor="exampleInputEmail1" className="form-label"> Enter your Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email'  value={formik.values.email} onChange={formik.handleChange} />

  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

   </>
  )
}