import React, { useState, useEffect } from "react";
import "./CreateCategory.css";
import { useSelector, useDispatch } from "react-redux";
import { createCategory, clearErrors } from "../../actions/categoryActions";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert(error); // Improved error handling
      dispatch(clearErrors());
    }

    if (success) {
      alert("Category Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    if (images) {
      myForm.append("images", images);
    }

    console.log(myForm.get("images"));

    dispatch(createCategory(myForm));
  };

  const createCategoryImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="dashboard">
      <MetaData title="Create Category" />
      <Sidebar />
      <div className="createCategoryContainer">
        <form
          className="createCategoryForm"
          encType="multipart/form-data"
          onSubmit={createCategorySubmitHandler}
        >
          <h1>Create Category</h1>

          <div className="createCategoryInput">
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Category Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="createCategoryFileInput">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={createCategoryImageChange}
            />
          </div>

          <div className="createCategoryImagePreview">
            {imagesPreview && (
              <img src={imagesPreview} alt="Category Preview" />
            )}
          </div>

          <Button id="createCategoryBtn" type="submit" disabled={loading}>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
