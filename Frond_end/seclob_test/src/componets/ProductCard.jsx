
import React from "react";
import Frame26Icon from "../assets/img/Frame 26.png";
import Frame28Icon from "../assets/img/Frame 28.png";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";
import { useWishlist } from "../hooks/useWishlist"; 
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Fix variable name here
  const isInWishlist = wishlist.products.some(
    (p) => p._id === product._id
  );

  const handleWishlistClick = () => {

    if (isInWishlist) {
      removeFromWishlist(product._id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
    } else {
         console.log("clickgggggggggggggggg")
      addToWishlist(product._id, {
         
        onSuccess: () => toast.success("Added to wishlist"),
      });
    }
  };

  const handleClick = () => {
    navigate(`${PATHS.PRODUCTSDETAILS}/${product._id}`); 
  };

  return (
    <div
      className="card"
      style={{
        width: "270.83px",
        height: "313.75px",
        borderRadius: "19.67px",
        border: "0.98px solid #B6B6B6",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div style={{ position: "relative" }}>
        <img
          src={`http://localhost:5000${product.images[0]}`}
          alt={product.name}
          style={{
            width: "282.28px",
            height: "168.18px",
            objectFit: "cover",
            alignSelf: "center",
            borderTopLeftRadius: "19.67px",
            borderTopRightRadius: "19.67px",
            display: "block",
          }}
        />
        {/* Use button wrapper for accessibility and isolation */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick();
          }}
          style={{
            cursor:"pointer",
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "24px",
            height: "24px",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            padding: 0,
            opacity: "0.8",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <img
            src={Frame28Icon}
            alt=""
            style={{ width: "24px", height: "24px", pointerEvents: "none" }}
            y
          />
        </button>
      </div>

      <div
        className="card-body d-flex flex-column"
        style={{
          padding: "25px",
          gap: "9.84px",
          flex: 1,
        }}
      >
        <h6
          className="card-title"
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {product?.title}
        </h6>
        <p
          className="card-text fw-bold"
          style={{
            margin: 0,
            fontSize: "16px",
          }}
        >
          ₹{product?.variants?.[0]?.price || "N/A"}
        </p>
        <p
          className="card-text"
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#555",
          }}
        >
          <img src={Frame26Icon} alt="" />
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
