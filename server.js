const express = require("express");
const limiter = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const checkDb = require("./utils/checkDbConnection");
const authRoute = require("./routes/api/auth.route");
const storeRoute = require("./routes/api/store.route");
const categoryRoute = require("./routes/api/category.route");
const itemRoute = require("./routes/api/item.route");

const app = express();
const port = process.env.PORT || 3000;
const rateLimit = limiter({
  windowMs: 30 * 60 * 1000, //30 min
  max: 120,
  message: {
    code: 429,
    msg: "too many requests from your ip, please try again later in 30 min",
  },
});

// limit
app.use(rateLimit);

// secure HTTP headers
app.use(helmet());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//CHECK db if Connected
app.use(checkDb);

// Compress data
app.use(
  compression({
    level: 6,
  })
);

app.use(express.json({ extended: false, limit: "40kb" }));

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/store", storeRoute);
app.use("/api/category", categoryRoute);
app.use("/api/item", itemRoute);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    msg: "404 api endpoint not found",
  });
});

app.listen(port, () => {
  console.log("Express server listening to port ", `http://localhost:${port}`);
});
