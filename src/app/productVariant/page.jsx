"use client";

import AddProductVarian from "./addProductVariant";
import UpdateProductVarian from "./updateProductVariant";
import DeleteProductVarian from "./deleteProductVariant";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductVarian = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const statusProducts = useSelector((state) => state.products.status);
  const [loading, setLoading] = useState(false);
  const [productVariant, setProductVariant] = useState([]);
  const handleProduct = (id) => {
    if (statusProducts === "succeeded") {
      const productResult = products.data.filter((item) => item.id === id);

      return productResult[0]?.name;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/productVariant");
      const result = await response.json();
      setProductVariant(result.data);
      setLoading(false);
    }
    fetchData();
  }, [loading]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="py-10 px-10">
      <div className="relative overflow-x-auto">
        <div className="my-2">
          <AddProductVarian
            loading={setLoading}
            products={products}
            statusProducts={statusProducts}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-white bg-indigo-950 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-4 rounded-tl-xl">
                Code
              </th>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                Image
              </th>
              <th scope="col" className="px-6 py-4">
                Product
              </th>
              <th scope="col" className="px-6 py-4">
                Quantity
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Active
              </th>
              <th scope="col" className="px-6 py-4 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productVariant.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.code}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    width={100}
                    height={100}
                    src={item.image_location}
                    alt=""
                  />
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {handleProduct(item.product_id)}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.qty}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.price}
                </td>
                <td className="px-6 py-4">
                  {item.active === 1 ? "Active" : "Non Active"}
                </td>
                <td className="px-6 py-4">
                  <DeleteProductVarian variant={item} loading={setLoading} />
                  <UpdateProductVarian
                    variant={item}
                    loading={setLoading}
                    products={products}
                    statusProducts={statusProducts}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVarian;
