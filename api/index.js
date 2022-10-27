import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/api/upload", upload.fields([{ name: 'file', maxCount: 1}, {name: 'pdf', maxCount: 1}]), function (req, res) {
//   const file = req.files.file[0];
//   const pdf = req.files.pdf[0];

//   res.status(200).json(file);
//   res.status(200).json(pdf);
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
 
var upload = multer({ storage: storage });
 
var uploadMultiple = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])
 
 
app.post("/api/upload", uploadMultiple, function (req, res, next) {
   const file = req.files.file[0];
   const pdf_new = req.files.pdf[0];
    if(req.files){
        console.log(req.files)
        console.log("files uploaded")
    }
    var new_file;
    new_file = {"file" : [file.filename],"pdf" : [pdf_new.filename]}
    res.status(200).json(new_file);
})



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
