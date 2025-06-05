import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowdownIcon from "../../assets/img/arrow-down.png";
import arrowdownIcon2 from "../../assets/img/arrow-down2.png";
import Frame26Icon from "../../assets/img/Frame 26.png";
import Frame28Icon from "../../assets/img/Frame 28.png";
import Modal from "../../componets/Modal";
import { Formik, Form, Field } from "formik";
import { CategorySchema, SubCategoryValidationSchema } from "../../utils/ValidationSchema";
import { toast } from "react-hot-toast";
import { addCategory, addSubCategory, getCategories } from "./category-api";
import { useMutation } from "@tanstack/react-query";
import useBasicFetchData from "../../hooks/use-fetch-data";
import useFetchData from "../../hooks/use-fetch-data";
const Dashboard = () => {
  const [modalType, setModalType] = useState(null);


  const { data: categoryData, isLoading, refetch,  isFetching, isError, error } = useFetchData(
    "category",
    getCategories, 
    null,
    null
  );
console.log(categoryData,"categoryDatacategoryDatacategoryDatacategoryData")
  // null | "category" | "subcategory" | "product"
  const [formValues, setFormValues] = useState({
    categoryName: "",
    parentCategory: "",
    subcategoryName: "",
    productName: "",
    productPrice: "",
    productImage: "",
    productCategory: "",
    productSubcategory: "",
  });

  const handleClose = () => {
    setModalType(null);
    // Optionally reset form:
    setFormValues({
      categoryName: "",
      parentCategory: "",
      subcategoryName: "",
      productName: "",
      productPrice: "",
      productImage: "",
      productCategory: "",
      productSubcategory: "",
    });
  };

  const navigate = useNavigate();

  // Sample categories array (uses `name`, not `category`)
  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Phones", "Laptops", "Cameras"],
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
    },
    {
      id: 3,
      name: "Books",
      subcategories: ["Fiction", "Non-fiction", "Comics"],
    },
  ];

  // Sample products
  const products = [
    {
      id: 1,
      name: "iPhone 13",
      category: "Electronics",
      subcategory: "Phones",
      price: "$799",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "MacBook Pro",
      category: "Electronics",
      subcategory: "Laptops",
      price: "$1299",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Leather Jacket",
      category: "Clothing",
      subcategory: "Men",
      price: "$199",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Science Fiction Novel",
      category: "Books",
      subcategory: "Fiction",
      price: "$19",
      image: "https://via.placeholder.com/150",
    },
    // …add more as needed
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // (Optional) Example handler—adjust as needed
  const handleCategoryClick = (subcategory) => {
    console.log("Clicked subcategory:", subcategory);
    // any additional logic before navigation
  };

  // Filter products by selectedCategory/subcategory
  const filteredProducts = products.filter((prod) => {
    if (selectedCategory && selectedSubcategory) {
      return (
        prod.category === selectedCategory.name &&
        prod.subcategory === selectedSubcategory
      );
    } else if (selectedCategory) {
      return prod.category === selectedCategory.name;
    }
    return true;
  });
  const addCategoryMutation = useMutation({
    mutationFn: (values) => addCategory(values),
    onSuccess: () => {
      toast.success("Category added successfully");
      refetch()
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category");
    },
  });
  const addSubCategoryMutation = useMutation({
    mutationFn: (values) => addSubCategory(values),
    onSuccess: () => {
      toast.success("Category added successfully");
refetch()
      handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category");
    },
  });
  const handleSubmitCategory = (values) => {
    console.log("Submitting category...", values);
    addCategoryMutation.mutate(values);
  };
  const handleSubmitSubCategory = (values) => {
    console.log("Submitting category...", values);
    addSubCategoryMutation.mutate(values);
  };
  return (
    <>
      <div className="container mt-4">
        {/* Top row (Breadcrumb + Buttons) */}
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
                onClick={() => setModalType("category")}
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
                onClick={() => setModalType("subcategory")}
              >
                Add Subcategory
              </button>
              <button
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
                onClick={() => setModalType("product")}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* ===== col-4: Categories + Subcategories ===== */}
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
                // background: "#222222",
                color: "#222222",
                // color: "#FFFFFF", // ensure text is readable on dark background
                padding: "8px 12px", // optional padding for better appearance
              }}
            >
              All categories
            </h4>

            <ul className="list-unstyled">
  {categoryData?.map((categoryItem, idx) => (
    <li key={idx} className="has-dropdown mb-2">
      {/* Category name */}
      <a
        onClick={() => {
          setSelectedCategory(categoryItem);
          setSelectedSubcategory(null);
        }}
        style={{
          color: "#222222",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: selectedCategory?._id === categoryItem?._id ? 500 : 400,
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

      {/* Subcategory list (only if this category is selected) */}
      {selectedCategory?._id === categoryItem?._id && (
        <ul
          className="tp-submenu list-unstyled ms-3 mt-1"
          style={{ paddingLeft: 0 }}
        >
          {categoryItem.subcategories?.length > 0 ? (
            categoryItem.subcategories.map((subcategory, subIdx) => (
              <li
                key={subIdx}
                onClick={() => {
                  handleCategoryClick(subcategory.name); // pass just name or whole object depending on need
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
                {/* Custom checkbox */}
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

          {/* ===== col-8: Product Cards ===== */}
          <div className="col-12 col-md-8">
            <div className="row">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="col-12 col-sm-6 col-lg-4 mb-4">
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
                        src="data:image/jpeg;base64,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"
                        alt={prod.name}
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

                      {/* Frame28Icon positioned at top-right corner */}
                      <img
                        src={Frame28Icon}
                        alt="overlay icon"
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          width: "24px",
                          height: "24px",
                        }}
                      />
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
                        {prod.name}
                      </h6>

                      <p
                        className="card-text fw-bold"
                        style={{
                          margin: 0,
                          fontSize: "16px",
                        }}
                      >
                        {prod.price}
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
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-12">
                  <p>
                    No products found for the selected category/subcategory.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Dynamic Modal ===== */}
      <Modal
        show={modalType !== null}
        title={
          modalType === "category"
            ? "Add Category"
            : modalType === "subcategory"
            ? "Add Sub category"
            : "Create New Product"
        }
        onClose={handleClose}
      >
        {/* Modal body: render different inputs based on modalType */}
        {modalType === "category" && (
          <>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={CategorySchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                handleSubmitCategory(values);
                resetForm();
              }}
            >
              {(formik ) => (
                <Form>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <input
                      {...formik.getFieldProps("name")}
                      name="name"
                      type="text"
                      placeholder="Enter category name"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "15.97px",
                        lineHeight: "100%",
                        paddingLeft: "44px",
                        height: "50px",
                        borderRadius: "14px",
                        border: "1.85px solid #ccc",
                        backgroundColor: "#F4F8F5",
                        color: "#9A9A9A",
                      }}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.name}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="submit"
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
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 500,
                            fontSize: "15.25px",
                            color: "#3C3C3C",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          ADD
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          formik.resetForm(); 
                          handleClose();
                        }}
                        style={{
                          padding: "10px 16px",
                          borderRadius: "8px",
                          backgroundColor: "#F4F8F5",
                          border: "1.5px solid #ccc",
                          color: "#3C3C3C",
                          fontWeight: "600",
                          cursor: "pointer",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 500,
                            fontSize: "15.25px",
                            color: "#3C3C3C",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          DISCARD
                        </span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}

        {modalType === "subcategory" && (
          <>
            <Formik
              initialValues={{ name: "",  categoryId: "", }}
              validationSchema={SubCategoryValidationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                handleSubmitSubCategory(values);
                resetForm();
              }}
            >
              {(formik ) => (
                <Form>
            <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                      {/* Category Select */}
        <select
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: "15.97px",
            lineHeight: "100%",
            paddingLeft: "44px",
            height: "50px",
            borderRadius: "14px",
            border: "1.85px solid #ccc",
            backgroundColor: "#F4F8F5",
            color: "#9A9A9A",
          }}
        >
          <option value="">Select category</option>
          {categoryData.map((cat) => (
            <option key={cat?._id} value={cat?._id}>
              {cat?.name}
            </option>
          ))}
        </select>

        {formik.touched.categoryId && formik.errors.categoryId ? (
          <div style={{ color: "red" }}>{formik.errors.categoryId}</div>
        ) : null}

            <input
              type="text"
             
             
              {...formik.getFieldProps("name")}
              name="name"
             
              placeholder="Enter sub category name"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "15.97px",
                lineHeight: "100%",
                paddingLeft: "44px",
                height: "50px",
                borderRadius: "14px",
                border: "1.85px solid #ccc",
                backgroundColor: "#F4F8F5",
                color: "#9A9A9A",
              }}
            />

<div
                      style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        type="submit"
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
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 500,
                            fontSize: "15.25px",
                            color: "#3C3C3C",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          ADD
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          formik.resetForm(); 
                          handleClose();
                        }}
                        style={{
                          padding: "10px 16px",
                          borderRadius: "8px",
                          backgroundColor: "#F4F8F5",
                          border: "1.5px solid #ccc",
                          color: "#3C3C3C",
                          fontWeight: "600",
                          cursor: "pointer",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 500,
                            fontSize: "15.25px",
                            color: "#3C3C3C",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          DISCARD
                        </span>
                      </button>
                    </div>
                  </div>
            
                </Form>
                 )}
            </Formik>
          </>
        )}

        {modalType === "product" && (
          <>
            <label style={{ fontWeight: 500 }}>Product Name</label>
            <input
              type="text"
              value={formValues.productName}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }
              placeholder="Enter product name"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ fontWeight: 500, marginTop: "12px" }}>
              Product Price
            </label>
            <input
              type="text"
              value={formValues.productPrice}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  productPrice: e.target.value,
                }))
              }
              placeholder="Enter price"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ fontWeight: 500, marginTop: "12px" }}>
              Image URL
            </label>
            <input
              type="text"
              value={formValues.productImage}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  productImage: e.target.value,
                }))
              }
              placeholder="Enter image URL"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ fontWeight: 500, marginTop: "12px" }}>
              Category
            </label>
            <select
              value={formValues.productCategory}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  productCategory: e.target.value,
                }))
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label style={{ fontWeight: 500, marginTop: "12px" }}>
              Subcategory
            </label>
            <select
              value={formValues.productSubcategory}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  productSubcategory: e.target.value,
                }))
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select subcategory</option>
              {categories
                .find((c) => c.name === formValues.productCategory)
                ?.subcategories.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>

            <button
              // onClick={handleSubmit}
              style={{
                marginTop: "12px",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#003F62",
                color: "#fff",
                border: "none",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save Product
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
