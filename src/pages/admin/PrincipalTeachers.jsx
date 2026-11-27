
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getAllTeachers() {
    const response = await fetch(`${API_URL}/teachers`, {
        method: "GET",
        headers: getHeaders(),
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(text || "Failed to load teachers.");
    }

    return text ? JSON.parse(text) : [];
}

export async function registerTeacher(teacherData, departmentId) {
    const response = await fetch(
        `${API_URL}/api/teachers?departmentId=${encodeURIComponent(departmentId)}`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(teacherData),
        }
    );

    const text = await response.text();

    if (!response.ok) {
        throw new Error(text || "Failed to register teacher.");
    }

    return text ? JSON.parse(text) : null;
}
