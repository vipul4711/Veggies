import React from "react";
import StarRating from "../StarRating/StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      {/* <img src={profilePng} alt="User" /> */}
      <p>{review.name}</p>
      <StarRating ratings={review.rating} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
