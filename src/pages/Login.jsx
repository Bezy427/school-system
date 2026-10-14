import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await api.post('/auth/login', { username, password })
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')
        } catch {
            setError('Invalid username or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h1 className="text-xl font-semibold">School Mangement System</h1>
                <p className="mb-4 text-sm text-gray-500">Sign in to continue.</p>
                <label className="text-sm text-gray-600">Username</label>
                <input 
                    className="mb-3 mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                 />
                 
                <label className="text-sm text-gray-600">Password</label>
                <input
                    type="password" 
                    className="mb-3 mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />

                 {error && <p className="mb-3 text-sm text-red-600">
                    {error}
                 </p>}

                 <button 
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Signing in ...' : 'Sign in'}
                 </button>

            </form>
        </div>
    )
}