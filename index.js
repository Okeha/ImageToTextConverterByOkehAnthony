// const tesseract = require("node-tesseract-ocr");
const tesseract = require("tesseract.js");
const express = require("express");
// const e = require("express");
const multer = require("multer");
const fs = require("fs");
const { text } = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname + "/uploads")));

const upload = multer({ dest: "uploads/" });

// var image = `./Screenshot (246).png`;
// Tract.recognize(image, "deu", {
//   logger: (log) => console.log((e = log)),
// }).then((out) => {
//   var text = out.data.text;
//   console.log(text);
// });

// function convert(image) {
//   console.log(image);
//   Tract.recognize(
//     `${image}`,
//     "enm"
//     //   {
//     //     logger: (log) => console.log((e = log)),
//     //   }
//   ).then((out) => console.log(out.data.text));
// }

// convert(image);

const convertImage = async (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  //   res.json({
  //     text: `${Tract.recognize(req.file.path, "enm").then((out) =>
  //       console.log(out.data.text)
  //     )}`,
  //   });
  // const config = {
  //   lang: "eng",
  //   oem: 1,
  //   psm: 3,
  // };

  tesseract
    .recognize(req.file.path, "enm")
    .then((text) => {
      console.log("Result:", text.data.text);
      res.render("index", { data: text.data.text });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

app.get(`/`, (req, res) => {
  res.render("index", { data: "" });
});
app.post("/convertImage", upload.single("image"), convertImage);
const port = process.env.PORT || 3090;
app.listen(port, () => {
  console.log(`Server Running on port ${port}...`);
});
