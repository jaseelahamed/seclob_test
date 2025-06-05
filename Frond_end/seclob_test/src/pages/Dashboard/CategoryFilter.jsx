import React from "react";
import ProductCard from "../../componets/ProductCard";

const CategoryFilter = ({
  categoryData = [],
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  handleCategoryClick,
  products = [],
  arrowdownIcon,
    arrowdownIcon2,
  setFilters
}) => {
  return (
    <div className="row">
      {/* Categories + Subcategories */}
      <div className="col-12 col-md-4">
        <h4
          className="mb-3"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: "16.09px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#003F62",
          }}
        >
          Categories
        </h4>
        <h4
          className="mb-3"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "16.09px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#222222",
            cursor: "pointer",
            padding: "8px 12px",
          }}
        //   onClick={() => {
        //     setSelectedSubcategory(null);
        //     setSelectedCategory(null);
        //           }}
                  onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  subcategory: "",
                  page: 1,
                }))
              }
        >
          All categories
        </h4>

        <ul className="list-unstyled">
          {categoryData?.map((categoryItem, idx) => (
            <li key={idx} className="has-dropdown mb-2">
              <a
                onClick={() => {
                  setSelectedCategory(categoryItem);
                  setSelectedSubcategory(null);
                }}
                style={{
                  color: "#222222",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight:
                    selectedCategory?._id === categoryItem?._id ? 500 : 400,
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  backgroundColor:
                    selectedCategory?._id === categoryItem?._id
                      ? "rgba(0, 63, 98, 0.05)"
                      : "transparent",
                }}
              >
                <strong
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: "16.09px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#222222",
                    padding: "2px 4px",
                  }}
                >
                  {categoryItem?.name}
                </strong>

                <span style={{ fontSize: "14px", color: "#FFFFFF" }}>
                  <img
                    src={
                      selectedCategory?._id === categoryItem?._id
                        ? arrowdownIcon
                        : arrowdownIcon2
                    }
                    alt={
                      selectedCategory?._id === categoryItem?._id
                        ? "Collapse"
                        : "Expand"
                    }
                    style={{ width: "14px", height: "14px" }}
                  />
                </span>
              </a>

              {/* Subcategory list */}
              {selectedCategory?._id === categoryItem?._id && (
                <ul
                  className="tp-submenu list-unstyled ms-3 mt-1"
                  style={{ paddingLeft: 0 }}
                >
                  {categoryItem?.subcategories?.length > 0 ? (
                    categoryItem?.subcategories?.map((subcategory, subIdx) => (
                      <li
                        key={subIdx}
                        onClick={() => {
                          handleCategoryClick(subcategory);
                          setSelectedSubcategory(subcategory.name);
                        }}
                        style={{
                          cursor: "pointer",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight:
                            selectedSubcategory === subcategory.name ? 500 : 400,
                          fontSize: "15px",
                          color:
                            selectedSubcategory === subcategory.name
                              ? "#003F62"
                              : "#222222",
                          textDecoration:
                            selectedSubcategory === subcategory.name
                              ? "underline"
                              : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "5px",
                            border: "1.5px solid #FFFFFF",
                            backgroundColor:
                              selectedSubcategory === subcategory.name
                                ? "#B3D4E5"
                                : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            color: "#003F62",
                          }}
                        >
                          {selectedSubcategory === subcategory.name && "✓"}
                        </div>

                        <span>{subcategory.name}</span>
                      </li>
                    ))
                  ) : (
                    <li
                      style={{
                        padding: "6px 12px",
                        fontSize: "14px",
                        color: "#999",
                      }}
                    >
                      No subcategories found
                    </li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Product List */}
      <div className="col-12 col-md-8">
        <div className="row">
          {products?.map((prod, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4">
              <ProductCard product={prod} />
            </div>
          ))}

          {products?.length === 0 && (
            <div className="col-12">
              <p>No products found for the selected category/subcategory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
