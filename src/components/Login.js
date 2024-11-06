import React, { useState } from "react";
import './Login.css';

function Login({ email, setEmail, password, setPassword, onLogin, onShowSignup }) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
    
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            onLogin();
        } catch (error) {
            setError(error.message);
            console.error('Login Error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an account? <span onClick={onShowSignup} className="signup-link">Sign Up</span>
            </p>
        </div>
    );
}

export default Login;
