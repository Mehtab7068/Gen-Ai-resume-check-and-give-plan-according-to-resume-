import axios from "axios";

// Use the same configurable base URL as the auth API.
// VITE_API_URL is defined in the frontend .env file; fallback to localhost for dev.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const api = axios.create({
    baseURL,
    withCredentials: true,
})


/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()

    // Always append the target job description
    formData.append("jobDescription", jobDescription)

    // Conditionally append the resume only if a valid file exists
    if (resumeFile && resumeFile instanceof File) {
        formData.append("resume", resumeFile)
    }

    // Conditionally append selfDescription only if there's actual text
    if (selfDescription && selfDescription.trim() !== "") {
        formData.append("selfDescription", selfDescription)
    }

    const response = await api.post("/api/interview/", formData, {
        headers: {
            // Let the browser handle boundary flags automatically 
            // by removing the manual content-type header context
        }
    })

    return response.data
}


/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")

    return response.data
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    // 1. Changed from api.post to api.get to match backend tracking params
    // 2. Kept responseType: "blob" so Axios leaves the binary data intact
    const response = await api.get(`/api/interview/resume/pdf/${interviewReportId}`, {
        responseType: "blob"
    })

    return response.data
}