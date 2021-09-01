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
  "mongodb+srv://droidplease8:droidplease8@cluster0.5r0q7.mongodb.net/workoutdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
