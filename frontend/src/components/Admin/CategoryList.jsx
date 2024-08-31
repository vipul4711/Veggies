import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./CategoryList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  clearErrors,
  deleteCategory,
} from "../../actions/categoryActions";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, categories } = useSelector((state) => state.allCategory);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.editCategory
  );

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
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
      alert("Category deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
    dispatch(getAllCategories());
  }, [error, deleteError, isDeleted, dispatch, navigate]);

  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/category/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteCategoryHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL CATEGORIES - ADMIN`} />
      <div className="dashboard">
        <SideBar />
        <div className="categoryListContainer">
          <h1 id="categoryListHeading">All Categories</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="categoryListTable"
            autoHeight={false}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryList;
