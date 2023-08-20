import React from "react";
import AuthApiService from "./services/auth-api-service";
import ConsumerSchema from "./utils/validations/ConsumerSchema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import TokenService from "./services/token-service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const ConsumerProfile = (props) => {
  const [load, setLoading] = useState(false);
  let history = useHistory();
  if (TokenService.hasAuthToken() && TokenService.getRole() != "consumer") {
    history.push("/login");
  }
  else if (!TokenService.hasAuthToken()) {
    history.push("/login");
  }
  let form = useForm({ onblur: true });
  const { register, handleSubmit, formState: { errors }, reset } = form;
  useEffect(() => {
    AuthApiService.getProfile("consumer")
      .then((res) => {

        if (res.status == "success") {
          form.setValue("name", res.record.name);
          form.setValue("city", res.record.city);
          form.setValue("state", res.record.state);
          form.setValue("district", res.record.district);
          form.setValue("mobileNo", res.record.mobileNo);
          setLoading(true);
        }
      })

      .catch((err) => {
        props.showalert(err, "danger");
        console.log(err);
      });

  }, [])
  const editProfile = (data) => {
    const { name, city, state, district, mobileNo } = data;

    AuthApiService.editUser("consumer", {
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
        props.showalert(res.error, "danger");
        console.log(res.error);
      });
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
              <h2>Sign up</h2>
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
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="state"
                    {...register("state", ConsumerSchema.state)}
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
