import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouter = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRouter;
