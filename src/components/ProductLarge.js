import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/action";
import CartCounter from "./CartCounter";
import TokenService from "../services/token-service";
const ProductLarge = (props) => {
    const navigate = useNavigate();

    window.scrollTo(0, 0);
    const { state } = useLocation();
    const dispatch = useDispatch();
    const listofAddedProducts = useSelector((state) => state);
    function handleAddToCart() {
        dispatch(addToCart(state));
    }
    useEffect(() => {
        if (!TokenService.hasAuthToken()) {
           
            navigate("/login");
            return;
        }
        else if (TokenService.getRole() != "consumer") {
            props.showalert("You are not authorized to access this page", "danger");
            navigate("/");
            return;
        }
    }, [])
    return (
        <>
            {TokenService.hasAuthToken() && TokenService.getRole() == "consumer" ?
                (<>
                    <div className="container d-flex justify-content-center">
                        <div
                            className="bg-white align-items-center justify-content-center d-flex object-fit-contain m-5 rounded-4"
                            style={{ width: "40%" }}
                        >
                            <img
                                className=" d-block m-3 object-fit-contain"
                                src={"http://localhost:5000/static/uploads/products/" + state.imgFile}
                                alt="not loading"
                                style={{ maxHeight: "500px", maxWidth: "400px" }}
                            />
                        </div>
                        <div className="w-50">

                            <h2
                                className="mx-5 text-white mb-3"
                                style={{
                                    fontFamily: "Times New Roman",
                                    textShadow: "0 0 5px blue",
                                }}
                            >
                                {state.name}
                            </h2>
                            <h5 className="mx-5 my-3 fs-5 text-start">{state.description}</h5>
                            <h2 className="mx-5 mt-1 text-white text-start">
                               
                            ₹{state.price}

                            </h2>
                           
                            <div className="mx-5 d-flex mt-5 flex-row justify-content-between col-3">
                                {console.log(listofAddedProducts, state)}
                                {((listofAddedProducts.length > 0) && (listofAddedProducts.find((item) => item.product.id === state.id))) ? (
                                    listofAddedProducts.map((item) => {
                                        if (item.product.id === state.id)
                                            return <CartCounter
                                             state={state}
                                             item={item}  
                                            />
                                                
                                    })
                                ) : (
                                    <div
                                        className="btn btn-outline-primary btn-lg col-12"
                                        id="addtocartbtn"
                                        onClick={() => handleAddToCart()}
                                    >
                                        Add to cart
                                    </div>
                                )}


                            </div>
                            <div className="d-flex flex-row justify-content-between col-8 mx-5 my-3">
                            <p className="my-3 bg-success rounded-5 p-2 fs-6 text-center text-white">
                                5
                                <i className="ms-1 bi bi-star-fill fs-6"></i>
                            </p>
                            <p className="my-3 bg-success rounded-5 p-2 fs-6 text-center text-white">
                                240 reviews
                            </p>
                         
                            <p className="my-3 rounded-5 p-2 fs-6 text-center bg-success ">
                                Free Delivery
                            </p>
                            </div>
                        </div>
                    </div>
                </>) : (<></>)}
        </>
    );




}
export default ProductLarge;