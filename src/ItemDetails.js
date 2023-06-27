import React from "react";
import config from "./config";
import TokenService from "./services/token-service";
import ValidationError from "./validationError";
import AuthApiService from "./services/auth-api-service";

class ItemDetails extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      itemDetails: {},

      name: {
        value: "",
        touched: false,
      },
      description: {
        value: "",
        touched: false,
      },
      quantity: {
        value: 0,
        touched: false,
      },
      unit: {
        value: 0,
        touched: false,
      },
      pricePerUnit: {
        value: 0,
        touched: false,
      },
    };
  }

  changeItemName(name) {
    this.setState({
      name: { value: name, touched: true },
    });
  }

  changeDescription(description) {
    this.setState({
      description: { value: description, touched: true },
    });
  }

  changePricePerUnit(pricePerUnit) {
    this.setState({
      pricePerUnit: { value: pricePerUnit, touched: true },
    });
  }

  changeQuantity(quantity) {
    this.setState({
      quantity: { value: quantity, touched: true },
    });
  }
  changeUnit(unit) {
    this.setState({
      unit: { value: unit, touched: true },
    });
  }

  validateItemName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return <p className="input-error">Item name is required</p>;
    } else if (name.length < 2) {
      return (
        <p className="input-error">
          Item name must be at least 2 characters long
        </p>
      );
    }
  }

  validateDescription() {
    const description = this.state.description.value.trim();
    if (description.length === 0) {
      return <p className="input-error">Item description is required</p>;
    } else if (description.length < 2) {
      return (
        <p className="input-error">
          Item description must be at least 2 characters long
        </p>
      );
    }
  }

  validatePricePerUnit() {
    const pricePerUnit = this.state.pricePerUnit.value.trim();
    if (pricePerUnit < 1) {
      return (
        <p className="input-error">
          Item price cannot be zero
        </p>
      );
    }
  }

  validateQuantity() {
    const quantity = this.state.quantity.value.trim();
    if (quantity < 1) {
      return <p className="input-error">Quantity canot be zero</p>;
    }

  }
  validateUnit() {
    const unit = this.state.unit.value.trim();
    if (unit < 1) {
      return <p className="input-error">Unit canot be zero</p>;
    }

  }


  componentDidMount() {
    if (!TokenService.hasAuthToken() || TokenService.getRole() != "farmer") {
      window.location = '/login'
    }

    const itemId = this.props.match.params.itemId;
    AuthApiService.FetchInvItem(itemId).then((res) => {
      this.setState({
        itemDetails: res.inventory
      })
    }).catch(err => {
      console.log(err);
    })
  }

  updateItem(event) {
    // console.log('hello there')
    event.preventDefault();
    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }
    console.log(data);


    let { name, pricePerUnit, quantity, description, unit } = data;

    let payload = {
      name: name,
      description: description,
      quantity: quantity,
      unit: unit,
      pricePerUnit: pricePerUnit,
    };


    const itemId = window.location.href.split("/")[4];

    AuthApiService.UpdateInvItem(itemId, payload).then((res) => {
      if (res.status == "success") {
        window.location = "/inventory";
      }
    }).catch((err) => {
      console.log(err);
    })

  }

  render() {
    // console.log(this.state.itemDetails.length)
    let showItemsDetailsPage = "";
    //by default show there are no items
    if (this.state.itemDetails.length === 0) {
      showItemsDetailsPage = (
        <div className="itemsDetails">No item details here</div>
      );
    }
    // if there are items
    else {
      // display details for each one of the items
      showItemsDetailsPage = (
        <li>
          <form className="AddItems" onSubmit={this.updateItem}>
            <label htmlFor="name">Item name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="itemName"
              defaultValue={this.state.itemDetails.name}
              onChange={(e) => this.changeItemName(e.target.value)}
              required
            />
            {this.state.name.touched && (
              <ValidationError message={this.validateItemName()} />
            )}
            <label htmlFor="description">Item description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={this.state.itemDetails.description}
              onChange={(e) => this.changeDescription(e.target.value)}
              required
            />
            {this.state.description.touched && (
              <ValidationError message={this.validateDescription()} />
            )}

            <label htmlFor="pricePerUnit">Price Per Unit</label>
            <input
              type="text"
              id="pricePerUnit"
              name="pricePerUnit"
              placeholder="Item price"
              defaultValue={this.state.itemDetails.pricePerUnit}
              onChange={(e) => this.changePricePerUnit(e.target.value)}
              required
            />
            {this.state.pricePerUnit.touched && (
              <ValidationError message={this.validatePricePerUnit()} />
            )}

            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              defaultValue={this.state.itemDetails.quantity}
              onChange={(e) => this.changeQuantity(e.target.value)}
              required
            />
            {this.state.quantity.touched && (
              <ValidationError message={this.validateQuantity()} />
            )}
            <label htmlFor="unit">Quantity</label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Unit"
              defaultValue={this.state.itemDetails.unit}
              onChange={(e) => this.changeUnit(e.target.value)}
              required
            />
            {this.state.unit.touched && (
              <ValidationError message={this.validateUnit()} />
            )}

            <button className="go-button" type="submit">
              Update item
            </button>
          </form>
        </li>
      );
    }

    return (
      <div className="UpdateItems">
        <section id="UpdateItemsPage">{showItemsDetailsPage}</section>
      </div>
    );
  }
}

export default ItemDetails;
