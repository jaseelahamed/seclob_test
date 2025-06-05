import React, { useState, useEffect } from "react";
import shoppingIcon from "../assets/img/shopping-cart.png";
import { useProductContext } from "../context/ProductContext";
import heartIcon from "../assets/img/heart.png";
import { useWishlist } from "../hooks/useWishlist";
import WishlistSidebar from "./WishlistSidebar";
const Header = () => {
  const { setFilters } = useProductContext();
  const [searchInput, setSearchInput] = useState("");
  const { wishlist } = useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);
  const wishlistCount = wishlist?.products?.length || 0;
  const handleSearchClick = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchInput.trim(),
      page: 1,
    }));
  };
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilters((prev) => ({
        ...prev,
        search: "",
        page: 1,
      }));
    }
  }, [searchInput, setFilters]);
  return (
    <>
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
      <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
        Product Admin
      </h1>

      <div
        style={{
          position: "relative",
          width: "438px",
        }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

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
        <div onClick={() => setShowWishlist(true)} style={{ display: "flex", alignItems: "center", gap: "8px" ,cursor:"pointer"}}>
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
              padding: "4px 8px",
              gap: "7.89px",
            }}
          >
            {wishlistCount}
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
              padding: "4px 8px",
              gap: "7.89px",
            }}
          >
            0
          </span>
          <span>Cart</span>
        </div>
      </div>
      </header>
       <WishlistSidebar show={showWishlist} onClose={() => setShowWishlist(false)} />
    </>
   
  );
};

export default Header;
