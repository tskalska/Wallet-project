import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations } from "./redux/auth";
import { authSelectors } from "./redux/auth";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Loader from "./components/Loader/Loader";

const RegisterPage = lazy(() => import("./views/RegisterPage"));
const LoginPage = lazy(() => import("./views/LoginPage"));
const DashboardPage = lazy(() => import("./views/DashboardPage"));
const HomeTab = lazy(() => import("./components/homeTab/HomeTab"));
const DiagramTab = lazy(() => import("./components/DiagramTab"));

function App() {
  const dispatch = useDispatch();

  const getToken = useSelector(authSelectors.checkToken);
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    if (getToken === null) {
      return;
    } else {
      dispatch(authOperations.fetchCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/register"
              element={
                <PublicRoute restricted redirectTo="/login">
                  <RegisterPage />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/login"
              restricted
              element={
                <PublicRoute redirectTo="/home">
                  <LoginPage />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <PrivateRoute redirectTo="/login">
                  <DashboardPage />
                </PrivateRoute>
              }
            >
              <Route path="home" element={<HomeTab />} />
              <Route path="diagram" element={<DiagramTab />} />
              <Route path="currency" />
            </Route>
          </Routes>
        </Suspense>
      </>
    )
  );
}

export default App;
