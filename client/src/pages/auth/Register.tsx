import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

type FormDataType = {
    fullName: string;
    username: string;
    email: string;
    password: string;
};

type FormErrorsType = Partial<FormDataType>;

const Register = () => {
    const { register, loading, errorType,
        setErrorType } = useAuth();

    const [formData, setFormData] = useState<FormDataType>({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrorsType>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrorsType = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (formData.fullName.length < 3) {
            newErrors.fullName = "Minimum 3 characters required";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (/\s/.test(formData.username)) {
            newErrors.username = "Username cannot contain spaces";
        }

        if (formData.username.length < 3) {
            newErrors.username = "Minimum 3 characters required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password required";
        }

        if (formData.password.length < 8) {
            newErrors.password = "Minimum 8 characters required";
        }

        if (!/[!@#$%^&*]/.test(formData.password)) {
            newErrors.password = "Must contain special character";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (errors[e.target.name as keyof FormErrorsType]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    const onSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;


        await register(formData);
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
                        Where communities connect in real time.
                    </h1>

                    <p className="mt-6 text-slate-400 text-lg leading-8">
                        Create servers, chat instantly, jump into voice
                        channels, and collaborate seamlessly with your
                        people in one unified space.
                    </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
                    <p className="text-slate-300 leading-7">
                        “Conflux transformed how our gaming community
                        stays connected. Real-time chat and voice in one
                        place.”
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                        — Community Manager at NovaGuild
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

                    {/* PROGRESS */}

                    <div className="flex gap-2 mb-8">
                        <div className="h-1 flex-1 rounded bg-purple-500"></div>
                        <div className="h-1 flex-1 rounded bg-white/10"></div>
                        <div className="h-1 flex-1 rounded bg-white/10"></div>
                    </div>

                    <div className="text-right text-sm text-slate-400 mb-6">
                        Already have an account?{" "}
                        <span className="text-purple-400 cursor-pointer hover:underline">
                            Sign In
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold">
                        Create Account
                    </h2>

                    <p className="text-slate-400 mt-2 mb-8">
                        Start building your community on Conflux.
                    </p>

                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        {/* FULL NAME */}

                        <div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={onInputChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />

                            {errors.fullName && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* USERNAME */}

                        <div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={onInputChange}
                                placeholder="Username"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />

                            {
                                errorType === "USERNAME_ALREADY_EXISTS" && <p className="text-red-400 text-sm p-2">This username is taken</p>
                            }
                        </div>

                        {/* EMAIL */}

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onInputChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />

                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}

                            {
                                errorType === "EMAIL_ALREADY_EXISTS" && <p className="text-red-400 text-sm p-2">This email is taken</p>
                            }
                        </div>

                        {/* PASSWORD */}

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={onInputChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />

                            <p className="text-xs text-slate-500 mt-2">
                                Must be at least 8 characters with one special
                                character.
                            </p>

                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* BUTTON */}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 font-medium mt-2 disabled:opacity-60"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Continue Setup →"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;