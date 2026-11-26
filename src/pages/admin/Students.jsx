
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    studentNumber: "DGS2026001",
    firstName: "Tinashe",
    lastName: "Moyo",
    gender: "Male",
    className: "Grade 7A",
    guardian: "Peter Moyo",
    email: "peter@example.com",
    phone: "0771234567",
    status: "Active",
  },
  {
    id: 2,
    studentNumber: "DGS2026002",
    firstName: "Rumbidzai",
    lastName: "Ncube",
    gender: "Female",
    className: "Grade 6B",
    guardian: "Grace Ncube",
    email: "grace@example.com",
    phone: "0772345678",
    status: "Active",
  },
  {
    id: 3,
    studentNumber: "DGS2026003",
    firstName: "Tendai",
    lastName: "Dube",
    gender: "Male",
    className: "Grade 5A",
    guardian: "John Dube",
    email: "john@example.com",
    phone: "0773456789",
    status: "Inactive",
  },
  {
    id: 4,
    studentNumber: "DGS2026004",
    firstName: "Nyasha",
    lastName: "Chikore",
    gender: "Female",
    className: "Grade 4A",
    guardian: "Mary Chikore",
    email: "mary@example.com",
    phone: "0774567890",
    status: "Active",
  },
  {
    id: 5,
    studentNumber: "DGS2026005",
    firstName: "Tatenda",
    lastName: "Muchengeti",
    gender: "Male",
    className: "Grade 3B",
    guardian: "David Muchengeti",
    email: "david@example.com",
    phone: "0775678901",
    status: "Pending",
  },
  {
    id: 6,
    studentNumber: "DGS2026006",
    firstName: "Anesu",
    lastName: "Sibanda",
    gender: "Female",
    className: "Grade 2A",
    guardian: "Susan Sibanda",
    email: "susan@example.com",
    phone: "0776789012",
    status: "Active",
  },
];

const emptyForm = {
  studentNumber: "",
  firstName: "",
  lastName: "",
  gender: "Male",
  className: "Grade 1A",
  guardian: "",
  email: "",
  phone: "",
  status: "Active",
};

