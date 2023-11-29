import React, { useEffect, useState } from "react";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getInventory } from "../../utils/inventory-apis/inventory";


const Inventory = (props) => {
  const [inventory, setInventory] = useState(null);
  let history = useHistory();
  if (!TokenService.hasAuthToken() || TokenService.getRole() != "crafter") {
    history.push("/login");
    return;
  }
  useEffect(async () => {
    const res = await getInventory();
    if (res.error) {
      props.showalert(res.error, "danger");
    }
    else {
      setInventory(res.data.inventory);
    }
  })
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
