import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../Store/action";
import CartProducts from "./CartProducts";
import { placeOrder } from "../utils/order-apis/order";
import TokenService from "../services/token-service";
import { useNavigate } from "react-router-dom";
const Cart = (props) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state);
    const [total, setTotal] = useState(0);
    console.log(cartItems)

    const remove = (product) => {
        const confirm = window.confirm("Are you sure you want to remove this item from cart?");
        if (confirm) {
            dispatch(removeFromCart(product))
        }
    }
    const changeQuantity = (productId, type) => {
        dispatch(updateCart({ productId, type }))
    }

    const orderPlaced = async () => {
        const res = await placeOrder(cartItems);
        if (res.error) {
            alert(res.error);
            return;
        }
        else {
            alert("Order Placed Successfully");
            dispatch(clearCart());
        }
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
        let sum = 0;
        cartItems.forEach((item) => {
            sum += item.quantity * item.product.price;
        })
        setTotal(sum);


    }, [cartItems])
    return (
        <>
            {(TokenService.hasAuthToken() && TokenService.getRole() == "consumer") ? (<>
                <div className="container">
                    {cartItems.length > 0 ? (
                        <div>
                            {cartItems.map((item, idx) => {
                                return (
                                    <CartProducts item={item.product} onChange={changeQuantity} quantity={item.quantity} onRemove={remove} key={idx}  />
                                )
                            })}
                        </div>
                    ) : "No Items in the Cart"}

                    <div className=" m-4 text-white">
                        <div className="row">
                            <div className="col">Subtotal</div>
                            <div className="col ms-auto">{total}</div>
                        </div>
                        <div className="row">
                            <div className="col">Shipping</div>
                            <div className="col ms-auto">Free</div>
                        </div>
                        <div className="row mt-3">
                            <h5 className="col">TOTAL</h5>
                            <h5 className="col ms-auto">$ {total}</h5>
                        </div>
                    </div>
                    <div className="btn btn-success p-3" onClick={orderPlaced}>
                        Place Order
                    </div>

                </div>
            </>) :
                (<></>)
            }
        </>

    );
}
export default Cart;