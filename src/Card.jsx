// eslint-disable-next-line react/prop-types
export default function Card({
  productName,
  productCurrPrice,
  productOgPrice,
  productImage,
  productBrand,
  productUrl,
  onRemove,
}) {
  const handleRemove = () => {
    onRemove(productUrl);
  };

  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white shadow xl:aspect-h-8 xl:aspect-w-7">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between">
          <img
            src={productImage}
            alt={productName}
            className="mb-4 w-6/12 h-full object-cover rounded mr-2 "
          />
          <div className="flex flex-col items-start">
            <p className="text-gray-900 font-medium">
              <span className="text-s">curr. price</span>{" "}
              <span className="text-2xl">{productCurrPrice}</span>
            </p>
            <p className="text-gray-600 font-normal">
              <span className="text-xs">lowest price </span>
              <span className="text-lg">{productCurrPrice}</span>
            </p>
            <p className="text-gray-600 font-normal">
              <span className="text-xs">og. price </span>
              <span className="text-lg">{productOgPrice}</span>
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-start text-gray-950">
          {productName}
        </h2>
        <h3 className="font-normal text-start text-gray-700">{productBrand}</h3>
        <div className="flex justify-between items-center mt-2">
          <button onClick={handleRemove} className="hover:animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={() => window.open(`${productUrl}`)}
            className="hover:animate-pulse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
