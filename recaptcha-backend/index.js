const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("The app is running");
});

// recaptcha-form-submit
app.post("/form-submit", function (req, res) {
  const params = new URLSearchParams({
    secret: process.env.GREPACTCHA_SECRET,
    response: req.body["g-recaptcha-response"],
    remoteip: req.ip,
  });

  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.success) {
        res.json({ captchaSuccess: true });
      } else {
        res.json({ captchaSuccess: false });
      }
    });
});

app.listen(port, () => {
  console.log(`App is running on the port ${port}`);
});
