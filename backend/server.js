const express = require("express");
const connectDB = require("./configs/database");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const fileUpload = require("express-fileupload");
const connectCloudinary = require("./configs/cloudniary");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  }),
);

//all request which has prefix url /api/v1/auth will directed to this route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server started at port number ${PORT}`);
});
connectDB();
connectCloudinary();
