const express = require("express");
const connectDb = require("./config/db");
const path = require("path");

const app = express();

//connect DB
connectDb();

//Init middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

//serve static assets in producation
if ((process.end.NODE_ENV = "production")) {
  //Set static doler
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is live on ${PORT}`));
