const express = require("express");

const app = express();

const http = require("http");
const path = require("path");
const server = http.createServer(app);

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

const port = 4000;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
