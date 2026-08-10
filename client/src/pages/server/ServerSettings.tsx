import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  X, Image as ImageIcon, Link as LinkIcon,
  Activity, Trash2, Plus, Search, Check, AlertCircle,
  Sliders, ShieldAlert, Trash,
  ToggleLeft, ToggleRight, CheckSquare, Square
} from "lucide-react"
import { useServer } from "../../hooks/useServer"
import { useServerStore } from "../../store/server-store."
import { Permission } from "../../constants/permissions"
import toast from "react-hot-toast"

type TabType =
  | "overview"
  | "roles"
  | "emojis"
  | "integrations"
  | "safety"
  | "members"
  | "invites"
  | "audit-log"

// Predefined colors for role selector
const ROLE_COLORS = [
  { hex: "#9B59B6", name: "Purple" },
  { hex: "#2ECC71", name: "Green" },
  { hex: "#3498DB", name: "Blue" },
  { hex: "#F1C40F", name: "Yellow" },
  { hex: "#E91E63", name: "Pink" },
  { hex: "#E67E22", name: "Orange" },
  { hex: "#1ABC9C", name: "Teal" },
  { hex: "#E74C3C", name: "Red" },
  { hex: "#95A5A6", name: "Grey" },
]

// Mock data structures
interface MockRole {
  id: string
  name: string
  color: string
  permissions: string[]
}

interface MockEmoji {
  id: string
  char: string
  name: string
  addedBy: string
}

interface MockWebhook {
  id: string
  name: string
  channel: string
  token: string
}

interface MockMember {
  id: string
  username: string
  avatar: string
  roleId: string
  joinedAt: string
}

interface MockInvite {
  id: string
  code: string
  creator: string
  uses: number
  expires: string
}

interface MockAuditLog {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
}

