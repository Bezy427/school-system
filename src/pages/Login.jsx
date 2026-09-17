import { useState } from "react";
import { useNavigate } from "react-router"
import { login as loginRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth;

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSubmitting(true);

        try {
            const response = await loginRequest(form);

            login(response);

            const role = response.role;

            if (role === ROLES.PRINCIPAL) {
                navigate("/principal");
            } else if (role === ROLES.TEACHER) {
                navigate("/teacher");
            } else if (role === ROLES.STUDENT) {
                navigate("/student");
            } else {
                navigate("/unauthorized");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Sign in
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to access your school portal.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-500 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label 
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>

                            <input 
                                id="username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2"
                                placeholder="Enter your username"
                            />
                        </div> 
                        
                        <div>
                            <label 
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input 
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2"
                                placeholder="Enter your password"
                            />
                        </div>  

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? "Signing in..." : "Sign in"}
                        </button>  
                    </form>    
                </div>
            </div>
        </main>
    )
}