import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import { Suspense } from "react";
import GlobalLoading from "./components/Loading/GlobalLoading";

function App() {
  return (
    <Router>
      <NavBar />
      <Suspense fallback={<GlobalLoading />}>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
