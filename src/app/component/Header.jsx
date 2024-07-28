"use client";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import { signOut, useSession } from "next-auth/react";
import SidebarMain from "./sidebarMain";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const { status } = useSession();
  async function handleSignOut() {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log("Gagal Logout");
    }
  }
  return (
    <header>
      <nav className="bg-indigo-950 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 text-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            {/* eslint-disable-next-line */}
            <img
              src="data:image/png;base64,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"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              E-Mart
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {status === "authenticated" && (
              <a
                onClick={handleSignOut}
                href="#"
                className="bg-gray-50 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log Out
              </a>
            )}
            {status === "authenticated" && (
              <a
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 hover:cursor-pointer"
                onClick={() => setOpenSidebar(!openSidebar)}
              >
                Go To Products
              </a>
            )}
            {status === "authenticated" && (
              <a
                style={{ backgroundColor: "white" }}
                className="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 hover:cursor-pointer hover:bg-white"
                onClick={() => setOpenTransaction(!openTransaction)}
              >
                <svg
                  className="w-6 h-6 text-indigo-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
              </a>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
      <SidebarMain open={openTransaction} setOpen={setOpenTransaction} />
    </header>
  );
};

export default Header;
