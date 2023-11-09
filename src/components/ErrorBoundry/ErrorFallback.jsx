import { useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary} className="btn btn-light">
        Try again
      </button>
    </div>
  );
}

export default ErrorFallback;
