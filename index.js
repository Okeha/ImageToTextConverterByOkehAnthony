const Tract = require("tesseract.js");
const express = require("express");
// const e = require("express");
const multer = require("multer");
const fs = require("fs");
const { text } = require("express");

const app = express();

app.use(express.json());

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
  res.json({
    text: `${Tract.recognize(req.file.path, "enm").then((out) =>
      console.log(out.data.text)
    )}`,
  });
};

app.get(`/`, (req, res) => {
  res.render("index");
});
app.post("/convertImage", upload.single("image"), convertImage);

app.listen(3090, () => {
  console.log("Server Running on port 3090");
});
