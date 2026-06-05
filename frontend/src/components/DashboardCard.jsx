function DashboardCard({ title, value, icon, colorClass }) {
  return (
    <article className="p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between transition duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div>
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-3xl font-black text-gray-800 dark:text-white mt-1.5">
          {value}
        </p>
      </div>
      <div className={`text-2xl p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 flex items-center justify-center ${colorClass || "text-green-600"}`}>
        {icon}
      </div>
    </article>
  );
}

export default DashboardCard;
