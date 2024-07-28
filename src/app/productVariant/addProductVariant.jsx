"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
const AddProductCategory = ({ products, loading, statusProducts }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const [payload, setPayload] = useState({
    product_id: "",
    code: "",
    name: "",
    image: null,
    qty: "",
    price: "",
    active: true,
    created_user: "OPERATOR",
    updated_user: "OPERATOR",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", payload.image);

    await axios.post("/api/uploadImage", formData);
    await axios.post("/api/productVariant", {
      product_id: Number(payload.product_id),
      code: payload.code,
      name: payload.name,
      image_location: `uploads/${payload.image.name}`,
      qty: Number(payload.qty),
      price: Number(payload.price),
      active: payload.active,
      created_user: "OPERATOR",
      updated_user: "OPERATOR",
    });
    setPayload({
      product_id: "",
      code: "",
      name: "",
      image: "",
      qty: "",
      price: "",
      active: true,
      created_user: "OPERATOR",
      updated_user: "OPERATOR",
    });
    router.refresh();
    setOpenModal(false);
    loading(true);
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="text-white inline-flex items-center bg-indigo-950 hover:text-indigo-950 hover:font-bold hover:bg-indigo-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        Add Variant
      </button>
      {/* Main modal */}
      {statusProducts === "succeeded" && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={
            !openModal
              ? "hidden"
              : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          }
          style={{ background: " rgba(0,0,0,0.5)" }}
        >
          <div className="relative p-4 w-full max-w-md max-h-full m-auto">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Product Variant
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={() => setOpenModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product
                    </label>
                    <select
                      id="product"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={
                        payload.product_id === "" ? -1 : payload.product_id
                      }
                      onChange={(e) =>
                        setPayload({ ...payload, product_id: e.target.value })
                      }
                      required={true}
                    >
                      <option disabled value={-1}>
                        Product
                      </option>
                      {products.data.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Code
                    </label>
                    <input
                      value={payload.code}
                      onChange={(e) =>
                        setPayload({
                          ...payload,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      style={{ textTransform: "uppercase" }}
                      autoCapitalize="word"
                      type="text"
                      name="code"
                      id="code"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Code Product"
                      required={true}
                    />
                  </div>
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
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Name Product Category"
                      required={true}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image
                    </label>
                    <input
                      onChange={(e) =>
                        setPayload({ ...payload, image: e.target.files[0] })
                      }
                      accept="image/*"
                      type="file"
                      name="image"
                      id="image"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="image"
                      required={true}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quantity
                    </label>
                    <input
                      value={payload.qty}
                      onChange={(e) =>
                        setPayload({ ...payload, qty: e.target.value })
                      }
                      type="number"
                      name="qty"
                      id="qty"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                      required={true}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      value={payload.price}
                      onChange={(e) =>
                        setPayload({ ...payload, price: e.target.value })
                      }
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                      required={true}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-indigo-950 hover:text-indigo-950 hover:font-bold hover:bg-indigo-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Variant
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductCategory;
