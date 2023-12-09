import React, { useEffect, useState } from "react";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";
import { getInventory } from "../../utils/inventory-apis/inventory";
import { useNavigate } from "react-router-dom";


const Inventory = (props) => {
  const [inventory, setInventory] = useState(null);
  let navigate = useNavigate();
  if(!TokenService.hasAuthToken()){
    navigate.push("/login");
    return;
  }
  else if (TokenService.getRole() != "crafter") {
    props.showalert("You are not authorized to access this page", "danger");
    navigate.push("/");
    return;
  }
  useEffect(() => {
    (async () => {
      const res = await getInventory();
      if (res.error) {
        props.showalert(res.error, "danger");
      }
      else {
        console.log(res.data.inventory);
        setInventory(res.data.inventory);
      }
    })();

  },[]);
  return (
    <>
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
                  Price
                </th>
                <th className="font-poppins font-medium text-[18px] leading-[27px]  px-4 text-white">
                  Quantity
                </th>
                <th className="font-poppins font-medium text-[18px] leading-[27px]  px-4 text-white">
                 Image
                </th>

              </tr>
            </tbody>
            {inventory && inventory.map((item, key) => {
              return (
                <tbody key={key}>
                  <tr className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                    <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                      <Link to={`/item-details/${item.id}`}>{item.name} </Link>
                    </td>
                    <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                      {item.description}
                    </td>
                    <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                      {item.price}
                    </td>
                    <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                      {item.quantity}
                    </td>
                    <td className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                      <img className="w-20 h-20" src={"http://localhost:5000/static/uploads/products/"+item.imgFile} />
                    </td>

                  </tr>
                </tbody>
              );
            })}
          </table>
        </section>
      </div>
    </>
  );


}
export default Inventory;
