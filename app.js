const express = require("express");

const app = express();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middlewares

app.use(express.static("./public"));
app.use(express.json());
app.use(errorHandlerMiddleware);

// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB('mongodb://127.0.0.1/my_database');
    app.listen(port, console.log(`Server is listning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
