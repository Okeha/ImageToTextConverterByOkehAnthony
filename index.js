const Tract = require("tesseract.js");
const express = require("express");
const e = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");
app.use(express.json());
const upload = multer({ dest: "uploads/" });

function convert() {
  image = `./Screenshot (246).png`;
  Tract.recognize(
    image,
    "eng"
    //    {
    //     logger: (e) => console.log(e),
    //   }
  ).then((out) => {
    var text = out.data.text;
    console.log(text);
  });
}
convert();
// const chek = convert();
// console.log(typeof chek);
const getImage = async (req, res) => {
  //   const text = convert();
  res.json({
    success: true,
    data: {
      id: 1,
      text: `${text}`,
    },
  });
};

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.file.path);
  res.json({ message: "Successfully uploaded files" });
}
app.post("/upload_files", upload.single("image"), uploadFiles);
app.post("/convertImage", getImage);

app.listen(3090, () => {
  console.log("Server Running on port 3090");
});
