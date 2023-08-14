import React from "react";
import AuthApiService from "./services/auth-api-service";
import CrafterSchema from "./utils/validations/CrafterSchema";
import { useForm } from "react-hook-form";
import { useLayoutEffect } from "react";
import TokenService from "./services/token-service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




const CrafterProfile = (props) => {
  let history = useHistory();
  let form = useForm({ onblur: true });
  const { register, handleSubmit, formState: { errors }, reset } = form;
  useLayoutEffect(() => {
    if (TokenService.hasAuthToken() && TokenService.getRole() != 2) {
      history.push("/");
    }
    else if (!TokenService.hasAuthToken()) {
      history.push("/login");
    }
    else {
      AuthApiService.editUser(2)
        .then((res) => {

          if (res.status == "success") {
            form.setValue("name", res.data.name);
            form.setValue("city", res.data.city);
            form.setValue("state", res.data.state);
            form.setValue("district", res.data.district);
            form.setValue("mobileNo", res.data.mobileNo);
          }
        })

        .catch((res) => {
          console.log(res.error);
        });
    }
  })
  const editProfile = (data) => {
    const { name, city, state, district, mobileNo } = data;

    AuthApiService.editUser(1, {
      name,
      city,
      state,
      district,
      mobileNo,
    })

      .then((res) => {

        if (res.status == "success") {
          reset();
          history.push("/");


        }
      })

      .catch((res) => {
        console.log(res.error);
      });
  };




  return (
    <>
      <div className="Fast">
        <div className="Register">
          <section id="signUpPage">
            <h2>Sign up</h2>
            <form className="registerForm" onSubmit={handleSubmit(editProfile)}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input

                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  {...register("name", CrafterSchema)}
                  required
                />
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
              </div>



              <div className="mb-3">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="state"
                  {...register("state", CrafterSchema)}
                  required
                />
                {errors.state && <span className="text-danger">{errors.state.message}</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  {...register("city", CrafterSchema)}
                  required
                />
                {errors.city && <span className="text-danger">{errors.city.message}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  {...register("district", CrafterSchema)}
                  required
                />
                {errors.district && <span className="text-danger">{errors.district.message}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  type="text"
                  name="mobileNo"
                  id="mobileNo"
                  placeholder="Mobile No"
                  {...register("mobileNo", CrafterSchema)}
                  required
                />
                {errors.mobileNo && <span className="text-danger">{errors.mobileNo.message}</span>}
              </div>

              <button
                className="signup-button"
                id="register-button"
                type="submit"
              >
                Update
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );

}

export default CrafterProfile;
