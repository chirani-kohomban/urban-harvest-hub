import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "../i18n";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH PRODUCTS
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(t("products.error"));
        setLoading(false);
      });
  }, [t]);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // FILTERING
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selected === "all" || item.category === selected;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* TITLE */}
      <h1 className="text-3xl font-black mb-6 text-green-700 dark:text-green-400">
        {t("products.title")}
      </h1>

      {/* SEARCH + FILTER */}
      <SearchBar search={search} setSearch={setSearch} />
      <CategoryFilter selected={selected} setSelected={setSelected} />

      {/* LOADING */}
      {loading && (
        <div className="text-center mt-10 text-gray-500 dark:text-gray-300">
          <div className="animate-pulse">{t("products.loading")}</div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-red-500 mt-6 text-center font-semibold">
          {error}
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center mt-10 text-gray-500 dark:text-gray-400 font-semibold">
          {t("products.empty")}
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))}

      </div>

    </div>
  );
}

export default Products;