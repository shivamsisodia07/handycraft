import React, { useEffect } from "react"
import { getOrders } from "../utils/order-apis/order"
import { useNavigate } from "react-router-dom";
const Order = (props) => {
    let navigate = useNavigate();
    if (!TokenService.hasAuthToken()) {
        navigate("/login");
        return;
    }
    else if (TokenService.getRole() != "consumer") {
        props.showalert("You are not authorized to access this page", "danger");
        navigate("/");
        return;
    }
    const [orders, setOrders] = useState(null);


    useEffect(() => {
        (async () => {
            const res = await getOrders();
            if (res.error) {
                props.showalert(res.error, "danger");
                return;
            }
            else {
                setOrders(res.data.orders);
                console.log(res);
            }

        })()

    }, [])
    return (
        <>
            <div className="container">
                <h3>Orders</h3>
                <div className="card">
                    {orders && orders.map((order) => (
                        <div className="card-body">
                            <h5 className="card-title">Order Id: {order.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Order Status: {order.status}</h6>
                            <p className="card-text">Items: {order.items.map((item) => (
                                <div>
                                    <p>{item.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                            ))}</p>
                            <p>Total: {order.total}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Order;