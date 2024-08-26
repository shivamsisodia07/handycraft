import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TokenService from "../services/token-service";
import { useNavigate } from "react-router-dom";
import '../assets/css/product.css';


const CartProducts = (props) => {
    const navigate = useNavigate();


    const [showModal, setShowModal] = useState(false);

    const handleRemoveFromCart = () => {
        setShowModal(true);
    };

    const confirmRemove = () => {
        props.onRemove(props.item.id);
        setShowModal(false);
    };

    const cancelRemove = () => {
        setShowModal(false);
    };

    function handleQuantityChange(type) {
        props.onChange(props.item.id, type)
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
            {(TokenService.hasAuthToken() && TokenService.getRole() == "consumer") ? (<>
                <div className="m-4 d-flex align-items-center border border-opacity-25 rounded-4 border-white pe-2">
                    <div className="bg-white align-items-center justify-content-center d-flex rounded-4" style={{ height: "200px", width: "200px", outline: "solid" }}>
                        <img className="d-block  object-fit-contain rounded-4" src={"http://localhost:5000/static/uploads/products/" + props.item.imgFile} alt="not loading" style={{ height: "100%", width: "100%" }} />
                    </div>
                    <h5 className="m-3 mx-2 text-white">{props.item.name}</h5>
                    <div className="h-100 d-flex align-items-center">
                        <p className="btn btn-warning ms-auto p-2 rounded-4 text-black d-inline">${props.item.price}</p>

                        <div class="checkout-section">
                            <div class="btn-container">
                                <button class="minus-btn _23FHuj" onClick={() => handleQuantityChange("decrease")}>–</button>
                                <div class="input-container">
                                    <input type="text" class="quantity-input _253qQJ" value={props.quantity} readOnly />
                                </div>
                                <button class="plus-btn _23FHuj" onClick={() => handleQuantityChange("increase")}>+</button>
                            </div>
                        </div>

                        <button className="btn btn-danger" onClick={handleRemoveFromCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </button>

                    </div>
                </div>

                <Modal show={showModal} onHide={cancelRemove}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{color:"black"}}>Are you sure you want to remove this item?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelRemove}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={confirmRemove}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>) :
                (<></>)
            }
        </>
    );
}

export default CartProducts;
