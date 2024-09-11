import { db } from "../db.js";
import { sql } from "drizzle-orm";
import { Products, ProductPrices } from "../database/schema.js";
import { setUpPuppeteer } from "../utils/scrapeUtil.js";

export const scrape = async (url, userID, productID) => {
  const { page, browser } = await setUpPuppeteer();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  try {
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 5000 });
  } catch (error) {
    // silent catch because we don't care about long running network requests
  }

  let brand = "";

  if (url.toLowerCase().includes("adidas")) {
    brand = "Adidas";
  } else if (url.toLowerCase().includes("nike")) {
    brand = "Nike";
  } else if (url.toLowerCase().includes("gymshark")) {
    brand = "Gymshark";
  } else if (url.toLowerCase().includes("lululemon")) {
    brand = "Lululemon";
  }
  console.log("hello");

  const productPage = await (async () => {
    if (brand === "Nike") {
      const currPriceElement = await page.$(
        '[data-testid="currentPrice-container"]'
      );

      const currPrice = await page.evaluate(
        (currPriceElement) => currPriceElement.innerText,
        currPriceElement
      );

      const currDate = new Date();
      const productUpdateDate = `${
        currDate.getMonth() + 1
      }/${currDate.getDate()}/${currDate.getFullYear()}`;

      await browser.close();

      return {
        currPrice,
        productUpdateDate,
      };
    } else if (brand === "Adidas") {
      let currPrice = "$0";

      const parentContainer = await page.waitForSelector(
        'div[data-testid="product-description-mobile"]'
      );

      const saleElement = await parentContainer.$(".gl-price-item--sale");
      if (saleElement) {
        currPrice = await page.evaluate(
          (element) => element.innerText,
          saleElement
        );
      } else {
        const priceElement = await parentContainer.$(".gl-price-item");

        currPrice = await page.evaluate(
          (element) => element.innerText,
          priceElement
        );
      }

      const currDate = new Date();
      const productUpdateDate = `${
        currDate.getMonth() + 1
      }/${currDate.getDate()}/${currDate.getFullYear()}`;

      await browser.close();

      return {
        currPrice,
        productUpdateDate,
      };
    }
  })();
  const { currPrice, productUpdateDate } = productPage;

  // const [rows] = await db.query(
  //   "SELECT lowestPrice FROM Products WHERE productID = ?",
  //   [productID]
  // );
  const rows = await db
    .select()
    .from(Products)
    .where(sql`${Products.productID} = ${productID}`);

  let currLowest = rows[0].lowestPrice;
  console.log("curr lowest", currLowest);

  if (
    parseInt(currPrice.replace("$", ""), 10) <
    parseInt(currLowest.replace("$", ""), 10)
  ) {
    currLowest = currPrice;
  }

  console.log("selected lowest price", currPrice);

  // await db.query(
  //   `UPDATE Products SET
  //         currPrice = ?,
  //         lowestPrice = ?,
  //         productUpdateDate = ?
  //       WHERE productLink = ? AND userID = ? AND productID = ?`,
  //   [currPrice, currLowest, productUpdateDate, url, userID, productID]
  // );

  // await db.query(
  //   `INSERT INTO ProductPrices (productID, priceDate, price) VALUES (?, ?, ?)`,
  //   [productID, productUpdateDate, currPrice]
  // );
  await db
    .update(Products)
    .set({ currPrice, lowestPrice: currLowest, productUpdateDate })
    .where(
      sql`${Products.productLink} = ${url} and ${Products.userID} = ${userID} and ${Products.productID} = ${productID}`
    );
  await db
    .insert(ProductPrices)
    .values({ productID, priceDate: productUpdateDate, price: currPrice });

  console.log("done");
  return;
};
