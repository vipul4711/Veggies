import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productActions";
import { getAllCategories } from "../../actions/categoryActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import CategoryCard from "./CategoryCard";
import Pagination from "@mui/material/Pagination";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 500]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.allCategory);

  let Allcategories = categories.map((item) => {
    return {
      name: item.name,
      imageSrc: item.images,
    };
  });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
    window.scrollTo(0, 0);
  }, [dispatch, keyword, currentPage, price, error, category, ratings]);

  return (
    <Fragment>
      <div className="content">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="container mt-3">
              <div className="row g-3 category-container">
                {Allcategories.map((categoryObj, index) => (
                  <div key={index} className="col-6">
                    <CategoryCard
                      imageSrc={categoryObj.imageSrc.url}
                      categoryName={categoryObj.name}
                      onClick={() => setCategory(categoryObj.name)}
                    />
                  </div>
                ))}
              </div>

              <div className="product-header text-center">
                <h2>Exclusive Products</h2>
              </div>

              <div className="row g-3 product-container">
                {products &&
                  products.map((product) => (
                    <div key={product._id} className="col-6">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>

              {productCount > 0 &&
                resultPerPage > 0 &&
                resultPerPage < productCount && (
                  <div className="paginationBox">
                    <Pagination
                      page={currentPage}
                      count={Math.ceil(productCount / resultPerPage)}
                      onChange={setCurrentPageNo}
                    />
                  </div>
                )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Products;
