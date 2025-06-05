import * as Yup from "yup";


export const CategorySchema = Yup.object({
    name: Yup.string().required("Category name is required"),
 
});
export const SubCategoryValidationSchema = Yup.object().shape({
    name: Yup.string().required("Subcategory name is required"),
    categoryId: Yup.string().required("Please select a category"),
  });