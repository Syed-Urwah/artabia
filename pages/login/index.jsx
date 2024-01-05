import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getPayload,
  setLocalToken,
  userIsAuthenticated,
} from "../enviroment/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
const Login = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (userIsAuthenticated()) {
      const payload = getPayload();
      console.log(payload.user_type);

      if (payload.user_type == "artist") {
        router.push("/artist/artist_dashboard");
      }
      if (payload.user_type == "user") {
        router.push("/customer");
      }
    }
  }, []);

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
    formData.pers_phone = '+'+ phone;
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
          router.push("/customer");
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
            <div className="flex flex-col items-center gap-2 py-6">
              <label
                htmlFor="email"
                className="font-semibold text-lg lg:w-2/6 "
              >
                Enter Phone Number
              </label>
              <div className="flex flex-col">
                <PhoneInput
                  country={"eg"}
                  enableSearch={true}
                  id="pers_phone"
                  name="pers_phone"
                  value={phone}
                  defaultValue={formData.pers_phone}
                  className="w-full bg-[#E8F0FE] border border-[#CCC]     "
                  onChange={(phone) => setPhone(phone)}
                />
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

            <Link
              href={process.env.NEXT_PUBLIC_FRONT_END_URL + "/forget_password"}
            >
              <p className="mt-2">I have forgotten my password.</p>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
