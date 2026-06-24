import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const SendVerificationOtp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { resendOTP } = useAuth()

    const handleSendOtp = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        localStorage.setItem("email", email)
        await resendOTP(email)
        navigate("/verify-otp")
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white grid lg:grid-cols-2">

            {/* LEFT PANEL */}

            <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 relative overflow-hidden">

                {/* Background Blur */}

                <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full top-20 -left-20" />

                {/* Logo */}

                <div>
                    <h2 className="text-2xl font-bold tracking-wide">
                        Conflux
                    </h2>
                </div>

                {/* Hero Content */}

                <div className="max-w-xl z-10">
                    <h1 className="text-5xl font-bold leading-tight">
                        Secure account recovery starts here.
                    </h1>

                    <p className="mt-6 text-slate-400 text-lg leading-8">
                        Enter your registered email address and
                        we’ll send a secure verification code
                        to help you recover your account safely.
                    </p>
                </div>

                {/* Bottom Card */}

                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
                    <p className="text-slate-300 leading-7">
                        Fast. Secure. Encrypted.
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Built for communities that stay connected.
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

                    {/* Back Button */}

                    <button
                        onClick={() => navigate("/login")}
                        className="flex items-center gap-2 text-sm text-purple-400 hover:underline mb-8"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </button>

                    {/* Heading */}

                    <h2 className="text-3xl font-bold">
                        Verify Your Identity
                    </h2>

                    <p className="text-slate-400 mt-2 mb-8">
                        Enter your registered email address to
                        receive a verification code.
                    </p>

                    {/* Form */}

                    <form
                        onSubmit={handleSendOtp}
                        className="space-y-5"
                    >

                        {/* Email Input */}

                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your registered email"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />
                        </div>

                        {/* Button */}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading || email.trim() === ""}
                            className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 font-medium disabled:opacity-60"
                        >
                            {loading
                                ? "Sending..."
                                : "Send Verification Code →"}
                        </motion.button>

                        {/* Footer Text */}

                        <p className="text-center text-sm text-slate-500 mt-3">
                            We’ll send a 6-digit verification code
                            to your inbox.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default SendVerificationOtp;