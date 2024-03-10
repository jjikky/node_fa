import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.get("/", (_, res: any) => res.send("running"));

let port = 4000;

app.listen(port, async () => {
  console.log(`server listening on port ${port}`);
});
