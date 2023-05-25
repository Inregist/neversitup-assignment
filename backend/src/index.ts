import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { appConfig } from "./config/config";
import router from "./modules";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
const corsOptions: cors.CorsOptions = {
  origin: appConfig().corsOrigin.split(","),
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

const port = appConfig().port;
const hostname = appConfig().hostname;

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/api", router);

app.use(errorHandler);

app.listen(port, hostname, 1, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
