const API_URL = import.meta.env.VITE_API_URL;

const API_BASE = `${API_URL}/api`;
const AUTH_BASE = `${API_URL}/auth`;

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function request(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let response;

    try {
        response = await fetch(url, {
            ...options,
            headers,
        });
    } catch {
        throw new ApiError(
            "Unable to connect to the server. Please check that the backend is running.",
            0
        );
    }

    if (!response.ok) {
        let message = null;

        try {
            const data = await response.json();
            message = data.message || data.error;
        } catch {
            // Response doesn't contain JSON.
        }

        switch (response.status) {
            case 400:
                throw new ApiError(message || "Invalid request", 400);

            case 401:
                throw new ApiError(
                    message || "You are not authenticated.", 401
                );

            case 403:
                throw new ApiError(
                    message || "You are not authorized to perform this action.", 403
                );

            case 404:
                throw new ApiError(
                    message || "The requested resource was not found.", 404
                );
                
            case 409:
                throw new ApiError(
                    message || "A resource with these details already exists.",
                    409
                );

            default:
                throw new ApiError(
                    response.status >= 500
                        ? "Server error. Please try again later."
                        : message || "Something went wrong.",
                    response.status
                );
        }
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function login(credentials) {
    return request(`${AUTH_BASE}/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export function register(user) {
    return request(`{AUTH_BASE}/register`, {
        method: "POST",
        body: JSON.stringify(user),
    });
}

export function getStudents() {
    return request(`${API_BASE}/students`);
}

export function getStudent(id) {
    return request(`${API_BASE}/students/${id}`);
}

export function createStudent(student) {
    return request(`${API_BASE}/students`, {
        method: "POST",
        body: JSON.stringify(student),
    });
}

export function updateStudent(id, student) {
    return request(`${API_BASE}/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(student),
    });
}

export function deleteStudent(id) {
    return request(`${API_BASE}/students/${id}`, {
        method: "DELETE",
    });
}

export function getTeachers() {
    return request(`${API_BASE}/teachers`);
}

export function getTeacher(id) {
    return request(`${API_BASE}/teachers/${id}`);
}

export function createTeacher(id) {
    return request(`${API_BASE}/teachers`, {
        method: "POST",
        body: JSON.stringify(teacher,)
    });
}

export function updateTeacher(id, teacher) {
    return request(`${API_BASE}/teachers/${id}`, {
        method: "PUT",
        body: JSON.stringify(teacher),
    });
}

export function deleteTeacher(id) {
    return request(`${API_BASE}/teachers/${id}`, {
        method: "DELETE",
    });
}

// Department API

export function getDepartments() {
    return request(`${API_BASE}/departments`);
}

export function getDepartment(id) {
    return request(`${API_BASE}/departments/${id}`);
}

export function createDepartment(department) {
    return request(`${API_BASE}/departments`, {
        method: "POST",
        body: JSON.stringify(department),
    });
}

export function updateDepartment(id, department) {
    return request(`${API_BASE}/departments/${id}`, {
        method: "PUT",
        body: JSON.stringify(department),
    });
}

export function deleteDepartment(id) {
    return request(`${API_BASE}/departments/${id}`, {
        method: "DELETE",
    });
}


// Subjects API

export function getSubjects() {
    return request(`${API_BASE}/subjects`);
}

export function getSubject(id) {
    return request(`${API_BASE}/subjects/${id}`);
}

export function createSubject(subject) {
    return request(`${API_BASE}/subjects`, {
        method: "POST",
        body: JSON.stringify(subject),
    });
}

export function deleteSubject(id) {
    return request(`${API_BASE}/subjects/${id}`, {
        method: "DELETE",
    });
}

// Exams API

export function getExams() {
    return request(`${API_BASE}/exams`);
}

export function getExam(id) {
    return request(`${API_BASE}/exams/${id}`);
}

export function createExam(exam) {
    return request(`${API_BASE}/exams`, {
        method: "POST",
        body: JSON.stringify(exam),
    });
}

// Enrollment API

export function getEnrollments() {
    return request(`${API_BASE}/enrollments`);
}

export function getEnrollment(id) {
    return request(`${API_BASE}/enrollments/${id}`);
}

export function createEnrollment(enrollment) {
    return request(`${API_BASE}/enrollments`, {
        method: "POST",
        body: JSON.stringify(enrollment),
    });
}

// Events API

export function getEvents() {
    return request(`${API_BASE}/events`);
}

export function getEvent(id) {
    return request(`${API_BASE}/events/${id}`);
}

export function createEvent(event) {
    return request(`${API_BASE}/events`, {
        method: "POST",
        body: JSON.stringify(event),
    });
}

export function deleteEvent(id) {
    return request(`${API_BASE}/events/${id}`, {
        method: "DELETE",
    });
}

// Attendance API

export function getAttendances() {
    return request(`${API_BASE}/attendance`);
}

export function getAttendance(id) {
    return request(`${API_BASE}/attendance/${id}`);
}

export function createAttendance(attendance) {
    return request(`${API_BASE}/attendance/`, {
        method: "POST",
        body: JSON.stringify(attendance),
    });
}

export function deleteAttendance(id) {
    return request(`${API_BASE}/attendance/${id}`, {
        method: "DELETE",
    });
}
