import React from "react";
import styles from "./App.css";
import ValidationError from "./validationError";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service.js";
import RadioGroup from "./components/RadioGroup";
import { UserIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginSchema from "./utils/validations/LoginSchema";
import OtpSchema from "./utils/validations/OtpSchema";
import { useEffect } from "react";


function Login() {
  let history=useHistory();
  if (TokenService.hasAuthToken()) {
    history.push("/");
  }
  const [mobile, setMobile] = useState(null);
  const [role, setRole] = useState(null);
  const [otpform, setOtpform] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ onblur: true });
  const { register: reg2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm({ onblur: true });




  const changeRole = (option) => {
    setRole({
      role: option
    })
  }







  const loginUser = (data) => {
    if (role != 0 && role != 1) {
      setError("Invalid Role");
    }
    else {

      AuthApiService.postLogin({
        mobileNo: data.mobileNo,
        role: role
      })

        .then((response) => {
          console.log(response);
          if (response.status == "success") {
            setOtpform(true);
            setMobile(data.mobileNo);
          }
          else {
            setError("Some Error Occured");
          }


        })
        .catch((err) => {
          setError("Some Error Occured");
          console.log(err);
        });
    }
  };

  const verifyOtp = (data) => {
    AuthApiService.verifyOtp({
      otp: data.otp,
      role: role,
      mobileNo: mobile
    }).then((response) => {
      console.log(response);
      if (response.status == "success") {
        console.log(response)
        TokenService.saveAuthToken(response.token);
        TokenService.saveRole(response.role);
        TokenService.saveIsUpdate(response.isUpdate);
        reset2();
        setMobile(null);
        if (response.isUpdate == 1) {
          history.push('/');
        }
        else {
          history.push('/profile')
        }
      }
      else {
        setError("Some Error Occured");
      }

    }).catch((err) => {
      console.log(err);
      setError("Some Error Occured");
    });

  }

  useEffect(() => {
    if (otpform) {
      reset();
    }
  }, [otpform]);


  return (
    <>
      <div>
        {!otpform ? (<div className="Fast">
          <div className="Login">
            <section id="loginPage">
              <h2 style={{ padding: "0px" }}>Login</h2>
              <div className="mx-auto w-96 shadow my-1">
                <RadioGroup
                  onChange={(option) => {
                    changeRole(option)
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

              <form className="loginForm" onSubmit={handleSubmit(loginUser)}>

                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="MobileNo"
                  {...register("mobileNo", LoginSchema)}

                  required
                />
                {errors.mobileNo && <span className="text-danger">{errors.mobileNo.message}</span>}





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
                <form className="loginForm" onSubmit={handleSubmit2(verifyOtp)}>
                  <label htmlFor="otp">Otp</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Otp"
                    {...reg2("otp", OtpSchema)}
                    required
                  />
                  {errors2.otp && <span className="text-danger">{errors.otp.message}</span>}

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
    </>

  );

}

export default Login;
