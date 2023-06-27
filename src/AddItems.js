import React from "react";
import config from "./config";
import TokenService from "./services/token-service";
import ValidationError from "./validationError";

class AddItems extends React.Component {
  constructor(props) {
   
    super(props);
    this.state = {
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
      image :{
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
  }

  addItem(event) {
    // console.log('hello there')
    event.preventDefault();
    const data = {};

    const formData = new FormData(event.target);

    for (let value of formData) {
      data[value[0]] = value[1];
    }


    let { name, pricePerUnit, quantity, description, unit } = data;


    let payload = {
      name: name,
      description: description,
      quantity: quantity,
      unit: unit,
      pricePerUnit: pricePerUnit,
    };

    console.log(payload);



    fetch(`${config.INVENTORY_API_ENDPOINT}/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authtoken": TokenService.getAuthToken(),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "success") {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="AddParent">
        <div className="AddItems">
          <section id="AddItemsPage">
            <form className="additemForm" onSubmit={this.addItem}>
              <label>Item name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="itemName"
                onChange={(e) => this.changeItemName(e.target.value)}
                required
              />
              {this.state.name.touched && (
                <ValidationError message={this.validateItemName()} />
              )}

              <label>Item description</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                onChange={(e) => this.changeDescription(e.target.value)}
                required
              />
              {this.state.description.touched && (
                <ValidationError message={this.validateDescription()} />
              )}

              <label >Price Per Unit</label>
              <input
                type="text"
                id="pricePerUnit"
                name="pricePerUnit"
                placeholder="Item price"
                onChange={(e) => this.changePricePerUnit(e.target.value)}
                required
              />
              {this.state.pricePerUnit.touched && (
                <ValidationError message={this.validatePricePerUnit()} />
              )}

              <label>Quantity</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                placeholder="Item count"
                onChange={(e) => this.changeQuantity(e.target.value)}
                required
              />
              {this.state.quantity.touched && (
                <ValidationError message={this.validateQuantity()} />
              )}

              <label>Unit</label>
              <input
                type="text"
                id="unit"
                name="unit"
                placeholder="Item Minimum Quantity"
                onChange={(e) => this.changeUnit(e.target.value)}
                required
              />
              {this.state.unit.touched && (
                <ValidationError message={this.validateUnit()} />
              )}

              <button className="go-button" type="submit">
                Add item
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default AddItems;
