import Popover from "../ui/Popover"
import { Image, FileText, Code, BarChart3 } from "lucide-react"

const items = [
  { icon: Image, label: "Upload Image" },
  { icon: FileText, label: "Upload File" },
  { icon: Code, label: "Share Code Snippet" },
  { icon: BarChart3, label: "Create Poll" },
]

interface Props {
  open: boolean
  onClose: () => void
}

function AttachmentMenu({ open, onClose }: Props) {
  return (
    <Popover open={open} onClose={onClose} className="w-[200px] py-1.5" bottom="60px" left="60px">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <button
            key={i}
            onClick={onClose}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#94A3B8] hover:bg-[rgba(139,125,255,0.08)] hover:text-white transition-colors"
          >
            <Icon size={16} />
            {item.label}
          </button>
        )
      })}
    </Popover>
  )
}

export default AttachmentMenu
