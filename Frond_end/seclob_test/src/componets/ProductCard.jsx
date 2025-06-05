import React from "react";
import Frame26Icon from "../assets/img/Frame 26.png";
import Frame28Icon from "../assets/img/Frame 28.png";

const ProductCard = ({ product }) => {
  console.log(product, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={
            product.image ||
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA1gMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xAA+EAACAQMDAgQEBQIGAgIDAAABAgMABBEFEiExQRMiUWEGcYGRFCMyocHR8DNCUrHh8WJyQ5IlNFPxgg//xAAZAQACAwEAAAAAAAAAAAAAAAACAwABBAX/xAAxEQACAQIEBAMFBwUAAAAAAAABAhEAAyExBBJBUWFxIoGhscETMuHxBxVSYnKC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEBAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEBAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEBAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEBAQAAAAAAAAAAAAAAAAAAAAf"
          }
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
        {/* Frame28Icon at top-right corner */}
        {product.badge && (
          <img
            src={Frame28Icon} // Make sure this is imported
            alt="badge"
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "24px",
              height: "24px",
            }}
          />
        )}
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
