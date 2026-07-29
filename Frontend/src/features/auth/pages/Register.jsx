import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import Loader from "../components/loader"

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

    if (loading) {
        return (<main> <Loader className='loader' message="Creating your account..." /></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" 
                            id="username" 
                            name='username' 
                            placeholder='Enter username' 
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
                            placeholder='Enter email address' 
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
                            placeholder='Enter password' 
                        />
                    </div>

                    <button type="submit" className='button primary-button'>Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register