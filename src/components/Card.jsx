// eslint-disable-next-line react/prop-types
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Chart from "./Chart";

export default function Card({
  productName,
  productCurrPrice,
  productLowestPrice,
  productOgPrice,
  productImage,
  productBrand,
  productUrl,
  dateUpdated,
  productID,
  productPrices,
  onRemove,
}) {
  const handleRemove = () => {
    onRemove(productID);
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      infinite={true}
    >
      <div className="aspect-h-1 aspect-w-1 w-full h-full overflow-hidden rounded-lg bg-background shadow xl:aspect-h-8 xl:aspect-w-7 flex flex-col">
        <div className="h-full px-4 pt-5 sm:pt-6 sm:px-5 flex-grow">
          <div className="flex justify-between">
            {/* <img
              src={productImage}
              alt={productName}
              className="mb-2 w-8/12 h-44 object-cover rounded hover:blur-sm transition duration-300 cursor-pointer"
              onClick={handleCardFlip}
            /> */}
            <div className="relative w-full" onClick={handleCardFlip}>
              <img
                src={productImage}
                alt={productName}
                className="h-52 w-full object-cover rounded"
              />
              {/* Overlay text */}
              <div className="absolute rounded inset-0 flex items-center justify-center text-center font-bold text-md bg-black/75 text-white/75 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                click to see price history
              </div>
            </div>
            <div className="flex flex-col items-start w-full pl-3">
              <div className="text-productCurrPrice font-bold pb-3">
                <p className="text-md text-productCurrPrice/25">
                  current price{" "}
                </p>
                <p className="text-2xl">{productCurrPrice}</p>
              </div>
              <div className="text-productSubPrices pb-3">
                <p className="text-sm font-bold text-productCurrPrice/25">
                  lowest price
                </p>
                <p className="text-2xl font-semibold">{productLowestPrice}</p>
              </div>
              <div className="text-productSubPrices font-normal">
                <p className="text-xs font-semibold text-productCurrPrice/25">
                  original price{" "}
                </p>
                <p className="text-2xl font-medium">{productOgPrice}</p>
              </div>

              {/* <div className="flex justify-center w-full h-full mb-4 mt-2">
                <button
                  className="text-productInfo flex flex-col items-center justify-center w-full font-light text-xs p-2 rounded-md border-2 border-gray hover:bg-gray-200 transition duration-300"
                  onClick={handleCardFlip}
                >
                  See price trend
                </button>
              </div> */}
            </div>
          </div>
          <div className="pt-2 pb-2">
            <h2 className="text-lg font-semibold text-start text-productTitle">
              {productName}
            </h2>
            <h3 className="font-normal text-start text-productBrand">
              {productBrand}
            </h3>
          </div>
        </div>

        {/* Footer at the bottom */}
        <div className="flex justify-between items-center mt-2 px-4 pb-5">
          <button onClick={handleRemove} className="hover:animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-productRemove hover:fill-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="font-extralight text-xs text-productInfo">
            price last updated {dateUpdated}
          </div>
          <button onClick={() => window.open(`${productUrl}`)} className="">
            <ShoppingBagIcon className="size-7 text-productBuy transition-colors duration-300 ease-in-out hover:text-productBuy/70" />
          </button>
        </div>
      </div>

      <div
        className="card-side flex flex-col items-center justify-center aspect-h-1 aspect-w-1 w-full h-full rounded-lg bg-background shadow xl:aspect-h-8 xl:aspect-w-7"
        onClick={handleCardFlip}
      >
        <h2 className="font-semibold text-xl text-text pt-4 -mb-10">
          Price Trend
        </h2>
        <Chart productPrices={productPrices} />
      </div>
    </ReactCardFlip>
  );
}
