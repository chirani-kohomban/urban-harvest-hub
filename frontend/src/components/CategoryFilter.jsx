import { useTranslation } from "../i18n";

function CategoryFilter({ selected, setSelected }) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 items-center mb-4">
      <label htmlFor="category-select" className="text-sm font-bold text-gray-700 dark:text-gray-300">
        {t("products.category")}:
      </label>
      <select
        id="category-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="all">{t("products.allCategories")}</option>
        <option value="food">{t("products.food")}</option>
        <option value="lifestyle">{t("products.lifestyle")}</option>
        <option value="education">{t("products.education")}</option>
        <option value="eco-products">{t("products.ecoProducts")}</option>
      </select>
    </div>
  );
}

export default CategoryFilter;