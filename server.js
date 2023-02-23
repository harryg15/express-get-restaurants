const express = require("express");
const app = express();
const {sequelize} = require("./db");
const port = 3000;
const restaurantRoutes = require("./routes/restaurants")

app.use("/restaurants", restaurantRoutes)

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})