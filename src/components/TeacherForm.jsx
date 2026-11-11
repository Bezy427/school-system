import {  useState } from 'react'

const empty = {
    username,
    firstName,
    lastName,
    email,
    password,
    subject,
    qualification,
    department,
    hireDate,
    phoneNumber,
    role,
    address,
}

const fields = [
    { name: 'username', label: 'Username', type: 'text'},
    { name: 'firstName', label: 'First Name', type: 'text'},
    { name: 'lastName', label: 'Last Name', type: 'text'},
    { name: 'email', label: 'Email', type: 'email'},
    { name: 'password', label: 'Password', type: 'password'},
    { name: 'subject', label: 'Subject', type: 'text'},
    { name: 'qualification', label: 'Qualification', type: 'text'},
    { name: 'department', label: 'Department', type: 'text'},
    { name: 'hireDate', label: 'Hire Date', type: 'text'},
    { name: 'phoneNumber', label: 'Phone Number', type: 'text'},
    { name: 'role', label: 'Role', type: 'text'},
    { name: 'address', label: 'Address', type: 'text'},
]

export default function TeacherForm({ onSaved, onCancel }) {
    const [form, setForm] = useState(empty)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSaving(true)
        try {
            await api.post('api/students', form)
            onSaved()
        } catch (err) {
            setError(err.response?.data?.message || 'Could not save student')
        } finally {
            setSaving(false)
        }
    }

    const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'

    return (
        <form onSubmit={handleSubmit} className="frid grid-cols-2 gap-3">
            {fields.map((f) => (
                <div key={f.name} className={f.name === 'registrationNumber' || f.name === 'email' ? 'col-span-2' : ''}>
                    <label className="text-xs text-gray-500">{f.label}</label>
                    <input
                        name={f.name}
                        type={f.type}
                        value={form[f.name]}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </div>
            ))}

            <div>
                <label className="text-xs text-gray-500">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
            </div>

            {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}

            <div className="col-span-2 mt-2 flex justify-end gap-2">
                <button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                    Cancel
                </button>
                <button disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save student'}
                </button>
            </div>
        </form>
    )
}