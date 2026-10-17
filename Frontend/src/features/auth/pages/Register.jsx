import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        try {
            await handleRegister({ username, email, password })
            toast.success('Account created successfully! 🎉')
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Registration failed. Please try again.')
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <aside className="auth-illustration">
                    <div className="auth-badge">Start strong</div>
                    <h2>Build your interview edge</h2>
                    <p>
                        Create your profile and unlock a smarter way to prepare for interviews with AI-driven insights.
                    </p>
                </aside>

                <section className="auth-content">
                    <div className="form-header">
                        <p className="eyebrow">Create account</p>
                        <h1>Register</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text"
                                id="username"
                                name='username'
                                placeholder='Choose a username'
                                autoComplete="username"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email"
                                id="email"
                                name='email'
                                placeholder='Enter your email'
                                autoComplete="email"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password"
                                id="password"
                                name='password'
                                placeholder='Create a password'
                                autoComplete="new-password"
                            />
                        </div>

                        <button type="submit" className='button primary-button' disabled={loading}>
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </p>
                </section>
            </div>
        </main>
    )
}

export default Register