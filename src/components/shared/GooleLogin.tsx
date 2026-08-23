"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;
      console.log("Google ID Token:", idToken);

      if (idToken) {
        toast.error("Google ID token is missing");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Google login failed");
      }

      const {
        userId,
        role,
        accessToken,
        refreshToken,
        isProfileComplete,
      } = result.data;

      // Save authentication data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      toast.success("Login successful");

      if (!isProfileComplete) {
        router.push("/profile");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Google login error:", error);

      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => {
        toast.error("Google authentication failed");
      }}
    />
  );
};

export default GoogleLoginButton;