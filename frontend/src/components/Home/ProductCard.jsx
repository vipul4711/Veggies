import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { addItemsTOCart } from "../../actions/cartActions.js";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [quantity, setQuantity] = useState(0);
  const [added, setAdded] = useState(false); // Tracks whether the Add button was clicked

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
      setAdded(false); // Show Add button when quantity is 0
    }
  };

  const addToCartHandler = () => {
    if (quantity > 0) {
      dispatch(addItemsTOCart(product._id, quantity));
      alert("Item added to Cart");
    }
  };

  const handleAddClick = () => {
    setQuantity(1);
    setAdded(true);
  };

  // Handle click on the left half of the product card
  const handleCardClick = () => {
    if (!added) {
      navigate(`/product/${product._id}`); // Redirect to ProductDetails
    }
  };

  return (
    <div className="product-card">
      {/* Conditionally clickable half of the component */}
      <div
        className={`product-left-half ${added ? "non-clickable" : "clickable"}`}
        onClick={handleCardClick}
      >
        <div className="product-image-wrapper">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="product-image"
          />
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <p className="product-unit">{product.unit}</p>
      </div>

      {/* Right half with Add functionality */}
      {added ? (
        <div className="quantity-add-to-cart-wrapper">
          <div className="quantity-controls">
            <button className="quantity-button" onClick={decreaseQuantity}>
              -
            </button>
            <input
              className="quantity-input"
              type="number"
              value={quantity}
              readOnly
            />
            <button className="quantity-button" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button className="add-to-cart-btn" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      ) : (
        <button className="add-button" onClick={handleAddClick}>
          Add
        </button>
      )}
    </div>
  );
};

export default ProductCard;
