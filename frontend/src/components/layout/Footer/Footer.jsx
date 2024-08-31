// import React from "react";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer id="footer">
//       <div className="midFooter">
//         <h1>Veggies.</h1>
//         <p>High Quality is our first priority</p>
//         <p>Copyrights 2024 &copy; VipulLotake</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Veggies. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
