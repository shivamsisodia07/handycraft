import React, { useEffect, useState } from "react";
import TokenService from "../services/token-service.js";
import RadioGroup from "./RadioGroup";
import { UserIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginSchema from "../utils/validations/LoginSchema";
import { login } from "../utils/auth-apis/auth.js";


function Login(props) {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ onblur: true });
  useEffect(() => {
    if (TokenService.hasAuthToken() && TokenService.getRole() == "crafter") {
      navigate("/crafter/profile");
    }
    else if (TokenService.hasAuthToken() && TokenService.getRole() == "consumer") {
      navigate("/consumer/profile");
    }
  }, [])





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
      console.log(res);
      if (res.error) {
        props.showalert(res.error, "danger");
        console.log("Error is ", res.error);
        return;
      }
      else {
        if (res.data.status == "success") {
          TokenService.saveAuthToken(res.data.token);
          TokenService.saveRole(res.data.role);
          TokenService.saveIsUpdate(res.data.isUpdate);
          reset();

          if (res.data.isUpdate == 0) {
            if (res.data.role == "consumer") {
              navigate('/consumer/profile');
            }
            else if (res.data.role == "crafter") {
              navigate('/crafter/profile');
            }
          }
          else {
            if (res.data.role == "crafter") {
              navigate("/inventory");
            }
            else {
              navigate("/products");
            }

          }
        }
        else {
          props.showalert("Some Error Occured", "danger");
          console.log(res.data.msg);
          return;
        }
      }
    }
  };





  return (
    <>
      {!TokenService.hasAuthToken() ? (<>
        <div>
          <div className="Fast">
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

                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", LoginSchema.email)}

                    required
                  />
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", LoginSchema.password)}

                    required
                  />
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}





                  <button className="go-button" type="submit">
                    Go
                  </button>

                </form>
              </section>
            </div>
          </div>
        </div>
      </>) : (<></>)}
    </>

  );

}

export default Login;
