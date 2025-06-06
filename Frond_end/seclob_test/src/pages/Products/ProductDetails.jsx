import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data";
import { getProductById } from "../../services/productapiCall";
import Frame28Icon from "../../assets/img/Frame 28.png";
import { useWishlist } from "../../hooks/useWishlist";
import { toast } from "react-hot-toast";
import { Base_Url } from "../../services/base_url";

const ProductDetails = () => {
  const { id } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const {
    data: product,
    isLoading,
    error,
  } = useFetchData("single-product", getProductById, id);
  // Fix variable name here
  const isInWishlist = wishlist.products.some((p) => p._id === product?._id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
    } else {
      console.log("clickgggggggggggggggg");
      addToWishlist(product._id, {
        onSuccess: () => toast.success("Added to wishlist"),
      });
    }
  };
  const [mainImage, setMainImage] = useState("");

  React.useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(`${Base_Url}${product.images[0]}`);
    }
  }, [product]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;

  return (
    <div className="container mt-5">
      <div style={{ padding: "24px", fontFamily: "'Poppins', sans-serif" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#3A3A3A",
            }}
          >
            Home &gt; Product Details &gt;
          </div>
        </div>
      </div>
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6">
          <div
            className="mb-3"
            style={{
              width: "647px",
              height: "561px",
              borderRadius: "20px",
              border: "1px solid #ACACAC",
              overflow: "hidden",
            }}
          >
            <img
              src={mainImage}
              alt="Main"
              className="img-fluid"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="d-flex gap-3">
            {product?.images?.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={`${Base_Url}${img}`}
                alt={`Sub${index + 1}`}
                className="img-thumbnail"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    mainImage === `${Base_Url}${img}`
                      ? "2px solid blue"
                      : "1px solid #ddd",
                }}
                onClick={() => setMainImage(`${Base_Url}${img}`)}
              />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <div
            style={{
              // minWidth: "300px",
              minHeight: "134px",
              // position: "absolute",
              // top: "275px",
              // left: "759px",
              // display: "flex",
              // flexDirection: "column",
              gap: "16px",
              padding: "16px",
            }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "30px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#003F62",
                margin: 0,
              }}
            >
              {product?.title}
            </h3>

            <h4
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "29.68px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#4A4A4A",
                marginTop: "1rem",
              }}
            >
              ₹{product?.variants?.[0]?.price || "N/A"}
            </h4>

            <p
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "18.17px",
                lineHeight: "100%",
                letterSpacing: "0",
                color: "#6c757d",
              }}
            >
              Availability:{" "}
              <span
                style={{
                  color: "#198754",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                }}
              >
                In Stock
              </span>
            </p>

            <p className="text-muted">
              Hurry up! only {product?.variants?.[0]?.qty || 0} product left in
              stock!
            </p>
          </div>

          <hr />

          <p>
            Stock: <strong>{product?.variants?.[0]?.qty || 0} Units</strong>
          </p>
          <div className="d-flex gap-3 mb-3" style={{ alignItems: "center" }}>
            {product?.variants?.map((variant) => (
              <div
                key={variant?._id}
                className="d-flex align-items-center "
                style={{
                  gap: "10px",
                  // border: "1px solid #000000",
                  // padding: "0 8px",
                  // height: "32px",
                  // width: "auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "18.17px",
                    lineHeight: "100%",
                    letterSpacing: 0,
                    // color: "#000000",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ram:
                </span>
                <div
                  style={{
                    width: "63px",
                    height: "32px",
                    backgroundColor: "#EEEEEE",
                    color: "#000000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "18.17px",
                    borderRadius: "4px",
                    border: "1px solid #000000",
                  }}
                >
                  {variant?.ram}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mb-3 d-flex align-items-center gap-3"
            style={{ maxWidth: "200px" }}
          >
            <label className="form-label fw-semibold mb-0">Quantity:</label>

            <div className="input-group" style={{ width: "120px" }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  const input = document.getElementById("quantityInput");
                  let current = parseInt(input.value) || 1;
                  if (current > 1) input.value = current - 1;
                }}
              >
                −
              </button>

              <input
                type="number"
                id="quantityInput"
                defaultValue={1}
                min={1}
                className="form-control text-center"
                style={{ maxWidth: "50px" }}
              />

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  const input = document.getElementById("quantityInput");
                  let current = parseInt(input.value) || 1;
                  input.value = current + 1;
                }}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center gap-5">
            <button
              style={{
                width: "241px",
                height: "53px",
                borderRadius: "32.42px",
                backgroundColor: "#EDA415",
                border: "none",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16.21px",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "22.7px",
                  lineHeight: "100%",
                  letterSpacing: 0,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {" "}
                Edit Product
              </span>
            </button>
            <button
              style={{
                width: "2",
                height: "53px",
                borderRadius: "32.42px",
                backgroundColor: "#EDA415",
                border: "none",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16.21px",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "22.7px",
                  lineHeight: "100%",
                  letterSpacing: 0,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {" "}
                Buy It Now
              </span>
            </button>
            <div
              style={{
                width: "44px",
                height: "43px",
                borderRadius: "500px",
                overflow: "hidden",
                marginRight: "16.21px",
              }}
              onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick();
          }}
            >
              <img
                src={Frame28Icon}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "500px",
                  border: isInWishlist ? "2px solid red" : "none", 
    backgroundColor: isInWishlist ? "#ffe6e6" : "transparent", 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
