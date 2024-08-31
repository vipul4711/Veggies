const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`MongoDB connected with server : ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// const connectDatabase = () => {
//   mongoose
//     .connect(
//       "mongodb+srv://Vipul:Vipul%2347114320@veggies.7hr8v.mongodb.net/Ecommerce?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     )
//     .then(() => {
//       console.log("Database connected successfully");
//     })
//     .catch((err) => {
//       console.error("Database connection error:", err);
//     });
// };

module.exports = connectDatabase;
