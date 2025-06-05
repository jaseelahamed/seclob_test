import React from "react";
import { Formik, Form } from "formik";

const SubCategoryFormModal = ({
  modalType,
  initialValues = { name: "", categoryId: "" },
  validationSchema,
  onSubmit,
  onCancel,
  categoryData = [],
}) => {
  if (modalType !== "subcategory") return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
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
              {categoryData?.map((cat) => (
                <option key={cat?._id} value={cat?._id}>
                  {cat?.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.categoryId}
              </div>
            )}

            {/* Subcategory Name Input */}
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
            {formik.touched.name && formik.errors.name && (
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
                  onCancel();
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
  );
};

export default SubCategoryFormModal;
