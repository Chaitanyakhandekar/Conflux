import { users } from "../../data/users"
import { useUI } from "../../contexts/UIContext"

const roleOrder = ["Admin", "Moderator", "Member"] as const

function MembersSidebar() {
  const { setShowMemberProfile } = useUI()

  const getInitials = (name: string) => name[0].toUpperCase()

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7]",
      "bg-gradient-to-br from-[#FF6B6B] to-[#EE4444]",
      "bg-gradient-to-br from-[#22C55E] to-[#16A34A]",
      "bg-gradient-to-br from-[#F59E0B] to-[#D97706]",
      "bg-gradient-to-br from-[#EC4899] to-[#DB2777]",
      "bg-gradient-to-br from-[#06B6D4] to-[#0891B2]",
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const getStatusIcon = (user: typeof users[0]) => {
    if (!user.online) return "bg-[#6B7280]"
    switch (user.status.toLowerCase()) {
      case "idle":
        return "bg-[#F59E0B]"
      case "dnd":
      case "do not disturb":
        return "bg-[#ED4245]"
      default:
        return "bg-[#22C55E]"
    }
  }

  const grouped = roleOrder.reduce(
    (acc, role) => {
      const roleUsers = users.filter((u) => u.role === role)
      if (roleUsers.length > 0) acc[role] = roleUsers
      return acc
    },
    {} as Record<string, typeof users>,
  )

  const onlineCount = users.filter((u) => u.online).length
  const totalCount = users.length

  return (
    <aside className="w-[240px] h-full bg-[#0C1322] flex flex-col flex-shrink-0 border-l border-[rgba(255,255,255,0.04)] overflow-y-auto">
      <div className="px-4 py-4 space-y-5">
        {roleOrder.map((role) => {
          const roleUsers = grouped[role]
          if (!roleUsers) return null
          return (
            <div key={role}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-[12px] font-semibold tracking-wide text-[#6B7280] uppercase">
                  {role}
                </span>
                <span className="text-[12px] text-[#6B7280]">— {roleUsers.length}</span>
              </div>
              <div className="space-y-[2px]">
                {roleUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setShowMemberProfile(user.username)}
                    className="flex items-center gap-3 px-2 py-1.5 rounded-[6px] hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors group"
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full ${getAvatarColor(user.username)} flex items-center justify-center text-white text-[11px] font-semibold shadow-[0_0_8px_rgba(139,125,255,0.06)]`}
                      >
                        {getInitials(user.username)}
                      </div>
                      <span
                        className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-[2px] border-[#0C1322] ${
                          user.online ? `shadow-[0_0_6px_rgba(34,197,94,0.3)]` : ""
                        } ${getStatusIcon(user)}`}
                      />
                    </div>
                    <span
                      className={`text-sm truncate ${
                        user.online ? "text-white" : "text-[#6B7280]"
                      }`}
                    >
                      {user.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-auto px-4 py-3 border-t border-[rgba(255,255,255,0.04)]">
        <p className="text-[12px] text-[#6B7280]">
          {onlineCount} Online, {totalCount - onlineCount} Offline
        </p>
      </div>
    </aside>
  )
}

export default MembersSidebar
