import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../components/inputField";
const Login = () => {
  const validationLogin = Yup.object({
    email: Yup.string().email("Email Is Not Valis").required("required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password Must Contain At Least 8 Characters,")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        " One Uppercase, One Number And One Special Case Character"
      ),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationLogin}
        onSubmit={(value) => {
          console.log(value);
        }}
      >
        {(formik) => {
          return (
            <>
              <section class="flex flex-col md:flex-row h-screen items-center">
                <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                  <img
                    src="https://source.unsplash.com/random"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>

                <div
                  class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
                >
                  <div class="w-full h-100">
                    <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
                      Log in to your account
                    </h1>
                    <Form className="mt-6">
                      <div>
                        <InputField
                          type="text"
                          name="email"
                          placeholder="Enter Email Address"
                          label="Email"
                        />
                      </div>

                      <div classname="mt-4">
                        <InputField
                          placeholder="Enter Pssword"
                          type="password"
                          name="password"
                          label="Password"
                        />
                      </div>
                      <div classname="text-right mt-2">
                        <a
                          href="#"
                          classname="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                        >
                          Forgot Password?
                        </a>
                      </div>

                      <button
                        type="submit"
                        class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                      >
                        Log In
                      </button>
                    </Form>

                    <hr classname="my-6 border-gray-300 w-full" />

                    <button
                      type="button"
                      classname="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                    >
                      <div classname="flex items-center justify-center">
                        <span classname="ml-4">Log in with Google</span>
                      </div>
                    </button>

                    <p classname="mt-8">
                      Need an account?{" "}
                      <a
                        href="#"
                        classname="text-blue-500 hover:text-blue-700 font-semibold"
                      >
                        Create an account
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
