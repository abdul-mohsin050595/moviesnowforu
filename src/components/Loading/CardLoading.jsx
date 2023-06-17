const cardStyle = {
  width: "230px",
  height: "342px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const CardLoading = () => {
  return (
    <div style={cardStyle}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default CardLoading;
