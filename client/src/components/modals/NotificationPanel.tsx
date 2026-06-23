import Popover from "../ui/Popover"
import { AtSign, Heart, MessageSquare, UserPlus, X } from "lucide-react"

const notifications = [
  { icon: AtSign, text: "Sarah mentioned you in #general", time: "2 min ago", color: "#8B7DFF" },
  { icon: Heart, text: "Alex reacted ❤️ to your message", time: "15 min ago", color: "#ED4245" },
  { icon: MessageSquare, text: "New message in #backend-help", time: "1 hour ago", color: "#22C55E" },
  { icon: UserPlus, text: "Rohan joined Coding Room", time: "3 hours ago", color: "#F59E0B" },
]

interface Props {
  open: boolean
  onClose: () => void
}

function NotificationPanel({ open, onClose }: Props) {
  return (
    <Popover open={open} onClose={onClose} className="w-[360px]" top="56px" right="120px">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-white">Notifications</h3>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-1">
          {notifications.map((n, i) => {
            const Icon = n.icon
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-[6px] hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${n.color}15` }}
                >
                  <Icon size={15} style={{ color: n.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#DBDEE1]">{n.text}</p>
                  <span className="text-[11px] text-[#94A3B8]">{n.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Popover>
  )
}

export default NotificationPanel
