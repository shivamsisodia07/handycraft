import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateCart } from "../Store/action";

const CartCounter = ({ state, listOfAddedProduct }) => {
    console.log("cartcounter");
    const dispatch = useDispatch();
    return (
        <div>
            {listOfAddedProduct.map((item) => {
                if (item.product.id === state.id && item.quantity > 1)
                    return <button
                        className={`btn btn-success btn-lg`}
                        onClick={() => dispatch(updateCart({ productId: state.id, type: "dec" }))}
                    >
                        -
                    </button>
            })}

            {listOfAddedProduct.map((item) => {
                if (item.product.id === state.id)
                    return <span className="mx-2 p-2 rounded text-dark bg-light" key={item.product.id}>{item.quantity}</span>;
            })}
            <button
                className={`btn btn-success btn-lg`}
                onClick={() => dispatch(addToCart(state))}
            >
                +
            </button>
            <button
                className={`btn btn-danger btn-lg`}
                onClick={() => dispatch(removeFromCart(state))}
            >
                Remove From Cart
            </button>

        </div>
    );
};

export default CartCounter;
