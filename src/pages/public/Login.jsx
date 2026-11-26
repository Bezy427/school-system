
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  School,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const roles = [
  { id: "PRINCIPAL", label: "Principal", icon: ShieldCheck },
  { id: "TEACHER", label: "Teacher", icon: BookOpen },
  { id: "STUDENT", label: "Student", icon: GraduationCap },
];

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Login() {
  const [role, setRole] = useState("STUDENT");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // Authenticate with Spring Boot
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: identifier.trim(),
          password,
        }),
      });

      if (!loginResponse.ok) {
        if (loginResponse.status === 401) {
          throw new Error("Invalid email or password.");
        }

        throw new Error("Login failed. Please try again.");
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;

      if (!token) {
        throw new Error("Authentication token was not returned.");
      }

      // Retrieve authenticated user information
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Unable to retrieve your account information.");
      }

      const user = await userResponse.json();

      // Verify selected portal against the actual backend role
      if (user.role !== role) {
        throw new Error(
          `Your account belongs to the ${user.role} portal. Please select the correct portal.`
        );
      }

      // Save authentication details
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const dashboardRoutes = {
        PRINCIPAL: "/admin",
        TEACHER: "/teachers",
        STUDENT: "/students",
      };

      navigate(dashboardRoutes[user.role] || "/", { replace: true });
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:grid lg:grid-cols-2">

      <div className="relative hidden overflow-hidden bg-[#650d27] lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="rounded-xl bg-yellow-400 p-3 text-[#650d27]">
            <School size={30} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold">DOMBOTOMBO</h1>
            <p className="text-xs tracking-widest text-gray-200">
              GOVERNMENT PRIMARY SCHOOL
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl text-white">
          <p className="mb-5 font-semibold uppercase tracking-widest text-yellow-400">
            Education Management Portal
          </p>

          <h2 className="text-5xl font-extrabold leading-tight">
            Empowering Education.
            <span className="text-yellow-400">
              {" "}Connecting Our Community.
            </span>
          </h2>

          <p className="mt-7 text-lg leading-8 text-gray-200">
            Access your school information, academic records,
            announcements and learning resources in one place.
          </p>
        </div>

        <div className="relative z-10 text-sm text-gray-300">
          © {new Date().getFullYear()} Dombotombo Government Primary School
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-3 lg:hidden"
          >
            <div className="rounded-xl bg-[#650d27] p-3 text-white">
              <School size={26} />
            </div>

            <div>
              <h1 className="font-extrabold text-[#650d27]">DOMBOTOMBO</h1>
              <p className="text-xs text-gray-500">
                GOVERNMENT PRIMARY SCHOOL
              </p>
            </div>
          </Link>

          <div>
            <p className="font-semibold uppercase tracking-widest text-[#a57a16]">
              Welcome Back
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-[#650d27]">
              Sign in to your account
            </h2>

            <p className="mt-3 text-gray-500">
              Select your portal and enter your credentials.
            </p>
          </div>

          <div className="mt-8">
            <label className="mb-3 block text-sm font-bold text-gray-700">
              Select your portal
            </label>

            <div className="grid grid-cols-3 gap-3">
              {roles.map((item) => {
                const Icon = item.icon;
                const active = role === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition ${
                      active
                        ? "border-[#790d29] bg-[#790d29]/5 text-[#790d29]"
                        : "border-gray-200 bg-white text-gray-500 hover:border-[#790d29]"
                    }`}
                  >
                    <Icon size={23} />
                    <span className="text-sm font-semibold">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 focus-within:border-[#790d29]">
                <Mail size={20} className="text-gray-400" />

                <input
                  type="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border-0 bg-transparent px-3 py-4 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-[#790d29]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 focus-within:border-[#790d29]">
                <Lock size={20} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-0 bg-transparent px-3 py-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#790d29] py-4 font-bold text-white transition hover:bg-[#57091d] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#790d29]"
            >
              Register here
            </Link>
          </p>

          <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            Secure School Management Portal
          </div>
        </div>
      </div>
    </div>
  );
}
