import React,{useEffect} from "react";
import TokenService from "../../services/token-service";
import InventorySchema from "../../utils/validations/InventorySchema";
import { useForm } from "react-hook-form";
import { getItem, editItem } from "../../utils/inventory-apis/inventory";
import { useNavigate } from "react-router-dom";
const ItemDetails = (props) => {
  const navigate = useNavigate();
 

  let form = useForm({ onblur: true });
  const { register, handleSubmit, formState: { errors }, reset } = form;
  useEffect(() => {
    if (!TokenService.hasAuthToken()) {
      navigate("/login");
      return;
    }
    else if (TokenService.getRole() != "crafter") {
      props.showalert("You are not authorized to access this page", "danger");
      navigate("/");
      return;
    }
    (async () => {
      const itemId = window.location.href.split("/")[4];
      const res = await getItem(itemId);
      if (res.error) {
        props.showalert(res.error, "danger");
        console.log("Error is ", res.error);
      }
      else {
        if (res.data.status === "success") {
          form.setValue("name", res.data.inventory.name);
          form.setValue("description", res.data.inventory.description);
          form.setValue("price", res.data.inventory.price);
          form.setValue("quantity", res.data.inventory.quantity);
        }
        else {
          props.showalert(res.data.msg, "danger");
        }
      }
    })();

  }, [])

  const update = async (data) => {
    const itemId = window.location.href.split("/")[4];
    const { name, description, price, quantity } = data;
    const res = await editItem(itemId, { name, description, price, quantity });
    if (res.error) {
      props.showalert(res.error, "danger");
      console.log("Error is ", res.error);
    }
    else {
      if (res.data.status === "success") {
        props.showalert("Item updated successfully", "success");
        reset();
        navigate("/inventory");
      }
      else {
        props.showalert(res.data.msg, "danger");
      }
    }

  }

  return (
    <>
     {(TokenService.hasAuthToken() && TokenService.getRole() == "crafter" )?(<>
      <div className="UpdateItems">
        <section id="UpdateItemsPage">
          <li>
            <form className="AddItems" onSubmit={handleSubmit(update)}>
              <label htmlFor="name">Item name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="itemName"
                {...register("name", InventorySchema.name)}
                required
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
              <label htmlFor="description">Item description</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                {...register("description", InventorySchema.description)}
                required
              />
              {errors.description && <span className="text-danger">{errors.description.message}</span>}

              <label htmlFor="price">Price Per Unit</label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Item price"
                {...register("price", InventorySchema.price)}
                required
              />
              {errors.price && <span className="text-danger">{errors.price.message}</span>}

              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                {...register("quantity", InventorySchema.quantity)}
                required
              />
              {errors.quantity && <span className="text-danger">{errors.quantity.message}</span>}


              <button className="go-button" type="submit">
                Update item
              </button>
            </form>
          </li>

        </section>
      </div>
      </>):(<></>)}
    </>
  );

}
export default ItemDetails;