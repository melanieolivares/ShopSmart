import { useState, useEffect } from "react";
import Card from "./Card";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [urlModalVisibility, setUrlModalVisibility] = useState(false);

  const [id, setId] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let detectedBrand = "";
    if (url.toLowerCase().includes("adidas")) {
      detectedBrand = "Adidas";
    } else if (url.toLowerCase().includes("nike")) {
      detectedBrand = "Nike";
    } else if (url.toLowerCase().includes("gymshark")) {
      detectedBrand = "Gymshark";
    } else if (url.toLowerCase().includes("lululemon")) {
      detectedBrand = "Lululemon";
    }

    setBrand(detectedBrand);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/scrape?url=${encodeURIComponent(url)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const newProduct = {
            id: id,
            name: data.name,
            currPrice: data.currPrice,
            ogPrice: data.ogPrice,
            image: data.image,
            brand: brand,
            url: url,
          };

          setId((prevId) => prevId + 1);
          setProducts((prevProducts) => [...prevProducts, newProduct]);
          setUrlModalVisibility(false);
        }
      } catch (error) {
        console.error("Error submitting URL:", error);
      }
    };

    if (brand && url) {
      fetchData();
    }
    setBrand("");
  }, [brand, url, id]);

  const removeProduct = (productUrl) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.url !== productUrl)
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mt-10">
        {products.map((product) => (
          <Card
            key={product.id}
            productName={product.name}
            productCurrPrice={product.currPrice}
            productOgPrice={product.ogPrice}
            productImage={product.image}
            productUrl={product.url}
            productBrand={product.brand}
            onRemove={removeProduct}
          />
        ))}
      </div>
      <button
        className="fixed bottom-6 right-6 z-10 border-2 border-black rounded-full p-1 hover:animate-pulse"
        onClick={() => setUrlModalVisibility(true)}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      {urlModalVisibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow w-5/12 sm:rounded-lg lg:max-w-2xl">
            <div className="flex flex-col px-4 py-5 sm:p-12">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 text-left">
                Add Link
              </h3>
              <form
                className="w-full mt-5 items-center flex-col sm:flex sm:items-center"
                onSubmit={handleSubmit}
              >
                <div className="w-full">
                  <label htmlFor="url" className="sr-only">
                    Url
                  </label>
                  <input
                    name="url"
                    id="url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="www.url.com"
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
                    <button
                      type="button"
                      className={`hover:animate-pulse ${
                        brand === "Nike" ? "animate-pulse" : ""
                      }`}
                      // onClick={() => setBrand("Nike")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="135.5 361.38 1000 356.39"
                        style={{ width: "75px", height: "auto" }}
                        className="hover:animate-pulse"
                      >
                        <path d="M245.808 717.624c-29.796-1.184-54.174-9.337-73.235-24.48-3.638-2.892-12.306-11.566-15.214-15.224-7.73-9.72-12.985-19.179-16.49-29.673-10.786-32.307-5.235-74.7 15.877-121.225 18.077-39.831 45.97-79.336 94.633-134.05 7.168-8.052 28.515-31.597 28.653-31.597.05 0-1.112 2.015-2.577 4.469-12.653 21.194-23.48 46.158-29.377 67.77-9.475 34.679-8.332 64.439 3.347 87.515 8.056 15.898 21.867 29.669 37.398 37.281 27.188 13.321 66.995 14.423 115.607 3.224 3.347-.775 169.193-44.8 368.55-97.836 199.357-53.04 362.495-96.403 362.52-96.367.056.046-463.162 198.26-703.626 301.091-38.082 16.28-48.266 20.393-66.169 26.679-45.765 16.071-86.76 23.74-119.897 22.423z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`hover:animate-pulse ${
                        brand === "Adidas" ? "animate-pulse" : ""
                      }`}
                      // onClick={() => setBrand("Adidas")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 725 500"
                        style={{ width: "65px", height: "auto" }}
                      >
                        <path
                          d="M533.943 756.705l-147.51-256.361 105.972-60.869 183.428 317.23h-141.89M141.04 720.787l105.971-61.28 56.07 97.198H161.604l-20.563-35.918M349.007 920.255h30.16V798.243h-30.16v122.012zM726.968 923.134c-33.724 0-54.014-17.411-55.11-41.95h31.805c0 7.677 4.798 18.918 25.362 19.33 13.709 0 20.152-8.089 20.152-14.12-.823-9.597-12.887-10.42-25.773-12.476-12.887-2.057-23.854-4.387-31.805-8.5-10.145-5.21-17-16.45-17-29.337 0-21.798 18.919-39.071 50.45-39.071 30.571 0 49.901 16.04 51.958 39.893h-30.709c-.274-6.443-1.508-16.588-19.604-16.588-12.201 0-20.29 2.468-20.975 10.967 0 12.476 25.362 11.653 45.103 16.863 18.919 4.798 30.983 16.588 30.983 33.039 0 30.297-24.54 41.95-54.837 41.95M265.244 611.936l105.972-61.143 118.858 205.912H379.167v30.16h-30.16v-30.297l-83.763-144.632M267.986 923.134c-35.095 0-63.61-28.653-63.61-63.337 0-35.095 28.515-62.787 63.61-62.787 13.298 0 25.362 3.564 35.918 10.83v-51.135h30.16v163.55h-30.16v-8.089c-10.556 6.855-22.62 10.968-35.918 10.968zm-34.684-63.337c0 18.919 16.177 34.684 35.507 34.684 18.918 0 35.095-15.765 35.095-34.684 0-18.918-16.177-35.095-35.095-35.095-19.33 0-35.507 16.177-35.507 35.095M490.897 756.705h29.749v163.55h-29.75v-8.089c-10.144 6.855-22.62 10.968-36.328 10.968-34.685 0-63.2-28.653-63.2-63.337 0-35.095 28.515-62.787 63.2-62.787 13.709 0 25.773 3.564 36.329 10.83v-51.135zm-70.191 103.092c0 18.919 16.177 34.684 34.684 34.684 19.33 0 35.507-15.765 35.507-34.684 0-18.918-16.177-35.095-35.507-35.095-18.507 0-34.684 16.177-34.684 35.095M593.99 923.134c-34.547 0-63.2-28.653-63.2-63.337 0-35.095 28.653-62.787 63.2-62.787 13.297 0 25.773 3.564 35.918 10.83v-9.734h30.16v122.149h-30.16v-8.089c-10.145 6.855-22.21 10.968-35.918 10.968zm-33.862-63.337c0 18.919 16.177 34.684 35.095 34.684 18.919 0 34.685-15.765 34.685-34.684 0-18.918-15.766-35.095-34.685-35.095-18.918 0-35.095 16.177-35.095 35.095M93.469 859.797c0 18.919 16.177 34.684 35.095 34.684 19.33 0 35.507-15.765 35.507-34.684 0-18.918-16.177-35.095-35.507-35.095-18.918 0-35.095 16.177-35.095 35.095zm34.273 63.337c-34.684 0-63.337-28.653-63.337-63.337 0-35.095 28.653-62.787 63.337-62.787 13.298 0 25.773 3.564 36.329 10.83v-9.734h29.749v122.149h-29.75v-8.089c-10.144 6.855-22.62 10.968-36.328 10.968"
                          transform="translate(-60 -430)"
                        ></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`hover:animate-pulse ${
                        brand === "Gymshark" ? "animate-pulse" : ""
                      }`}
                      // onClick={() => setBrand("Gymshark")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "175px", height: "auto" }}
                        x="0"
                        y="0"
                        version="1.2"
                        viewBox="0 0 2858.638 478.032"
                        xmlSpace="preserve"
                      >
                        <g
                          fill="#231f20"
                          transform="translate(-70.681 -1260.984)"
                        >
                          <g>
                            <path d="M186.616 1473.797h103.226V1621.5c0 74.633-38.122 117.516-109.581 117.516-71.464 0-109.58-42.877-109.58-117.516v-242.994c0-74.645 38.116-117.522 109.58-117.522 71.465 0 109.581 42.878 109.581 117.522v46.059h-69.877v-50.819c0-33.342-14.291-46.045-38.116-46.045-23.826 0-38.11 12.703-38.11 46.045v252.516c0 33.348 14.291 46.064 38.11 46.064s38.116-12.717 38.116-46.064V1540.5h-33.349z"></path>
                            <path d="M396.248 1580.211l-92.116-312.866h76.232l55.587 212.813 55.581-212.813h71.464L469.3 1580.211v155.631h-73.052z"></path>
                            <path d="M747.223 1599.262l50.819-331.917h101.639v466.911h-69.878v-335.091l-50.819 335.083h-69.877l-53.994-330.329v330.329h-63.529v-466.909h101.64z"></path>
                            <path d="M1052.145 1260.991c71.465 0 108 42.877 108 117.522v14.29h-69.89v-19.058c0-33.342-12.703-46.045-36.529-46.045-23.819 0-36.522 12.703-36.522 46.045 0 96.877 142.936 114.349 142.936 247.754 0 74.633-38.123 117.516-109.587 117.516-71.465 0-109.581-42.877-109.581-117.516v-28.594h69.878v33.355c0 33.342 14.296 46.059 38.122 46.059 23.825 0 38.109-12.717 38.109-46.059 0-96.877-142.929-114.355-142.929-247.755-.001-74.637 36.522-117.514 107.993-117.514z"></path>
                            <path d="M1276.067 1734.256h-73.045v-466.911h73.045v200.104h84.174v-200.104h74.646v466.911h-74.646v-200.104h-84.174z"></path>
                            <path d="M1725.513 1734.256h-74.646l-12.703-84.176h-90.522l-12.703 84.176h-66.703l74.639-466.911h107.987zm-166.762-147.697h71.472l-34.942-236.639z"></path>
                            <path d="M1912.913 1734.256c-4.762-12.717-6.349-19.053-6.349-57.162v-73.059c0-42.877-14.304-58.748-47.646-58.748h-25.406v190.574h-73.045v-468.502h111.154c76.232 0 109.588 34.936 109.588 108v36.516c0 47.646-15.891 79.406-47.646 95.297 36.516 15.877 49.22 50.832 49.22 100.064v71.457c0 22.24 0 39.703 7.947 57.168h-77.825l.01-1.605zm-79.413-400.214v142.929h28.593c26.994 0 44.472-12.71 44.472-49.232v-46.058c0-33.354-11.129-47.646-38.11-47.646l-34.955.01z"></path>
                            <path d="M2124.139 1548.441l-22.239 42.879v142.928h-73.045v-466.916h73.045v203.277l96.878-203.277h73.058l-101.651 208.045 101.651 258.871h-76.226z"></path>
                          </g>
                          <g>
                            <path d="M2319.48 1268.933h609.839s-279.51 311.278-420.852 465.323c0 0 11.122-23.807 17.483-33.342-6.361 0-12.723-25.406-20.651-38.129-7.936 4.773-15.891 7.947-23.826 11.121-7.929 4.768-12.703 3.188-17.465-6.328-3.174-7.949-6.342-17.479-11.129-25.412-7.929 3.174-27 14.303-30.174 14.303l-98.465-41.303c1.588 0 49.232-1.574 69.871 0l31.768 27.012c7.936-7.928 14.291-20.639 20.652-27.012h17.464c6.349 6.359 12.703 17.477 19.052 25.412 7.936-7.936 17.465-17.465 23.826-23.813h12.703c6.361 6.348 14.29 15.877 20.651 22.225 0 0 1.587 0 3.155 1.588 0 0 12.723-14.291 17.477-20.639h14.297s179.452-269.994 181.052-273.162c-144.515-27.025-436.728-77.844-436.728-77.844z"></path>
                            <path d="M2497.352 1429.333l-100.065-55.587c58.749 14.29 119.117 28.587 177.871 41.297z"></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`hover:animate-pulse ${
                        brand === "Lululemon" ? "animate-pulse" : ""
                      }`}
                      // onClick={() => setBrand("Lululemon")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ width: "40px", height: "auto" }}
                        viewBox="0 0 8.621 8.621"
                      >
                        <defs>
                          <clipPath id="a">
                            <path d="M498.313 696.313H522V720h-23.688zm0 0"></path>
                          </clipPath>
                        </defs>
                        <use
                          width="100%"
                          height="100%"
                          x="246.005"
                          y="634.863"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="266.618"
                          y="642.863"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="256.24"
                          y="650.864"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="256.838"
                          y="658.864"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="276.215"
                          y="666.864"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="246.678"
                          y="674.864"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="264.763"
                          y="682.865"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="245.948"
                          y="690.865"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="265.582"
                          y="712.536"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="275.767"
                          y="720.536"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="275.114"
                          y="728.536"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="265.106"
                          y="736.537"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="267.966"
                          y="744.537"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="265.021"
                          y="752.537"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="272.571"
                          y="774.206"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="274.955"
                          y="782.207"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="244.904"
                          y="790.207"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="264.04"
                          y="798.207"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="534.993"
                          y="634.868"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="542.075"
                          y="656.538"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="540.992"
                          y="664.539"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="526.416"
                          y="672.539"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="536.32"
                          y="680.533"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="539.225"
                          y="688.533"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="533.635"
                          y="696.534"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="528.047"
                          y="718.203"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="532.012"
                          y="726.203"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="538.091"
                          y="734.203"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="523.007"
                          y="742.204"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="512.8"
                          y="750.204"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="533.225"
                          y="758.204"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#I"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="507.227"
                          y="778.871"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#J"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="535.339"
                          y="785.871"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#J"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="542.734"
                          y="792.871"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#J"
                        ></use>
                        <use
                          width="100%"
                          height="100%"
                          x="186.632"
                          y="601.995"
                          fill="#fff"
                          transform="translate(-452.946 -340.483) scale(.35278)"
                          xlinkHref="#K"
                        ></use>
                        <path
                          fill="#fff"
                          d="M8.125 4.28a3.843 3.843 0 11-7.687-.003 3.843 3.843 0 017.687.003"
                        ></path>
                        <g
                          clipPath="url(#a)"
                          transform="translate(-175.661 -245.511) scale(.35278)"
                        >
                          <path
                            fill="#d41935"
                            d="M518.32 713.605c-.953 1.426-2.168 2.184-3.523 2.184-.594 0-1.219-.144-1.86-.43-.68-.3-1.277-.851-1.683-1.55-.402-.7-.563-1.454-.45-2.133.141-.594.454-1.403.817-2.34.941-2.438 2.234-5.777 1.117-7.41-.468-.688-1.316-1.024-2.582-1.028-1.27.004-2.113.34-2.586 1.028-1.113 1.633.176 4.972 1.121 7.414.36.933.676 1.742.813 2.344.117.671-.043 1.425-.45 2.125-.402.699-1 1.25-1.679 1.55-.64.286-1.27.43-1.86.43-1.355 0-2.574-.758-3.519-2.18l-.11-.195c.454.227 1.317.602 2.063.602.371 0 .723-.114 1.07-.344 1.915-1.274 1.262-2.805-.046-5.172-.555-1.004-1.125-2.04-1.38-3.11-.273-1.148-.523-2.824.477-4.09.465-.597 1.18-1.054 2.117-1.363.973-.324 2.227-.496 3.727-.519h.484c1.5.023 2.754.195 3.727.52.937.308 1.648.765 2.117 1.363 1 1.265.75 2.941.477 4.09-.254 1.07-.825 2.105-1.38 3.109-1.308 2.367-1.964 3.898-.046 5.172.348.23.695.344 1.07.344.746 0 1.606-.375 2.063-.602zm-8.164-17.293c-6.543 0-11.844 5.301-11.844 11.844 0 6.54 5.301 11.844 11.844 11.844S522 714.695 522 708.156c0-6.543-5.3-11.843-11.844-11.843"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between w-full mt-4">
                    <button
                      className="hover:animate-pulse"
                      onClick={() => setUrlModalVisibility(false)}
                      type="button"
                    >
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
                      type="submit"
                      className="hover:animate-pulse"
                      // onClick={() => setUrlModalVisibility(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
