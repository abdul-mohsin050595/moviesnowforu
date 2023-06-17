const loadingStyle = {
  width: "100%",
  heigth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
const ComponentLoading = () => {
  return (
    <div style={loadingStyle}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default ComponentLoading;
