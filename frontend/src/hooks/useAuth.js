import { useContext } from "react";
import AuthContext from "../context/AuthProvider.js";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};

export default useAuth;
