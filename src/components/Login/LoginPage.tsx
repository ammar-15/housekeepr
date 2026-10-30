import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonPrimary, inputClass } from "../ui/form";
import { Lock, User } from "../ui/icons";

const LoginPage = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/AdminDashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <form
        onSubmit={handleLogin}
        className="loginpagecontainer flex w-full max-w-sm flex-col gap-3 rounded-lg border border-line bg-white p-10 shadow-lg"
      >
        <h1 className="mb-4 text-3xl text-wine">Housekeepr</h1>

        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-chocolate/40" />
          <input
            aria-label="Username"
            autoComplete="username"
            className={`${inputClass} pl-9`}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-chocolate/40" />
          <input
            aria-label="Password"
            type="password"
            autoComplete="current-password"
            className={`${inputClass} pl-9`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-wine">
            {error}
          </p>
        )}

        <button type="submit" className={`${buttonPrimary} login-button mt-3`}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
