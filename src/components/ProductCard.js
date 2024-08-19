import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/product.css";

export default function ProductCard(props) {
  var propsvar = { ...props };

  const navigate = useNavigate();

  function handleclick() {
    navigate("/productlarge", { state: { ...props } });
  }

  /* ANimation  */
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    
    const handleScroll = () => {
      const element = elementRef.current;
      if (element) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = -170;

        const isVisible = elementTop < windowHeight - elementVisible;
        setIsVisible(isVisible);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={` mt-4 mx-2 border rounded-4 shadow-lg d-flex flex-column hover-shadow box prodct ${
        isVisible ? "active" : ""
      } `}
      ref={elementRef}
      style={{ width: "180px", overflow: "hidden" }}
      onClick={handleclick}
     
    >
      <div
        className="bg-white w-100 align-items-center h-50 justify-content-center d-flex object-fit-contain"
        style={{ overflow: "hidden" }}
      >
        <img
          className="thisimage d-block m-3 object-fit-contain"
          src={"http://localhost:5000/static/uploads/products/"+propsvar.imgFile}
          alt="not loading" /* style={{ maxHeight: "200px", maxWidth: "190px" }} */
        />
      </div>
      <h4 className="m-2 mb-3" style={{color:'red'}}>{propsvar.name}</h4>
      <div className="mt-auto mb-3 d-flex justify-content-evenly align-items-center">
        <p className="btn btn-outline-warning rounded-4 p-2">
          $ {propsvar.price}
        </p>
        <p>
          <span className="btn btn-success rounded-4 py-0 px-2">
            5
            <i className="bi bi-star-fill ms-1" />
          </span>
         240
        </p>
      </div>
    </div>
  );
}
