import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { FaStar } from 'react-icons/fa';
export default function AllProducts() {
const [rating,setRating]=useState(null);
  const [pageNumbers,setpageNumbers] = useState([]);
  const pageNumbers1 = [];

  const getAllProducts = async (i) => {

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${i}`);
   // console.log(i);
    console.log(data);
    console.log(data?.products[0].name);
    for (let i = 1; i <= Math.ceil(data.total / data.page); i++) {

      //setpageNumbers(pageNumbers.push(i));
      pageNumbers1.push(i);
      //console.log(pageNumbers1);
    }
    setpageNumbers(pageNumbers1);
   // console.log(pageNumbers);
    return data;
  }

  // console.log(useQuery('Allproducts',getAllProducts));

  const { data, isLoading } = useQuery("AllProducts", getAllProducts);

  console.log(data);
  console.log(data?.products[0].name);

  //console.log(PageNumbers);
  
 
  //console.log(pageNumbers);
  if (isLoading) {
    return <p>........Loading</p>
  }
  return (

    <>

      <div className="container">
        <div className="row">
          {data?.products ? data?.products.map((ele) =>

            <div className="col-lg-4">
              <h2>{ele.name}</h2>
              <img className=" img-flui w-25" src={ele.mainImage.secure_url} />
              
              <p>{ele.price}</p>

            </div>

          ) : <p>not found</p>}
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {pageNumbers?.map((number)=>{
            return(
              <li className="page-item" key={number}>
              <a
                href="!#"
                onClick={(e) => {
                  getAllProducts(number);
                  e.preventDefault();
                }}
                className="page-link"
              >
                {number}
              </a>
            </li>

            )
          })}
         


          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      {[...Array(5)].map((star,index)=>{
const currentRating=index+1;
  return (
    <label>
      <input
       type='hidden' 
       name='rating' 
       value={currentRating}
       onClick={()=>setRating(currentRating)}
       />
      <FaStar 
      className='star'
       size={50}
       color={currentRating <= (rating)?"#ffc107":"#e4e59n"}
        />
    </label>
  
  );
})}
    </>
  )
}
