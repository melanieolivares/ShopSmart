import express from "express";
import jwt from "jsonwebtoken";
import { Products, ProductPrices } from "../database/schema.js";
import { eq, sql } from "drizzle-orm";
import { setUpPuppeteer } from "../utils/scrapeUtil.js";

const router = express.Router();

router.get("/scrape", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const token = req.cookies.token;
    let userID;
    if (token) {
      try {
        const decoded = jwt.verify(token, "your-secret-key");
        userID = decoded.userID;
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }

    const { url } = req.query;

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
    // let productPage = "";
    // if (brand === "Nike") {
    //   productPage = await page.evaluate(() => {
    //     const productName =
    //       document.querySelector("#pdp_product_title").innerText;
    //     const currPrice =
    //       document.querySelector(".is--current-price").innerText;

    //     let ogPrice = document.querySelector(".is--striked-out");

    //     if (ogPrice === null) {
    //       ogPrice = currPrice;
    //     } else {
    //       ogPrice = ogPrice.innerText
    //         .trim()
    //         .replace("Discounted from", "")
    //         .trim();
    //     }

    //     let lowestPrice =
    //       parseInt(ogPrice.replace("$", ""), 10) <
    //       parseInt(currPrice.replace("$", ""), 10)
    //         ? ogPrice
    //         : currPrice;

    //     const productImage = document
    //       .querySelector('[data-testid="HeroImg"]')
    //       .getAttribute("src");

    //     const currDate = new Date();
    //     let productUpdateDate = `${
    //       currDate.getMonth() + 1
    //     }/${currDate.getDate()}/${currDate.getFullYear()}`;

    //     return {
    //       productName,
    //       currPrice,
    //       lowestPrice,
    //       ogPrice,
    //       productImage,
    //       productUpdateDate,
    //     };
    //   });
    //   await browser.close();
    // } else if (brand === "Adidas") {
    //   productPage = await page.evaluate(() => {
    //     const productName = document.querySelector(
    //       '[data-testid="product-title"] span'
    //     ).innerText;
    //     let currPrice = document.querySelector(
    //       '[data-testid="product-description-mobile"] .gl-price-item'
    //     ).innerText;
    //     let ogPrice = document.querySelector(
    //       '[data-testid="product-description-mobile"] .gl-price-item'
    //     ).innerText;

    //     if (
    //       document.querySelector(
    //         '[data-testid="product-description-mobile"] .gl-price-item--sale'
    //       ) !== null
    //     ) {
    //       currPrice = document.querySelector(
    //         '[data-testid="product-description-mobile"] .gl-price-item--sale'
    //       ).innerText;
    //       ogPrice = document.querySelector(
    //         '[data-testid="product-description-mobile"] .gl-price-item--crossed'
    //       ).innerText;
    //     }

    //     let lowestPrice =
    //       parseInt(currPrice.replace("$", ""), 10) <
    //       parseInt(ogPrice.replace("$", ""), 10)
    //         ? currPrice
    //         : ogPrice;

    //     const productImage = document
    //       .querySelector('[data-testid="pdp-gallery-picture"]')
    //       .querySelector("img")
    //       .getAttribute("src");

    //     const currDate = new Date();
    //     let productUpdateDate = `${
    //       currDate.getMonth() + 1
    //     }/${currDate.getDate()}/${currDate.getFullYear()}`;

    //     return {
    //       productName,
    //       currPrice,
    //       lowestPrice,
    //       ogPrice,
    //       productImage,
    //       productUpdateDate,
    //     };
    //   });
    //   await browser.close();
    // }

    const productPage = await (async () => {
      if (brand === "Nike") {
        const nameElement = await page.$("#pdp_product_title");
        const productName = await page.evaluate(
          (nameElement) => nameElement.innerText,
          nameElement
        );
        const currPriceElement = await page.$(
          '[data-testid="currentPrice-container"]'
        );

        const currPrice = await page.evaluate(
          (currPriceElement) => currPriceElement.innerText,
          currPriceElement
        );
        const ogPriceElement = await page.$(
          '[data-testid="initialPrice-container"]'
        );
        let ogPrice = await page.evaluate(
          (ogPriceElement) => ogPriceElement.innerText,
          ogPriceElement
        );
        if (ogPrice === null) {
          ogPrice = currPrice;
        }

        let lowestPrice =
          parseInt(ogPrice.replace("$", ""), 10) <
          parseInt(currPrice.replace("$", ""), 10)
            ? ogPrice
            : currPrice;

        const productImageElement = await page.$('[data-testid="HeroImg"]');
        const productImage = await page.evaluate(
          (productImageElement) => productImageElement.getAttribute("src"),
          productImageElement
        );

        const currDate = new Date();
        const productUpdateDate = `${
          currDate.getMonth() + 1
        }/${currDate.getDate()}/${currDate.getFullYear()}`;

        await browser.close();

        return {
          productName,
          currPrice,
          lowestPrice,
          ogPrice,
          productImage,
          productUpdateDate,
        };
      } else if (brand === "Adidas") {
        const parentContainer = await page.waitForSelector(
          'div[data-testid="product-description-mobile"]'
        );

        const productNameElement = await parentContainer.$(
          '[data-testid="product-title"] span'
        );
        const productName = await page.evaluate(
          (productNameElement) => productNameElement.innerText,
          productNameElement
        );

        let currPriceElement = await parentContainer.$(".gl-price-item");

        let currPrice = await page.evaluate(
          (currPriceElement) => currPriceElement.innerText,
          currPriceElement
        );
        let ogPrice = currPrice;

        const saleElement = await parentContainer.$(".gl-price-item--sale");
        if (saleElement) {
          currPrice = await page.evaluate(
            (element) => element.innerText,
            saleElement
          );
        }

        let lowestPrice =
          parseInt(ogPrice.replace("$", ""), 10) <
          parseInt(currPrice.replace("$", ""), 10)
            ? ogPrice
            : currPrice;
        const productImageElement = await page.$(
          '[data-testid="pdp-gallery-picture"]'
        );
        const productImage = await page.evaluate(
          (productImageElement) =>
            productImageElement.querySelector("img").getAttribute("src"),
          productImageElement
        );
        const currDate = new Date();
        const productUpdateDate = `${
          currDate.getMonth() + 1
        }/${currDate.getDate()}/${currDate.getFullYear()}`;

        await browser.close();

        return {
          productName,
          currPrice,
          lowestPrice,
          ogPrice,
          productImage,
          productUpdateDate,
        };
      }
    })();

    const {
      productName,
      currPrice,
      lowestPrice,
      ogPrice,
      productImage,
      productUpdateDate,
    } = productPage;

    const product = await db
      .insert(Products)
      .values({
        userID: userID,
        productName: productName,
        productBrand: brand,
        currPrice: currPrice,
        lowestPrice: lowestPrice,
        originalPrice: ogPrice,
        productImage: productImage,
        productUpdateDate: productUpdateDate,
        productLink: url,
      })
      .$returningId();

    await db.insert(ProductPrices).values([
      {
        productID: product[0].productID,
        priceDate: productUpdateDate,
        price: ogPrice,
      },
      {
        productID: product[0].productID,
        priceDate: productUpdateDate,
        price: currPrice,
      },
    ]);

    const updatedProductData = {
      productID: product[0].productID,
      productName,
      currPrice,
      lowestPrice,
      originalPrice: ogPrice,
      productImage,
      productBrand: brand,
      productUpdateDate,
      productLink: url,
      productPrices: [
        { price: ogPrice, priceDate: productUpdateDate },
        { price: currPrice, priceDate: productUpdateDate },
      ],
    };
    res.status(200).json(updatedProductData);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
});
router.get("/products", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const token = req.cookies.token;
    let userID;
    if (token) {
      try {
        const decoded = jwt.verify(token, "your-secret-key");
        userID = decoded.userID;
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }

    // TODO: FIX THIS

    const products = await db
      .select({
        productID: Products.productID,
        productName: Products.productName,
        productBrand: Products.productBrand,
        currPrice: Products.currPrice,
        lowestPrice: Products.lowestPrice,
        originalPrice: Products.originalPrice,
        productImage: Products.productImage,
        productUpdateDate: Products.productUpdateDate,
        productLink: Products.productLink,
      })
      .from(Products)
      .where(eq(Products.userID, userID))
      .orderBy(Products.productID);

    const productPrices = await db
      .select({
        productID: ProductPrices.productID,
        priceDate: ProductPrices.priceDate,
        price: ProductPrices.price,
      })
      .from(ProductPrices)
      .leftJoin(Products, eq(ProductPrices.productID, Products.productID))
      .where(eq(Products.userID, userID));

    const pricesByProduct = productPrices.reduce((acc, price) => {
      if (!acc[price.productID]) {
        acc[price.productID] = [];
      }
      acc[price.productID].push({
        priceDate: price.priceDate,
        price: price.price,
      });
      return acc;
    }, {});

    // Combine product info with product prices
    const combinedResult = products.map((product) => ({
      ...product,
      productPrices: pricesByProduct[product.productID] || [],
    }));

    res.status(200).json(combinedResult);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/removeproduct", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const { productId } = req.body;
    const token = req.cookies.token;
    let userID;
    if (token) {
      try {
        const decoded = jwt.verify(token, "your-secret-key");
        userID = decoded.userID;
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }

    try {
      await db
        .delete(Products)
        .where(
          sql`${Products.userID} = ${userID} and ${Products.productID} = ${productId}`
        );
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ error: "Failed to delete product" });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Failed to remove product" });
  }
});

export default router;
