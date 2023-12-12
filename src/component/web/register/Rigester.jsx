import React from 'react'
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';
import { registerSchema } from '../validate/Validate.js';
import axios from 'axios';
import {  toast } from 'react-toastify';
export default function Rigester() {

    const initialValues={
        userName:'',
        email:'',
        password:'',
        image:'null'
    }
const onSubmit=async (values)=>{
  // console.log(values);

const formData=new FormData();

formData.append('userName',values.userName);
formData.append('email',values.email);
formData.append('password',values.password);
formData.append('image',values.image);

//for(let data of formData.entries()){
 //   console.log(data);
//}

const {data}=await axios.post('https://ecommerce-node4.vercel.app/auth/signup',formData);
//console.log(data);

if(data.message=='success'){
    formik.resetForm();
    toast('acount created successfully,plz verify your email to login', {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}
        }



const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema:registerSchema

})
 const changeImageValue =e=>{
    //console.log('image is changed');
    //console.log(e.target.files[0]);
    formik.setFieldValue('image',e.target.files[0])
 }
const inputs =[
{
    id:'userName',
    type:'text',
    name:'userName',
    title:'user name',
    value:formik.values.userName,
},
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
{

    id:'image',
    type:'file',
    name:'image',
    title:' user image',
onChange:changeImageValue,
    

}
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
         onChangee={ ele.onChange || formik.handleChange}
        onBluree={formik.handleBlur}
        touched={formik.touched}
         />
}


);
  return (
    <>
    <div className='container mt-5 '>
    
     <h2>Create acount</h2>

     <form onSubmit={formik.handleSubmit} encType='multipart/form-data'  className='bg-primary-subtle bg-opacity-25 mt-3 w-auto d-flex align-items-center justify-content-center flex-column'>
        {renderInputs}
      <button type='submit' className='d-flex align-items-center justify-content-center m-auto btn btn-primary' disabled={!formik.isValid}> Rigester</button>
     </form>
     </div>
     </>
  )
}
