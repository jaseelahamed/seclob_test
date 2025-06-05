// src/components/Header.jsx
import React from "react";
import shoppingIcon from "../assets/img/shopping-cart.png";

import heartIcon from "../assets/img/heart.png";
const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "#003F62",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Logo or Title */}
      <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
        Product Admin
      </h1>

      {/* Center: Search bar with button */}
      <div
        style={{
          position: "relative",
          width: "438px",
        }}
      >
        <input
          type="text"
          placeholder="Search any things"
          style={{
            width: "100%",
            height: "56px",
            borderRadius: "20px",
            paddingLeft: "25px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          style={{
            position: "absolute",
            right: "0px",
            top: "0px",
            width: "132px",
            height: "56px",
            borderRadius: "20px",
            backgroundColor: "#EDA415",
            border: "none",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Right: Wishlist, Cart, Sign In */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          color: "#fff",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={heartIcon} heartIcon alt="" />

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "14.21px",
              height: "15px",
              backgroundColor: "#EDA415",
              borderRadius: "394.74px",
              fontSize: "10px",
              color: "#fff",
              padding: "4px 8px", // Add padding to fit text
              gap: "7.89px",
            }}
          >
            0
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Sign In
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={shoppingIcon} alt="" />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "14.21px",
              height: "15px",
              backgroundColor: "#EDA415",
              borderRadius: "394.74px",
              fontSize: "10px",
              color: "#fff",
              padding: "4px 8px", // Add padding to fit text
              gap: "7.89px",
            }}
          >
            0
          </span>
          <span>Cart</span>
        </div>
       
      </div>
    </header>
  );
};

export default Header;
