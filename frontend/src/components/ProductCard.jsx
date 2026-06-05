import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";

function ProductCard({ product, deleteProduct }) {
  const { t } = useTranslation();

  // Map database category keys to translation keys
  const categoryLabel = t(`products.${product.category}`) || product.category;

  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
      
      <div>
        {/* Product Cover Image */}
        <div className="h-48 overflow-hidden bg-gray-100 relative">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-200 dark:bg-gray-750">
              🌱 No Image Available
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Product Name */}
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
            {product.name}
          </h2>

          {/* Category */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 capitalize">
            {t("products.category")}: <span className="font-semibold text-gray-600 dark:text-gray-300">{categoryLabel}</span>
          </p>

          {/* Price Badge */}
          <div className="mb-2">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-705 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold border border-green-200/50 dark:border-green-800/30">
              Rs {product.price}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center p-5 pt-0 mt-2">
        <Link
          to={`/products/${product.id}`}
          className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
          aria-label={`View details of ${product.name}`}
        >
          {t("products.viewDetails")}
        </Link>

        <button
          onClick={() => deleteProduct(product.id)}
          className="bg-red-500 hover:bg-red-650 text-white text-xs font-bold px-3 py-1.5 rounded transition shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Delete ${product.name}`}
        >
          {t("products.delete")}
        </button>
      </div>

    </article>
  );
}

export default ProductCard;