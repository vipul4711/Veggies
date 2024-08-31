import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData.jsx";
import { clearErrors, getProducts } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert(error); // Use the native alert function
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {/* <MetaData title="Veggies" />
      <div className="banner">
        <p>Welcome to Veggies</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll //
            <CgMouse />
          </button>
        </a>
      </div> */}
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
