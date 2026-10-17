import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error('Please fill in all fields')
            return
        }

        try {
            await handleLogin({ email, password })
            toast.success('Welcome back! 👋')
            navigate('/')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Login failed. Please try again.')
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <aside className="auth-illustration">
                    <div className="auth-badge">Smart interview prep</div>
                    <h2>Resume-driven career growth</h2>
                    <p>
                        Generate a tailored interview strategy, improve your confidence, and get clear next steps.
                    </p>
                </aside>

                <section className="auth-content">
                    <div className="form-header">
                        <p className="eyebrow">Welcome back</p>
                        <h1>Login</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="button primary-button" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>
                </section>
            </div>
        </main>
    )
}

export default Login