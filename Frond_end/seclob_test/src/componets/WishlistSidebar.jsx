import React from "react";
import { useWishlist } from "../hooks/useWishlist";
import Frame28Icon from "../assets/img/Frame 28.png";
import { Base_Url } from "../services/base_url";
const WishlistSidebar = ({ show, onClose }) => {
  const { wishlist } = useWishlist();
console.log(wishlist,"wishlistwishlistwishlist")
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: show ? 0 : "-400px",
        width: "400px",
        height: "100%",
        backgroundColor: "#fff", // sidebar main background white
        boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
        transition: "right 0.3s ease-in-out",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sidebar Header with same style as main header */}
      <div
        style={{
          height: "100px",
          backgroundColor: "#003F62",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxSizing: "border-box",
          fontWeight: "bold",
          fontSize: "24px",
        }}
          >
          
        <span
  style={{
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "25.01px",
    lineHeight: "25.01px", // 100%
    letterSpacing: "0",
    display: "inline-flex",     // Make flex container inside span
    alignItems: "center",      // Vertically center align image and text
    gap: "12px",               // Space between image and text
  }}
>
  <img
    src={Frame28Icon}
    alt=""
    style={{
      width: "32px",          
      height: "32px",
      pointerEvents: "none",
      display: "block",       
    }}
  />
  Items
</span>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#EDA415",
            fontSize: "28px",
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Sidebar content area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          color: "#000",
        }}
      >
        {wishlist.products.length === 0 ? (
          <p>No products in wishlist.</p>
        ) : (
          wishlist.products.map((product) => (
            <div
              key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
                  <img
                       src={`${Base_Url}${product.images[0]}`}
            
                alt={product.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginRight: "15px",
                  border: "1px solid #EDA415",
                }}
              />
              <div>
                <h4 style={{ margin: "0 0 5px 0" }}>{product.title}</h4>
                <p style={{ margin: 0, color: "#EDA415" }}>₹ 50</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;
