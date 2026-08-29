import axios from "axios"

// Configure API client. Use VITE_API_URL environment variable (set in .env file) for flexibility.
// Fallback to localhost development server if not provided.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const api = axios.create({
    baseURL,
    // Enable sending cookies for session authentication when the backend sets them.
    withCredentials: true,
})

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        return response.data
    } catch (err) {
        console.log(err)
        throw err // 👈 RE-THROW ERROR
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        })
        return response.data
    } catch (err) {
        console.log(err)
        throw err // 👈 RE-THROW ERROR
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout")
        return response.data
    } catch (err) {
        console.log(err)
        throw err // 👈 RE-THROW ERROR
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data
    } catch (err) {
        console.log(err)
        throw err // 👈 RE-THROW ERROR
    }
}