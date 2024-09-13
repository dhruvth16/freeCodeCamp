require("dotenv").config();
var express = require("express");
var cors = require("cors");
const fileUpload = require("express-fileupload");

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use(fileUpload());

app.post("/api/fileanalyse", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const file = req.files.upfile;

  const filename = file.name;
  const filesize = file.size;
  const filetype = file.mimetype;

  res.json({
    name: filename,
    size: filesize,
    type: filetype,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
