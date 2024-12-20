import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "./firebase";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle(); // Your login function
      console.log("User:", result.user);
      // navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
};
export default Login;
