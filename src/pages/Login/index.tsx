import Logo from '../../components/Logo/Logo'
import './Login.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUpRedirect = () => {
        navigate('/sign-up');
    };

    const location = useLocation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data?.error || 'Login failed');
                return;
            }

            // store token and user
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            // Redirect admins to admin panel otherwise redirect back to dashboard
            const isAdmin = data.user && data.user.type === 'admin'
            if (isAdmin) {
                navigate('/admin');
                return;
            }

            const fromPath = (location.state as any)?.from?.pathname
            if (fromPath) {
                navigate(fromPath)
            } else {
                navigate('/dashboard')
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error during login');
        }
    };

    return (
        <div className="login-container">
            <div className="left-column">
                <div className="logo-container">
                    <Logo />
                </div>
                <div className="welcome-content">
                    <h1 className="welcome-heading">
                        <span className="hey-there">Hey There!</span>
                        <span className="welcome-back">Welcome Back.</span>
                    </h1>
                    <p className="welcome-subtext">
                        Get back to tracking, monitoring and be proud of your progress!
                    </p>
                    {/*all icons here are from this link https://icon-sets.iconify.design/material-symbols/page-3.html?icon-filter=pers  license is apache 2 so we are good*/}
                    <div className="feature-icons">
                        <div className="icon-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5.675-10l1.3 1.3q.3.3.7.3t.7-.3l3.675-3.7q.275-.275.275-.7t-.275-.7q-.3-.3-.712-.287t-.688.287l-2.975 2.975l-1.3-1.3q-.3-.3-.7-.3t-.7.3L6.95 11.9q-.275.275-.275.7t.275.7q.3.3.713.287t.687-.287zm-3.95 5L5 17.725V19h.85l3-3zm3.95 0l-3 3H9.8l3-3zm3.725 0l-3 3h2.125l3-3zm3.75 0l-3 3h2.125L19 17.275V16z" /></svg>
                        </div>
                        <div className="icon-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m2.825 0h1.75q.75 0 1.3.5t.675 1.225l1.425 10q.125.9-.462 1.588T18 21H6q-.925 0-1.513-.687t-.462-1.588l1.425-10Q5.575 8 6.125 7.5t1.3-.5h1.75q-.075-.25-.125-.487T9 6q0-1.25.875-2.125T12 3t2.125.875T15 6q0 .275-.05.513T14.825 7" /></svg>
                        </div>
                        <div className="icon-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.35 17.6L16 15.925V15v.925zm5.3 0L18 15.925V15v.925zM2 9V4h20v7.5h-2V6H4v3zm0 11v-5h2v3h5.5v2zm10.5 3q-.625 0-1.062-.437T11 21.5v-3.675l1.325-3.525q.225-.575.738-.938T14.2 13H16v-2h2v2h1.8q.625 0 1.138.363t.737.937L23 17.825V21.5q0 .625-.437 1.063T21.5 23h-2q-.625 0-1.062-.437T18 21.5V20h2v1h1v-2.825L19.8 15H18v.925l1.65 1.675l-1.4 1.4L17 17.75L15.75 19l-1.4-1.4L16 15.925V15h-1.8L13 18.175V21h1v-1h2v1.5q0 .625-.437 1.063T14.5 23zM2 13v-2h3.6L7 13.775L10.35 7h1.275l2.25 4.525q-.525.05-.987.225t-.863.5l-1.025-2L7.625 17h-1.25l-2-4z" /></svg>
                        </div>
                        <div className="icon-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.4 21.9L12 20.5l3.55-3.55l-8.5-8.5L3.5 12l-1.4-1.4l1.4-1.45l-1.4-1.4l2.1-2.1L2.8 4.2l1.4-1.4l1.45 1.4l2.1-2.1l1.4 1.4l1.45-1.4L12 3.5L8.45 7.05l8.5 8.5L20.5 12l1.4 1.4l-1.4 1.45l1.4 1.4l-2.1 2.1l1.4 1.45l-1.4 1.4l-1.45-1.4l-2.1 2.1l-1.4-1.4z" /></svg>
                        </div>
                        <div className="icon-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11q.825 0 1.413-.587T14 9t-.587-1.412T12 7t-1.412.588T10 9t.588 1.413T12 11M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m5 3.2q1.25 0 2.125-.875T15 11V5H9v6q0 1.25.875 2.125T12 14m5-3.2q.9-.325 1.45-1.088T19 8V7h-2zm-5-1.3" /></svg>
                        </div>
                        <div className="icon-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 21v-5q-1.55-.125-3.037-.35T3 15l.5-2q2.075.575 4.2.788T12 14q2.15 0 4.275-.213T20.5 13l.5 2q-1.5.425-2.988.65T15 16v5zm3-8q-.85 0-1.425-.575T10 11q0-.825.575-1.412T12 9q.825 0 1.413.588T14 11q0 .85-.587 1.425T12 13m-7.5-3q-.65 0-1.075-.425T3 8.5q0-.625.425-1.062T4.5 7q.625 0 1.063.438T6 8.5q0 .65-.437 1.075T4.5 10m15 0q-.65 0-1.075-.425T18 8.5q0-.625.425-1.062T19.5 7q.625 0 1.063.438T21 8.5q0 .65-.437 1.075T19.5 10M7.25 6.25q-.65 0-1.075-.425T5.75 4.75q0-.625.425-1.062T7.25 3.25q.625 0 1.063.438T8.75 4.75q0 .65-.437 1.075T7.25 6.25m9.5 0q-.65 0-1.075-.425T15.25 4.75q0-.625.425-1.062t1.075-.438q.625 0 1.063.438t.437 1.062q0 .65-.437 1.075t-1.063.425M12 5q-.65 0-1.075-.425T10.5 3.5q0-.625.425-1.062T12 2q.625 0 1.063.438T13.5 3.5q0 .65-.437 1.075T12 5" /></svg>
                        </div>
                    </div>
                    <div className="signup-section">
                        <p className="signup-question">Don't have an account?</p>
                        <button className="signup-button" onClick={handleSignUpRedirect}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className="right-column">
                <div className="login-content">
                    <h1 className="login-heading">
                        <span className="login-title">Login</span>
                        <span className="to-account">To Your Account.</span>
                    </h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-icon">
                                {/* username icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* password icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3M10 16h4q.425 0 .713-.288T15 15v-3q0-.425-.288-.712T14 11v-1q0-.825-.587-1.412T12 8t-1.412.588T10 10v1q-.425 0-.712.288T9 12v3q0 .425.288.713T10 16m1-5v-1q0-.425.288-.712T12 9t.713.288T13 10v1z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="error-text">{error}</p>}

                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
