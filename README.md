<div align="center">
  <img src="https://github.com/user-attachments/assets/bba1cac4-8bfb-43e3-b9e6-ae55e8444465" width="10%" >
  <h1>ShopSmart</h1>
  <p>A website that allows you to track prices of products <br> from supported e-commerce websites.</p>
    <p>...</p>
  <img src="https://github.com/user-attachments/assets/5aaaaca8-c74b-4056-8b65-c0916022f369" width="100%" >

</div>

## 📖 About
Repo for my web scraping site.
- Built frontend using *Vite*, *React*, and *Tailwind CSS*
- Built backend using *Express.js* and *Drizzle*
- Tools used: *puppeteer* for scraping, *BullMQ* for queue system, and *JWT* for safe storage of user info
- Server ran in docker container

## ⚡ Features
- Automatically track the prices of products over time.
- View a detailed history of price changes for each tracked product.
- Easily delete products from your closet.
- Directly navigate to the product's page to make a purchase.

## 💻 Development
- Run on local dev server `npm run dev`

## ℹ️ Commands
All commands are run from a terminal at the root of the project:
<table>
  <tr>
   <th>Command</th><th>Action</th>
  </tr>
  <tr>
    <td><code>npm install</code></td><td>install dependencies</td>
  </tr>
  <tr>
   <td><code>npm run dev</code><td>start on <code>localhost:3000</code></td>
  </tr>
  <tr>
    <td><code>docker compose up --build</code><td>build and start Docker container</td>
  </tr>
</table>
