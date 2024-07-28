"use client"

import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [payload, setPayload] = useState({
    name: "",
    password: "",
    roles: "CUSTOMER",
  });

  const handleSubmit = async (e) => {
    event.preventDefault();
    try {
      await signIn("credentials", {
        name: payload.name,
        password: payload.password,
        roles: payload.roles,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log("Login Gagal");
    }
  };
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      style={{ background: " rgba(0,0,0,0.5)" }}
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto mt-36">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Login
            </h3>
          </div>
          {/* Modal body */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  value={payload.name}
                  onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                  }
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Username"
                  required={true}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={payload.plu}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      password: e.target.value,
                    })
                  }
                  autoCapitalize="word"
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Password"
                  required={true}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-indigo-950 hover:text-indigo-950 hover:font-bold hover:bg-indigo-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
