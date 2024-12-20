import { signInWithGoogle }  from "../firebase"

const handleGoogleLogin = async (navigate) => {

  try {
    const result = await signInWithGoogle();
    console.log("User signed in:", result.user);
    // Redirect to the Dashboard
    navigate("/dashboard");
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export default handleGoogleLogin;
