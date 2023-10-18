const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is live on port 3000");
});
