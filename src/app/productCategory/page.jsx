"use client";

import AddProductCategory from "./addProductCategory";
import UpdateProductCategory from "./updateProductCategory";
import DeleteProductCategory from "./deleteProductCategory";
import { useEffect, useState } from "react";

const ProductCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/productCategory");
      const result = await response.json();
      setData(result.data);
      setLoading(false);
    }
    fetchData();
  }, [loading]);

  return (
    <div className="py-10 px-10">
      <div className="relative overflow-x-auto">
        <div className="my-2">
          <AddProductCategory loading={setLoading} />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-white bg-indigo-950 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-4 rounded-tl-xl">
                Product Category
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  {item.active === 1 ? "Active" : "Non Active"}
                </td>
                <td className="px-6 py-4">
                  <DeleteProductCategory
                    loading={setLoading}
                    productCategory={item}
                  />
                  <UpdateProductCategory loading={setLoading} category={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCategory;
