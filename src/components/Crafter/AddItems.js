import React from "react";
import TokenService from "../../services/token-service";
import InventorySchema from "../../utils/validations/InventorySchema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../utils/inventory-apis/inventory";



function AddItems(props) {
  let navigate = useNavigate();
  if (TokenService.getRole() != "crafter") {
   navigate("/");
    return;
  }
  else if (!TokenService.hasAuthToken()) {
    navigate("/login");
    return;
  }
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ onblur: true });
  const addRequest = async (data) => {

    const formData = new FormData();
    formData.append("imgFile", data.imgFile[0]);
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("description", data.description);

    const res = await addItem(formData);
    if (res.error) {
      props.showalert(res.error, "danger");
      console.log("Error is ", res.error);
    }
    else {
      props.showalert("Item added successfully", "success");
      reset();
      navigate("/");
    }
  }






  return (
    <>
      <div className="AddParent">
        <div className="AddItems">
          <section id="AddItemsPage">
            <form className="additemForm" onSubmit={handleSubmit(addRequest)}>
              <div className="mb-3">
                <label>Item name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="itemName"
                  {...register("name", InventorySchema.name)}
                  required
                />
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
              </div>
              <div className="mb-3">
                <label>Item description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                  {...register("description", InventorySchema.description)}
                  required
                />
                {errors.description && <span className="text-danger">{errors.description.message}</span>}
              </div>

              <div className="mb-3">
                <label >Price</label>
                <input
                  type="number"
                  step="any"
                  id="price"
                  name="price"
                  placeholder="Item price"
                  {...register("price", InventorySchema.price)}
                  required
                />
                {errors.price && <span className="text-danger">{errors.price.message}</span>}
              </div>
              <div className="mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Item count"
                  {...register("quantity", InventorySchema.quantity)}
                  required
                />
                {errors.quantity && <span className="text-danger">{errors.quantity.message}</span>}
              </div>
              <div className="mb-3">
                <label>Image</label>
                <input
                  type="file"
                  id="imgFile"
                  accept="image/*"
                  name="imgFile"
                  placeholder="Item Main Image"
                  {...register("imgFile", InventorySchema.imgFile)}
                  
                  required
                />
                {errors.imgFile && <span className="text-danger">{errors.imgFile.message}</span>}

              </div>

              <button className="go-button" type="submit">
                Add item
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );

}

export default AddItems;
