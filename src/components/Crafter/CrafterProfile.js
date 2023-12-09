import React from "react";
import { getCrafter, editCrafter } from "../../utils/crafter-apis/crafter";
import CrafterSchema from "../../utils/validations/CrafterSchema";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TokenService from "../../services/token-service";

import { useNavigate } from "react-router-dom";



const CrafterProfile = (props) => {

  var navigate = useNavigate();
  const [load, setLoading] = useState(false);
   if (!TokenService.hasAuthToken()) {
    navigate("/login");
    return;
  }
  if (TokenService.getRole() != "crafter") {
    props.showalert("You are not authorized to access this page", "danger");
    navigate("/");
    return;
  }
 
  let form = useForm({ onblur: true });
  const { register, handleSubmit, formState: { errors }, reset } = form;


  const editProfile = async (data) => {
    const { name, city, district, mobileNo } = data;
    const res = await editCrafter({ name, city, district, mobileNo });
    if (res.error) {
      props.showalert(res.error, "danger");
      console.log("Error is ", res.error);
    }
    else {
      if (res.data.status === "success") {
        props.showalert("Profile updated successfully", "success");
        reset();
        navigate("/");
      }
      else {
        props.showalert(res.data.msg, "danger");
      }
    }

  };


  useEffect(() => {
    (async () => {
      const res = await getCrafter();
      if (res.error) {
        props.showalert(res.error, "danger");
        console.log("Error is ", res.error);
      }
      else {
        if (res.data.status === "success") {
          form.setValue("name", res.data.record.name);
          form.setValue("city", res.data.record.city);
          form.setValue("district", res.data.record.district);
          form.setValue("mobileNo", res.data.record.mobileNo);
          setLoading(true);
        }
        else {
          props.showalert(res.data.msg, "danger");
        }
      }
    })();


  }, [])

  if (!load) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  else {

    return (
      <>
        <div className="Fast">
          <div className="Register">
            <section id="signUpPage">
              <h2>Profile</h2>
              <form className="registerForm" onSubmit={handleSubmit(editProfile)}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input

                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                    {...register("name", CrafterSchema.name)}
                    required
                  />
                  {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>



                {/* <div className="mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="state"
                    {...register("state", CrafterSchema.state)}
                    required
                  />
                  {errors.state && <span className="text-danger">{errors.state.message}</span>}
                </div> */}

                <div className="mb-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    {...register("city", CrafterSchema.city)}
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
                    {...register("district", CrafterSchema.district)}
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
                    {...register("mobileNo", CrafterSchema.mobileNo)}
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

}

export default CrafterProfile;
