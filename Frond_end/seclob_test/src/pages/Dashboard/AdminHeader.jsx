import React from "react";

const AdminHeader = ({
  selectedCategory,
  selectedSubcategory,
  onAddCategory,
  onAddSubcategory,
  onAddProduct,
}) => {
  return (
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
          Home &gt; {selectedCategory && `${selectedCategory.name} >`}{" "}
          {selectedSubcategory && selectedSubcategory}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onAddCategory}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#EDA415",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Add Category
          </button>
          <button
            onClick={onAddSubcategory}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#EDA415",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Add Subcategory
          </button>
          <button
            onClick={onAddProduct}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              backgroundColor: "#EDA415",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
