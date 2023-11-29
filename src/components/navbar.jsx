import { useState, useEffect } from "react";
import TokenService from "../services/token-service";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { getCrafter } from "../utils/crafter-apis/crafter";
import { getConsumer } from "../utils/consumer-apis/consumer";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [money, setMoney] = useState(0);
  const logOutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearRole();
    TokenService.clearIsUpdate();
    window.location = "/login";
  };
  useEffect(async () => {
    if (TokenService.hasAuthToken()) {
      if (TokenService.getRole() == "crafter") {
        const res = await getCrafter();
        if (res.error) {
          console.log(res.error);
        } else {
          setMoney(res.money);
        }
      } else if (TokenService.getRole() == "consumer") {
        const res = await getConsumer();
        if (res.error) {
          console.log(res.error);
        } else {
          setMoney(res.money);
        }
      }
    }
  });

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
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a id="navi" href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {TokenService.hasAuthToken() ? (
        <nav className="w-full flex py-6 justify-between items-center navbar ">
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
              </>
            ) : (
              <>
                <li className="font-poppins font-normal cursor-pointer text-[18px]">
                  <Link to="/">
                    <i className="fa fa-list"> </i>
                    <span className="navlink-text"> My Orders </span>
                  </Link>
                </li>
              </>
            )}
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/signup">
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
        </nav>
      ) : (
        <nav className="w-full flex py-6 justify-center items-center navbar">
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/"> Home </Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/signup"> Sign Up </Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/login"> Login </Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[18px]">
              <Link to="/homepage"> Homepage </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
