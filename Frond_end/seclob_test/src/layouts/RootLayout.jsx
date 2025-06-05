// src/layouts/RootLayout.jsx
import React from "react";
import Sidebar from "../componets/Sidebar";
import Header from "../componets/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 overflow-auto bg-gray-100">
          {/* Render nested routes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;