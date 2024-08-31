import React from "react";
import "./StarRating.css";

const StarRating = ({ ratings }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < ratings ? "star filled" : "star"}>
        &#9733;
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
