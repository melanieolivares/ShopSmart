CREATE TABLE `ProductPrices` (
	`priceID` int AUTO_INCREMENT NOT NULL,
	`productID` int,
	`priceDate` varchar(1000) NOT NULL,
	`price` varchar(1000) NOT NULL,
	CONSTRAINT `ProductPrices_priceID` PRIMARY KEY(`priceID`)
);
--> statement-breakpoint
CREATE TABLE `Products` (
	`productID` int AUTO_INCREMENT NOT NULL,
	`userID` int,
	`productLink` varchar(1000) NOT NULL,
	`productName` varchar(1000) NOT NULL,
	`productBrand` varchar(100) NOT NULL,
	`productImage` varchar(1000) NOT NULL,
	`productUpdateDate` varchar(1000) NOT NULL,
	`currPrice` varchar(11) NOT NULL,
	`lowestPrice` varchar(11) NOT NULL,
	`originalPrice` varchar(50) NOT NULL,
	CONSTRAINT `Products_productID` PRIMARY KEY(`productID`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`userID` int AUTO_INCREMENT NOT NULL,
	`userEmail` varchar(500) NOT NULL,
	`userName` varchar(1000) NOT NULL,
	`userPassword` varchar(1000) NOT NULL,
	CONSTRAINT `Users_userID` PRIMARY KEY(`userID`),
	CONSTRAINT `Users_userEmail_unique` UNIQUE(`userEmail`)
);
--> statement-breakpoint
ALTER TABLE `ProductPrices` ADD CONSTRAINT `ProductPrices_productID_Products_productID_fk` FOREIGN KEY (`productID`) REFERENCES `Products`(`productID`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Products` ADD CONSTRAINT `Products_userID_Users_userID_fk` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE no action ON UPDATE no action;