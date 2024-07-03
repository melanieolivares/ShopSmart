import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

app.get("/api/scrape", async (req, res) => {
  try {
    const { url } = req.query;
    console.log("hit");
    const browser = await puppeteer.launch({
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    const productPage = await page.evaluate(() => {
      const name = document.querySelector("#pdp_product_title").innerText;
      const currPrice = document.querySelector(".is--current-price").innerText;

      const ogPrice = document
        .querySelector(".is--striked-out")
        .innerText.trim()
        .replace("Discounted from", "")
        .trim();

      const image = document
        .querySelector('[data-testid="HeroImg"]')
        .getAttribute("src");

      return { name, currPrice, ogPrice, image };
    });
    await browser.close();

    res.status(200).json(productPage);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
