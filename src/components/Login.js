import React from "react";
import TokenService from "../services/token-service.js";
import RadioGroup from "./RadioGroup";
import { UserIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginSchema from "../utils/validations/LoginSchema";
import OtpSchema from "../utils/validations/OtpSchema";
import { useEffect } from "react";
import { login, verifyOtp } from "../utils/auth-apis/auth.js";


function Login(props) {
  var history = useHistory();
  if (TokenService.hasAuthToken() && TokenService.getRole() == "crafter") {
    history.push("/crafter/profile");
  }
  else if (TokenService.hasAuthToken() && TokenService.getRole() == "consumer") {
    history.push("/consumer/profile");
  }

  const [mobile, setMobile] = useState(null);
  const [role, setRole] = useState(null);
  const [otpform, setOtpform] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ onblur: true });
  const { register: reg2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm({ onblur: true });




  const changeRole = (option) => {
    setRole(option);
  }







  const loginUser = async (data) => {
    console.log(role);
    if (role != 0 && role != 1) {
      props.showalert("Please Select Role", "danger");
    }
    else {
      const res = await login(data, role);
      if (res.error) {
        props.showalert(res.error, "danger");
        console.log("Error is ", res.error);
        return;
      }
      else {
        if (res.status == "success") {
          setOtpform(true);
          setMobile(data.mobileNo);
        }
        else {
          props.showalert("Some Error Occured", "danger");
          console.log(res.msg);
          return;
        }
      }
    }
  };

  const verify = async (data) => {
    const res = await verifyOtp({
      otp: data.otp,
      role: role,
      mobileNo: mobile
    });
    if (res.error) {
      props.showalert(res.error, "danger");
      console.log("Error is ", res.error);
      return;
    }
    else {
      if (res.status == "success") {
        TokenService.saveAuthToken(res.token);
        TokenService.saveRole(res.role);
        TokenService.saveIsUpdate(res.isUpdate);
        reset2();
        setMobile(null);
        if (res.isUpdate == 1) {
          if (res.role == "consumer") {
            history.push('/consumer/profile');
          }
          else if (res.role == "crafter") {
            history.push('/crafter/profile');
          }
        }
        else {
          if (res.role == "consumer") {
            history.push('/consumer/profile');
          }
          else if (res.role == "crafter") {
            history.push('/crafter/profile');
          }
        }
      }
      else {
        props.showalert("Some Error Occured", "danger");
      }
    }



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
                      <span>Crafter</span>
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
                  {...register("mobileNo", LoginSchema.mobileNo)}

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
                <form className="loginForm" onSubmit={handleSubmit2(verify)}>
                  <label htmlFor="otp">Otp</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Otp"
                    {...reg2("otp", OtpSchema.otp)}
                    required
                  />
                  {errors2.otp && <span className="text-danger">{errors2.otp.message}</span>}

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
