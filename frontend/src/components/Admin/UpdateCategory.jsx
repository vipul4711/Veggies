import React, { Fragment, useState, useEffect } from "react";
import "./UpdateCategory.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoryDetails,
  editCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, category } = useSelector(
    (state) => state.categoryDetails
  );
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.editCategory
  );
  console.log(isUpdated);

  const [name, setName] = useState("");

  useEffect(() => {
    if (category && category._id !== id) {
      dispatch(getCategoryDetails(id));
    } else {
      setName(category.name || "");
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Category Updated Successfully");
      navigate("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, error, updateError, isUpdated, id, category, navigate]);

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();

    dispatch(editCategory(id, { name }));
  };

  return (
    <Fragment>
      <MetaData title="Update Category" />
      <div className="dashboard">
        <SideBar />
        <div className="updateCategoryContainer">
          <form
            className="updateCategoryForm"
            onSubmit={updateCategorySubmitHandler}
          >
            <h1>Update Category</h1>

            <div>
              <input
                type="text"
                placeholder="Category Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button
              id="updateCategoryBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCategory;
