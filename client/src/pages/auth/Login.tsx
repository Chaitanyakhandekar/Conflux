import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type LoginFormType = {
    email: string;
    password: string;
};

type LoginErrorType = Partial<LoginFormType>;

const Login = () => {
    const { login, loading, errorType, setErrorType } = useAuth();

    const [formData, setFormData] =
        useState<LoginFormType>({
            email: "",
            password: "",
        });

    const [errors, setErrors] =
        useState<LoginErrorType>({});
    const navigate = useNavigate()


    const validateForm = () => {
        const newErrors: LoginErrorType = {};

        if (!formData.email.trim()) {
            newErrors.email =
                "Email or username is required";
        }

        if (!formData.password) {
            newErrors.password =
                "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (
            errors[e.target.name as keyof LoginErrorType]
        ) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!validateForm()) return;

        await login(formData);
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white grid lg:grid-cols-2">

            {/* LEFT PANEL */}

            <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 relative overflow-hidden">

                <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full top-20 -left-20" />

                <div>
                    <h2 className="text-2xl font-bold tracking-wide">
                        Conflux
                    </h2>
                </div>

                <div className="max-w-xl z-10">
                    <h1 className="text-5xl font-bold leading-tight">
                        Your conversations never stop.
                    </h1>

                    <p className="mt-6 text-slate-400 text-lg leading-8">
                        Reconnect with your communities,
                        jump back into conversations,
                        and collaborate instantly with
                        the people who matter most.
                    </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
                    <p className="text-slate-300 leading-7">
                        “Conflux keeps our remote team
                        connected in real time across
                        every project and discussion.”
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                        — Product Team at Nova Labs
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL */}

            <div className="flex items-center justify-center px-6 py-10">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-md"
                >

                    <div className="text-right text-sm text-slate-400 mb-6">
                        New to Conflux?{" "}
                        <span
                            onClick={() => {
                                navigate("/register")
                            }}
                            className="text-purple-400 cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold">
                        Welcome Back
                    </h2>

                    <p className="text-slate-400 mt-2 mb-8">
                        Continue where your community left off.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* EMAIL OR USERNAME */}

                        <div>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email or Username"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />

                        </div>

                        {/* PASSWORD */}

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />

                            {errorType === "INVALID_CREDENTIALS" || errorType === "NOT_FOUND" && (
                                <p className="text-red-400 text-sm mt-1">
                                    invalid email or password.
                                </p>
                            )}
                        </div>

                        {/* FORGOT PASSWORD */}

                        <div className="text-right">
                            <button
                                type="button"
                                className="text-sm text-purple-400 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* BUTTON */}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 font-medium disabled:opacity-60"
                        >
                            {loading
                                ? "Signing In..."
                                : "Sign In →"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;