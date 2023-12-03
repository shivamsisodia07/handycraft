import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/action";
import CartCounter from "./CartCounter";
const ProductLarge = () => {
    window.scrollTo(0, 0);
    const { state } = useLocation();
    const dispatch = useDispatch();
    const listofAddedProducts = useSelector((state) => state);
    function handleAddToCart() {
        dispatch(addToCart(state));
    }
    return (
        <>
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
                    <h5 className="text-success ms-5" style={{ margin: "0px" }}>
                        Special Price
                    </h5>
                    <h2 className="mx-5 mt-1 d-flex text-white align-items-center">
                        MRP:
                        ${state.price}
                        <div className="text-success mx-4">25% off</div>
                    </h2>
                    <p className="ms-5 my-3 bg-success text-white rounded-5 px-3 d-inline fs-4 align-items-center">
                        5
                        <i className="ms-1 bi bi-star-fill fs-5"></i>
                    </p>
                    <p className="text-muted d-inline ms-2">
                        240 reviews
                    </p>
                    <br />
                    <p className="ms-5 my-3 bg-body-tertiary text-secondary rounded-5 px-3 fs-6 align-items-center d-inline">
                        Free Delivery
                    </p>
                    <p className="mx-5 my-3 fs-5">{state.description}</p>
                    <div className="mx-5 d-flex mt-5 justify-content-evenly">
                        {console.log(listofAddedProducts, state)}
                        {((listofAddedProducts.length > 0) && (listofAddedProducts.find((item) => item.product.id === state.id))) ? (
                            <CartCounter
                                state={state}
                                listOfAddedProduct={listofAddedProducts}
                            />
                        ) : (
                            <div
                                className={`btn btn-outline-primary btn-lg`}
                                id="addtocartbtn"
                                style={{ width: "45%" }}
                                onClick={() => handleAddToCart()}
                            >
                                Add to cart
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </>
    );




}
export default ProductLarge;