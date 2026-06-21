import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/auth-store";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
    const { verifyOtp, resendOtp, otpLoading, resendLoading } =
        useAuth();

    const { pendingVerificationEmail } = useAuthStore();

    const [otp, setOtp] = useState<string[]>(
        new Array(OTP_LENGTH).fill("")
    );

    const [timer, setTimer] = useState<number>(30);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    /*
        Countdown Timer
    */

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    /*
        OTP Change
    */

    const handleChange = (
        value: string,
        index: number
    ) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    /*
        Backspace Navigation
    */

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    /*
        Paste OTP
    */

    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .slice(0, OTP_LENGTH);

        if (!/^\d+$/.test(pasted)) return;

        const newOtp = pasted.split("");

        while (newOtp.length < OTP_LENGTH) {
            newOtp.push("");
        }

        setOtp(newOtp);

        inputRefs.current[OTP_LENGTH - 1]?.focus();
    };

    /*
        Verify Submit
    */

    const handleVerify = async () => {
        const otpCode = otp.join("");

        if (otpCode.length !== OTP_LENGTH) return;

        await verifyOtp({
            email: pendingVerificationEmail!,
            otp: otpCode,
        });
    };

    /*
        Resend OTP
    */

    const handleResend = async () => {
        if (timer > 0) return;

        await resendOtp(pendingVerificationEmail!);

        setTimer(30);
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
                        Secure your community identity.
                    </h1>

                    <p className="mt-6 text-slate-400 text-lg leading-8">
                        Verify your email to activate your Conflux
                        account and start connecting instantly.
                    </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
                    <p className="text-slate-300 leading-7">
                        “Fast onboarding, instant verification,
                        seamless communication.”
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                        — Conflux Security Layer
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
                        <div className="h-1 flex-1 rounded bg-purple-500"></div>
                        <div className="h-1 flex-1 rounded bg-white/10"></div>
                    </div>

                    <h2 className="text-3xl font-bold">
                        Verify Your Email
                    </h2>

                    <p className="text-slate-400 mt-2">
                        We’ve sent a verification code to:
                    </p>

                    <p className="text-purple-400 mt-2 mb-10">
                        {pendingVerificationEmail}
                    </p>

                    {/* OTP BOXES */}

                    <div className="flex justify-between gap-3 mb-8">

                        {otp.map((digit, index) => (
                            <motion.input
                                whileFocus={{ scale: 1.05 }}
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                value={digit}
                                maxLength={1}
                                onPaste={handlePaste}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 text-center text-xl outline-none focus:border-purple-500 transition"
                            />
                        ))}
                    </div>

                    {/* VERIFY BUTTON */}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={otpLoading}
                        onClick={handleVerify}
                        className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 font-medium disabled:opacity-60"
                    >
                        {otpLoading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </motion.button>

                    {/* RESEND */}

                    <div className="mt-6 text-center">

                        {timer > 0 ? (
                            <p className="text-slate-400 text-sm">
                                Resend code in {timer}s
                            </p>
                        ) : (
                            <button
                                disabled={resendLoading}
                                onClick={handleResend}
                                className="text-purple-400 hover:underline text-sm"
                            >
                                {resendLoading
                                    ? "Sending..."
                                    : "Resend OTP"}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VerifyOtp;