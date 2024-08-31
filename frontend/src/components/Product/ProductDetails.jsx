import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { addItemsTOCart } from "../../actions/cartActions.js";
import Loader from "../layout/Loader/Loader.jsx";
import "./ProductDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(1);
  };

  const addToCartHandler = () => {
    if (product.stock < 1) {
      alert("Product is out of stock");
      return;
    }
    dispatch(addItemsTOCart(id, quantity));
    alert("Item added to Cart");
  };

  if (loading) return <Loader />;

  return (
    <Fragment>
      <div className="ProductDetails">
        {/* Main Image Display */}
        <div className="ImageGallery">
          <img src={mainImage} alt="Product" className="MainImage" />

          {/* Thumbnail Container: Renders only if there are at least two images */}
          {product.images && product.images.length > 1 && (
            <div className="ThumbnailContainer">
              {product.images.map((item, i) => (
                <img
                  key={i}
                  src={item.url}
                  alt={`Thumbnail ${i}`}
                  className={`Thumbnail ${
                    mainImage === item.url ? "Active" : ""
                  }`}
                  onClick={() => setMainImage(item.url)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="ProductInfo">
          <h2 className="ProductName">{product.name}</h2>
          <div className="PriceSection">
            <span className="CurrentPrice">₹{product.price}</span>
            <span className="OriginalPrice">₹{product.originalPrice}</span>
          </div>

          {/* Quantity Control */}
          <div className="QuantityControl">
            <button onClick={decreaseQuantity} className="QtyButton">
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="QtyInput"
            />
            <button onClick={increaseQuantity} className="QtyButton">
              +
            </button>
          </div>

          {/* Stock Status */}
          <p
            className={`StockStatus ${
              product.stock < 1 ? "OutOfStock" : "InStock"
            }`}
          >
            {product.stock < 1 ? "Out of Stock" : "In Stock"}
          </p>

          {/* Add to Cart Button */}
          <button className="AddToCartButton" onClick={addToCartHandler}>
            Add to Cart
          </button>

          {/* Product Description */}
          <p className="ProductDescription">{product.description}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
