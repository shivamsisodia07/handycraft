import React from "react";
import styles from "./App.css";
import ValidationError from "./validationError";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service.js";
import RadioGroup from "./components/RadioGroup";
import { UserIcon } from "@heroicons/react/24/solid";

class Login extends React.Component {
  constructor(props) {
    if(TokenService.hasAuthToken()){
      window.location="/";
    }
    super(props);
    this.state = {
      mobileNo: {
        value: "",
        touched: false,
      },
      otp: {
        value: "",
        touched: false
      },
      viewOtpform: false,
      LogInUserID: 0,
      error: null,
      role: null,
    };
  }

  changeMobileNo(mobileNo) {

    this.setState({
      mobileNo: { value: mobileNo, touched: true },
    });
  }
  changeRole(option) {
    this.setState({
      role: option
    })
  }

  changeOtp(otp) {
    this.setState({
      otp: { value: otp, touched: true }
    })
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
          Mobile No must be equal to 10 Integer numbers Only
        </p>
      );
    }
  }

  validateOtp() {
    const otp = this.state.otp.value.trim();
    if (otp.length === 0) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Mobile No is required
        </p>
      );
    } else if (otp.length < 6) {
      return (
        <p className="input-error" style={{ color: "red" }}>
          Mobile No must be equal to 6 characters long
        </p>
      );
    }
  }



  loginUser = (event) => {
    event.preventDefault();
    const mobileNo = this.state.mobileNo.value;
    if (this.state.role != 0 && this.state.role != 1) {
      this.setState({
        error: "Invalid Role",
      });

    }
    else {

      AuthApiService.postLogin({
        mobileNo: mobileNo,
        role: this.state.role
      })

        .then((response) => {
          console.log(response);
          if (response.status == "success") {
            this.setState({
              viewOtpform: true,
            });


          }
          else {
            this.setState({ error: "Some Error Occured" });
          }


        })
        .catch((err) => {
          this.setState({
            error: "Some Error Occured",
          });
          console.log(err);
        });
    }
  };

  verifyOtp = (event) => {
    event.preventDefault();
    const otp = this.state.otp.value;
    AuthApiService.verifyOtp({
      otp: otp,
      role: this.state.role,
      mobileNo: this.state.mobileNo.value
    }).then((response) => {
      console.log(response);
      if (response.status == "success") {
        console.log(response)
        TokenService.saveAuthToken(response.token);
        TokenService.saveRole(response.role);
        TokenService.saveIsUpdate(response.isUpdate);
        if (response.isUpdate == 1) {
          window.location = '/'
        }
        else {
          window.location = '/profile'
        }
      }
      else {
        this.setState({ error: "Some Error Occured" });
      }

    }).catch((err) => {
      console.log(err);
      this.setState({
        error: "Some Error Occured"
      });
    });

  }



  render() {
    const msg = this.state.error ? (
      <p style={{ color: "white" }}>{this.state.error}</p>
    ) : (
      <div></div>
    );
    return (
      <div>
        {!this.state.viewOtpform ? (<div className="Fast">
          <div className="Login">
            <section id="loginPage">
              <h2 style={{ padding: "0px" }}>Login</h2>
              <div className="mx-auto w-96 shadow my-1">
                <RadioGroup
                  onChange={(option) => {
                    this.changeRole(option)
                  }}
                  options={[
                    <div className="flex flex-1 justify-around">
                      <span>Farmer</span>
                      <UserIcon className="w-4" />
                    </div>,
                    <div className="flex  flex-1 justify-around">
                      <span>Consumer</span>
                      <UserIcon className="w-4" />
                    </div>,
                  ]}
                />
              </div>

              <form className="loginForm" onSubmit={this.loginUser}>
                <div className="errorMessage" style={{ color: "white" }}>
                  {msg}
                </div>
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="MobileNo"
                  onChange={(e) => {

                    this.changeMobileNo(e.target.value)
                  }}
                  required
                />
                {this.state.mobileNo.touched && (
                  <ValidationError message={this.validateMobileNo()} />
                )}




                <button className="go-button" type="submit">
                  Go
                </button>

              </form>
            </section>
          </div>
        </div>) : (
          <div className="Fast">
            <div className="Login">
              <section id="loginPage">
                <h2 style={{ padding: "0px" }}>Login</h2>
                <form className="loginForm" onSubmit={this.verifyOtp}>
                  <div className="errorMessage" style={{ color: "white" }}>
                    {msg}
                  </div>

                  <label htmlFor="otp">Otp</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Otp"
                    onChange={(e) => this.changeOtp(e.target.value)}
                    required
                  />
                  {this.state.otp.touched && (
                    <ValidationError message={this.validateOtp()} />
                  )}


                  <button className="go-button" type="submit">
                    Go
                  </button>

                </form>
              </section>
            </div>
          </div>
        )

        }
      </div>

    );
  }
}

export default Login;
