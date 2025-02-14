// import { React, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Button } from "@windmill/react-ui";
// import { ImFacebook, ImGoogle } from "react-icons/im";
// import { useTranslation } from "react-i18next";
// import Error from "components/form/Error";
// import LabelArea from "components/form/LabelArea";
// import InputArea from "components/form/InputArea";
// import ImageLight from "assets/img/login-office.jpeg";
// import ImageDark from "assets/img/login-office-dark.jpeg";
// import useLoginSubmit from "../hooks/useLoginSubmit";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// const Login = () => {
//   const { t } = useTranslation();
//   const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <>
//       <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
//         <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
//           <div className="flex flex-col overflow-y-auto md:flex-row">
//             <div className="h-32 md:h-auto md:w-1/2">
//               <img
//                 aria-hidden="true"
//                 className="object-cover w-full h-full dark:hidden"
//                 src={ImageLight}
//                 alt="Office"
//               />
//               <img
//                 aria-hidden="true"
//                 className="hidden object-cover w-full h-full dark:block"
//                 src={ImageDark}
//                 alt="Office"
//               />
//             </div>
//             <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
//               <div className="w-full">
//                 <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
//                   Login
//                 </h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <LabelArea label="Email" />
//                   <InputArea
//                     register={register}
//                     label="Email"
//                     name="email"
//                     type="email"
//                     placeholder="john@doe.com"
//                   />
//                   <Error errorName={errors.email} />
//                   <div className="mt-6">
//                     <LabelArea label="Password" />
//                     <div style={{ position: 'relative' }}>
//                       <InputArea
//                         register={register}
//                         label="Password"
//                         name="password"
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="***************"
//                       />
//                       <div
//                         style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
//                         {showPassword ? (
//                           <FiEye cursor="pointer" onClick={togglePasswordVisibility} />
//                         ) : (
//                           <FiEyeOff cursor="pointer" onClick={togglePasswordVisibility} />
//                         )}
//                       </div>
//                     </div>
//                     <Error errorName={errors.password} />
//                   </div>
//                   <Button
//                     id="styleButton"
//                     disabled={loading}
//                     type="submit"
//                     className="mt-4 h-12 w-full"
//                     to="/dashboard"
//                   >
//                     {t("LoginTitle")}
//                   </Button>
//                   <hr className="my-10" />
//                 </form>
//                 <div className="flex flex-row">
//                   <p className="mt-1 mr-6">
//                     <Link
//                       id="styleLink"
//                       className="text-sm font-medium "
//                       to="/forgot-password"
//                     >
//                       {t("ForgotPassword")}
//                     </Link>
//                   </p>
//                   <p className="mt-1 mr-6">
//                     <Link
//                       className="text-sm font-medium "
//                       id="styleLink"
//                     to="/executive"
//                     >
//                       {t("CreateAccount")}
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Login;
// // ------------------------------------------------------------Testing Netlify Deploy-----------------------------------------------------------------------
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Error from "components/form/Error";
import LabelArea from "components/form/LabelArea";
import InputArea from "components/form/InputArea";
import ImageLight from "assets/img/login-office.jpeg.jpg";
import ImageDark from "assets/img/login-office-dark.jpeg.jpg";
import useLoginSubmit from "../hooks/useLoginSubmit";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        "https://attica.onrender.com/api/admin/login",
        data
      );
      const { token, name, email, role, redirectToDashboard, redirectURL } =
        response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      

      if (redirectToDashboard) {
        const finalRedirectURL = redirectURL || "/dashboard";
        history.push(finalRedirectURL);
      } else {
        history.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      // Handle login error
    }
  };

  const handleFormSubmit = (formData) => {
    loginUser(formData);
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="Email" />
                  <InputArea
                    register={register}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-6">
                    <LabelArea label="Password" />
                    <div style={{ position: "relative" }}>
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="***************"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {showPassword ? (
                          <FiEye
                            cursor="pointer"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <FiEyeOff
                            cursor="pointer"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                    <Error errorName={errors.password} />
                  </div>
                  <Button
                    id="styleButton"
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                    to="/dashboard"
                  >
                    {t("LoginTitle")}
                  </Button>
                  <hr className="my-10" />
                </form>
                <div className="flex flex-row">
                  <p className="mt-1 mr-6">
                    <Link
                      id="styleLink"
                      className="text-sm font-medium "
                      to="/forgot-password"
                    >
                      {t("ForgotPassword")}
                    </Link>
                  </p>
                  <p className="mt-1 mr-6">
                    <Link
                      className="text-sm font-medium "
                      id="styleLink"
                      to="/executive"
                    >
                      {t("CreateAccount")}
                    </Link>
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
