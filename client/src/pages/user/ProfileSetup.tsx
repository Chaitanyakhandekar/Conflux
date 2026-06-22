import { useState } from "react";
import { motion } from "framer-motion";

type ProfileFormType = {
    fullName: string;
    bio: string;
    avatar: File | null;
};

const ProfileSetup = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] =
        useState<ProfileFormType>({
            fullName: "",
            bio: "",
            avatar: null,
        });

    const [preview, setPreview] =
        useState<string>("");

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            avatar: file,
        }));

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setLoading(true);

        /*
          call api here
    
          await updateProfile(formData)
        */

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white grid lg:grid-cols-2">

            {/* LEFT PANEL */}

            <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10 relative overflow-hidden">

                <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full top-20 -left-20" />

                <div>
                    <h2 className="text-2xl font-bold">
                        Conflux
                    </h2>
                </div>

                <div className="max-w-xl z-10">
                    <h1 className="text-5xl font-bold leading-tight">
                        Build your identity inside your community.
                    </h1>

                    <p className="mt-6 text-slate-400 text-lg leading-8">
                        Personalize your profile so people know
                        who they're collaborating with across
                        servers, channels and communities.
                    </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-xl">
                    <p className="text-slate-300 leading-7">
                        “A great community starts with identity,
                        connection and trust.”
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                        — Conflux Experience Team
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
                        <div className="h-1 flex-1 rounded bg-purple-500"></div>
                    </div>

                    <h2 className="text-3xl font-bold">
                        Complete Your Profile
                    </h2>

                    <p className="text-slate-400 mt-2 mb-8">
                        Add a few details before entering Conflux.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* AVATAR */}

                        <div className="flex flex-col items-center">

                            <label className="cursor-pointer">

                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="avatar"
                                        className="w-24 h-24 rounded-full object-cover border border-purple-500"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400">
                                        Upload
                                    </div>
                                )}

                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </label>

                            <p className="text-xs text-slate-500 mt-3">
                                Upload profile picture
                            </p>
                        </div>

                        {/* DISPLAY NAME */}

                        <div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Display Name"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                            />
                        </div>

                        {/* BIO */}

                        <div>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Write a short bio (optional)"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none resize-none focus:border-purple-500 transition"
                            />
                        </div>

                        {/* BUTTON */}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-xl py-3 font-medium disabled:opacity-60"
                        >
                            {loading
                                ? "Saving..."
                                : "Enter Conflux →"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfileSetup;