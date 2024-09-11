import { scrape } from "./workerUtil.js";
import { Worker } from "bullmq";

const worker = new Worker(
  "product-scraping",
  async (job) => {
    const { url, userID, productID } = job.data;
    console.log(`Processing job ${job.id} with data:`, url);
    await scrape(url, userID, productID);
    console.log("Worker: done");
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
    },
  }
);
console.log("Worker: started");
export default worker;