export default function ServerSettings() {
  const navigate = useNavigate()
  const { selectedServer, setSelectedServer } = useServer()
  const { setServers, servers } = useServerStore()
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  // Overview form states
  const [serverName, setServerName] = useState("")
  const [serverType, setServerType] = useState<any>("CUSTOM")
  const [serverDesc, setServerDesc] = useState("")
  const [serverIcon, setServerIcon] = useState("")
  const [serverBanner, setServerBanner] = useState("")
  const [isDirty, setIsDirty] = useState(false)

  // Roles states
  const [roles, setRoles] = useState<MockRole[]>([
    { id: "1", name: "Administrator", color: "#E74C3C", permissions: Object.keys(Permission) },
    { id: "2", name: "Moderator", color: "#3498DB", permissions: ["VIEW_CHANNEL", "KICK_MEMBERS", "BAN_MEMBERS", "TIMEOUT_MEMBERS", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
    { id: "3", name: "VIP Member", color: "#2ECC71", permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS", "USE_EXTERNAL_EMOJIS"] },
    { id: "everyone", name: "@everyone", color: "#95A5A6", permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS"] }
  ])
  const [selectedRoleId, setSelectedRoleId] = useState<string>("1")
  const [roleSearch, setRoleSearch] = useState("")

  // Emojis states
  const [emojis, setEmojis] = useState<MockEmoji[]>([
    { id: "e1", char: "🚀", name: "launch", addedBy: "chaitanya_dev" },
    { id: "e2", char: "🔥", name: "spicy", addedBy: "alex_designer" },
    { id: "e3", char: "💖", name: "heart_glowing", addedBy: "sarah_mod" },
    { id: "e4", char: "🤖", name: "bot_salute", addedBy: "chaitanya_dev" },
  ])
  const [newEmojiChar, setNewEmojiChar] = useState("✨")
  const [newEmojiName, setNewEmojiName] = useState("")

  // Webhooks/Integrations states
  const [webhooks, setWebhooks] = useState<MockWebhook[]>([
    { id: "w1", name: "GitHub Alerts", channel: "general-chat", token: "gh_hook_98ab42c98e" },
    { id: "w2", name: "Vercel Deployments", channel: "announcements", token: "vc_hook_ff42d13a91" }
  ])
  const [newWebhookName, setNewWebhookName] = useState("")
  const [newWebhookChannel, setNewWebhookChannel] = useState("general-chat")
  const [isCreatingWebhook, setIsCreatingWebhook] = useState(false)

  // Safety/Moderation states
  const [verificationLevel, setVerificationLevel] = useState<"none" | "low" | "medium" | "high">("medium")
  const [autoModProfanity, setAutoModProfanity] = useState(true)
  const [autoModLinks, setAutoModLinks] = useState(false)
  const [autoModSpam, setAutoModSpam] = useState(true)

  // Members states
  const [members, setMembers] = useState<MockMember[]>([
    { id: "m1", username: "chaitanya_dev", avatar: "C", roleId: "1", joinedAt: "2 days ago" },
    { id: "m2", username: "alex_designer", avatar: "A", roleId: "3", joinedAt: "1 week ago" },
    { id: "m3", username: "sarah_mod", avatar: "S", roleId: "2", joinedAt: "3 weeks ago" },
    { id: "m4", username: "conflux_helper_bot", avatar: "🤖", roleId: "2", joinedAt: "1 month ago" },
    { id: "m5", username: "casual_coder", avatar: "U", roleId: "everyone", joinedAt: "yesterday" }
  ])
  const [memberSearch, setMemberSearch] = useState("")

  // Invites states
  const [invites, setInvites] = useState<MockInvite[]>([
    { id: "i1", code: "conflux-hub", creator: "chaitanya_dev", uses: 42, expires: "Never" },
    { id: "i2", code: "cf-recruit", creator: "sarah_mod", uses: 5, expires: "2 hours" },
    { id: "i3", code: "join-game-jam", creator: "alex_designer", uses: 0, expires: "Expired" }
  ])

  // Audit Logs states
  const [auditLogs, setAuditLogs] = useState<MockAuditLog[]>([
    { id: "l1", user: "chaitanya_dev", action: "Updated Server settings", target: "Conflux Hub", timestamp: "5 mins ago" },
    { id: "l2", user: "chaitanya_dev", action: "Created Role", target: "VIP Member", timestamp: "10 mins ago" },
    { id: "l3", user: "sarah_mod", action: "Kicked Member", target: "spammer_guest", timestamp: "1 hour ago" },
    { id: "l4", user: "chaitanya_dev", action: "Created Channel", target: "#announcements", timestamp: "1 day ago" },
    { id: "l5", user: "alex_designer", action: "Updated Category", target: "Voice Channels", timestamp: "2 days ago" }
  ])
  const [auditUserFilter, setAuditUserFilter] = useState("all")
  const [auditActionFilter, setAuditActionFilter] = useState("all")

  // Initialize fields on mount
  useEffect(() => {
    if (selectedServer) {
      setServerName(selectedServer.name || "")
      setServerType(selectedServer.serverType || "CUSTOM")
      setServerDesc(selectedServer.description || "")
      setServerIcon(selectedServer.serverIcon || "")
      setServerBanner(selectedServer.gradient || "from-[#1e1b4b] to-[#311042]")
      setIsDirty(false)
    }
  }, [selectedServer])

  // Track key binds (Escape key goes back to workspace)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigate])

  // Check overview dirty state
  const handleOverviewChange = (field: string, val: string) => {
    if (!selectedServer) return
    if (field === "name") {
      setServerName(val)
      setIsDirty(val !== selectedServer.name)
    } else if (field === "desc") {
      setServerDesc(val)
      setIsDirty(val !== selectedServer.description)
    } else if (field === "type") {
      setServerType(val)
      setIsDirty(val !== selectedServer.serverType)
    }
  }

  const resetOverview = () => {
    if (selectedServer) {
      setServerName(selectedServer.name || "")
      setServerType(selectedServer.serverType || "CUSTOM")
      setServerDesc(selectedServer.description || "")
      setIsDirty(false)
      toast.success("Settings reverted")
    }
  }

  const saveOverview = () => {
    if (!selectedServer) return
    const updatedServer = {
      ...selectedServer,
      name: serverName,
      description: serverDesc,
      serverType: serverType,
      serverIcon: serverIcon,
      gradient: serverBanner,
    }

    // Update in selectedServer
    setSelectedServer(updatedServer)

    // Update in servers list
    const updatedServersList = servers.map((s) => (s._id === selectedServer._id ? updatedServer : s))
    setServers(updatedServersList)

    setIsDirty(false)

    // Log action to audit log
    const newLog: MockAuditLog = {
      id: `l${Date.now()}`,
      user: "You",
      action: "Updated Server overview",
      target: serverName,
      timestamp: "Just now",
    }
    setAuditLogs([newLog, ...auditLogs])
    toast.success("Server settings updated successfully!")
  }

  // Action Handlers
  const handleCreateRole = () => {
    const newRole: MockRole = {
      id: `role_${Date.now()}`,
      name: `New Role #${roles.length}`,
      color: "#95A5A6",
      permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
    }
    setRoles([...roles, newRole])
    setSelectedRoleId(newRole.id)
    toast.success("Role created!")
  }

  const handleUpdateRoleName = (id: string, name: string) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, name } : r)))
  }

  const handleUpdateRoleColor = (id: string, color: string) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, color } : r)))
  }

  const handleToggleRolePermission = (roleId: string, permissionKey: string) => {
    setRoles(
      roles.map((r) => {
        if (r.id !== roleId) return r
        const hasPerm = r.permissions.includes(permissionKey)
        const updatedPerms = hasPerm
          ? r.permissions.filter((p) => p !== permissionKey)
          : [...r.permissions, permissionKey]
        return { ...r, permissions: updatedPerms }
      })
    )
  }

  const handleDeleteRole = (id: string) => {
    if (id === "everyone") {
      toast.error("Cannot delete default @everyone role")
      return
    }
    setRoles(roles.filter((r) => r.id !== id))
    setSelectedRoleId("everyone")
    toast.success("Role deleted successfully")
  }

  // Emoji handlers
  const handleUploadEmoji = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmojiName) {
      toast.error("Please enter a name for the emoji")
      return
    }
    const newEmoji: MockEmoji = {
      id: `e_${Date.now()}`,
      char: newEmojiChar,
      name: newEmojiName.toLowerCase().replace(/\s+/g, "_"),
      addedBy: "You",
    }
    setEmojis([...emojis, newEmoji])
    setNewEmojiName("")
    toast.success(`Emoji :${newEmoji.name}: added!`)
  }

  const handleDeleteEmoji = (id: string) => {
    setEmojis(emojis.filter((e) => e.id !== id))
    toast.success("Emoji deleted")
  }

  // Webhook Handlers
  const handleCreateWebhook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWebhookName) {
      toast.error("Please provide a webhook name")
      return
    }
    const newHook: MockWebhook = {
      id: `w_${Date.now()}`,
      name: newWebhookName,
      channel: newWebhookChannel,
      token: `conflux_hook_${Math.random().toString(36).substring(2, 12)}`,
    }
    setWebhooks([...webhooks, newHook])
    setNewWebhookName("")
    setIsCreatingWebhook(false)
    toast.success("Webhook created!")
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id))
    toast.success("Webhook deleted")
  }

  // Member management
  const handleKickMember = (id: string, username: string) => {
    setMembers(members.filter((m) => m.id !== id))
    const newLog: MockAuditLog = {
      id: `l${Date.now()}`,
      user: "You",
      action: "Kicked member",
      target: username,
      timestamp: "Just now",
    }
    setAuditLogs([newLog, ...auditLogs])
    toast.success(`${username} has been kicked.`)
  }

  const handleBanMember = (id: string, username: string) => {
    setMembers(members.filter((m) => m.id !== id))
    const newLog: MockAuditLog = {
      id: `l${Date.now()}`,
      user: "You",
      action: "Banned member",
      target: username,
      timestamp: "Just now",
    }
    setAuditLogs([newLog, ...auditLogs])
    toast.success(`${username} has been permanently banned.`)
  }

  const handleUpdateMemberRole = (memberId: string, roleId: string) => {
    setMembers(members.map((m) => (m.id === memberId ? { ...m, roleId } : m)))
    toast.success("Member role updated")
  }

  // Revoke invite
  const handleRevokeInvite = (id: string, code: string) => {
    setInvites(invites.filter((i) => i.id !== id))
    toast.success(`Invite code ${code} revoked.`)
  }

  const activeRole = roles.find((r) => r.id === selectedRoleId) || roles[roles.length - 1]

  return (
    <div className="flex h-screen w-full bg-[#090E1A] text-[#E2E8F0] select-none overflow-hidden">
      <style>{`
        @keyframes settingsFadeIn {
          from { opacity: 0; transform: scale(1.03); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Left Settings Navigation Bar */}
      <div className="w-[260px] bg-[#070A12] border-r border-[rgba(255,255,255,0.04)] flex justify-end py-10 pr-6 flex-shrink-0 overflow-y-auto">
        <div className="w-[190px] space-y-5">
          {/* Server Config Group */}
          <div>
            <div className="px-2 mb-1.5 text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              {serverName || "Server"} Settings
            </div>
            <nav className="space-y-0.5">
              {[
                { id: "overview", label: "Overview" },
                { id: "roles", label: "Roles Setup" },
                { id: "emojis", label: "Emojis & Stickers" },
                { id: "integrations", label: "Integrations & Webhooks" },
                { id: "safety", label: "Safety & Moderation" },
                { id: "audit-log", label: "Audit Logs" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType)
                    setIsCreatingWebhook(false)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-[rgba(139,125,255,0.12)] text-white shadow-sm border-l-2 border-[#8B7DFF] pl-2"
                      : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.03)] hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

          {/* User Management Group */}
          <div>
            <div className="px-2 mb-1.5 text-[11px] font-bold text-[#475569] uppercase tracking-wider">
              User Management
            </div>
            <nav className="space-y-0.5">
              {[
                { id: "members", label: "Members Directory" },
                { id: "invites", label: "Invite Links" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType)
                    setIsCreatingWebhook(false)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-[rgba(139,125,255,0.12)] text-white shadow-sm border-l-2 border-[#8B7DFF] pl-2"
                      : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.03)] hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

          {/* Destructive Actions */}
          <button
            onClick={() => {
              const confirmDel = window.confirm("Are you sure you want to delete this server? This action is irreversible.")
              if (confirmDel) {
                toast.error("Delete is only simulated in this mockup.")
              }
            }}
            className="w-full text-left px-2.5 py-2 rounded-[6px] text-[13px] font-semibold text-[#EF4444] hover:bg-red-500/10 transition-colors flex items-center gap-2"
          >
            <Trash size={14} />
            Delete Server
          </button>
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="flex-1 bg-[#090E1A] py-10 px-10 overflow-y-auto flex flex-col relative">
        <div className="max-w-[700px] w-full flex-1">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {activeTab === "overview" && "Server Overview"}
              {activeTab === "roles" && "Roles Configuration"}
              {activeTab === "emojis" && "Custom Emojis"}
              {activeTab === "integrations" && "Integrations & Webhooks"}
              {activeTab === "safety" && "Safety & Moderation Filters"}
              {activeTab === "audit-log" && "Server Audit Logs"}
              {activeTab === "members" && "Members Directory"}
              {activeTab === "invites" && "Invite Management"}
            </h2>
            <p className="text-[13px] text-[#94A3B8] mt-1">
              {activeTab === "overview" && "Update server properties, categories, brand elements, and icons."}
              {activeTab === "roles" && "Roles customize access and controls for members. Manage permissions here."}
              {activeTab === "emojis" && "Upload custom emojis that server members can use inside chats."}
              {activeTab === "integrations" && "Connect third-party services and configure automated webhooks."}
              {activeTab === "safety" && "Prevent spam and offensive text with AutoMod and member verification tiers."}
              {activeTab === "audit-log" && "A record of actions taken by administrators and moderators."}
              {activeTab === "members" && "View details, update roles, and manage permissions of members."}
              {activeTab === "invites" && "Track active invite codes and revoke them if needed."}
            </p>
          </div>

          {/* TAB CONTENTS */}

          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Branding Section */}
              <div className="grid grid-cols-3 gap-6 items-center p-5 rounded-xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)]">
                {/* Icon Column */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide">Server Icon</span>
                  <div
                    onClick={() => {
                      const icons = [
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60",
                        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&auto=format&fit=crop&q=60",
                        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=60",
                      ]
                      const pick = icons[Math.floor(Math.random() * icons.length)]
                      setServerIcon(pick)
                      setIsDirty(true)
                      toast.success("Icon updated locally!")
                    }}
                    className="w-20 h-20 rounded-full border border-dashed border-[rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer overflow-hidden relative group hover:border-[#8B7DFF] transition-all bg-[rgba(255,255,255,0.02)]"
                    title="Click to randomize mock icon image"
                  >
                    {serverIcon ? (
                      <img src={serverIcon} alt="Icon Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-[#94A3B8] group-hover:text-white transition-colors" size={24} />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] text-white">
                      <span>Upload</span>
                    </div>
                  </div>
                </div>

                {/* Banner Column */}
                <div className="col-span-2 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide">Server Banner Style</span>
                  <div
                    onClick={() => {
                      const gradients = [
                        "from-[#8B7DFF] to-[#6B5CE7]",
                        "from-[#10B981] to-[#047857]",
                        "from-[#3B82F6] to-[#1D4ED8]",
                        "from-[#EC4899] to-[#BE185D]",
                        "from-[#F59E0B] to-[#D97706]",
                      ]
                      const pick = gradients[Math.floor(Math.random() * gradients.length)]
                      setServerBanner(pick)
                      setIsDirty(true)
                      toast.success("Banner style changed!")
                    }}
                    className={`w-full h-20 rounded-lg bg-gradient-to-br ${serverBanner || "from-[#1e1b4b] to-[#311042]"} border border-[rgba(255,255,255,0.06)] cursor-pointer relative group flex items-center justify-center shadow-lg transition-all hover:brightness-110`}
                    title="Click to randomize gradient banner style"
                  >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors rounded-lg" />
                    <span className="text-xs text-white/80 group-hover:text-white font-medium drop-shadow relative">Click to Randomize Gradient</span>
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Server Name</label>
                  <input
                    type="text"
                    value={serverName}
                    onChange={(e) => handleOverviewChange("name", e.target.value)}
                    className="w-full h-10 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 text-[14px] text-white focus:outline-none focus:border-[#8B7DFF] focus:bg-[rgba(139,125,255,0.02)] transition-all font-medium"
                    placeholder="Enter Server Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Server Category / Type</label>
                    <select
                      value={serverType}
                      onChange={(e) => handleOverviewChange("type", e.target.value)}
                      className="w-full h-10 bg-[#0C1322] border border-[rgba(255,255,255,0.06)] rounded-lg px-2 text-[13px] text-white focus:outline-none focus:border-[#8B7DFF] transition-all"
                    >
                      <option value="GAMING">Gaming Hub</option>
                      <option value="STUDY">Study Group</option>
                      <option value="DEVELOPER">Developer Space</option>
                      <option value="STARTUP">Startup Workspace</option>
                      <option value="CUSTOM">Custom Server</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Creation Date</label>
                    <div className="h-10 border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)] text-[#64748B] rounded-lg px-3 flex items-center text-[13px] select-none">
                      {selectedServer?.createdAt ? new Date(selectedServer.createdAt).toLocaleDateString() : "Just now"}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Description / Topic</label>
                  <textarea
                    value={serverDesc}
                    onChange={(e) => handleOverviewChange("desc", e.target.value)}
                    rows={4}
                    className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 text-[13px] text-white focus:outline-none focus:border-[#8B7DFF] focus:bg-[rgba(139,125,255,0.02)] transition-all resize-none leading-relaxed"
                    placeholder="Provide a description of your community space"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. ROLES TAB */}
          {activeTab === "roles" && (
            <div className="flex h-[420px] gap-6">
              {/* Roles Left List */}
              <div className="w-[200px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] rounded-lg flex flex-col p-2">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Roles ({roles.length})</span>
                  <button
                    onClick={handleCreateRole}
                    className="text-[#94A3B8] hover:text-white p-1 hover:bg-[rgba(255,255,255,0.04)] rounded-md transition-colors"
                    title="Create Role"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="relative mb-2">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input
                    type="text"
                    value={roleSearch}
                    onChange={(e) => setRoleSearch(e.target.value)}
                    placeholder="Search roles"
                    className="w-full h-7 pl-7 pr-2 text-[11px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-md outline-none focus:border-[#8B7DFF] text-white"
                  />
                </div>
                <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
                  {roles
                    .filter((r) => r.name.toLowerCase().includes(roleSearch.toLowerCase()))
                    .map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRoleId(r.id)}
                        className={`w-full text-left px-2 py-1.5 rounded-[6px] text-xs flex items-center justify-between transition-colors ${
                          selectedRoleId === r.id
                            ? "bg-[rgba(139,125,255,0.1)] text-white font-medium"
                            : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.02)] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: r.color }}
                          />
                          <span className="truncate">{r.name}</span>
                        </span>
                        {r.id !== "everyone" && selectedRoleId === r.id && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteRole(r.id)
                            }}
                            className="text-[#EF4444] hover:brightness-125 p-0.5"
                          >
                            <Trash2 size={10} />
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              </div>

              {/* Role Config Panel */}
              <div className="flex-1 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] rounded-lg p-4 flex flex-col overflow-y-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Role Name</label>
                    <input
                      type="text"
                      value={activeRole.name}
                      onChange={(e) => handleUpdateRoleName(activeRole.id, e.target.value)}
                      disabled={activeRole.id === "everyone"}
                      className="w-full h-8 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md px-2.5 text-xs text-white focus:outline-none focus:border-[#8B7DFF] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Role Color</label>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {ROLE_COLORS.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => handleUpdateRoleColor(activeRole.id, color.hex)}
                          disabled={activeRole.id === "everyone"}
                          className={`w-5 h-5 rounded-full border relative flex items-center justify-center transition-all ${
                            activeRole.color === color.hex
                              ? "border-white scale-110 shadow-md"
                              : "border-transparent hover:scale-105"
                          } disabled:opacity-30`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {activeRole.color === color.hex && <Check size={10} className="text-white drop-shadow-md" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

                {/* Permissions Checkbox Grid */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Role Permissions</span>
                    <span className="text-[9px] text-[#94A3B8] italic">Toggling simulates updates</span>
                  </div>
                  <div className="space-y-2 pr-1">
                    {/* Map grouped permissions for clarity */}
                    {[
                      {
                        title: "General Permissions",
                        keys: ["VIEW_CHANNEL", "MANAGE_SERVER", "MANAGE_CHANNELS", "MANAGE_ROLES", "VIEW_AUDIT_LOG"],
                      },
                      {
                        title: "Messaging Permissions",
                        keys: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "ATTACH_FILES", "ADD_REACTIONS"],
                      },
                      {
                        title: "Moderation & Invites",
                        keys: ["KICK_MEMBERS", "BAN_MEMBERS", "TIMEOUT_MEMBERS", "CREATE_INVITE"],
                      },
                    ].map((group, gi) => (
                      <div key={gi} className="space-y-1.5">
                        <h4 className="text-[10px] font-semibold text-[#8B7DFF] tracking-wide mb-1 border-b border-[rgba(139,125,255,0.08)] pb-0.5">{group.title}</h4>
                        <div className="grid grid-cols-1 gap-1.5">
                          {group.keys.map((k) => {
                            const isChecked = activeRole.permissions.includes(k)
                            return (
                              <div
                                key={k}
                                onClick={() => handleToggleRolePermission(activeRole.id, k)}
                                className="flex items-center justify-between p-1.5 px-2 rounded-md hover:bg-[rgba(255,255,255,0.02)] cursor-pointer transition-colors"
                              >
                                <div>
                                  <div className="text-xs font-semibold text-white">{k.replace(/_/g, " ")}</div>
                                  <div className="text-[9px] text-[#64748B] uppercase">ID: {k}</div>
                                </div>
                                <button className="text-[#94A3B8] hover:text-[#8B7DFF] transition-colors">
                                  {isChecked ? (
                                    <CheckSquare size={16} className="text-[#8B7DFF]" />
                                  ) : (
                                    <Square size={16} />
                                  )}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. EMOJIS & STICKERS */}
          {activeTab === "emojis" && (
            <div className="space-y-6">
              {/* Upload Section */}
              <form onSubmit={handleUploadEmoji} className="p-4 rounded-xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select
                      value={newEmojiChar}
                      onChange={(e) => setNewEmojiChar(e.target.value)}
                      className="w-10 h-10 bg-[#0C1322] border border-[rgba(255,255,255,0.06)] rounded-lg text-center text-lg focus:outline-none"
                    >
                      <option value="✨">✨</option>
                      <option value="🌟">🌟</option>
                      <option value="⚡">⚡</option>
                      <option value="💥">💥</option>
                      <option value="🚀">🚀</option>
                      <option value="💻">💻</option>
                      <option value="🧠">🧠</option>
                      <option value="☕">☕</option>
                      <option value="🎨">🎨</option>
                      <option value="🎉">🎉</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-semibold text-[#64748B] uppercase block">Emoji Alias / Name</label>
                    <input
                      type="text"
                      value={newEmojiName}
                      onChange={(e) => setNewEmojiName(e.target.value)}
                      placeholder="e.g. glowing_spark"
                      className="h-8 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md px-2 text-xs focus:outline-none text-white w-48"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 h-8 text-xs font-semibold bg-[#22C55E] hover:bg-[#16A34A] rounded-lg text-white transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                >
                  <Plus size={14} /> Add Emoji
                </button>
              </form>

              {/* Emojis Grid */}
              <div>
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Custom Server Emojis ({emojis.length})</h4>
                <div className="grid grid-cols-4 gap-4">
                  {emojis.map((emoji) => (
                    <div
                      key={emoji.id}
                      className="p-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.08)] flex flex-col items-center justify-between text-center relative group transition-all"
                    >
                      <button
                        onClick={() => handleDeleteEmoji(emoji.id)}
                        className="absolute top-2 right-2 text-[#64748B] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        title="Delete Emoji"
                      >
                        <Trash2 size={12} />
                      </button>
                      <span className="text-3xl mb-2 drop-shadow-md select-none">{emoji.char}</span>
                      <span className="text-xs font-semibold text-white truncate max-w-full">:{emoji.name}:</span>
                      <span className="text-[9px] text-[#64748B] mt-0.5 truncate max-w-full">By {emoji.addedBy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. INTEGRATIONS & WEBHOOKS */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              {!isCreatingWebhook ? (
                <>
                  {/* Webhooks Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Custom Webhooks ({webhooks.length})</h4>
                    <button
                      onClick={() => setIsCreatingWebhook(true)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#8B7DFF] hover:bg-[#6B5CE7] text-white flex items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(139,125,255,0.15)]"
                    >
                      <Plus size={14} /> Create Webhook
                    </button>
                  </div>

                  {/* Webhooks List */}
                  <div className="space-y-3">
                    {webhooks.map((hook) => (
                      <div
                        key={hook.id}
                        className="p-4 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[rgba(139,125,255,0.1)] flex items-center justify-center text-[#8B7DFF]">
                            <LinkIcon size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{hook.name}</div>
                            <div className="text-xs text-[#94A3B8]">Target Channel: <span className="font-semibold text-white">#{hook.channel}</span></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="password"
                            value={hook.token}
                            readOnly
                            className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-[10px] text-[#94A3B8] rounded px-2 h-7 font-mono w-28 text-center select-all outline-none"
                            title="Click and Copy Webhook secret key"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(hook.token)
                              toast.success("Webhook token copied to clipboard!")
                            }}
                            className="text-[11px] font-semibold text-[#8B7DFF] hover:underline"
                          >
                            Copy Url
                          </button>
                          <button
                            onClick={() => handleDeleteWebhook(hook.id)}
                            className="text-[#64748B] hover:text-[#EF4444] p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-all"
                            title="Delete Webhook"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Create Webhook Form */
                <form onSubmit={handleCreateWebhook} className="space-y-4 p-5 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] animate-[settingsFadeIn_100ms_ease]">
                  <h4 className="text-sm font-bold text-white mb-2">Configure Webhook</h4>
                  <div>
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Webhook Name</label>
                    <input
                      type="text"
                      value={newWebhookName}
                      onChange={(e) => setNewWebhookName(e.target.value)}
                      placeholder="e.g. GitHub Pull Requests"
                      className="w-full h-9 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 text-xs focus:outline-none text-white focus:border-[#8B7DFF]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Post to Channel</label>
                    <select
                      value={newWebhookChannel}
                      onChange={(e) => setNewWebhookChannel(e.target.value)}
                      className="w-full h-9 bg-[#0C1322] border border-[rgba(255,255,255,0.06)] rounded-lg px-2 text-xs focus:outline-none text-white"
                    >
                      <option value="general-chat">#general-chat</option>
                      <option value="announcements">#announcements</option>
                      <option value="voice-lounge">#voice-lounge</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingWebhook(false)}
                      className="px-4 h-8 rounded-lg text-xs font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-colors text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 h-8 rounded-lg text-xs font-semibold bg-[#22C55E] hover:bg-[#16A34A] text-white transition-colors"
                    >
                      Save Webhook
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 5. SAFETY & MODERATION */}
          {activeTab === "safety" && (
            <div className="space-y-6">
              {/* Verification Tiers */}
              <div>
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Verification Level</h4>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: "none", label: "None", desc: "Unrestricted", color: "border-green-500/30 text-green-400" },
                    { id: "low", label: "Low", desc: "Verified email", color: "border-blue-500/30 text-blue-400" },
                    { id: "medium", label: "Medium", desc: "Registered 5m+", color: "border-orange-500/30 text-orange-400" },
                    { id: "high", label: "High", desc: "Verified Phone", color: "border-red-500/30 text-red-400" },
                  ].map((level) => {
                    const selected = verificationLevel === level.id
                    return (
                      <div
                        key={level.id}
                        onClick={() => {
                          setVerificationLevel(level.id as any)
                          toast.success(`Verification Level set to ${level.label}`)
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-24 ${
                          selected
                            ? "bg-[rgba(139,125,255,0.08)] border-[#8B7DFF] shadow-[0_0_15px_rgba(139,125,255,0.15)] scale-[1.02]"
                            : "bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{level.label}</span>
                          {selected && <Check size={12} className="text-[#8B7DFF]" />}
                        </div>
                        <span className={`text-[10px] font-medium ${level.color}`}>{level.desc}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* AutoMod Switches */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">AutoMod Rules</h4>

                {/* Profanity Rule */}
                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444] flex-shrink-0">
                      <ShieldAlert size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Block Profanity and Slurs</h5>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">Scans chat messages and removes offensive swearing or slurs automatically.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAutoModProfanity(!autoModProfanity)
                      toast.success(`Profanity filter ${!autoModProfanity ? "enabled" : "disabled"}`)
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {autoModProfanity ? <ToggleRight size={30} className="text-[#8B7DFF]" /> : <ToggleLeft size={30} />}
                  </button>
                </div>

                {/* Spam Protection */}
                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                      <Sliders size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Block Message Spamming</h5>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">Locks out users sending identical messages in rapid succession.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAutoModSpam(!autoModSpam)
                      toast.success(`Spam filter ${!autoModSpam ? "enabled" : "disabled"}`)
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {autoModSpam ? <ToggleRight size={30} className="text-[#8B7DFF]" /> : <ToggleLeft size={30} />}
                  </button>
                </div>

                {/* Link Filtering */}
                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] flex-shrink-0">
                      <LinkIcon size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Restrict External Links</h5>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">Only allow link embeds from safe/approved domain sources.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAutoModLinks(!autoModLinks)
                      toast.success(`Link restriction ${!autoModLinks ? "enabled" : "disabled"}`)
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {autoModLinks ? <ToggleRight size={30} className="text-[#8B7DFF]" /> : <ToggleLeft size={30} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. AUDIT LOGS */}
          {activeTab === "audit-log" && (
            <div className="space-y-4">
              {/* Filter Row */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[9px] font-semibold text-[#64748B] uppercase block mb-1">Filter by User</label>
                  <select
                    value={auditUserFilter}
                    onChange={(e) => setAuditUserFilter(e.target.value)}
                    className="w-full h-8 bg-[#0C1322] border border-[rgba(255,255,255,0.06)] rounded-lg px-2 text-xs text-white"
                  >
                    <option value="all">All Users</option>
                    <option value="chaitanya_dev">chaitanya_dev</option>
                    <option value="sarah_mod">sarah_mod</option>
                    <option value="alex_designer">alex_designer</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[9px] font-semibold text-[#64748B] uppercase block mb-1">Filter by Action Type</label>
                  <select
                    value={auditActionFilter}
                    onChange={(e) => setAuditActionFilter(e.target.value)}
                    className="w-full h-8 bg-[#0C1322] border border-[rgba(255,255,255,0.06)] rounded-lg px-2 text-xs text-white"
                  >
                    <option value="all">All Actions</option>
                    <option value="Updated Server">Updated Server Overview</option>
                    <option value="Role">Role Modification</option>
                    <option value="Kicked">Kicked Members</option>
                    <option value="Banned">Banned Members</option>
                  </select>
                </div>
              </div>

              {/* Logs Feed */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {auditLogs
                  .filter((log) => auditUserFilter === "all" || log.user.includes(auditUserFilter))
                  .filter((log) => auditActionFilter === "all" || log.action.includes(auditActionFilter))
                  .map((log) => (
                    <div
                      key={log.id}
                      className="p-3 px-4 rounded-xl border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.02)] flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex gap-2.5 items-center">
                        <Activity size={13} className="text-[#8B7DFF]" />
                        <div>
                          <span className="font-semibold text-white">{log.user}</span>
                          <span className="text-[#94A3B8]"> {log.action} </span>
                          <span className="font-semibold text-[#3B82F6]">{log.target}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#64748B]">{log.timestamp}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 7. MEMBERS DIRECTORY */}
          {activeTab === "members" && (
            <div className="space-y-4">
              {/* Directory Filter Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Search members by username or ID..."
                  className="w-full h-9 pl-9 pr-3 text-xs bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg outline-none focus:border-[#8B7DFF] text-white"
                />
              </div>

              {/* Members Table */}
              <div className="border border-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.01)]">
                <div className="grid grid-cols-5 gap-2 p-2.5 px-4 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  <div className="col-span-2">Member User</div>
                  <div>Roles</div>
                  <div>Joined</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y divide-[rgba(255,255,255,0.04)] max-h-[300px] overflow-y-auto">
                  {members
                    .filter((m) => m.username.toLowerCase().includes(memberSearch.toLowerCase()))
                    .map((m) => {
                      const memberRole = roles.find((r) => r.id === m.roleId) || roles[roles.length - 1]
                      return (
                        <div key={m.id} className="grid grid-cols-5 gap-2 items-center p-3 px-4 text-xs">
                          {/* Member column */}
                          <div className="col-span-2 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#8B7DFF]/20 flex items-center justify-center text-white font-bold text-xs select-none">
                              {m.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{m.username}</div>
                              <div className="text-[9px] text-[#64748B]">ID: {m.id}</div>
                            </div>
                          </div>

                          {/* Role selector dropdown */}
                          <div>
                            <select
                              value={m.roleId}
                              onChange={(e) => handleUpdateMemberRole(m.id, e.target.value)}
                              className="bg-[#0C1322] border border-[rgba(255,255,255,0.06)] rounded-md px-1.5 h-6 text-[10px] text-white focus:outline-none"
                              style={{ borderLeftColor: memberRole.color, borderLeftWidth: "3px" }}
                            >
                              {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Joined Column */}
                          <div className="text-[#94A3B8] text-[11px]">{m.joinedAt}</div>

                          {/* Actions Column */}
                          <div className="flex gap-2 items-center justify-end">
                            <button
                              onClick={() => handleKickMember(m.id, m.username)}
                              className="text-xs font-semibold text-[#EF4444]/80 hover:text-[#EF4444] px-2 py-1 rounded hover:bg-[#EF4444]/10 transition-colors"
                              title={`Kick ${m.username}`}
                            >
                              Kick
                            </button>
                            <button
                              onClick={() => handleBanMember(m.id, m.username)}
                              className="text-xs font-semibold text-white px-2 py-1 bg-red-600/20 border border-red-500/20 hover:bg-red-600/30 hover:border-red-500/30 rounded transition-colors"
                              title={`Ban ${m.username}`}
                            >
                              Ban
                            </button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )}

          {/* 8. INVITE LINKS */}
          {activeTab === "invites" && (
            <div className="space-y-4">
              <div className="border border-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.01)]">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th className="p-3 px-4">Invite Code</th>
                      <th className="p-3">Creator</th>
                      <th className="p-3">Uses</th>
                      <th className="p-3">Expires</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                    {invites.map((invite) => (
                      <tr key={invite.id} className="hover:bg-[rgba(255,255,255,0.01)]">
                        <td className="p-3 px-4 font-mono font-bold text-[#8B7DFF]">{invite.code}</td>
                        <td className="p-3 font-semibold text-white">{invite.creator}</td>
                        <td className="p-3 text-[#94A3B8]">{invite.uses} uses</td>
                        <td className="p-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              invite.expires === "Never"
                                ? "bg-green-500/10 text-green-400"
                                : invite.expires === "Expired"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-orange-500/10 text-orange-400"
                            }`}
                          >
                            {invite.expires}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleRevokeInvite(invite.id, invite.code)}
                            className="text-[#64748B] hover:text-[#EF4444] p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                            title="Revoke Code"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Floating dirty changes bottom bar */}
          {isDirty && activeTab === "overview" && (
            <div className="fixed bottom-6 left-[280px] right-[20px] max-w-[700px] mx-auto bg-[#070A12] border border-[#8B7DFF]/30 shadow-[0_0_30px_rgba(139,125,255,0.15)] rounded-xl p-3 px-5 flex items-center justify-between animate-[slideUp_200ms_ease] z-50">
              <style>{`
                @keyframes slideUp {
                  from { transform: translateY(20px); opacity: 0; }
                  to { transform: translateY(0); opacity: 1; }
                }
              `}</style>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E2E8F0]">
                <AlertCircle className="text-[#8B7DFF]" size={16} />
                <span>Careful — you have unsaved changes!</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetOverview}
                  className="text-xs font-bold text-white hover:underline transition-colors px-3 py-1.5"
                >
                  Reset
                </button>
                <button
                  onClick={saveOverview}
                  className="text-xs font-bold bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Circle ESC Exit Button on Right */}
      <div className="fixed top-10 right-14 flex flex-col items-center gap-1 z-[160]">
        <button
          onClick={() => navigate("/")}
          className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.15)] hover:border-white hover:bg-[rgba(255,255,255,0.05)] hover:rotate-90 transition-all flex items-center justify-center text-[#94A3B8] hover:text-white"
          title="Back to Workspace (ESC)"
        >
          <X size={18} />
        </button>
        <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase select-none">ESC</span>
      </div>
    </div>
  )
}
