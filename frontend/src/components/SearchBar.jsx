function SearchBar({ search, setSearch }) {

    return (
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search products"
        className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    );
  }
  
  export default SearchBar;