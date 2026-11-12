import { useState } from 'react'
import api from '../api/axios'

const fields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true, wide: true },
    { name: 'firstName', label: 'First name', type: 'text', required: true },
    { name: 'lastName', label: 'Last name', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'department', label: 'Department', type: 'text', required: true },
    { name: 'qualification', label: 'Qualification', type: 'text' },
    { name: 'hireDate', label: 'Hire date', type: 'date' },
    { name: 'phoneNumber', label: 'Phone number', type: 'tel' },
    { name: 'address', label: 'Address', type: 'text', wide: true },
]

const empty = Object.fromEntries(fields.map((f) => [f.name, '']))

export default function TeacherForm({ onSaved, onCancel }) {
    const [form, setForm] = useState(empty)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSaving(true)

        const payload = { ...form, role: 'TEACHER' }
        Object.keys(payload).forEach((k) => payload[k] === '' && delete payload[k])

        try {
            await api.post('/api/teachers', payload)
            onSaved()
        } catch (err) {
            setError(
                err.response
                    ? err.response.data?.message || 'Could not save teacher'
                    : "Can't reach the API. Check the server is running and CORS allows this origin."
            )
        } finally {
            setSaving(false)
        }
    }

    const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            {fields.map((f) => (
                <div key={f.name} className={f.wide ? 'col-span-2' : ''}>
                    <label htmlFor={`teacher-${f.name}`} className="block text-xs text-gray-500">
                        {f.label}
                        {f.required ? '' : ' (optional)'}
                    </label>
                    <input
                        id={`teacher-${f.name}`}
                        name={f.name}
                        type={f.type}
                        value={form[f.name]}
                        onChange={handleChange}
                        required={f.required}
                        className={inputClass}
                    />
                </div>
            ))}

            {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}

            <div className="col-span-2 mt-2 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                    Cancel
                </button>
                <button
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save teacher'}
                </button>
            </div>
        </form>
    )
}
