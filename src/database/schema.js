import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const Users = mysqlTable("Users", {
  userID: int("userID").primaryKey().notNull().autoincrement(),
  userEmail: varchar("userEmail", { length: 500 }).notNull().unique(),
  userName: varchar("userName", { length: 1000 }).notNull(),
  userPassword: varchar("userPassword", { length: 1000 }).notNull(),
});

export const Products = mysqlTable("Products", {
  productID: int("productID").primaryKey().notNull().autoincrement(),
  userID: int("userID").references(() => Users.userID),
  productLink: varchar("productLink", { length: 1000 }).notNull(),
  productName: varchar("productName", { length: 1000 }).notNull(),
  productBrand: varchar("productBrand", { length: 100 }).notNull(),
  productImage: varchar("productImage", { length: 1000 }).notNull(),
  productUpdateDate: varchar("productUpdateDate", { length: 1000 }).notNull(),
  currPrice: varchar("currPrice", { length: 11 }).notNull(),
  lowestPrice: varchar("lowestPrice", { length: 11 }).notNull(),
  originalPrice: varchar("originalPrice", { length: 50 }).notNull(),
});

export const ProductPrices = mysqlTable("ProductPrices", {
  priceID: int("priceID").primaryKey().notNull().autoincrement(),
  productID: int("productID").references(() => Products.productID, {
    onDelete: "cascade",
  }),
  priceDate: varchar("priceDate", { length: 1000 }).notNull(),
  price: varchar("price", { length: 1000 }).notNull(),
});
