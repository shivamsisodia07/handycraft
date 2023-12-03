const initialstate = []
const reducer = (state = initialstate, action) => {
    const newState = [...state];
    switch (action.type) {
        case "ADD_TO_CART":
            const existingProduct = newState.find((item) => {
                if (item.product.id === action.payload.id) {
                    item.quantity += 1;
                }
                return item.product.id === action.payload.id;
            })
            if (existingProduct) {
                return ([...newState])
            }
            const newItem = { quantity: 1, product: action.payload };
            return ([...newState, newItem]);
        case "UPDATE_CART":
            console.log("reducer update call", action.payload);
            newState.forEach((item) => {
                if (item.product.id === action.payload.productId) {
                    if (action.payload.type === "inc") {
                        item.quantity += 1;
                    }
                    else if (action.payload.type === "dec" && item.quantity > 1) {
                        console.log("bekbcek");
                        item.quantity -= 1;
                    }
                }
            })
            return ([...newState]);
        case "REMOVE_FROM_CART":
            const index = newState.findIndex((item) => {
                return item.product.id === action.payload.id;
            })
            newState.splice(index, 1);
            return ([...newState]);
        default:
            return state

    }
}
export default reducer;