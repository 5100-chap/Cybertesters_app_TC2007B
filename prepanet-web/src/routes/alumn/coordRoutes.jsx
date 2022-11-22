import { Navigate, Outlet } from "react-router-dom";



const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const AlumnRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AlumnRoutes;