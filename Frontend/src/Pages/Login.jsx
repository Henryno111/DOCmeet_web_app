import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import RotateLoader from "react-spinners/RotateLoader";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import ForgotPassword from "./ForgotPassword";

const Login = () =>
{

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () =>
    {
        setIsModalOpen(!isModalOpen);
    };

    const [showOverlay, setShowOverlay] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const { dispatch } = useContext(authContext);

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .required("Please enter your email!"),
        password: Yup.string().required("Please enter your password!").min(6)
    });

    const handleForgotPassword = () =>
    {
        setIsModalOpen(!isModalOpen);
        setShowOverlay(true)
    }

    const handleCloseForgotPasswordForm = () =>
        {
            setIsModalOpen(!isModalOpen);
            setShowOverlay(false)
        }

    const handleInputChange = e =>
    {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async e =>
    {

        e.preventDefault()
        setLoading(true);

        try
        {
            await schema.validate(formData, { abortEarly: false });

            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json();

            if (res.ok)
            {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: result.user,
                        token: result.accessToken,
                    }
                })
                setLoading(false);

                toast.success("Log in successful")
                navigate("/");
            }
            else
            {
                // throw new Error(result.Error)
                toast.error(result.message, { className: "toast-message" });
                setLoading(false);
                console.log(result);
            }

        }
        catch (err)
        {
            if (err instanceof Yup.ValidationError)
            {
                const errors = {};
                err.inner.forEach(e =>
                {
                    errors[e.path] = e.message;
                });
                setFormErrors(errors);
            }
            else
            {
                // toast.error(err.data.message);
                console.log(err);
            }
            setLoading(false)
        }

    }

    return (
        <section className="px-5 lg:px-0">

            <div className=" max-w-[570px] mx-auto rounded-lg dark:border  dark:border-[#061d39] shadow-lg md:p-10 px-8 py-6">
                <h3 className="text-headingColor dark:text-white text-[22px] text-center leading-9 font-bold mb-8">
                    Hello!
                    <span className="text-primaryColor px-3">Welcome</span>
                    Back
                </h3>

                <form className="py-4 md:py-0" onSubmit={submitHandler}>
                    <div className="mb-5">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className=" w-full p-3 border-b border-solid rounded-lg border-[#0066ff61] 
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor dark:text-white placeholder:text-textColor"
                        />
                    </div>
                    {formErrors && formErrors.email && (
                        <span className="text-red-500 pt-2 block">{formErrors.email}</span>
                    )}

                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className=" w-full  p-3 border-b border-solid border-[#0066ff61]
                    rounded-lg dark:text-white
                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                    text-headingColor placeholder:text-textColor"
                        />
                    </div>
                    {formErrors && formErrors.password && (
                        <span className="text-red-500 pt-2 block">{formErrors.password}</span>
                    )}

                    <div className="mt-7">
                        <button
                            type="submit"
                            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        >
                            {loading ? <RotateLoader size={35} color="#ffffff" /> : "Login"}
                        </button>
                    </div>

                    <div className="mt-5 flex flex-wrap justify-between text-textColor gap-y-3 dark:text-white">
                        <div>
                            <span>Don&apos;t have an account?</span>
                            <Link
                                to="/register"
                                className="text-primaryColor text-sm dark:text-teal-500 font-medium ml-3"
                            >
                                Register
                            </Link>
                        </div>
                        <button
                            onClick={handleForgotPassword}
                            className="text-primaryColor bg-transparent border-none text-sm dark:text-teal-500 font-medium ml-3"
                        >
                            Reset Password
                        </button>

                    </div>
                </form>
            </div>

            {showOverlay && (<div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-2 flex justify-center items-center `}></div>)}
            {isModalOpen && (< div className="p-4 md:p-5 text-center">
                <ForgotPassword onClick={handleCloseForgotPasswordForm} />
            </div>
            )
            }

        </section >
    )
};

export default Login;