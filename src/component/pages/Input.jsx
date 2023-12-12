import React from 'react'

export default function Input({type='text',id,name,title,value,onChangee,errors,onBluree,touched}) {
  //console.log(errors);
  //console.log(touched);
  return (
<>
<div className='input-group mb-3 d-flex flex-column'>

<lable className='me-3' htmlFor={id}>{title}</lable>
<input type={type} name={name} id={id} value={value} onChange={onChangee} onBlur={onBluree}></input>
  {touched[name]&&errors[name]&&  <p className=' text text-danger'>{errors[name]}</p>} 
    
</div>

</>
  )
}
