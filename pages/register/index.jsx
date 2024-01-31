import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footerr from "@/components/layout/footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { FormattedMessage } from "react-intl";


const Register = () => {
  const [phone, setPhone] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const router = useRouter();
  const [chosenRadio, setChosenRadio] = useState(0);

  const [formData, setFormData] = useState({
    pers_username: "",
    password: "",
    pers_email: "",
    perst_type: "user",
    country_id: null,
    pers_phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    pers_username: [],
    password: [],
    pers_email: [],
    perst_type: [],
    country_id: [],
    pers_phone: [],
  });

  const handelPersonType = (i) => {
    setChosenRadio(i);
    const type = i === 0 ? "user" : "artist";
    setFormData({ ...formData, perst_type: type });
  };
  // Get countires
  useEffect(() => {
    const getCountriesList = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-country",
          {
            api_password:
              "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
          }
        );
        console.log("countries ->", data);
        const countriesArr = [];
        data.data.forEach((country) => {
          const countryObj = {
            eName: country.country_etext,
            aName: country.country_atext,
            value: country.country_pk,
          };
          countriesArr.push(countryObj);
        });
        setCountriesList(countriesArr);
      } catch (error) {
        console.log(error);
      }
    };
    getCountriesList();
  }, []);

  const resetFormErros = (feild) => {
    setFormErrors({ ...formErrors, [feild]: [] });
  };

  const handelChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value };
    setFormData(newObj);
    resetFormErros(e.target.name);
  };

  // const handelPersonType = (i) => {
  //   setChosenRadio(i);
  //   const type = i === 0 ? "user" : "artist";
  //   setFormData({ ...formData, perst_type: type });
  // };

  const handelCountrySelect = (e) => {
    setFormData({ ...formData, country_id: parseInt(e.target.value) });
    resetFormErros("country_id");
    // setFormErrors({ ...formErrors, country_id: [] })
  };
  const handleCodeUpdate = (e) => {
    setCode(e.target.value);
    resetFormErros("code");
  };

  const countryOptions = countriesList.map((country, index) => (
    <option key={country.value} value={country.value}>
      {country.eName}
    </option>
  ));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
     formData.pers_phone = '+'+ phone;
     console.log(formData);
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/sign-up",
        {
          ...formData,
          api_password:
            "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
        }
      );
      console.log(data);
      if (data.status === "true") {
        router.push("/login");
      }

      if (data.status === "false_error") {
        console.log("errors ->", data.error);

        setFormErrors({ ...formErrors, ...data.error });
      }

      // Handle success, e.g., redirect to a new page
    } catch (error) {
      console.error("Signup failed", error);
      // Handle error, e.g., show error messages
    }
  };

  return (
    <>
      <Header />
      <div className="lg:px-52 px-4 py-16 text-black">
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center justify-center lg:mb-5 lg:mr-24">
            <p className="col-span-full text-3xl font-semibold bg-[#8C0D81] bg-opacity-30 px-16 py-2 rounded-full">
              
              <FormattedMessage
                  id="Registration"
                  values={{ b: (info) => <b>{info}</b> }}
                />
            </p>
          </div>

          <div className="py-8 w-full">
            <div className="flex lg:flex-row flex-col items-center  gap-2">
              <label
                htmlFor="email"
                className=" font-semibold text-lg lg:w-1/6 lg:mb-6 "
              >
                
                <FormattedMessage
                  id="Enter Your Email"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </label>
              <div className="flex flex-col w-[300px]  ">
                <input
                  onChange={handelChange}
                  id="pers_email"
                  name="pers_email"
                  type="email"
                  defaultValue={formData.pers_email}
                  aria-describedby="helper-text-explanation"
                  className=" bg-[#E8F0FE] border border-[#CCC] text-gray-900 text-sm block p-4 lg:w-[466px] w-full lg:ml-16  "
                  placeholder="EMAIL ADDRESS"
                />
                {formErrors.pers_email &&
                  formErrors.pers_email.map((err, i) => (
                    <h1 key={i} className="text-red-500 lg:ml-16 mt-1">
                      * {err}
                    </h1>
                  ))}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-2 py-6">
              <label
                htmlFor="email"
                className="font-semibold text-lg lg:w-1/6 lg:mb-6"
              >
                
                <FormattedMessage
                  id="Enter Username"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </label>
              <div className="flex flex-col w-[300px]">
                <input
                  onChange={handelChange}
                  id="pers_username"
                  name="pers_username"
                  type="text"
                  defaultValue={formData.pers_username}
                  aria-describedby="helper-text-explanation"
                  className=" bg-[#E8F0FE] border border-[#CCC] text-gray-900 text-sm block p-4 lg:w-[466px] w-full lg:ml-16 mb-1"
                  placeholder="USER NAME"
                />

                {formErrors.pers_username &&
                  formErrors.pers_username.map((err, i) => (
                    <h1 key={i} className="text-red-500 lg:ml-16 mt-1">
                      * {err}
                    </h1>
                  ))}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-2">
              <label
                htmlFor="phone-input"
                className="font-semibold text-lg lg:w-1/6 lg:mb-6 "
              >
                
                <FormattedMessage
                  id="Enter Phone Number"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </label>
              <div className="flex flex-col w-[300px]">
                <div className="flex items-center lg:ml-16 relative w-full">
                  <PhoneInput
                    country={"eg"}
                    enableSearch={false}
                    id="pers_phone"
                    name="pers_phone"
                    value={phone}
                    defaultValue={formData.pers_phone}
                    className="w-full bg-[#E8F0FE] border border-[#CCC]     "
                    onChange={(phone) => setPhone(phone)}
                  />
                  <label
                    htmlFor="phone-input"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                  >
                    
                    <FormattedMessage
                  id="Your Phone Number"
                  values={{ b: (info) => <b>{info}</b> }}
                />
                  </label>
                </div>
                {formErrors.pers_phone &&
                  formErrors.pers_phone.map((err, i) => (
                    <h1 key={i} className="text-red-500 lg:ml-16 mt-1">
                      * {err}
                    </h1>
                  ))}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-2 pt-6">
              <label
                htmlFor="country"
                className="font-semibold text-lg lg:w-1/6 lg:mb-6"
              >
                
                <FormattedMessage
                  id="Enter Your Country"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </label>
              <div className="flex flex-col w-[300px]">
                <select
                  id="country"
                  onChange={(e) => handelCountrySelect(e)}
                  aria-describedby="helper-text-explanation"
                  className="bg-[#E8F0FE] border border-[#CCC] text-gray-900 text-sm block p-4 lg:w-[466px] w-full lg:ml-16"
                  placeholder="COUNTRY"
                  defaultValue="" // or value=""
                >
                  <option value="" disabled>
                    
                    <FormattedMessage
                  id="Select your country"
                  values={{ b: (info) => <b>{info}</b> }}
                />
                  </option>
                  {countryOptions}
                </select>
                {formErrors.country_id &&
                  formErrors.country_id.map((err, i) => (
                    <h1 key={i} className="text-red-500 lg:ml-16 mt-1">
                      * {err}
                    </h1>
                  ))}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-2 py-6">
              <label
                htmlFor="email"
                className="font-semibold text-lg lg:w-1/6 lg:mb-6"
              >
                
                <FormattedMessage
                  id="Enter Your Password"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </label>
              <div className="flex flex-col w-[300px]">
                <input
                  onChange={handelChange}
                  type="password"
                  id="password"
                  name="password"
                  defaultValue={formData.password}
                  aria-describedby="helper-text-explanation"
                  className=" bg-[#E8F0FE] border border-[#CCC] text-gray-900 text-sm block p-4 lg:w-[466px] w-full lg:ml-16"
                  placeholder="PASSWORD"
                />
                {formErrors.password &&
                  formErrors.password.map((err, i) => (
                    <h1 key={i} className="text-red-500 lg:ml-16 mt-1">
                      * {err}
                    </h1>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="customer-radio"
              type="radio"
              value="customer"
              onChange={() => handelPersonType(0)}
              name="userType"
              className="w-4 h-4 rounded-full custom-radio"
            />
            <label
              htmlFor="customer-radio"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              
              <FormattedMessage
                  id="Join As Customer"
                  values={{ b: (info) => <b>{info}</b> }}
                />
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              id="artist-radio"
              type="radio"
              value="artist"
              onChange={() => handelPersonType(1)}
              name="userType"
              className="w-4 h-4 rounded-full custom-radio"
            />
            <label
              htmlFor="artist-radio"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              
              <FormattedMessage
                  id="Join As Artist"
                  values={{ b: (info) => <b>{info}</b> }}
                />
            </label>
          </div>

          <hr className="h-px my-8 bg-gray-700 border-0"></hr>

          <div className="flex items-center mb-4">
            <input
              defaultChecked
              id="default-checkbox"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              
              <FormattedMessage
                  id="I agree with the terms and conditions."
                  values={{ b: (info) => <b>{info}</b> }}
                />
            </label>
          </div>

          <div className="flex items-center justify-center flex-col">
            <button className="col-span-full text-lg font-semibold bg-[#F21079] bg-opacity-30 px-16 py-2 rounded-full lg:w-[569px]">
              
              <FormattedMessage
                  id="Submit"
                  values={{ b: (info) => <b>{info}</b> }}
                />
            </button>

            <Link href="/login">
              <p className="mt-2">
              <FormattedMessage
                  id="Already have an account. Log In!"
                  values={{ b: (info) => <b>{info}</b> }}
                /></p>
            </Link>
          </div>
        </form>
      </div>
      <Footerr />
    </>
  );
};

export default Register;
