import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert("Product deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [error, deleteError, isDeleted, dispatch, navigate]);

  const columns = [
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      flex: 1.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    { field: "unit", headerName: "Unit", minWidth: 100, flex: 0.3 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/product/${params.row.id}`}>
            <EditIcon />
          </Link>
          <Button onClick={() => deleteProductHandler(params.row.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows =
    products?.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      unit: item.unit,
    })) || [];

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - ADMIN" />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
