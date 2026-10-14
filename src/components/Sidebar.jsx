import { NavLink, useNavigate } from "react-router-dom"

const Links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/students', label: 'Students' },
]

export default function Sidebar() {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <aside className="flex w-48 flex-col border-r border-gray-200 bg-white p-3">
            <p className="mb-4 px 2 font-semibold">School Admin</p>
            <nav className="flex flex-1 flex-col gap-1">
                {Links.map((l) => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) => 
                            `rounded-lg px-3 py-2 text-sm ${
                                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                            }`
                        }
                    > 
                        {l.label}
                    </NavLink>    
                ))}
            </nav>
            <button onClick={logout} className="rounded-lg px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50">
                Log out
            </button>
        </aside>
    )
}