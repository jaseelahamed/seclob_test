import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowdownIcon from "../../assets/img/arrow-down.png";
import arrowdownIcon2 from "../../assets/img/arrow-down2.png";

import VictorIcon from "../../assets/img/Vector.png";
import Modal from "../../componets/Modal";
import { Formik, Form, Field } from "formik";
import {
  CategorySchema,
  ProductValidationSchema,
  SubCategoryValidationSchema,
} from "../../utils/ValidationSchema";
import { toast } from "react-hot-toast";
import {
  addCategory,
  addProduct,
  addSubCategory,
  getCategories,
  getSUbCategories,
} from "./category-api";
import { useMutation } from "@tanstack/react-query";

import useFetchData from "../../hooks/use-fetch-data";
import { useProductContext } from "../../context/ProductContext";
import ProductCard from "../../componets/ProductCard";
import { apiCall } from "../../services/apiCall";
import Pagination from "../../componets/Pagination ";
import AdminHeader from "./AdminHeader";
import CategoryFilter from "./CategoryFilter";
import CategoryFormModal from "./CategoryFormModal";
import SubCategoryFormModal from "./SubCategoryFormModal";
import { Base_Url } from "../../services/base_url";
const Dashboard = () => {
  const {
    products: PtoductList,
    loading,
    error: producterror,
    filters,
    refetch: refetchProduct,
    setFilters,
  } = useProductContext();
  console.log(PtoductList, "PtoductListPtoductListPtoductList");

  const [modalType, setModalType] = useState(null);

  const {
    data: categoryData,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
  } = useFetchData("category", getCategories, null, null);
  const {
    data: subcategoryData,
    // isLoading,
    refetch:subcategoryRefetch,
    // isFetching,
    // isError,
    // error,
  } = useFetchData("subcategory", getSUbCategories, null, null);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    subcategory: "",
    variants: [{ ram: "", storage: "", price: "", qty: "" }],
    images: ["", "", ""],
  });

  const addProductMutation = useMutation({
    mutationFn: (values) => {
      const trimmedValues = {
        ...values,
        variants: values?.variants?.map((v) => ({
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
      refetchProduct();

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
    addProductMutation.mutate(values);
  };


  const handleClose = () => {
    setModalType(null);
    // Optionally reset form:
    setFormValues({
      title: "",
      description: "",
      subcategory: "",
      variants: [{ ram: "", storage: "", price: "", qty: "" }],
      images: ["", "", ""],
    });
  };

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (subcategory) => {
    if (selectedCategory?._id === subcategory._id) {
      setSelectedCategory(null);
      setFilters((prev) => ({
        ...prev,

        subcategory: "",
        page: 1,
      }));
    } else {
      setSelectedCategory(subcategory?.name);
      setFilters((prev) => ({
        ...prev,
        subcategory: subcategory?._id,

        page: 1,
      }));
    }
    console.log("Clicked subcategory:", subcategory);
  };

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
      subcategoryRefetch()
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

  const [selectedImageIndex, setSelectedImageIndex] = useState();
  return (
    <>
      <div className="container mt-4">
        
        <AdminHeader
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onAddCategory={() => setModalType("category")}
          onAddSubcategory={() => setModalType("subcategory")}
          onAddProduct={() => setModalType("product")}
        />
      </div>

      <div className="container mt-4">
         <CategoryFilter
      categoryData={categoryData}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubcategory={selectedSubcategory}
      setSelectedSubcategory={setSelectedSubcategory}
      handleCategoryClick={handleCategoryClick}
      products={PtoductList}
      arrowdownIcon={arrowdownIcon}
          arrowdownIcon2={arrowdownIcon2}
          setFilters={setFilters}
    />
        
      </div>
      <Pagination />
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
      
         <CategoryFormModal
        modalType={modalType}
        initialValues={{ name: "" }}
        validationSchema={CategorySchema}
        onSubmit={handleSubmitCategory}
        onCancel={handleClose}
      />

      
<SubCategoryFormModal
        modalType={modalType}
        initialValues={{ name: "", categoryId: "" }}
        validationSchema={SubCategoryValidationSchema}
        onSubmit={handleSubmitSubCategory}
        onCancel={handleClose}
        categoryData={categoryData}
      />
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
              {(formik) => {
                const handleAddVariant = () => {
                  const newVariants = formik.values.variants
                    ? [...formik.values.variants]
                    : [];
                  newVariants.push({
                    ram: "",
                    storage: "",
                    price: "",
                    qty: "",
                  });
                  formik.setFieldValue("variants", newVariants);
                };
                return (
                  <Form>
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
                          <div className="text-danger">
                            {formik.errors.title}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    
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
                        {formik?.values?.variants?.map((variant, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center gap-5 mb-3"
                            style={{ flexWrap: "wrap" }}
                          >
                           
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
                                  const newVariants = [
                                    ...formik.values.variants,
                                  ];
                                  newVariants[index].ram = e.target.value;
                                  formik.setFieldValue("variants", newVariants);
                                }}
                                style={inputStyle}
                              />
                            </div>

                         
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
                                  const newVariants = [
                                    ...formik.values.variants,
                                  ];
                                  newVariants[index].price = e.target.value;
                                  formik.setFieldValue("variants", newVariants);
                                }}
                                style={inputStyle}
                              />
                            </div>

                           
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
                                  const newVariants = [
                                    ...formik.values.variants,
                                  ];
                                  newVariants[index].qty = e.target.value;
                                  formik.setFieldValue("variants", newVariants);
                                }}
                                style={inputStyle}
                              />
                            </div>
                          </div>
                        ))}

                     
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
                          {subcategoryData?.map((cat) => (
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
                                  const updatedImages = [
                                    ...formik.values.images,
                                  ];
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
                                toast.error(
                                  err.message || "Image upload failed"
                                );
                                e.target.value = "";
                              }
                            }}
                          />

                   
                          {formik?.values?.images?.map((url, idx) => (
                            <div key={idx} style={{ position: "relative" }}>
                              {url ? (
                                <img
                                  src={
                                    typeof url === "string" &&
                                    url.startsWith("http")
                                      ? url
                                      : `${Base_Url}${url}`
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
                                    document
                                      .getElementById("image-upload-input")
                                      .click();
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
                                <img src={VictorIcon} alt="" />
                                </label>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  
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
                );
              }}
            </Formik>
          </>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
