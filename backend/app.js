const express = require("express");
const authRoutes = require("./routes/authRoutes");
const countryRoutes = require("./routes/countryRoutes");
const languageRoutes = require("./routes/languageRoutes");

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
app.use(countryRoutes);
app.use(languageRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is live on port 5000");
});
