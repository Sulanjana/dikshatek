"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DeleteProductCategory = ({ loading, productCategory }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (productCategoryId) => {
    await axios.delete(`/api/productCategory?id=${productCategoryId}`);
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
        className="hover:text-red-600 hover:font-bold hover:bg-red-100 block text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        Delete
      </button>
      {/* Main modal */}
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
                Delete Category {productCategory.name}
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
            <div className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Are you sure want to delete this product?
                  </label>
                </div>
              </div>
              <button
                onClick={() => handleDelete(productCategory.id)}
                className="text-white bg-red-700 hover:text-red-600 hover:font-bold hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-indigo-950 dark:focuindigo:80ng-blue-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProductCategory;
