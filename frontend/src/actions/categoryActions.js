import axios from "axios";
import {
  ALL_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_RESET,
  NEW_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCSESS,
} from "../constants/categoryConstants";

// Get All Categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });

    // Assuming an API call to fetch categories
    const { data } = await axios.get("/api/v1/admin/categories");

    dispatch({
      type: ALL_CATEGORY_SUCCESS,
      payload: { categories: data.categories }, // Ensure data is correctly shaped
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

// Create New Category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    // Create FormData instance to handle file uploads
    const formData = new FormData();
    formData.append("name", categoryData.get("name"));
    if (categoryData.image) {
      formData.append("images", categoryData.get("images"));
    }

    // No need to set Content-Type header manually with FormData
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    // Make API request
    const { data } = await axios.post(
      "/api/v1/admin/category/new",
      categoryData,
      config
    );

    // Dispatch success action with received data
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch fail action with error message
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Category
export const editCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/category/${id}`,
      categoryData,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    console.log(id);

    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get Single Product Details
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/category/${id}`);
    dispatch({
      type: CATEGORY_DETAILS_SUCSESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
