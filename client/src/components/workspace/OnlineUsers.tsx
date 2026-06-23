import { users } from "../../data/users"

function OnlineUsers() {
  const getInitials = (name: string) => {
    return name
      .split(/[_\s]/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-green-400 to-emerald-600",
      "from-blue-400 to-indigo-600",
      "from-orange-400 to-red-500",
      "from-pink-400 to-rose-600",
      "from-cyan-400 to-blue-600",
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase">Online — 4</span>
      </div>

      <div className="space-y-2.5">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(user.username)} flex items-center justify-center text-white text-[11px] font-semibold`}
              >
                {getInitials(user.username)}
              </div>
              <span
                className={`absolute -bottom-[1px] -right-[1px] w-[9px] h-[9px] rounded-full border-2 border-[#101727] ${
                  user.online ? "bg-[#22C55E]" : "bg-[#4B5563]"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white font-medium">{user.username}</span>
              <span className="text-[12px] text-[#94A3B8]">{user.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineUsers
