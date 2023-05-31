import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedUserTypes }) => {
  const location = useLocation();
  const { userType } = useAuth();

  const userTypeArray = Array.isArray(userType) ? userType : [userType];

  const isAllowed = userTypeArray.some((type) =>
    allowedUserTypes.includes(type)
  );

  const content = isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
