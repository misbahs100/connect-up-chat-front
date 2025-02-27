import React, { useEffect, useState } from 'react';
import { BiSolidHide, BiShow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../redux/authReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CustomInput from "../components/CommonComponents/CustomInput"
import CustomPasswordInput from '../components/CommonComponents/CustomPasswordInput';
import logo from "../assets/logo1.png"

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sign_up_processing = useSelector((state) => state.authReducer.sign_up_processing);
    const sign_up_message = useSelector((state) => state.authReducer.sign_up_message);
    const sign_up_success = useSelector((state) => state.authReducer.sign_up_success);
    const sign_up_failed = useSelector((state) => state.authReducer.sign_up_failed);
    const sign_in_success = useSelector((state) => state.authReducer.sign_in_success);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    //  handel input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //  handel user input submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or validation here

        const user = {
            name: formData.name.trim(),
            password: formData.password.trim(),
            email: formData.email.trim(),
        };

        if (
            user.password.length > 30 ||
            user.email.length > 40 ||
            user.name.length > 30 ||
            formData.confirmPassword.trim().length > 30
        ) {
            toast.error('Maximum input length exceeded', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else if (user.password !== formData.confirmPassword.trim()) {
            toast.error('Passwords do not match', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else if (user.password.length < 7) {
            toast.error('Password must be at least 8 characters long', { position: toast.POSITION.BOTTOM_LEFT });
            return;
        } else {
            dispatch(createAccount(user));
        }
    };

    //  set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //  useEffect
    useEffect(() => {

        //  if user already login
        if (sign_in_success) {
            navigate('/');
        }

        //  sign up fail
        if (!sign_up_processing && sign_up_failed && !sign_up_success) {
            toast.error(sign_up_message, { position: toast.POSITION.BOTTOM_LEFT });
        }

        // sign up success
        if (!sign_up_processing && !sign_up_failed && sign_up_success) {
            toast.success('Account Successfully Created.', { position: toast.POSITION.BOTTOM_LEFT });

            setTimeout(() => {
                navigate('/signin');
            }, 1000);
        }
    }, [sign_up_processing, sign_up_success, sign_up_failed, sign_in_success]);

    return (
        <section className="bg-primary-200 dark:bg-primary-900 min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8">

                <div className="w-full bg-primary-50 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-between">
                            <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-white">
                                Sign up.
                            </h1>
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <CustomInput
                                label="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                name="name"
                                placeholder="xyz"
                                required
                            />
                            <CustomInput
                                label="Username/ Handle"
                                name="username"
                                placeholder="@user"
                                required
                            />
                            <CustomInput
                                label="Your email"
                                value={formData.email}
                                type="email"
                                onChange={handleChange}
                                name="email"
                                placeholder="name@domain.com"
                                required
                            />
                            <CustomPasswordInput
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                placeholder="will be encrypted"
                                required
                            />
                            <CustomPasswordInput
                                label="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                                placeholder="retype the password"
                                required
                            />
                            <button
                                type="submit"
                                disabled={sign_up_processing}
                                className={`w-full text-white bg-primary-700 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${sign_up_processing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {sign_up_processing ? (
                                    <div className="flex items-center justify-center">
                                        <span className="mr-2">Please wait</span>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>
                            <p className="text-sm font-semibold text-primary-500 dark:text-primary-400">
                                Already have an account?{' '}
                                <span
                                    onClick={() => navigate('/signin')}
                                    className="cursor-pointer font-bold ml-2 text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign in
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Side - Image and Text */}
            <div className="hidden md:flex w-1/2 items-center justify-center bg-slate-200">
                <div className="text-center text-white px-6">
                    <img src={logo} alt="illustration" className="max-w-full h-auto mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-primary-700">Welcome to Connect Up Chat!</h2>
                    <p className="mt-4 text-lg text-primary-700">
                        Join us today and stay connected with the world. Enjoy seamless messaging and collaboration.
                    </p>
                </div>
            </div>
        </section>

    );
};

export default Signup;
