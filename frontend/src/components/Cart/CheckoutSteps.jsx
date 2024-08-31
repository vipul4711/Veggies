import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const steps = [
  {
    label: <Typography>Shipping Details</Typography>,
    icon: <LocalShippingIcon />,
  },
  {
    label: <Typography>Confirm Order</Typography>,
    icon: <LibraryAddCheckIcon />,
  },
  {
    label: <Typography>Payment</Typography>,
    icon: <AccountBalanceIcon />,
  },
];

const stepStyles = {
  boxSizing: "border-box",
  padding: "0 8px", // Reduced padding for mobile
};

const CheckoutSteps = ({ activeStep }) => {
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep >= index}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "green" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
