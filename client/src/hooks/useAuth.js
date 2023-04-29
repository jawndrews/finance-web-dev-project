import { useSelector } from "react-redux";
import { selectCurrentToken } from "state/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { email, firstName, lastName, organization, userType } =
      decoded.UserInfo;
    return {
      email,
      firstName,
      lastName,
      organization,
      userType,
    };
  }
  return {
    email: "",
    firstName: "",
    lastName: "",
    organization: "",
    userType: "",
  };
};

export default useAuth;
