import { Check, UserPlus, Settings, BellOff, LogOut } from "lucide-react"

interface Props {
  open: string | null
  onClose: () => void
  x: number
  y: number
}

function ContextMenu({ open, onClose, x, y }: Props) {
  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 z-[150]" onClick={onClose} />
          <div
            className="fixed z-[200] w-[200px] py-1.5 bg-[#111827] rounded-[8px] border border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-[fadeSlide_150ms_ease]"
            style={{ top: y, left: x }}
          >
            {[
              { icon: Check, label: "Mark as Read" },
              { icon: UserPlus, label: "Invite People" },
              { icon: Settings, label: "Server Settings" },
              { separator: true },
              { icon: BellOff, label: "Mute Server" },
              { separator: true },
              { icon: LogOut, label: "Leave Server", danger: true },
            ].map((item: any, i) =>
              item.separator ? (
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

            <style>{`
              @keyframes fadeSlide {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        </>
      )}
    </>
  )
}

export default ContextMenu
