
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getStudentLectures() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students/lectures`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Your session has expired. Please log in again.");
        }

        if (response.status === 404) {
            throw new Error("The subjects endpoint could not be found.");
        }

        throw new Error("Failed to load subjects.");
    }

    return response.json();
}



export async function createLecture(lectureData) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/principal/lectures`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lectureData),
    });

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(responseText || "Failed to schedule lecture.");
    }

    if (!responseText.trim()) {
        return null;
    }

    try {
        return JSON.parse(responseText);
    } catch {
        // The lecture may have been saved even if the response is malformed.
        return null;
    }
}



export async function getPrincipalLectures() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/principal/lectures`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(responseText || "Failed to load lectures.");
    }

    try {
        const data = JSON.parse(responseText);

        if (!Array.isArray(data)) {
            throw new Error("Expected a list of lectures.");
        }

        return data;
    } catch {
        throw new Error("The server returned invalid JSON for lectures.");
    }
}


