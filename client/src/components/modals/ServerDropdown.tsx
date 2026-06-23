import Popover from "../ui/Popover"
import {
  UserPlus, Settings, Hash, FolderPlus, BellOff, LogOut,
} from "lucide-react"

const items = [
  { icon: UserPlus, label: "Invite People" },
  { icon: Settings, label: "Server Settings" },
  { icon: Hash, label: "Create Channel" },
  { icon: FolderPlus, label: "Create Category" },
  { icon: BellOff, label: "Notification Settings" },
  { separator: true },
  { icon: LogOut, label: "Leave Server", danger: true },
]

interface Props {
  open: boolean
  onClose: () => void
  anchorRect?: { top: number; left: number; height: number }
}

function ServerDropdown({ open, onClose, anchorRect }: Props) {
  return (
    <Popover
      open={open}
      onClose={onClose}
      className="w-[220px] py-1.5"
      top={anchorRect ? `${anchorRect.top + anchorRect.height + 4}px` : undefined}
      left={anchorRect ? `${anchorRect.left}px` : undefined}
    >
      {items.map((item, i) =>
        "separator" in item ? (
          <div key={i} className="h-[1px] bg-[rgba(255,255,255,0.06)] my-1.5" />
        ) : (
          <button
            key={i}
            onClick={onClose}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
              item.danger
                ? "text-[#ED4245] hover:bg-[rgba(237,66,69,0.08)]"
                : "text-[#94A3B8] hover:bg-[rgba(139,125,255,0.08)] hover:text-white"
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ),
      )}
    </Popover>
  )
}

export default ServerDropdown
