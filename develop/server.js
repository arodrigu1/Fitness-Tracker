const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// routes
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/viewRoutes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});