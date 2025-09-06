import { useState } from "react";
import LoginForm from "../components/user/LoginForm";
import RegisterForm from "../components/user/RegisterForm";
import LogoutButton from "../components/user/LogoutButton";
import { useAuthStore } from "../stores/useAuthStore";

const AuthPage = () => {
  const { user } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register">("login");

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {user.firstName} {user.lastName}!
        </h2>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        <div className="text-center mt-4">
          {mode === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
