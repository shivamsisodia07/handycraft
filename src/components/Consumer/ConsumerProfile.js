import React from "react";
import { getConsumer, editConsumer } from "../../utils/consumer-apis/consumer";
import ConsumerSchema from "../../utils/validations/ConsumerSchema";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TokenService from "../../services/token-service";
import { useNavigate } from "react-router-dom";

const ConsumerProfile = (props) => {
  const [load, setLoading] = useState(false);
  let navigate = useNavigate();
  if (TokenService.hasAuthToken() && TokenService.getRole() != "consumer") {
    navigate("/login");
  }
  else if (!TokenService.hasAuthToken()) {
    navigate("/login");
  }
  let form = useForm({ onblur: true });
  const { register, handleSubmit, formState: { errors }, reset } = form;
  useEffect(() => {
    (async()=>{
      const res = await getConsumer();
    console.log(res);
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
    }
    })();
    


  }, [])
  const editProfile = async (data) => {
    console.log(data);
    const { name, city, district, mobileNo } = data;
    const res = await editConsumer({ name, city, district, mobileNo });
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
    }
  };



  if (!load) {
    return <div className="loader"></div>
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
                    {...register("name", ConsumerSchema.name)}
                    required
                  />
                  {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    {...register("city", ConsumerSchema.city)}
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
                    {...register("district", ConsumerSchema.district)}
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
                    {...register("mobileNo", ConsumerSchema.mobileNo)}
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

export default ConsumerProfile;
