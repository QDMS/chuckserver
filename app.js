const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");

require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const transporterContact = nodemailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: 
        process.env.API_SENDGRID_CONTACT
    },
  })
);
const transporterFeedback = nodemailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: 
        process.env.API_SENDGRID_CONTACT
    },
  })
);

app.post("/sendcontactemail", (req, res) => {
  const { name, email, jobtypes, message } = req.body;

    if (!name) {
        return res.status(400).json({error: "Please add your Name"});
    }
    if (!email) {
        return res.status(400).json({error: "Please add your Email"});
    }
    if (!jobtypes) {
        return res.status(400).json({error: "Please add your Job Type"});
    }
    if (!message) {
        return res.status(400).json({error: "Please add your Message"});
    }

  transporterContact.sendMail({
    to: "Chuckslawn1st@gmail.com",
    from: "Chuckslawn1st@gmail.com",
    subject: "Whats On Your Mind?",
    html: `

        <h5>Details Information:</h5>

        <ul>
        <li> <p>Name: ${name}</p> <li>
        <li> <p>Email: ${email}</p> <li>
        <li> <p>Job Types: ${jobtypes}</p> <li>
        <li> <p>Message: ${message}</p> <li>
        </ul>


        `,
  });

  res.json({success: "Your contact e-mail has been sent"});
});

app.post("/sendfeedbackemail", (req, res) => {
  const { name, email, comment } = req.body;

  if (!name) {
    return res.status(400).json({error: "Please add your Name"});
}
if (!email) {
    return res.status(400).json({error: "Please add your Email"});
}
if (!comment) {
    return res.status(400).json({error: "Please add your Comment"});
}

  transporterFeedback.sendMail({
    to: ["Chuckslawn1st@gmail.com","qujuan.miller@snhu.edu"],
    from: ["Chuckslawn1st@gmail.com","qujuan.miller@snhu.edu"],
    subject: "How Did We Do?",
    html: `

        <h5>Details Information:</h5>

        <ul>
        <li> <p>Name: ${name}</p> <li>
        <li> <p>Email: ${email}</p> <li>
        <li> <p>Comment: ${comment}</p> <li>
        </ul>


        `,
  });

  res.json({success: "Your feedback e-mail has been sent"});
});

app.listen(PORT, (req, res) => {
  console.log("Server Connected");
});
