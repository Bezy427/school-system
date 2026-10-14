import { useEffect, useState } from "react"
import StudentForm from "../components/StudentForm"
import Modal from "../components/Modal"
import api from "../api/axios"
import { USE_MOCK } from '../config'
import { mockStudents } from '../mockData'

export default function Students() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')

    const [showForm, setShowForm] = useState(false)


    async function load() {
        if (USE_MOCK) {
            setStudents(mockStudents)
            setLoading(false)
            return
        }
        try {
            const res = await api.get('/api/students')
            setStudents(res.data)
        } catch {
            setError('Cuould not load students')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        
        load()
    }, [])
    
    async function handleDelete(id) {
        if (!window.confirm('Delete this student?')) return 
        if (USE_MOCK) {
            setStudents((prev) => prev.filter((s) => s.id !== id))
            return
        }
        try {
            await api.delete(`/api/students/${id}`)
            setStudents((prev) => prev.filter((s) => s.id !== id))
        } catch {
            alert('Could not delete student')
        }
    }

    function handleSaved() {
        setShowForm(false)
        load()
    }


    const filtered = students.filter((s) => 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())    
    )

    if (loading) return <p className="text-gray-500">Loading</p>
    if (error) return <p className="text-red-600">{error}</p>

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Students</h1>
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
                    Add Student
                </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-white ring-1 ring-gray-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Reg. number</th>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s) => (
                            <tr key={s.id} className="border-t border-gray-100">
                                <td className="px-4 py-3">{s.registrationNumber}</td>
                                <td className="px-4 py-3">{s.firstName} {s.lastName}</td>
                                <td className="px-4 py-3">{s.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <Modal title="Add student" onClose={() => setShowForm(false)}>
                    <StudentForm onSaved={handleSaved} onCancel={() => setShowForm(false)} />
                </Modal>
            )}
        </div>
    )
}