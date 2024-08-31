import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Sidebar from "./Sidebar";
import "./OrderList.css";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

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
      alert("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <Box className="orderListPage">
        <Sidebar />
        <Box className="orderListContainer">
          <Typography variant="h5" className="heading">
            All Orders
          </Typography>

          {orders?.map((order) => (
            <Card key={order._id} className="orderCard">
              <CardContent>
                <Typography variant="body1" className="orderStatus">
                  Status:{" "}
                  <span
                    className={
                      order.orderStatus === "Delivered"
                        ? "statusDelivered"
                        : "statusPending"
                    }
                  >
                    {order.orderStatus}
                  </span>
                </Typography>

                <Typography variant="body2" className="orderAmount">
                  Total Amount: ₹{order.totalPrice.toFixed(2)}
                </Typography>

                <Box className="orderItems">
                  {order.orderItems.map((item, index) => (
                    <Box key={index} className="orderItem">
                      <Typography className="itemName">{item.name}</Typography>
                      <Typography className="itemQty">
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box className="orderActions">
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/admin/order/${order._id}`}
                    startIcon={<EditIcon />}
                    className="orderDetailsButton"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => deleteOrderHandler(order._id)}
                    startIcon={<DeleteIcon />}
                    className="orderDeleteButton"
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Fragment>
  );
};

export default OrderList;
