import { Link } from "react-router-dom";
import TokenService from "./services/token-service";

const NavBar = () => {
  const logOutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearAuthToken();
    TokenService.clearRole();
    history.push("/");
  };
  return (
    <header className="clearfix">
      {TokenService.hasAuthToken() ? (
        <nav className="w-full flex py-6 justify-between items-center navbar">
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <li className="font-poppins font-normal cursor-pointer text-[16px]">
              <Link to="/">
                <i className="fa fa-home"></i>
                <span className="navlink-text">Home</span>
              </Link>
            </li>
            {TokenService.getRole() == 2 ? (
              <>

                <li className="font-poppins font-normal cursor-pointer text-[16px]">
                  <Link to="/inventory">
                    <i className="fa fa-list"></i>
                    <span className="navlink-text">Inventory</span>
                  </Link>
                </li>
                <li className="font-poppins font-normal cursor-pointer text-[16px]">
                  <Link to="/crafter/profile">
                    <i className="fa fa-list"></i>
                    <span className="navlink-text">Profile</span>
                  </Link>
                </li>
              </>
            ) : (
              <li className="font-poppins font-normal cursor-pointer text-[16px]">
                <Link to="/consumer/profile">
                  <i className="fa fa-list"></i>
                  <span className="navlink-text">Profile</span>
                </Link>
              </li>
            )}
            <li>
              <button className="btn btn-danger" onClick={logOutClick}>
                <i className="fa fa-sign-out"></i>
                <span className="navlink-text">Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="w-full flex py-6 justify-between items-center navbar">
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <li className="font-poppins font-normal cursor-pointer text-[16px]">
              <Link to="/signup">Farmer's Sign Up</Link>
            </li>
            <li className="font-poppins font-normal cursor-pointer text-[16px]">
              <Link to="/user/login">Farmer's Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;

