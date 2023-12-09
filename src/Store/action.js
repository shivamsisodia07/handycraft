const addToCart = (data) => {
    return (dispatch) => {
        dispatch({ type: "ADD_TO_CART", payload: data })
    }
}

const updateCart = (data) => {
    console.log("action update call", data);
    return (dispatch) => {
        dispatch({ type: "UPDATE_CART", payload: data })
    }
}

const removeFromCart = (data) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: data })
    }
}
const clearCart = () => {
    return (dispatch) => {
        dispatch({ type: "CLEAR_CART" })
    }
}

export { addToCart, updateCart, removeFromCart,clearCart }