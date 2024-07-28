"use client";

import React, { useEffect } from "react";
import HeaderMain from "./component/headerMain";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductVariant } from "./redux/productVariantSlice";

const Login = () => {
  const dispatch = useDispatch();

  const productVariant = useSelector(
    (state) => state.productVariant.productVariant
  );
  const statusProductVariant = useSelector(
    (state) => state.productVariant.status
  );

  useEffect(() => {
    dispatch(fetchProductVariant());
  }, [dispatch]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap justify-evenly mb">
        {statusProductVariant === "succeeded" &&
          productVariant.data.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5"
            >
              <a href="#" className="flex justify-center">
                {/* eslint-disable-next-line */}
                <img
                  className="p-8 rounded-t-lg h-64"
                  src={item.image_location}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                </a>
                <div className="mt-2.5 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                    {item.qty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    Rp. {item.price}
                  </span>
                  <a
                    href="#"
                    className="text-white bg-indigo-900 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-900 dark:hover:bg-indigo-900 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Login;
