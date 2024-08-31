import React from "react";
import { Typography } from "@mui/material";
import "./CategoryCard.css";

const CategoryCard = ({ imageSrc, categoryName, onClick }) => {
  return (
    <div className="categoryCard" onClick={() => onClick(categoryName)}>
      <img src={imageSrc} alt={categoryName} className="categoryImage" />
      <Typography variant="body1" className="categoryName">
        {categoryName}
      </Typography>
    </div>
  );
};

export default CategoryCard;
