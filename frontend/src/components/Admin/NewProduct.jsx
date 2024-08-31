import React, { useState, useEffect, Fragment } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from "../../actions/productActions";
import { Button, IconButton } from "@mui/material";
import MetaData from "../layout/MetaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categories } = useSelector((state) => state.allCategory);
  let Allcategories = categories.map((item) => {
    return item.name;
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [units, setUnits] = useState(["kg", "pcs"]); // Default units
  const [unit, setUnit] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [newUnit, setNewUnit] = useState(""); // For adding new unit

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("unit", unit);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
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

  // Function to add a new unit
  const addUnitHandler = () => {
    if (newUnit && !units.includes(newUnit)) {
      setUnits([...units, newUnit]);
      setNewUnit("");
    }
  };

  // Function to delete a unit
  const deleteUnitHandler = (unitToDelete) => {
    setUnits(units.filter((u) => u !== unitToDelete));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {Allcategories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <SpellcheckIcon />
              <select onChange={(e) => setUnit(e.target.value)}>
                <option value="">Choose Unit</option>
                {units.map((unitItem) => (
                  <option key={unitItem} value={unitItem}>
                    {unitItem}
                  </option>
                ))}
              </select>
            </div>

            <div className="unitManager">
              <input
                type="text"
                placeholder="Add new unit"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={addUnitHandler}
              >
                Add Unit
              </Button>
            </div>

            <div className="unitList">
              {units.map((unitItem) => (
                <div key={unitItem} className="unitItem">
                  <span>{unitItem}</span>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => deleteUnitHandler(unitItem)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
