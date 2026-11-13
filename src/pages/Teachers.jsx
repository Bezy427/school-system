import { useEffect, useState } from "react"
import TeacherForm from "../components/TeacherForm"
import Modal from "../components/Modal"
import api from "../api/axios"
import { USE_MOCK } from '../config'
import { mockTeachers } from '../mockData'

export default function Teachers() {
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [showForm, setShowForm] = useState(false)

    async function load() {
        if (USE_MOCK) {
            setTeachers(mockTeachers)
            setLoading(false)
            return
        }
        try {
            const res = await api.get('/api/teachers')
            setTeachers(res.data)
            setError('')
        } catch {
            setError('Could not load teachers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    async function handleDelete(id) {
        if (!window.confirm('Delete this teacher?')) return
        if (USE_MOCK) {
            setTeachers((prev) => prev.filter((t) => t.id !== id))
            return
        }
        try {
            await api.delete(`/api/teachers/${id}`)
            setTeachers((prev) => prev.filter((t) => t.id !== id))
        } catch {
            alert('Could not delete teacher')
        }
    }

    function handleSaved(created) {
        setShowForm(false)
        if (USE_MOCK) {
            setTeachers((prev) => [...prev, { id: Date.now(), ...created }])
            return
        }
        load()
    }

    const filtered = teachers.filter((t) =>
        `${t.firstName ?? ''} ${t.lastName ?? ''}`.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) return <p className="text-gray-500">Loading teachers...</p>
    if (error) return <p className="text-red-600">{error}</p>

    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-3">
                <h1 className="text-xl font-semibold">Teachers</h1>
                <input
                    placeholder="Search by name"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                >
                    Add teacher
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-gray-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Subject</th>
                            <th className="px-4 py-3 font-medium">Department</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    {search ? 'No teachers match that name.' : 'No teachers yet. Add the first one.'}
                                </td>
                            </tr>
                        )}
                        {filtered.map((t) => (
                            <tr key={t.id} className="border-t border-gray-100">
                                <td className="px-4 py-3">{t.firstName} {t.lastName}</td>
                                <td className="px-4 py-3">{t.subject}</td>
                                <td className="px-4 py-3">{t.department?.name ?? t.department}</td>
                                <td className="px-4 py-3">{t.email}</td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="rounded-lg border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <Modal title="Add teacher" onClose={() => setShowForm(false)}>
                    <TeacherForm onSaved={handleSaved} onCancel={() => setShowForm(false)} />
                </Modal>
            )}
        </div>
    )
}
