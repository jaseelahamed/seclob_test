import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowdownIcon from "../../assets/img/arrow-down.png";
import arrowdownIcon2 from "../../assets/img/arrow-down2.png";
import Frame26Icon from "../../assets/img/Frame 26.png";
import Frame28Icon from "../../assets/img/Frame 28.png";
import Modal from "../../componets/Modal";
import { Formik, Form, Field } from "formik";
import {
  CategorySchema,
  ProductValidationSchema,
  SubCategoryValidationSchema,
} from "../../utils/ValidationSchema";
import { toast } from "react-hot-toast";
import { addCategory, addProduct, addSubCategory, getCategories } from "./category-api";
import { useMutation } from "@tanstack/react-query";

import useFetchData from "../../hooks/use-fetch-data";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../../componets/ProductCard";
import { apiCall } from "../../services/apiCall";
const Dashboard = () => {


  const {
    products: PtoductList,
    loading,
    error: producterror,
    filters,
    setFilters,
  } = useProductContext();
  console.log(PtoductList, "PtoductListPtoductListPtoductList");
  if (loading) return <div>Loading products...</div>;
  if (producterror) return <div>Error fetching products</div>;
  const [modalType, setModalType] = useState(null);

  const {
    data: categoryData,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
  } = useFetchData("category", getCategories, null, null);
  console.log(categoryData, "categoryDatacategoryDatacategoryDatacategoryData");
  // null | "category" | "subcategory" | "product"
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    subcategory: "",
    variants: [{ ram: "", storage: "", price: "", qty: "" }],
    images: ["", "", ""],
  });

  const addProductMutation = useMutation({
    mutationFn: (values) => {
      // Optional: remove empty fields before sending
      const trimmedValues = {
        ...values,
        variants: values.variants.map((v) => ({
          ram: v.ram.trim(),
          storage: v.storage.trim(),
          price: Number(v.price),
          qty: Number(v.qty),
        })),
        images: values.images.filter((img) => img !== ""),
      };
      return addProduct(values);
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
      setFormValues({
        title: "",
        description: "",
        subcategory: "",
        variants: [{ ram: "", storage: "", price: "", qty: "" }],
        images: ["", "", ""],
      });
      if (handleClose) handleClose();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (values) => {
    console.log(values,"8888888888888888888888888888888888888888888888888")
    addProductMutation.mutate(values);
  };

  const handleAddVariant = () => {
    setFormValues((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        { ram: "", storage: "", price: "", qty: "" },
      ],
    }));
  };

  const handleRemoveVariant = (index) => {
    setFormValues((prev) => {
      const newVariants = prev.variants.filter((_, i) => i !== index);
      return { ...prev, variants: newVariants };
    });
  };
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
      refetch();
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
      refetch();
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

  const inputStyle = {
    width: "100px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    backgroundColor: "#F4F8F5",
    color: "#333",
  };

  const labelStyle = {
    width: "100px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    fontSize: "15.97px",
    lineHeight: "100%",
    color: "#3C3C3C",
  };
 
  const [selectedImageIndex, setSelectedImageIndex] = useState(); // ✅ always at top
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

                  {/* Subcategory list (only if this category is selected) */}
                  {selectedCategory?._id === categoryItem?._id && (
                    <ul
                      className="tp-submenu list-unstyled ms-3 mt-1"
                      style={{ paddingLeft: 0 }}
                    >
                      {categoryItem.subcategories?.length > 0 ? (
                        categoryItem.subcategories.map(
                          (subcategory, subIdx) => (
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
                                  selectedSubcategory === subcategory.name
                                    ? 500
                                    : 400,
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
                                {selectedSubcategory === subcategory.name &&
                                  "✓"}
                              </div>

                              <span>{subcategory.name}</span>
                            </li>
                          )
                        )
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

          <div className="col-12 col-md-8">
            <div className="row">
              {PtoductList?.map((prod, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4">
                  <ProductCard product={prod} />
                </div>
              ))}
              {filteredProducts?.length === 0 && (
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
            : "Add Product"
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
                console.log(
                  values,
                  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                );
                handleSubmitCategory(values);
                resetForm();
              }}
            >
              {(formik) => (
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
              initialValues={{ name: "", categoryId: "" }}
              validationSchema={SubCategoryValidationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(
                  values,
                  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                );
                handleSubmitSubCategory(values);
                resetForm();
              }}
            >
              {(formik) => (
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
                      <div style={{ color: "red" }}>
                        {formik.errors.categoryId}
                      </div>
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
            <Formik
              initialValues={formValues}
              // validationSchema={ProductValidationSchema}
              // onSubmit={handleSubmit}
               onSubmit={(values, { resetForm }) => {
               
                handleSubmit(values);
                resetForm();
              }}
              enableReinitialize

             
            >
              {(formik) => (
               <Form >
                  <div className="row mb-3">
                    <div className="col-4 d-flex align-items-center">
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: "17px",
                          lineHeight: "100%",
                          color: "#3C3C3C73",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          paddingBottom: "3.13px",
                          // color: "#fff",
                          padding: "10px",
                        }}
                      >
                        Title :
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        {...formik.getFieldProps("title")}
                        placeholder="Enter product name"
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
                        className="form-control"
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="text-danger">{formik.errors.title}</div>
                      ) : null}
                    </div>
                  </div>

                  {/* VARIANTS */}
                  <div className="row mb-3">
                    <div className="col-4 d-flex align-items-center">
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: "17px",
                          lineHeight: "100%",
                          color: "#3C3C3C73",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          paddingBottom: "3.13px",
                          // color: "#fff",
                          padding: "10px",
                        }}
                      >
                        Variants :
                      </label>
                    </div>
                    <div className="col-8">
                      {formik.values.variants.map((variant, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center gap-5 mb-3"
                          style={{ flexWrap: "wrap" }}
                        >
                          {/* RAM */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: 500,
                                fontSize: "17px",
                                lineHeight: "100%",
                                color: "#3C3C3C73",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                paddingBottom: "3.13px",
                                // color: "#fff",
                                padding: "10px",
                              }}
                            >
                              RAM
                            </label>
                            <input
                              type="text"
                              value={variant.ram}
                              onChange={(e) => {
                                const newVariants = [...formik.values.variants];
                                newVariants[index].ram = e.target.value;
                                formik.setFieldValue("variants", newVariants);
                              }}
                              style={inputStyle}
                            />
                          </div>

                          {/* Price */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: 500,
                                fontSize: "17px",
                                lineHeight: "100%",
                                color: "#3C3C3C73",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                paddingBottom: "3.13px",
                                // color: "#fff",
                                padding: "10px",
                              }}
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              value={variant.price}
                              onChange={(e) => {
                                const newVariants = [...formik.values.variants];
                                newVariants[index].price = e.target.value;
                                formik.setFieldValue("variants", newVariants);
                              }}
                              style={inputStyle}
                            />
                          </div>

                          {/* Qty */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <label
                              style={{
                                fontFamily: "Montserrat",
                                fontWeight: 500,
                                fontSize: "17px",
                                lineHeight: "100%",
                                color: "#3C3C3C73",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                paddingBottom: "3.13px",
                                // color: "#fff",
                                padding: "10px",
                              }}
                            >
                              Qty
                            </label>
                            <input
                              type="number"
                              value={variant.qty}
                              onChange={(e) => {
                                const newVariants = [...formik.values.variants];
                                newVariants[index].qty = e.target.value;
                                formik.setFieldValue("variants", newVariants);
                              }}
                              style={inputStyle}
                            />
                          </div>

                          {/* Remove Variant Button */}
                          {/* <button
                      type="button"
                      onClick={() => {
                        const updated = formValues.variants.filter(
                          (_, i) => i !== index
                        );
                        setFormValues((prev) => ({
                          ...prev,
                          variants: updated,
                        }));
                      }}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button> */}
                        </div>
                      ))}

                      {/* Add Variant Button */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "10px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={handleAddVariant}
                          style={{
                            backgroundColor: "#3C3C3C",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "12px",
                            padding: "15px 13px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <span
                            style={{
                              padding: "15px 16px",
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 500,
                              fontSize: "15px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                              textAlign: "center",
                              verticalAlign: "middle",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Add Variant
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SUBCATEGORY */}
                  <div className="row mb-3">
                    <div className="col-4 d-flex align-items-center">
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: "17px",
                          lineHeight: "100%",
                          color: "#3C3C3C73",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          paddingBottom: "3.13px",
                          // color: "#fff",
                          padding: "10px",
                        }}
                      >
                        Subcategory :
                      </label>
                    </div>
                    <div className="col-8">
                      <select
                        value={formik.values.subcategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...formik.getFieldProps("subcategory")}
                        className="form-select"
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
                          flex: 1,
                        }}
                      >
                        <option value="">Select subcategory</option>
                        {categoryData.map((cat) => (
                          <option key={cat?._id} value={cat?._id}>
                            {cat?.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.subcategory &&
                      formik.errors.subcategory ? (
                        <div className="text-danger">
                          {formik.errors.subcategory}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="row mb-3">
                    <div className="col-4 d-flex align-items-center">
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: "17px",
                          lineHeight: "100%",
                          color: "#3C3C3C73",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          paddingBottom: "3.13px",
                          // color: "#fff",
                          padding: "10px",
                        }}
                      >
                        Description :
                      </label>
                    </div>
                    <div className="col-8">
                      <textarea
                        {...formik.getFieldProps("description")}
                        placeholder="Enter product description"
                        rows="3"
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
                          flex: 1,
                        }}
                        className="form-control"
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* IMAGES */}
                  <div className="row mb-3">
                    <div className="col-4 d-flex align-items-center">
                      <label
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: "17px",
                          lineHeight: "100%",
                          color: "#3C3C3C73",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          paddingBottom: "3.13px",
                          // color: "#fff",
                          padding: "10px",
                        }}
                      >
                        Upload image :
                      </label>
                    </div>
                    <div className="col-8">
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Hidden File Input */}
                        <input
                          id="image-upload-input"
                          type="file"
                          multiple
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const files = Array.from(e.target.files);
                            if (!files.length) return;

                            const formData = new FormData();
                            files.forEach((file) =>
                              formData.append("images", file)
                            );

                            try {
                              const response = await apiCall(
                                "post",
                                "/upload/images",
                                formData,
                                null,
                                true
                              );

                              const uploadedUrls = response.data.urls;

                              if (!uploadedUrls || !uploadedUrls.length) {
                                toast.error(
                                  "No images uploaded. Please try again."
                                );
                                return;
                              }

                              if (selectedImageIndex !== null) {
                                const updatedImages = [...formik.values.images];
                                updatedImages[selectedImageIndex] =
                                  uploadedUrls[0];
                                formik.setFieldValue("images", updatedImages);
                                setSelectedImageIndex(null);
                              } else {
                                formik.setFieldValue("images", [
                                  ...formik.values.images,
                                  ...uploadedUrls,
                                ]);
                              }

                              e.target.value = "";
                            } catch (err) {
                              toast.error(err.message || "Image upload failed");
                              e.target.value = "";
                            }
                          }}
                        />

                        {/* Image Upload Slots */}
                       {formik.values.images.map((url, idx) => (
  <div key={idx} style={{ position: "relative" }}>
    {url ? (
      <img
        src={
          typeof url === "string" && url.startsWith("http")
            ? url
            : `http://localhost:5000${url}`
        }
        alt={`preview-${idx + 1}`}
        style={{
          width: "130px",
          height: "98px",
          objectFit: "cover",
          borderRadius: "12.5px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => {
          setSelectedImageIndex(idx);
          document.getElementById("image-upload-input").click();
        }}
      />
    ) : (
      <label
        htmlFor="image-upload-input"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "130px",
          height: "98px",
          borderRadius: "12.5px",
          border: "3px dashed #3C3C3C73",
          background: "#FFFFFF",
          color: "#aaa",
          cursor: "pointer",
          fontFamily: "Montserrat",
          fontSize: "14px",
          textAlign: "center",
        }}
        onClick={() => {
          setSelectedImageIndex(idx);
        }}
      >
        Upload
      </label>
    )}
  </div>
))}

                        {/* {formik.values.images.length < 5 && (
                          <div style={{ position: "relative" }}>
                            <label
                              htmlFor="image-upload-input"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "130px",
                                height: "98px",
                                borderRadius: "12.5px",
                                border: "3px dashed #3C3C3C73",
                                background: "#FFFFFF",
                                color: "#aaa",
                                cursor: "pointer",
                                fontFamily: "Montserrat",
                                fontSize: "14px",
                                textAlign: "center",
                              }}
                              onClick={() => {
                                setSelectedImageIndex(null);
                              }}
                            >
                              Upload
                            </label>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  {/* SAVE BUTTON */}
                  <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-end">
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
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
