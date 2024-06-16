const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const accountRoutes = require("./routes/accountIndustry");
const customerTypeRoutes = require("./routes/customerTypes");
const teamRoutes = require("./routes/Team");
const productRoutes = require("./routes/productLine");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3001;

app.use("/api/accounts", accountRoutes);
app.use("/api/customer", customerTypeRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/product", productRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
