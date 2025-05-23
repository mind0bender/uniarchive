import express, {
  type Request,
  type Express,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { join } from "path";
import connectToDB from "./db/index.db";
import cookieParser from "cookie-parser";
import ApiRouter from "./routes/index.routes";
import logger from "./utils/logger.util/index.logger.util";
import { CLIENT_URL, PORT } from "./utils/const.utils";
import { ResponseType } from "./utils/response.util";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// allow all cookies to be sent from the client to the server (CORS)
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "public")));

app.use("/api", ApiRouter);

// test route
app.get("/", (req: Request, res: Response): void => {
  res.send("UniArchive is running");
});

// error handler
app.use(
  (
    err: Error | string[],
    req: Request,
    res: Response<ResponseType>,
    next: NextFunction
  ): void => {
    if (Array.isArray(err)) {
      logger.error(err);
      res.json({
        success: false,
        errors: err,
      });
    }
    logger.error(err);
    res.status(500).end();
  }
);

app.listen(PORT, (): void => {
  console.clear();
  logger.info(`Server is running on http://localhost:${PORT}`);
  connectToDB();
});
