const Search = ({ mediaType, value, searchHandler }) => {
  return (
    <div className="m-4 h-auto">
      <input
        className="form-control form-control-lg text-white bg-dark"
        type="text"
        placeholder={`Search ${mediaType}...`}
        aria-label="search media"
        value={value}
        onChange={(e) => searchHandler(e)}
      />
    </div>
  );
};

export default Search;
