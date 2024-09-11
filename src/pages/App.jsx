import { useState, useEffect } from "react";
import Card from "../components/Card";
import LinkModal from "../components/LinkModal";
import Footer from "../components/Footer";
import "../styles/App.css";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState([]);
  const [urlModalVisibility, setUrlModalVisibility] = useState(false);
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/productManagement/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductInfo = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/productManagement/scrape?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newProduct = {
          productID: data.productID,
          productName: data.productName,
          currPrice: data.currPrice,
          lowestPrice: data.lowestPrice,
          originalPrice: data.originalPrice,
          productImage: data.productImage,
          productBrand: data.productBrand,
          productLink: url,
          productUpdateDate: data.productUpdateDate,
          productPrices: data.productPrices,
        };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setUrlModalVisibility(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error submitting URL:", error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      const myPromise = fetchProductInfo();

      toast.promise(myPromise, {
        success: "Added to closet.",
        loading: "Processing information...",
        error: "The link submitted is invalid/not supported.",
      });
    }
  };

  const removeProductDB = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/productManagement/removeproduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productID !== productId)
    );
    removeProductDB(productId);
  };

  return (
    <div className={`${theme} h-screen flex flex-col`}>
      <Toaster />
      {/* <Navbar /> */}

      <div className="flex-grow overflow-auto p-[2rem] bg-backgroundBody">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Card
              key={product.productID}
              productID={product.productID}
              productName={product.productName}
              productCurrPrice={product.currPrice}
              productLowestPrice={product.lowestPrice}
              productOgPrice={product.originalPrice}
              productImage={product.productImage}
              productUrl={product.productLink}
              productBrand={product.productBrand}
              dateUpdated={product.productUpdateDate}
              productPrices={product.productPrices}
              onRemove={removeProduct}
            />
          ))}
        </div>
      </div>

      <Footer setUrlModalVisibility={setUrlModalVisibility} />

      {urlModalVisibility && (
        <LinkModal
          submitLink={handleSubmit}
          setUrl={setUrl}
          setUrlModalVisibility={setUrlModalVisibility}
        />
      )}
    </div>
  );
}
