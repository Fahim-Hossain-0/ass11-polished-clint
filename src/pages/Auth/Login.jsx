import React, { useContext, useState, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
// import { AuthContext } from '../Context/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from './auth.config';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import { auth } from '../../firebase/auth.config';
const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate()
      const location = useLocation()
    //   const emailRef = useRef()

    const [errorMessage, setErrorMassage] = useState('')
    const [successfullyMsg, setSuccessfullyMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const provider = new GoogleAuthProvider();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setErrorMassage('')
        setSuccessfullyMsg('')


        loginUser(email, password)
        .then(result => {
            setSuccessfullyMsg("successfully logged in")

            navigate(`${location.state ? location.state : "/"}`)


        }).catch(error => {

            setErrorMassage(error.message);
        })



        form.reset();
    };

   

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                // const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                navigate(`${location.state ? location.state : "/"}`)
            }).catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <div className="py-22 flex items-center justify-center bg-gray-100 px-4 mt-6">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4 ">
                <h2 className="text-2xl font-bold text-center">Login</h2>

                <input
                    type="email"
                    name="email"
                    // ref={emailRef}
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                />

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
                        tabIndex={-1} // prevents focus highlight on button
                    >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>

                <div className="text-center">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </div>

                <div className="divider">OR</div>

                <button onClick={handleGoogleLogin} className="w-full text-lg btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>

                {successfullyMsg && <p className='text-green-800 mt-2'>{successfullyMsg}</p>}
                {errorMessage && <p className='text-red-600'>{errorMessage}</p>}

            </form>
        </div>
    );
};

export default Login;
