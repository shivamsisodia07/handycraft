import React from "react";
import ValidationError from "./validationError";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service.js";

import RadioGroup from "./components/RadioGroup";
import { UserIcon } from "@heroicons/react/24/solid";

class Profile extends React.Component {
  constructor(props) {
    if (!TokenService.hasAuthToken()) {
      window.location = '/user/login'
    }
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },

      bloodGroup: {
        value: "",
        touched: false,
      },
      city: {
        value: "",
        touched: false,
      },
      district: {
        value: "",
        touched: false,
      },

      mobileNo: {
        value: "",
        touched: false,
      },
    };
  }

  // NAME
  changeName(name) {
    this.setState({
      name: { value: name, touched: true },
    });
  }


  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Name is required
        </p>
      );
    } else if (name.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Name must be at least 2 characters long
        </p>
      );
    }
  }


  //////Blood Group
  changeBloodGroup(bloodGroup) {
    console.log(bloodGroup);
    this.setState({
      bloodGroup: { value: bloodGroup, touched: true },
    });
  }

  validateBloodGroup() {
    const bloodGroup = this.state.bloodGroup.value.trim();
    if (bloodGroup.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          BloodGroup is required
        </p>
      );
    } else if (bloodGroup.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          BloodGroup must be at least 2 characters long
        </p>
      );
    }
  }

  /////District
  changeDistrict(district) {
    this.setState({
      district: { value: district, touched: true },
    });
  }
  validateDistrict() {
    const district = this.state.district.value.trim();
    if (district.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          District is required
        </p>
      );
    } else if (district.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          District must be at least 2 characters long
        </p>
      );
    }
  }
  ////City
  changeCity(city) {
    this.setState({
      city: { value: city, touched: true },
    });
  }

  validateCity() {
    const city = this.state.city.value.trim();
    if (city.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          City is required
        </p>
      );
    } else if (city.length < 2) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          City must be at least 2 characters long
        </p>
      );
    }
  }





  /////MOBILE NO
  changeMobileNo(mobileNo) {
    this.setState({
      mobileNo: { value: mobileNo, touched: true },
    });
  }
  validateMobileNo() {
    const mobile_no = this.state.mobileNo.value.trim();
    if (mobile_no.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Mobile No is required
        </p>
      );
    } else if (mobile_no.length < 10 || !(mobile_no > 1000000000 && mobile_no < 9999999999)) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Mobile No must be at least 10 characters long
        </p>
      );
    }
  }

  updateUser = (event) => {
    event.preventDefault();
    console.log("updateUser working");
    //get the input from the form submission
    const data = {};
    //get the payload from the form submission
    const formData = new FormData(event.target);
    for (let value of formData) {
      data[value[0]] = value[1];
    }
    console.log(data);
    console.log(TokenService.getRole());
    if (TokenService.getRole() == "farmer") {
      let {
        name,
        mobileNo,
        city,
        district,
        bloodGroup
      } = data;
      //console.log(user_name, password, repeatPassword);

      this.setState({ error: null });
      AuthApiService.EditProfile({
        name: name,
        mobileNo: mobileNo,
        city: city,
        district: district,
        bloodGroup: bloodGroup,
        role: 0

      })

        .then((response) => {
          console.log(response);
          TokenService.saveIsUpdate(true);
          window.location = "/";
        })

        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
    else {
      let {
        name,
        mobileNo,
        city,
        district,

      } = data;
      //console.log(user_name, password, repeatPassword);

      this.setState({ error: null });
      AuthApiService.EditProfile({
        name: name,
        mobileNo: mobileNo,
        city: city,
        district: district,
        role: 1


      })

        .then((response) => {
          console.log(response);
          TokenService.saveIsUpdate(true);
          window.location = "/";
        })

        .catch((res) => {
          this.setState({ error: res.error });
        });
    }


  };
  componentDidMount() {

    AuthApiService.getProfile(TokenService.getRole()).then((res) => {
      //console.log(res);
      if (TokenService.getRole() == "farmer") {
        this.setState({
          name: { value: res.record.name },
          mobileNo: { value: res.record.mobileNo },
          city: { value: res.record.city },
          district: { value: res.record.district },
          bloodGroup: { value: res.record.bloodGroup }
        })
      }
      else {
        this.setState({
          name: { value: res.record.name },
          mobileNo: { value: res.record.mobileNo },
          city: { value: res.record.city },
          district: { value: res.record.district },
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const msg = this.state.error ? (
      <p style={{ color: "red" }}>{this.state.error}</p>
    ) : (
      <div></div>
    );

    return (
      <div className="Fast">
        <div className="Register">
          <section id="signUpPage">
            <h2>Profile</h2>


            <form className="registerForm" onSubmit={this.updateUser}>
              <div className="errorMessage">{msg}</div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                defaultValue={this.state.name.value}
                onChange={(e) => this.changeName(e.target.value)}
                required
              />
              {this.state.name.touched && (
                <ValidationError message={this.validateName()} />
              )}



              {TokenService.hasAuthToken() && TokenService.getRole() == "farmer" ? (
                <>
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <select name="bloodGroup"
                    placeholder="Blood Group"
                    onChange={(e) => this.changeBloodGroup(e.target.value)}
                    required>
                    <option value="" selected>Select BloodGroup</option>
                    <option value="O+" selected={this.state.bloodGroup.value == "O+"}>O+</option>
                    <option value="A+" selected={this.state.bloodGroup.value == "A+"}>A+</option>
                    <option value="B+" selected={this.state.bloodGroup.value == "B+"}>B+</option>
                    <option value="AB+" selected={this.state.bloodGroup.value == "AB+"}>AB+</option>
                    <option value="O-" selected={this.state.bloodGroup.value == "O-"}>O-</option>
                    <option value="A-" selected={this.state.bloodGroup.value == "A-"}>A-</option>
                    <option value="B-" selected={this.state.bloodGroup.value == "B-"}>B-</option>
                    <option value="AB-" selected={this.state.bloodGroup.value == "AB-"}>AB-</option>

                  </select>


                  {this.state.bloodGroup.touched && (
                    <ValidationError message={this.validateBloodGroup()} />
                  )}
                </>
              ) : (<></>)}


              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={this.state.city.value}
                onChange={(e) => this.changeCity(e.target.value)}
                required
              />
              {this.state.city.touched && (
                <ValidationError message={this.validateCity()} />
              )}

              <label htmlFor="district">District</label>
              <input
                type="text"
                name="district"
                placeholder="District"
                defaultValue={this.state.district.value}
                onChange={(e) => this.changeDistrict(e.target.value)}
                required
              />
              {this.state.district.touched && (
                <ValidationError message={this.validateDistrict()} />
              )}


              <label htmlFor="mobileNo">Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                placeholder="Mobile No"
                defaultValue={this.state.mobileNo.value}
                onChange={(e) => this.changeMobileNo(e.target.value)}
                required
              />
              {this.state.mobileNo.touched && (
                <ValidationError message={this.validateMobileNo()} />
              )}

              <button
                className="signup-button"
                id="register-button"
                type="submit"
                style={{ opacity: "100% !important" }}
                
              >
                Update
              </button>
            </form>

          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
