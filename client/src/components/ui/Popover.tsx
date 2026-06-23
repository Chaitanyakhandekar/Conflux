import { useEffect, useRef, type ReactNode } from "react"

interface PopoverProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  anchorRef?: React.RefObject<HTMLElement | null>
}

function Popover({ open, onClose, children, className = "", top, left, right, bottom }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKey)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      className={`fixed z-[200] animate-[fadeSlide_200ms_ease] bg-[#111827] rounded-[8px] border border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden ${className}`}
      style={{ top, left, right, bottom }}
    >
      {children}
      <style>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(-4px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Popover
