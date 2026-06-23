import { useEffect, useRef, type ReactNode } from "react"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  width?: string
  className?: string
}

function Modal({ open, onClose, children, width = "480px", className = "" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-[10px]" />
      <div
        className="relative animate-[scaleFade_200ms_ease] bg-[#111827] rounded-[8px] border border-[rgba(255,255,255,0.06)] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ width }}
      >
        {children}
      </div>

      <style>{`
        @keyframes scaleFade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Modal
