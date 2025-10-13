import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { persistor } from "../store";
import { logout } from "../store/slices/authSlice";
import { clearUserState } from "../store/slices/userSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      // 1️⃣ Clear Redux auth state
      dispatch(logout());
      dispatch(clearUserState());

      // 2️⃣ Clear persisted storage
      await persistor.purge();

      // 3️⃣ Remove React Query caches
      queryClient.removeQueries({ queryKey: ["wishlist"] });
      queryClient.removeQueries({ queryKey: ["cart"] });
      queryClient.clear(); // clears cached queries
      localStorage.removeItem("persist:root"); // optional
      localStorage.removeItem("persist:user"); // optional
      localStorage.removeItem("persist:auth"); // optional

      // 4️⃣ Redirect
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logoutUser;
}
