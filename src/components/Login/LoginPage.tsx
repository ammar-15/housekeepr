import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonPrimary, inputClass, labelClass } from "../ui/form";
import { ArrowRight, Lock, User } from "../ui/icons";
import { formatToday } from "../../lib/format";

const WORKFLOW = [
  {
    step: "01",
    title: "Assign",
    body: "The manager loads check-outs and stayovers and splits them across the shift.",
  },
  {
    step: "02",
    title: "Clean",
    body: "Housekeepers work through their rooms floor by floor and flip each one to clean.",
  },
  {
    step: "03",
    title: "Inspect",
    body: "Supervisors check finished rooms and sign them off as inspected.",
  },
];

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
      setError("That username and password don't match.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <div className="loginpagecontainer grid w-full max-w-4xl overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(64,27,27,0.05),0_24px_48px_-24px_rgba(64,27,27,0.25)] md:grid-cols-[1.1fr_1fr]">
        <aside className="hidden flex-col justify-between gap-10 bg-chocolate p-10 text-pearl md:flex">
          <div>
            <p className="font-display text-3xl tracking-tight">Housekeepr</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-pearl/65">
              Room assignments, turnover status and handover notes for the housekeeping team.
            </p>
          </div>

          <ol className="space-y-5">
            {WORKFLOW.map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="pt-0.5 font-mono text-xs text-clay">{item.step}</span>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-pearl/60">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="text-xs text-pearl/40">{formatToday()}</p>
        </aside>

        <form onSubmit={handleLogin} className="flex flex-col justify-center p-8 sm:p-12">
          <p className="font-display text-2xl text-wine md:hidden">Housekeepr</p>
          <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-chocolate md:mt-0">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-chocolate/60">
            The demo account is filled in:{" "}
            <span className="font-mono text-chocolate">admin / admin</span>
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-chocolate/40" />
                <input
                  id="username"
                  autoComplete="username"
                  className={`${inputClass} pl-9`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-chocolate/40" />
                <input
                  id="password"
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
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-md bg-lightred/40 px-3 py-2 text-sm">
              {error}
            </p>
          )}

          <button type="submit" className={`${buttonPrimary} login-button mt-6 w-full py-2.5`}>
            Sign in
            <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
