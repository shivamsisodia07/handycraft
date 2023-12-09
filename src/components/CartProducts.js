import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TokenService from "../services/token-service";
import { useNavigate } from "react-router-dom";
import './product.css';

const CartProducts = (props) => {
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

    const [showModal, setShowModal] = useState(false);

    const handleRemoveFromCart = () => {
        setShowModal(true);
    };

    const confirmRemove = () => {
        props.onRemove(props.id);
        setShowModal(false);
    };

    const cancelRemove = () => {
        setShowModal(false);
    };

    function handleQuantityChange(type) {
        props.onChange(props.id, type)
    }

    return (
        <>
            <div className="m-4 d-flex align-items-center border border-opacity-25 rounded-4 border-white pe-2">
                <div className="bg-white align-items-center justify-content-center d-flex rounded-4" style={{ height: "80px", width: "80px", outline: "solid" }}>
                    <img className="d-block m-2 object-fit-contain rounded-4" src={props.imgFile} alt="not loading" style={{ maxHeight: "80px", maxWidth: "80px" }} />
                </div>
                <h5 className="m-3 mx-2 text-white">{props.name}</h5>
                <div className="h-100 d-flex align-items-center">
                    <p className="btn btn-warning ms-auto p-2 rounded-4 text-black d-inline">${props.price}</p>

                    <div class="checkout-section">
                        <div class="btn-container">
                            <button class="minus-btn _23FHuj" onClick={() => handleQuantityChange("decrease")}>–</button>
                            <div class="input-container">
                                <input type="text" class="quantity-input _253qQJ" value={props.quantity} readOnly />
                            </div>
                            <button class="plus-btn _23FHuj" onClick={() => handleQuantityChange("increase")}>+</button>
                        </div>
                    </div>


                    <i className="bi bi-x-lg" onClick={handleRemoveFromCart}></i>
                </div>
            </div>

            <Modal show={showModal} onHide={cancelRemove}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to remove this item?</p>
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
        </>
    );
}

export default CartProducts;
