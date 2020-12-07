const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require("dotenv").config();
global.Task = require('./api/models/taskModel');
// const routes = require('./api/routes/taskRoutes');
const app = express();

const { NODE_ENV, PORT, ATLAS_URI } = process.env;
const port = PORT || 5000;
const mongoUri = ATLAS_URI || "mongodb://localhost:27017/todolist";

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUri, { 
    useNewUrlParser: true 
});
mongoose.connection.once("open", () => {
    console.log("DB URI",mongoUri);
    console.log("MongoDB database connection established successfully!");
  
});

// Set up middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// routes(app);
app.listen(port, () => {
    console.log(
      `Server started in ${NODE_ENV} mode. Server started on port ${port}`
    );
});

app.use("/api", require("./api/routes/taskRoutes"));

//test check
app.get("/", (req, res) => {
    res.send("hello");
  });

app.use((req, res) => {
    // res.status(404).send({ url: `${req.originalUrl} not found` });
    // res.status(200).send({ url: `${req.originalUrl} found` });
});

module.exports = app;
