const express = require("express");
const path = require("path");
const morgan = require("morgan");

const { engine } = require("express-handlebars");
var methodOverride = require("method-override");
require("dotenv").config();

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes");
const db = require("./config/db");
db.connectDatabase();

const app = express();
const PORT = 3000;

// app config
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// custom middleware
app.use(SortMiddleware);
app.use(express.json());
app.use(
      express.urlencoded({
            extended: true,
      })
);

app.use(morgan("combined"));
app.engine(
      "hbs",
      engine({
            extname: ".hbs",
            helpers: require('./helpers/handlebars'),
      })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// route
route(app);
app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
});
