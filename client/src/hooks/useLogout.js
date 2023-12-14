import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);

  const logoutUser = useAuthStore((state) => state.logout);

  const handleUserLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      console.log(error);
    }
  };
  return { handleUserLogout, isLoggingOut, error };
};

export default useLogout;
