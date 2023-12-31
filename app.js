require('dotenv').config();

const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const BlogRoutes = require("./blogs/routes");
const LayerRoutes = require("./layers/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");
const BlogModel = require("./common/models/Blog");
const LayerModel = require("./common/models/Layer");

app.use(morgan("tiny"));
app.use(cors());
app.use(Express.json());

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

// Initialising the Model on sequelize
UserModel.initialise(sequelize);
BlogModel.initialise(sequelize);
LayerModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that already exist
sequelize.sync()
  .then(() => {
    console.log("Sequelize Initialised!!");
    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/blog", BlogRoutes);
    app.use("/layer", LayerRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
