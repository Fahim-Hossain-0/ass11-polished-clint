import React, { useContext, useState } from 'react';
import { Link, Links, useLocation, useNavigate } from 'react-router'; // ✅ Use react-router-dom
// import { AuthContext } from '../Context/AuthContext';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { signInWithPopup, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from '../../Context/AuthContext';
import { auth } from '../../firebase/auth.config';
// import { auth } from './auth.config';

// import Swal from 'sweetalert2';


const Register = () => {
    const { creatUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        creatUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log("User created:", user);

                // ✅ Update displayName and photoURL
                updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                        // console.log("Profile updated successfully");

                        Swal.fire({
                            icon: 'success',
                            title: 'Account created!',
                            text: 'Welcome to the app.',
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        navigate(`${location.state ? location.state : "/"}`)


                    })
                    .catch((error) => {
                        // console.error("Error updating profile:", error.message);
                    });

                form.reset();
            })
            .catch((error) => {
                // console.log(error.code, error.message);

                if (error.code === 'auth/email-already-in-use') {
                    setError("An account with this email already exists.");
                } else if (error.code === 'auth/weak-password') {
                    setError("Password is too weak.");
                } else {
                    setError(error.message);
                }
            });
    };

    // const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Signed in user info
                const user = result.user;

                Swal.fire({
                    icon: 'success',
                    title: 'Logged in!',
                    text: `Welcome back, ${user.displayName || 'User'}`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                // console.error("Google login error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: error.message,
                });
            });
    };


    return (
        <div className="py-22 flex items-center justify-center bg-gray-100 px-4 mt-6">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
                <input type="url" name="photoURL" placeholder="Profile Photo URL" className="input input-bordered w-full" required />
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        placeholder="Password"
                        className="input input-bordered w-full pr-10"
                        minLength="6"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be at least 6 characters, including a number, a lowercase and an uppercase letter"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                </div>

                <button type="submit" className="btn btn-primary w-full">Register</button>

                <div className="text-center">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link>
                </div>

                <div className="divider">OR</div>

                <button onClick={handleGoogleLogin} className="w-full text-lg btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Login with Google
                </button>

                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
