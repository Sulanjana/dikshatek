"use client";

import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategory } from "../redux/productCategorySlice";

const Product = () => {
  const dispatch = useDispatch();
  const productCategory = useSelector(
    (state) => state.productCategory.productCategory
  );
  const statusCategory = useSelector((state) => state.productCategory.status);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleCategory = (id) => {
    if (statusCategory === "succeeded") {
      const categoryProduct = productCategory?.data?.filter(
        (item) => item.id === id
      );

      return categoryProduct[0]?.name;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/product");
      const result = await response.json();
      setProducts(result.data);
      setLoading(false);
    }
    fetchData();
  }, [loading]);

  useEffect(() => {
    dispatch(fetchProductCategory());
  }, [dispatch]);
  return (
    <div className="py-10 px-10">
      <div className="relative overflow-x-auto">
        <div className="my-2">
          <AddProduct
            loading={setLoading}
            productCategory={productCategory}
            statusCategory={statusCategory}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-white bg-indigo-950 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-4 rounded-tl-xl">
                Plu
              </th>
              <th scope="col" className="px-6 py-4">
                Product
              </th>
              <th scope="col" className="px-6 py-4">
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
            {products.length > 0 &&
              products.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.plu}
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
                    {handleCategory(item.product_category_id)}
                  </td>
                  <td className="px-6 py-4">
                    {item.active === 1 ? "Active" : "Non Active"}
                  </td>
                  <td className="px-6 py-4">
                    <DeleteProduct loading={setLoading} product={item} />
                    <UpdateProduct
                      loading={setLoading}
                      product={item}
                      productCategory={productCategory}
                      statusCategory={statusCategory}
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

export default Product;
