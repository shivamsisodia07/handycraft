import { useState, useEffect } from "react";
import TokenService from "../services/token-service";
import { close, logo, menu } from "../assets";
import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSackDollar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { getCrafter } from "../utils/crafter-apis/crafter";
import { getConsumer } from "../utils/consumer-apis/consumer";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [money, setMoney] = useState(0);
  const logOutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearRole();
    TokenService.clearIsUpdate();
    navigate("/login");
  };
  useEffect(() => {
    if (TokenService.hasAuthToken()) {
      (async () => {
        if (TokenService.getRole() === "crafter") {
          const res = await getCrafter();
          console.log("response", res);
          if (res.error) {
            console.log(res.error);
          } else {
            setMoney(res.data.record.money);
          }
        } else if (TokenService.getRole() === "consumer") {
          const res = await getConsumer();
          if (res.error) {
            console.log(res.error);
          } else {
            setMoney(res.data.record.money);
          }
        }
      })();
    }
  }, []);

  return (
    <nav className="w-full flex justify-between items-center navbar">
      <img src={logo} alt="KrishiBazaar" className="w-[90px] h-[70px]" />
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        ></div>
      </div>
      {TokenService.hasAuthToken() ? (
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li className="font-poppins font-normal cursor-pointer text-[18px]">
            <Link to="/">
              <i className="fa fa-home"> </i>
              <span className="navlink-text"> Home </span>
            </Link>
          </li>
          {TokenService.getRole() == "crafter" ? (
            <>
              <li className="font-poppins font-normal cursor-pointer text-[18px]">
                <Link to="/add-item">
                  <i className="fa fa-list"> </i>
                  <span className="navlink-text"> Add item </span>
                </Link>
              </li>
              <li className="font-poppins font-normal cursor-pointer text-[18px]">
                <Link to="/inventory">
                  <i className="fa fa-list"> </i>
                  <span className="navlink-text"> Inventory </span>
                </Link>
              </li>
              <li className="font-poppins font-normal cursor-pointer text-[18px]">
                <Link to="/crafter/profile">
                  <i className="fa fa-list"> </i>
                  <span className="navlink-text"> Profile </span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="font-poppins font-normal cursor-pointer text-[18px]">
                <Link to="/">
                  <i className="fa fa-list"> </i>
                  <span className="navlink-text"> My Orders </span>
                </Link>
              </li>
              <li className="font-poppins font-normal cursor-pointer text-[18px]">
                <Link to="/consumer/profile">
                  <i className="fa fa-list"> </i>
                  <span className="navlink-text"> Profile </span>
                </Link>
              </li>
              <li className="font-poppins font-normal cursor-pointer text-[18px]">
                <Link to="/cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </li>
            </>
          )}
          <li className="font-poppins font-normal cursor-pointer text-[18px]">
            <Link to="/">
              <FontAwesomeIcon icon={faSackDollar} />${money}
            </Link>
          </li>

          <li>
            <Link to="/" onClick={logOutClick}>
              <i className="fa fa-sign-out"> </i>
              <span className="navlink-text"> Log Out </span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li className="font-poppins font-normal cursor-pointer text-[18px]">
            <Link to="/"> Home </Link>
          </li>

          <li className="font-poppins font-normal cursor-pointer text-[18px]">
            <Link to="/login"> Login </Link>
          </li>
          <li className="font-poppins font-normal cursor-pointer text-[18px]">
            <Link to="/register"> Register </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
