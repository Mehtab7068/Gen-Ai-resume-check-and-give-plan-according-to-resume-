# AI-Powered Interview Preparation & Strategy Platform

A sophisticated full-stack MERN web application that leverages Generative AI (Google Gemini) to analyze job descriptions against a user's professional profile. The platform generates personalized, high-yield interview preparation plans, identifies critical skill gaps, and curates tailored technical and behavioral questions.

## 🚀 Live Demo
Check out the live application here: [Live Link](https://gen-ai-resume-check-and-give-plan-a.vercel.app/)

---

## ✨ Key Features

* **Secure Authentication Suite:** Full user registration and login flows to secure individual user data and persist custom interview strategies.
* **Dual-Input Evaluation Layer:** * Accepts raw target Job Descriptions (up to 5,000 characters).
    * Supports profile parsing via direct resume file uploads or quick technical self-descriptions.
* **Automated Match Score & Skill Gap Analysis:** Quantifies profile alignment with target roles using a circular progress visualization and lists targeted skill gaps (e.g., specific framework adjustments, state management, testing paradigms).
* **Dynamic Interview Question Generation:** * **Technical Questions:** Tailors deep-dive questions based directly on the user's stack and the target role's requirements (e.g., MERN architecture, CRUD operations, SQL vs NoSQL trade-offs).
    * **Behavioral Questions:** Curates situational questions to prepare users for core behavioral assessment criteria.
* **Personalized Roadmap:** Outputs an actionable, step-by-step strategy to bridge technical gaps and confidently clear the target interview.
* **Exportable Insights:** Includes quick actions like "Download Resume" or strategy summaries directly within the user dashboard.

---

## 🛠 Tech Stack

* **Frontend:** React.js, SCSS (Sassy CSS for modular, structured styling)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI Engine:** Google Gemini API (Generative AI)
* **Deployment:** Vercel

---



---

## 💻 Local Installation & Setup

Follow these steps to run the platform locally on your machine:

### Prerequisites
* Node.js installed
* MongoDB Atlas account or local database instance
* Google AI Studio API Key (Gemini API)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME
2. Setup Server Environment Variables:
  Create a .env file in your backend server directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_custom_jwt_secret

3. Install dependencies <br/>
    Install backend dependencies<br/>
    cd server && npm install<br/>
     Install frontend dependencies<br/>
    cd ../client && npm install<br/>   

5. Run the Application:<br/>
    From your server directory<br/>
    npm start
    From your client directory
    npm start
    

