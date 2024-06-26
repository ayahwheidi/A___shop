import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import "../../../App.css"
import { FaStar } from 'react-icons/fa';



export default function AllProducts() {
const [limit,setLimit]=useState(4);
const [sort,setSort]=useState('');
let [search,setSearce]=useState('');
const [price,setPrice]=useState('');
  const [pageNumbers, setpageNumbers] = useState([]);
  const [products, setProducts] = useState([]);
  const pageNumbers1 = [];

  const getAllProducts = async (i = 1) => {

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${i}&limit=${limit}&sort=${sort}&search=${search}`);
    // console.log(i);
    console.log(data);
    // console.log(data?.products[0].name);
    for (let i = 1; i <= Math.ceil(data.total / data.page); i++) {

      //setpageNumbers(pageNumbers.push(i));
      pageNumbers1.push(i);
      //console.log(pageNumbers1);
    }
    setpageNumbers(pageNumbers1);
    setProducts(data.products);
    // console.log(pageNumbers);
    return data;
  }

  const handleSort=(e)=>{
    console.log("hhh");
   setSort(e.target.value);
  // console.log(sort);
  }
 const  getByprice =async(price)=>{
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${1}&limit=${limit}&sort=${sort}&search=${search}`);
  // console.log(i);
  console.log(data);
  return data;
 }
   

  // console.log(useQuery('Allproducts',getAllProducts));


  const { data, isLoading } = useQuery("AllProducts", getAllProducts);
useEffect(()=>{
  
  getAllProducts();
},[sort,price])
  // console.log(data);
  // console.log(data?.products[0].name);

  //console.log(PageNumbers);


  //console.log(pageNumbers);
  if (isLoading) {
    return <p>........Loading</p>
  }
  return (

    <>
    <select className="form-select  form-select-sm bg-light fw-bolder w-25 my-3 "  onChange={handleSort} >
      <option selected ><Link>Sort by</Link></option>
      <option value="price">sort by price(low to high)</option>
      <option value="-price">sort by price(high to low)</option>
      <option value="name">sort by name</option>
    </select>
<input id="price" type='search' />
 
<button onClick={()=>{
  setPrice(document.getElementById('price').value);
 console.log(price);
 getByprice(price);

}}>search</button>
      <div className="container  ">
        <div className="row mb-5 ">
          
          {products ? products.map((ele,index) =>

            <div className="col-lg-3 text-center mt-5" key={index}>

              <img className=" img-flui w-75  mb-1  " src={ele.mainImage.secure_url} />
              <h2 className="fs-4">{ele.name}</h2>
              <p className='text-danger fw-bold'>{ele.price}$</p>
              <div className="d-flex flex-row text-center ">
                
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;

                  return (

                    <FaStar
                      
                      size={20}
                      color={currentRating <= (ele.avgRating ) ? "#ffc107" : "#a0a0a0"}
                    />
                  );
                })}
              
                <a className=' ms-4 text-decoration-none mb-3'>{ele.reviews.length} rating</a>
              </div>
              <Link className="text-dark text-decoration-none bg-info-subtle rounded-3 p-2" to={`/products/${ele._id}`}>Details</Link>
              

            </div>
          
          ) : <p>not found</p>}
        </div>
        <nav className=' mt-5 d-flex justify-content-center ' aria-label="Page navigation example ">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {pageNumbers?.map((number) => {
            return (
              <li className="page-item" key={number}>
                <Link
                 to ={`?page=${number}`}
                                   onClick={(e) => {
                    getAllProducts(number);
                    e.preventDefault();
                  }}
                  className="page-link"
                >
                  {number}
                </Link>
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
      </div>
      
      

     
    </>
  )
}
