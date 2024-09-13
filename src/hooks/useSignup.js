import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    username,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);

    try {
      const response = await fetch(
        "api/v1/auth/register",
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            username,
            email,
            password,
            confirmPassword,
            gender,
          }),
        }
      );

      const data = await response.json();

      if(data.error) {
        throw new Error(data.error)
      }
      
      console.log(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, signup}
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  email,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !email || !password || !confirmPassword ||! gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }

  return true;
}
