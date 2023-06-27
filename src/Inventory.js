import React from "react";
import styles from "./App.css";
import config from "./config";
import TokenService from "./services/token-service";
import { Link } from "react-router-dom";
import AuthApiService from "./services/auth-api-service";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByUserId: [],
    };
  }

  componentDidMount() {
   
    //if the user is not logged in, send him to landing page
    if (!TokenService.hasAuthToken()||TokenService.getRole() != "farmer") {
      window.location = "/login";
    }

    AuthApiService.FetchInvFarmer().then((res) => {
      console.log(res)
      if (res.status == "success") {

        this.setState({
          itemsByUserId: res.inventory
        })
      }
    }).catch((err) => {
      console.log(err)
    })

   
  }

  render() {
    // console.log(this.state.itemsByUserId.length)
    let showItemsPage = "";
    //by default show there are no items
    if (this.state.itemsByUserId.length === 0) {
      showItemsPage = (
        <tbody>
          <tr className="itemsByUser">
            <td>No items here</td>
          </tr>
        </tbody>
      );
    }
    // if there are items
    else {
      // display details for each one of the items
      showItemsPage = this.state.itemsByUserId.map((item, key) => {
        let itemDetailsUrl = `/item-details/${item.id}`;
        if (item) {
          return (
            <tbody key={key}>
              <tr className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                  <Link to={itemDetailsUrl}>{item.name} </Link>
                </td>
                <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                  {item.description}{" "}
                </td>
                <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                  {item.pricePerUnit}{" "}
                </td>
                <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                  {item.quantity}{" "}
                </td>
                <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                  {item.unit}{" "}
                </td>
              </tr>
            </tbody>
          );
        }
      });
    }
    return (
      <div className="flex-1 flex justify-center items-center flex-row m-6">
        <section class="inventoryTable flex-row flex-wrap sm:mb-20 mb-6 ">
          <table class="inventoryTable">
            <tbody>
              <tr className=" font-poppins font-medium text-[18px] leading-[27px]  text-white">
                <th className="font-poppins font-medium text-[18px] leading-[27px]  px-4 text-white">
                  Name
                </th>
                <th className="font-poppins font-medium text-[18px] leading-[27px] px-4  text-white">
                  Description
                </th>
                <th className="font-poppins font-medium text-[18px] leading-[27px] px-4  text-white">
                  Price Per Unit
                </th>
                <th className="font-poppins font-medium text-[18px] leading-[27px]  px-4 text-white">
                 Quantity
                </th>
                <th className="font-poppins font-medium text-[18px] leading-[27px]  px-4 text-white">
                Minimum Unit
                </th>
              </tr>
            </tbody>
            {showItemsPage}
          </table>
        </section>
      </div>
    );
  }
}
export default Inventory;
