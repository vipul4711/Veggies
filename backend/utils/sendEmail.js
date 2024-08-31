// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//   //   const transporter = await nodeMailer.createTransport({
//   //     host: "smtp.gmail.com",
//   //     port: 465,
//   //     secure: true,
//   //     service: process.env.SMPT_SERVICE,
//   //     auth: {
//   //       user: process.env.SMPT_MAIL,
//   //       pass: process.env.SMPT_PASSWORD,
//   //     },
//   //   });

//   //   const mailoptions = {
//   //     from: process.env.SMPT_MAIL,
//   //     to: options.email,
//   //     subject: options.subject,
//   //     text: options.message,
//   //   };

//   //   await transporter.sendMail(mailoptions);

//   const auth = nodeMailer.createTransport({
//     host: "smtp.gmail.com",
//     service: process.env.SMPT_SERVICE,
//     secure: true,
//     port: process.env.SMPT_PORT,
//     auth: {
//       user: process.env.SMPT_MAIL,
//       pass: process.env.SMPT_PASSWORD,
//     },
//   });

//   const receiver = {
//     from: process.env.SMPT_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   auth.sendMail(receiver, (error, emailResponse) => {
//     if (error) throw error;
//     console.log("success!");
//     response.end();
//   });
// };

// module.exports = sendEmail;

const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
