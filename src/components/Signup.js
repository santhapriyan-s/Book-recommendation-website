import React, { useState } from "react";
import './Signup.css'

function Signup({ onSignup, onBackToLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onSignup(); // Trigger parent component function on successful signup
            } else {
                setError(data.message || "Signup failed"); // Set error message
            }
        } catch (error) {
            setError("An error occurred during signup.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>} {/* Display error messages */}
            <form onSubmit={handleSignup}>
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
                <button type="submit">Sign Up</button>
            </form>
            <br />
            <button onClick={onBackToLogin}>Back to Login</button>
        </div>
    );
}

export default Signup;
