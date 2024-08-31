import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderActions";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import "./MyOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error && user) {
      if (error === "Unauthorized access. Please log in.") {
        navigate("/login");
      } else {
        alert(error);
        dispatch(clearErrors());
      }
    } else {
      dispatch(myOrders());
    }
  }, [dispatch, error, navigate, user]);

  return (
    <Box className="myOrdersPage">
      <MetaData title={`${user?.name}'s Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h5" className="heading">
            {user?.name}'s Orders
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
                    to={`/order/${order._id}`}
                    startIcon={<LaunchIcon />}
                    className="orderDetailsButton"
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default MyOrders;