const statusStyles = {
  Active: "bg-green-50 text-green-700",
  Inactive: "bg-red-50 text-red-700",
  Pending: "bg-yellow-50 text-yellow-700",
};

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [menuId, setMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = search.toLowerCase();

      const matchesSearch = [
        student.studentNumber,
        student.firstName,
        student.lastName,
        student.guardian,
      ].some((value) => value.toLowerCase().includes(searchText));

      const matchesClass =
        classFilter === "All" || student.className === classFilter;

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, search, classFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / pageSize)
  );

  const visibleStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveCount = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const openAddModal = () => {
    setFormData(emptyForm);
    setFormError("");
    setModal("add");
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({ ...student });
    setFormError("");
    setModal("edit");
    setMenuId(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const requiredFields = [
      "studentNumber",
      "firstName",
      "lastName",
      "guardian",
      "phone",
    ];

    const missingField = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (missingField) {
      setFormError("Please complete all required fields.");
      return;
    }

    const duplicateNumber = students.some(
      (student) =>
        student.studentNumber.toLowerCase() ===
          formData.studentNumber.trim().toLowerCase() &&
        (modal === "add" || student.id !== selectedStudent.id)
    );

    if (duplicateNumber) {
      setFormError("This student number already exists.");
      return;
    }

    if (modal === "add") {
      const newStudent = {
        ...formData,
        id: Date.now(),
        studentNumber: formData.studentNumber.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      };

      setStudents((previous) => [newStudent, ...previous]);
      setCurrentPage(1);
    } else {
      setStudents((previous) =>
        previous.map((student) =>
          student.id === selectedStudent.id
            ? { ...formData, id: selectedStudent.id }
            : student
        )
      );
    }

    setModal(null);
    setSelectedStudent(null);
  };

  const handleDelete = (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${student.firstName} ${student.lastName} from this demo list?`
    );

    if (!confirmed) return;

    setStudents((previous) =>
      previous.filter((item) => item.id !== student.id)
    );

    setMenuId(null);
  };

  const closeModal = () => {
    setModal(null);
    setSelectedStudent(null);
    setFormError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-8">

      {/* Page heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Administration / Students
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-[#650d27] md:text-3xl">
            Student Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage student records, classes and enrollment information.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#790d29] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#57091d]"
        >
          <Plus size={19} />
          Add New Student
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3">

        <StatCard
          title="Total Students"
          value={students.length}
          icon={GraduationCap}
          color="bg-blue-50 text-blue-700"
        />

        <StatCard
          title="Active Students"
          value={activeCount}
          icon={UserCheck}
          color="bg-green-50 text-green-700"
        />

        <StatCard
          title="Inactive Students"
          value={inactiveCount}
          icon={UserX}
          color="bg-red-50 text-red-700"
        />

      </div>

      {/* Student directory */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center">

          <div>
            <h2 className="font-extrabold text-gray-800">
              Student Directory
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Search and manage registered students.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="flex items-center rounded-xl border border-gray-200 px-3">
              <Search size={18} className="text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search students..."
                className="w-full min-w-0 px-3 py-3 text-sm outline-none sm:w-56"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3">
              <Filter size={17} className="text-gray-400" />

              <select
                value={classFilter}
                onChange={(e) => {
                  setClassFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent py-3 text-sm outline-none"
              >
                <option value="All">All Classes</option>
                {Array.from({ length: 7 }, (_, index) => index + 1).flatMap(
                  (grade) =>
                    ["A", "B"].map((section) => (
                      <option
                        key={`${grade}${section}`}
                        value={`Grade ${grade}${section}`}
                      >
                        Grade {grade}{section}
                      </option>
                    ))
                )}
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Student</th>
                <th className="px-5 py-4 font-semibold">Student Number</th>
                <th className="px-5 py-4 font-semibold">Class</th>
                <th className="px-5 py-4 font-semibold">Gender</th>
                <th className="px-5 py-4 font-semibold">Guardian</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {visibleStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#790d29]/10 font-bold text-[#790d29]">
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {student.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-600">
                    {student.studentNumber}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.className}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.gender}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {student.guardian}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                        statusStyles[student.status]
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="relative px-5 py-4 text-right">
                    <button
                      onClick={() =>
                        setMenuId(menuId === student.id ? null : student.id)
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                      aria-label={`Actions for ${student.firstName}`}
                    >
                      <MoreVertical size={19} />
                    </button>

                    {menuId === student.id && (
                      <div className="absolute right-10 top-12 z-20 w-40 rounded-xl border border-gray-100 bg-white py-2 text-left shadow-lg">

                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setModal("view");
                            setMenuId(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <Eye size={16} />
                          View details
                        </button>

                        <button
                          onClick={() => openEditModal(student)}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <Pencil size={16} />
                          Edit student
                        </button>

                        <button
                          onClick={() => handleDelete(student)}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {visibleStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <GraduationCap
                      size={35}
                      className="mx-auto text-gray-300"
                    />
                    <p className="mt-3 font-semibold text-gray-600">
                      No students found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {filteredStudents.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}{" "}
            to{" "}
            {Math.min(currentPage * pageSize, filteredStudents.length)} of{" "}
            {filteredStudents.length} students
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="px-3 text-sm font-semibold text-gray-600">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Add/Edit modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#650d27]">
                  {modal === "add" ? "Register New Student" : "Edit Student"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the student's information below.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Student Number *"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleChange}
                />

                <FormField
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <FormField
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#790d29]"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Class
                  </label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#790d29]"
                  >
                    {Array.from({ length: 7 }, (_, index) => index + 1).flatMap(
                      (grade) =>
                        ["A", "B"].map((section) => (
                          <option
                            key={`${grade}${section}`}
                            value={`Grade ${grade}${section}`}
                          >
                            Grade {grade}{section}
                          </option>
                        ))
                    )}
                  </select>
                </div>

                <FormField
                  label="Parent / Guardian *"
                  name="guardian"
                  value={formData.guardian}
                  onChange={handleChange}
                />

                <FormField
                  label="Guardian Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <FormField
                  label="Guardian Phone *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#790d29]"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              {formError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#790d29] px-5 py-3 text-sm font-bold text-white hover:bg-[#57091d]"
                >
                  {modal === "add" ? "Register Student" : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Student details modal */}
      {modal === "view" && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#650d27]">
                Student Profile
              </h2>

              <button onClick={closeModal} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={21} />
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#790d29]/10 text-xl font-extrabold text-[#790d29]">
                {selectedStudent.firstName[0]}
                {selectedStudent.lastName[0]}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedStudent.studentNumber}
                </p>
                <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[selectedStudent.status]}`}>
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 rounded-xl bg-gray-50 p-4">
              <ProfileRow label="Class" value={selectedStudent.className} />
              <ProfileRow label="Gender" value={selectedStudent.gender} />
              <ProfileRow label="Parent / Guardian" value={selectedStudent.guardian} />
              <ProfileRow label="Guardian Email" value={selectedStudent.email || "Not provided"} />
              <ProfileRow label="Guardian Phone" value={selectedStudent.phone} />
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-xl bg-[#790d29] py-3 font-bold text-white hover:bg-[#57091d]"
            >
              Close Profile
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
        <Icon size={23} />
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-2 text-3xl font-extrabold text-gray-800">{value}</h3>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#790d29] focus:ring-2 focus:ring-[#790d29]/10"
      />
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="flex flex-col justify-between gap-1 border-b border-gray-200 pb-3 last:border-0 last:pb-0 sm:flex-row">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}
