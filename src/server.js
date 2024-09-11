import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authentication from "./routes/authentication.js";
import productManagement from "./routes/productManagement.js";
import dotenv from "dotenv";
import cron from "node-cron";
import { Queue } from "bullmq";
import { db } from "./db.js";

dotenv.config();

const app = express();
const port = 4000;

// middleware
app.use(
  cors({
    origin: [
      "https://www.shopsmart.dev",
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:4000",
      "https://shopsmart.dev",
      "https://caddy.shopsmart.dev",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const queue = new Queue("product-scraping", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

function enqueueScrapingJobs() {
  db.query("SELECT userID FROM Users", function (err, rows) {
    if (err) {
      console.error("Error fetching users:", err);
      return;
    }

    rows.forEach(function (row) {
      const userID = row.userID;
      db.query(
        "SELECT productLink, productID FROM products WHERE userID = ?",
        [userID],
        function (err, products) {
          if (err) {
            console.error("Error fetching products:", err);
            return;
          }

          products.forEach(function (product) {
            queue.add("product-scraping", {
              productID: product.productID,
              userID: userID,
              url: product.productLink,
            });
          });
        }
      );
    });
  });
}

cron.schedule("0 0 * * *", function () {
  enqueueScrapingJobs();
});

// Make the database connection available to routes
app.locals.db = db;

app.use("/api/authentication", authentication);
app.use("/api/productManagement", productManagement);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
