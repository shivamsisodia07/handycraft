import React from "react";
import config from "./config";
import TokenService from "./services/token-service";
import ValidationError from "./validationError";
import InventorySchema from "./utils/validations/InventorySchema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function AddItems(props) {
  let history = useHistory();
  if (TokenService.hasAuthToken() && TokenService.getRole() != 2) {
    history.push("/");
    return;
  }
  else if (!TokenService.hasAuthToken()) {
    history.push("/login");
    return;
  }
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ onblur: true });
  const addItem = (data) => {
    const formData = new FormData();
    formData.append("imgFile", data.imgFile[0]);
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("description", data.description);

    fetch(`${config.INVENTORY_API_ENDPOINT}/`, {
      method: "POST",
      headers: {
        "content-type": "'multipart/form-data'",
        "authtoken": TokenService.getAuthToken(),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "success") {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }






  return (
    <>
      <div className="AddParent">
        <div className="AddItems">
          <section id="AddItemsPage">
            <form className="additemForm" onSubmit={handleSubmit(addItem)}>
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
                <label >Price Per Unit</label>
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
                <label>Unit</label>
                <input
                  type="file"
                  id="imgFile"
                  accept="image/*"
                  name="imgFile"
                  placeholder="Item Main Image"
                  {...register("imgFile", InventorySchema.imgFile)}
                  onChange={handleImagePreview}
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
