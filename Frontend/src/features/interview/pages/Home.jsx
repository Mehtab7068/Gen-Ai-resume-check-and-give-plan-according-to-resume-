import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFileName(e.target.files[0].name)
            setSelfDescription("") // Clear description if file is uploaded
        }
    }

    const clearFile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (resumeInputRef.current) resumeInputRef.current.value = "";
        setSelectedFileName("");
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files[0]
        
        // 1. Core target job validation
        if (!jobDescription.trim()) {
            alert("Please paste the target job description.")
            return
        }

        // 2. Either/Or validation logic
        if (!resumeFile && !selfDescription.trim()) {
            alert("Please provide either a Resume upload OR a Self Description to proceed.")
            return
        }

        try {
            // Pass whatever is active; the hooks/backend will handle the filled parameters
            const data = await generateReport({ 
                jobDescription, 
                selfDescription: resumeFile ? "" : selfDescription, 
                resumeFile: resumeFile || null 
            })
            
            if (data && data._id) {
                navigate(`/interview/${data._id}`)
            } else if (data && data.interviewReport && data.interviewReport._id) {
                navigate(`/interview/${data.interviewReport._id}`)
            }
        } catch (error) {
            console.error("Failed to generate interview strategy:", error)
        }
    }

    // Determine states based on user choice
    const isFileActive = !!selectedFileName;
    const isTextActive = selfDescription.trim().length > 0;

    return (
        <div className='home-page'>
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            value={jobDescription}
                            className='panel__textarea'
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile (Enforced Exclusive Option) */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                            <span className='badge badge--required'>Choose One Option</span>
                        </div>

                        {/* Option A: Upload Resume */}
                        <div className={`upload-section ${isTextActive ? 'disabled-zone' : ''}`} style={{ opacity: isTextActive ? 0.4 : 1, pointerEvents: isTextActive ? 'none' : 'auto' }}>
                            <label className='section-label'>
                                Option A: Upload Resume
                            </label>
                            <label className={`dropzone ${isFileActive ? 'dropzone--has-file' : ''}`} htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    {isFileActive ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    )}
                                </span>
                                <p className='dropzone__title' style={{ color: isFileActive ? '#22c55e' : 'inherit', fontWeight: isFileActive ? '600' : 'normal' }}>
                                    {isFileActive ? selectedFileName : "Click to upload or drag & drop"}
                                </p>
                                <input 
                                    ref={resumeInputRef} 
                                    onChange={handleFileChange} 
                                    hidden 
                                    type='file' 
                                    id='resume' 
                                    name='resume' 
                                    accept='.pdf,.docx'
                                    disabled={isTextActive}
                                />
                            </label>
                            {isFileActive && (
                                <button onClick={clearFile} style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>
                                    ✕ Clear file selection to type description instead
                                </button>
                            )}
                        </div>

                        {/* OR Separation Graphic */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Option B: Quick Self-Description */}
                        <div className='self-description' style={{ opacity: isFileActive ? 0.4 : 1, pointerEvents: isFileActive ? 'none' : 'auto' }}>
                            <label className='section-label' htmlFor='selfDescription'>Option B: Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id='selfDescription'
                                name='selfDescription'
                                value={selfDescription}
                                disabled={isFileActive}
                                className='panel__textarea panel__textarea--short'
                                placeholder={isFileActive ? "Locked: Resume file is attached" : "Briefly describe your experience, tech stack, and background instead..."}
                            />
                        </div>

                        {/* Dynamic Requirement Help Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>
                                {isFileActive && <span>Resume connected! Option B is disabled. Click "Clear file selection" to swap options.</span>}
                                {isTextActive && <span>Description typing detected! Option A is locked out until text input is cleared.</span>}
                                {!isFileActive && !isTextActive && <span>Fill out Option A <strong>OR</strong> Option B to unlock the processing layer.</span>}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button onClick={handleGenerateReport} className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports && reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home