import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface UIContextType {
  showCreateServer: boolean
  setShowCreateServer: (v: boolean) => void
  showServerDropdown: boolean
  setShowServerDropdown: (v: boolean) => void
  showCreateChannel: boolean
  setShowCreateChannel: (v: boolean) => void
  showProfileCard: boolean
  setShowProfileCard: (v: boolean) => void
  showSettings: boolean
  setShowSettings: (v: boolean) => void
  showVoiceJoin: string | null
  setShowVoiceJoin: (v: string | null) => void
  showSearch: boolean
  setShowSearch: (v: boolean) => void
  showNotifications: boolean
  setShowNotifications: (v: boolean) => void
  showEmojiPicker: string | null
  setShowEmojiPicker: (v: string | null) => void
  showAttachmentMenu: boolean
  setShowAttachmentMenu: (v: boolean) => void
  showMemberProfile: string | null
  setShowMemberProfile: (v: string | null) => void
  showDMPopup: string | null
  setShowDMPopup: (v: string | null) => void
  showContextServer: string | null
  setShowContextServer: (v: string | null) => void
  contextMenuPos: { x: number; y: number }
  setContextMenuPos: (v: { x: number; y: number }) => void
  closeAll: () => void
}

const UIContext = createContext<UIContextType | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [showCreateServer, setShowCreateServer] = useState(false)
  const [showServerDropdown, setShowServerDropdown] = useState(false)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showVoiceJoin, setShowVoiceJoin] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [showMemberProfile, setShowMemberProfile] = useState<string | null>(null)
  const [showDMPopup, setShowDMPopup] = useState<string | null>(null)
  const [showContextServer, setShowContextServer] = useState<string | null>(null)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })

  const closeAll = useCallback(() => {
    setShowCreateServer(false)
    setShowServerDropdown(false)
    setShowCreateChannel(false)
    setShowProfileCard(false)
    setShowSettings(false)
    setShowVoiceJoin(null)
    setShowSearch(false)
    setShowNotifications(false)
    setShowEmojiPicker(null)
    setShowAttachmentMenu(false)
    setShowMemberProfile(null)
    setShowDMPopup(null)
    setShowContextServer(null)
  }, [])

  return (
    <UIContext.Provider
      value={{
        showCreateServer, setShowCreateServer,
        showServerDropdown, setShowServerDropdown,
        showCreateChannel, setShowCreateChannel,
        showProfileCard, setShowProfileCard,
        showSettings, setShowSettings,
        showVoiceJoin, setShowVoiceJoin,
        showSearch, setShowSearch,
        showNotifications, setShowNotifications,
        showEmojiPicker, setShowEmojiPicker,
        showAttachmentMenu, setShowAttachmentMenu,
        showMemberProfile, setShowMemberProfile,
        showDMPopup, setShowDMPopup,
        showContextServer, setShowContextServer,
        contextMenuPos, setContextMenuPos,
        closeAll,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error("useUI must be used within UIProvider")
  return ctx
}
