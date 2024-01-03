import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getPayload, setLocalToken, userIsAuthenticated } from "../enviroment/auth";
const Login = () => {
  const router = useRouter();

  useEffect(()=>{
    if (userIsAuthenticated()) {
      const payload = getPayload();
      console.log(payload.user_type)
      
      if(payload.user_type == 'artist'){
        router.push('/artist/artist_dashboard')
      }
      if(payload.user_type == 'user'){
        router.push('/customer')
      }
      
    }
  },[])

  const [formData, setFormData] = useState({
    password: "",
    pers_phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: [],
    pers_phone: [],
    login_failed: [],
  });

  const resetFormErros = (feild) => {
    setFormErrors({ ...formErrors, [feild]: [] });
  };
  const handelChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value };
    setFormData(newObj);
    resetFormErros(e.target.name);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/login",
        {
          password: formData.password,
          pers_phone: formData.pers_phone,
          api_password:
            "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
        }
      );
      console.log("login response ->", data);

      if (data.status === "true") {
        setLocalToken(data.access_token);

        if (data.data.perst_type === "user") {
          router.push("/main");
        } else {
          router.push("/artist/artist_dashboard");
        }
      }
      if (data.status === "false") {
        console.log("errors ->", data.error);
        setFormErrors({
          ...formErrors,
          ...data.error,
          login_failed: [data.error],
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      // Handle error, e.g., show error messages
    }
  };
  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <div className="flex items-center justify-center">
          <p className="col-span-full text-3xl font-semibold bg-[#8C0D81] bg-opacity-30 px-16 py-2 rounded-full">
            LOG IN
          </p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="py-8 w-full">
            <div className="flex flex-col items-center gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-lg lg:w-2/6 "
              >
                Enter Phone Number
              </label>
              <div className="flex items-center ">
                <button
                  id="dropdown-phone-button"
                  data-dropdown-toggle="dropdown-phone"
                  className=" flex-shrink-0 z-10 inline-flex items-center p-4 text-sm font-medium text-center text-gray-900 bg-[#E8F0FE] border border-[#CCC] "
                  type="button"
                >
                  + Code{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div className="flex flex-col relative w-full">
                  <input
                    onChange={handelChange}
                    id="pers_phone"
                    name="pers_phone"
                    type="text"
                    defaultValue={formData.pers_phone}
                    className="block bg-[#E8F0FE] border border-[#CCC] p-4 lg:w-[366px] z-20 text-sm text-gray-900"
                    placeholder="PHONE NUMBER"
                  />
                </div>
              </div>
              {formErrors.pers_phone &&
                formErrors.pers_phone.map((err, i) => (
                  <h1 key={i} className="text-red-500 lg:mr-56">
                    * {err}
                  </h1>
                ))}
            </div>

            <div className="flex flex-col items-center gap-2 py-6">
              <label
                htmlFor="email"
                className="font-semibold text-lg lg:w-2/6 "
              >
                Enter Password
              </label>
              <div className="flex flex-col">
                <input
                  onChange={handelChange}
                  type="password"
                  id="password"
                  name="password"
                  defaultValue={formData.password}
                  aria-describedby="helper-text-explanation"
                  className=" bg-[#E8F0FE] border border-[#CCC] text-gray-900 text-sm block p-4 w-[299px] lg:w-[466px] "
                  placeholder="PASSWORD"
                />
                {formErrors.password &&
                  formErrors.password.map((err, i) => (
                    <h1 key={i} className="text-red-500  mt-2">
                      * {err}
                    </h1>
                  ))}
              </div>
            </div>

            {formErrors.login_failed &&
              formErrors.login_failed.map((err, i) => (
                <h1 key={i} className="text-red-500 mt-2  flex justify-center">
                  * {err}
                </h1>
              ))}
          </div>
          <div className="flex items-center justify-center flex-col">
            {/* <Link href="/main"> */}
            <button
              type="submit"
              className="col-span-full text-lg font-semibold bg-[#F21079] bg-opacity-30 px-16 py-2 rounded-full lg:w-[469px]"
            >
              Log In
            </button>
            {/* </Link> */}
            <Link href="/register">
              {" "}
              <p className="mt-2">Registration</p>
            </Link>

            <p className="mt-2">I have forgotten my password.</p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
