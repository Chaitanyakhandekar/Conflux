import { useState } from "react"
import Modal from "../ui/Modal"
import {
  User, Palette, Mic, Bell, Shield, Link, X,
} from "lucide-react"

const sections = [
  { id: "account", icon: User, label: "My Account" },
  { id: "appearance", icon: Palette, label: "Appearance" },
  { id: "voice", icon: Mic, label: "Voice & Video" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "privacy", icon: Shield, label: "Privacy" },
  { id: "connections", icon: Link, label: "Connected Apps" },
]

interface Props {
  open: boolean
  onClose: () => void
}

function SettingsModal({ open, onClose }: Props) {
  const [activeSection, setActiveSection] = useState("account")

  return (
    <Modal open={open} onClose={onClose} width="780px" className="p-0">
      <div className="flex h-[520px]">
        <div className="w-[240px] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col border-r border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Settings</h2>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto">
            {sections.map((s) => {
              const Icon = s.icon
              const active = activeSection === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm transition-colors ${
                    active
                      ? "bg-[rgba(139,125,255,0.12)] text-white"
                      : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeSection === "account" && (
            <div>
              <h3 className="text-lg font-bold text-white">My Account</h3>
              <p className="text-[13px] text-[#94A3B8] mt-1">Manage your account settings</p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-[8px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] flex items-center justify-center text-white text-xl font-bold">
                    Y
                  </div>
                  <div>
                    <p className="text-white font-semibold">chaitanya_dev</p>
                    <p className="text-sm text-[#94A3B8]">Chaitanya</p>
                    <button className="text-sm text-[#8B7DFF] hover:underline mt-1">Edit Profile</button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Email</label>
                  <div className="flex items-center gap-2">
                    <input
                      defaultValue="chaitanya@example.com"
                      className="flex-1 h-[40px] bg-[rgba(255,255,255,0.03)] rounded-[6px] px-3 text-sm text-white outline-none border border-[rgba(255,255,255,0.06)]"
                    />
                    <button className="text-sm text-[#8B7DFF] hover:underline">Edit</button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">Username</label>
                  <div className="flex items-center gap-2">
                    <input
                      defaultValue="chaitanya_dev"
                      className="flex-1 h-[40px] bg-[rgba(255,255,255,0.03)] rounded-[6px] px-3 text-sm text-white outline-none border border-[rgba(255,255,255,0.06)]"
                    />
                    <button className="text-sm text-[#8B7DFF] hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div>
              <h3 className="text-lg font-bold text-white">Appearance</h3>
              <p className="text-[13px] text-[#94A3B8] mt-1">Customize your theme</p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm text-white font-medium block mb-2">Theme</label>
                  <div className="flex gap-3">
                    {["Dark", "Darker", "Light", "Midnight"].map((t) => (
                      <button
                        key={t}
                        className={`px-4 py-2 rounded-[6px] text-sm border transition-colors ${
                          t === "Darker"
                            ? "bg-[rgba(139,125,255,0.12)] border-[#8B7DFF] text-white"
                            : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white font-medium block mb-2">Message Display</label>
                  <div className="flex gap-3">
                    {["Cozy", "Compact"].map((t) => (
                      <button
                        key={t}
                        className={`px-4 py-2 rounded-[6px] text-sm border transition-colors ${
                          t === "Cozy"
                            ? "bg-[rgba(139,125,255,0.12)] border-[#8B7DFF] text-white"
                            : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {![ "account", "appearance" ].includes(activeSection) && (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#94A3B8] text-sm">{sections.find((s) => s.id === activeSection)?.label} settings</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal
