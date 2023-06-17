const loadingStyle = {
  width: "100wh",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const GlobalLoading = () => {
  return (
    <div style={loadingStyle}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default GlobalLoading;
