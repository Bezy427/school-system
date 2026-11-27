
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

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(responseText || "Failed to load teachers.");
    }

    try {
        return JSON.parse(responseText);
    } catch {
        throw new Error("The server returned invalid teacher data.");
    }
}
