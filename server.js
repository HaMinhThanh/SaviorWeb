const express = require("express");
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer")
const path = require("path");

const userRoute = require("./routes/User.routes");
const postRoute = require("./routes/Post.routes");
const articleRoute = require("./routes/Article.routes");
const articleDetailRoute = require("./routes/ArticleDetail.routes");
const messageRoute = require("./routes/Message.routes")
const conversationRoute = require("./routes/Conversation.routes");
const commentRoute = require("./routes/Comment.routes");

dotenv.config();

const URL = process.env.MONGO_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/users", userRoute);
/*app.use("/api/posts", postRoute);
app.use("/api/articles", articleRoute);
app.use("/api/articleDetail", articleDetailRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/comment", commentRoute);*/

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Backend sever is running!");
})