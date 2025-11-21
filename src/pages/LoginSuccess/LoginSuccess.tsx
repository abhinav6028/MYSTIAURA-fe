import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export default function LoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email")?? ""
    const role = params.get("role") ?? "user"

    if (token) {
      dispatch(setCredentials({
        token,
        user: {
            email:email,
            role:role
        },
      }));
      navigate("/user/home");
    }
  }, []);

  return <div>Logging you in...</div>;
}
