const express = require("express");
const path = require("path");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
app.use(express.json());

const port = 4000;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});