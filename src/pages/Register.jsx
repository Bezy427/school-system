
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  School,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Register() {
  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (Object.values(formData).some((value) => !value.trim())) {
      setError("Please complete all the required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Backend registration will be connected later.
    console.log({
      ...formData,
      role,
    });

    setSuccess("Your registration form is ready. Backend integration is still pending.");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-[#790d29] focus:ring-2 focus:ring-[#790d29]/10";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-100 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-[#650d27] p-3 text-white">
              <School size={25} />
            </div>

            <div>
              <h1 className="font-extrabold text-[#650d27]">
                DOMBOTOMBO
              </h1>
              <p className="text-xs tracking-wider text-gray-500">
                GOVERNMENT PRIMARY SCHOOL
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-[#790d29] px-5 py-2.5 text-sm font-bold text-[#790d29] transition hover:bg-[#790d29] hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Registration content */}
      <main className="px-5 py-12">
        <div className="mx-auto max-w-2xl">

          <div className="mb-8 text-center">
            <p className="font-bold uppercase tracking-widest text-[#a57a16]">
              Join Our School Community
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#650d27] md:text-4xl">
              Create Your Account
            </h2>

            <p className="mt-3 text-gray-500">
              Register to access the Dombotombo School Management Portal.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-9">

            {/* Account type */}
            <div>
              <label className="mb-3 block text-sm font-bold text-gray-700">
                Select Account Type
              </label>

              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                    role === "STUDENT"
                      ? "border-[#790d29] bg-[#790d29]/5 text-[#790d29]"
                      : "border-gray-200 text-gray-500 hover:border-[#790d29]"
                  }`}
                >
                  <GraduationCap size={25} />
                  <span className="font-bold">Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("PARENT")}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                    role === "PARENT"
                      ? "border-[#790d29] bg-[#790d29]/5 text-[#790d29]"
                      : "border-gray-200 text-gray-500 hover:border-[#790d29]"
                  }`}
                >
                  <Users size={25} />
                  <span className="font-bold">Parent</span>
                </button>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                Teacher and administrator accounts are managed by the school.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Names */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    First Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Last Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className={inputClass}
                    />
                  </div>
                </div>

              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Registration number */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {role === "STUDENT"
                    ? "Student Registration Number"
                    : "Child's Student Registration Number"}
                </label>

                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword
                      ? <EyeOff size={19} />
                      : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Feedback */}
              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {success}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#790d29] py-4 font-bold text-white transition hover:bg-[#57091d]"
              >
                Create Account
                <ArrowRight size={19} />
              </button>

            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#790d29]"
              >
                Sign in
              </Link>
            </p>

          </div>

          <p className="mt-7 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Dombotombo Government Primary School
          </p>

        </div>
      </main>
    </div>
  );
}
