import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { CartContext } from "../../context/FetureCartContext.jsx";
import "../../../App.css";
import { useFormik } from "formik";
import { UserContext } from "../../context/UserFeture.jsx";
export default function Product() {
 
let [rating, setRating] = useState(null);
let [hover, setHover] = useState(null);
let [comment,useComment]=useState('');


  let {userToken}=useContext(UserContext);
  
  const { productId } = useParams();
  


  const handelComment=(e)=>{
    useComment(e.target.value);
  }
  
  const sendReview =async  (e) => {
    
    e.preventDefault();
    console.log(comment);
    console.log(rating);
   
 const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,{comment,rating},{headers:{ authorization: `Tariq__${userToken}` }});
 console.log(data);


};
  //const formik = useFormik({
  //  initialValues,
   // onSubmit,
  //});

  const { addToCartContext, count } = useContext(CartContext);

  const addToCart = async (productId) => {
    // console.log(productId)
    const result = await addToCartContext(productId);
    //console.log(result);
  };

  // console.log(useParams());

  //const categoryId=useParams().categoryId;
  //console.log(categoryId);

  const getProductDetailes = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    console.log(data);
    return data.product;
  };
  const { data, isLoading } = useQuery("product_datailes", getProductDetailes);
  console.log(data);

  if (isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-4 d-flex ">
          <div>
            <img className=" w-100 me-5" src={data.mainImage.secure_url} />
          </div>
          <div>
            {data.subImages.map((img) => (
              <div className="w-25  d-flex  me-4">
                <img className=" img-fluid mt-3  ms-4" src={img.secure_url} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-8 d-flex">
          <div></div>

          <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p className="fw-bold">${data.price}</p>
            <button
              className="btn btn-outline-info "
              onClick={() => addToCart(data._id)}
            >
              Add To Cart
            </button>

            <div className="  d-flex ">
              <div className="w-25">
                {data.reviews &&
                  data.reviews.map((review, index) => {
                    return (
                      <>
                        <div className="co-lg-3 mt-5" key={index}>
                          <div className=" d-flex mb-1">
                            <img
                              className="w-25 image me-2 rounded-circle"
                              src={review.createdBy.image.secure_url}
                            />
                            <p className="mt-3"> {review.createdBy.userName}</p>
                          </div>
                          <h2 className="fs-5">{review.comment}</h2>

                          {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;

                            return (
                              <FaStar
                                size={20}
                                color={
                                  currentRating <= review.rating
                                    ? "#ffc107"
                                    : "#a0a0a0"
                                }
                              />
                            );
                          })}
                        </div>
                      </>
                    );
                  })}{" "}
              </div>

              <div className="me-auto">
                <form onSubmit={sendReview}>
                  <h2>Add Review</h2>
                  <div className="row">
                    <p>Add your comment</p>
                    <div className="coupon-form">
                      <input
                        type="text"
                        placeholder="Comment"
                        name="comment"
                       
                        onChange={handelComment}
                      />
                    </div>
                  </div>
               <div>
               {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label>
            <input className="d-none"
              type='radio'
              name='rating'
              
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="star"
              size={30}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#a0a0a0"}
             onMouseOver={()=>setHover(currentRating)}
             onMouseOut={()=>setHover(null)}
            />
          </label>

        );
      })}
     

               </div>
                  <div className="row">
                    
                    <div >
                      <input
                        type="submit"
                       
                       value=" add review"
                  
                      />
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
