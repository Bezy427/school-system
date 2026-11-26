const PI_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getMyStudentProfile() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${PI_URL}/students/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })


    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Your session has expired. Please log in.");
    }

    throw new Error("Failed to fetch student profile. Please try again later.");
    }

    return response.json();
}