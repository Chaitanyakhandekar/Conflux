import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import AppSidebar from "../components/workspace/AppSidebar"
import WorkspaceSidebar from "../components/workspace/WorkspaceSidebar"
import DMSidebar from "../components/dm/DMSidebar"
import DMHub from "../components/dm/DMHub"
import ChatHeader from "../components/workspace/ChatHeader"
import MessageList from "../components/workspace/MessageList"
import MessageInput from "../components/workspace/MessageInput"
import MembersSidebar from "../components/workspace/MembersSidebar"
import CreateServerModal from "../components/modals/CreateServerModal"
import ServerDropdown from "../components/modals/ServerDropdown"
import CreateChannelModal from "../components/modals/CreateChannelModal"
import ProfileCard from "../components/modals/ProfileCard"
import SettingsModal from "../components/modals/SettingsModal"
import VoiceJoinModal from "../components/modals/VoiceJoinModal"
import SearchOverlay from "../components/modals/SearchOverlay"
import NotificationPanel from "../components/modals/NotificationPanel"
import EmojiPicker from "../components/modals/EmojiPicker"
import AttachmentMenu from "../components/modals/AttachmentMenu"
import MemberProfilePopup from "../components/modals/MemberProfilePopup"
import DMPopup from "../components/modals/DMPopup"
import ContextMenu from "../components/modals/ContextMenu"
import { useUI } from "../contexts/UIContext"

function WorkspaceLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const serverNameRef = useRef<HTMLDivElement>(null)
  const [serverDropdownRect, setServerDropdownRect] = useState<{ top: number; left: number; height: number } | undefined>()

  const {
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
    contextMenuPos,
    showDMHub,
    closeAll,
  } = useUI()

  useEffect(() => {
    const handleGlobalContext = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-context-trigger]')) return
    }
    const handleGlobalClick = () => {
      if (showContextServer) setShowContextServer(null)
    }
    document.addEventListener("contextmenu", handleGlobalContext)
    document.addEventListener("click", handleGlobalClick)
    return () => {
      document.removeEventListener("contextmenu", handleGlobalContext)
      document.removeEventListener("click", handleGlobalClick)
    }
  }, [showContextServer, setShowContextServer])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [closeAll])

  const openServerDropdown = () => {
    if (serverNameRef.current) {
      const rect = serverNameRef.current.getBoundingClientRect()
      setServerDropdownRect({ top: rect.top, left: rect.left, height: rect.height })
    }
    setShowServerDropdown(true)
  }

  return (
    <div className="h-full w-full flex bg-[#070B17] text-white font-sans relative">
      <div className="hidden lg:flex">
        <AppSidebar />
      </div>

      {showDMHub ? (
        <div className="hidden lg:flex">
          <DMSidebar />
        </div>
      ) : (
        <div className="hidden lg:flex">
          <WorkspaceSidebar />
        </div>
      )}

      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 z-50 flex lg:hidden">
            <AppSidebar />
            {showDMHub ? <DMSidebar /> : <WorkspaceSidebar />}
            <button
              className="absolute -right-10 top-4 w-9 h-9 rounded-full bg-[#0C1322] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#94A3B8]"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X size={16} />
            </button>
          </div>
        </>
      )}

      {showDMHub ? (
        <DMHub />
      ) : (
        <>
          <main className="flex-1 flex flex-col min-w-0 bg-[#091223]">
            <ChatHeader onMenuClick={() => setMobileSidebarOpen(true)} />
            <MessageList />
            <MessageInput />
          </main>
          <div className="hidden xl:flex">
            <MembersSidebar />
          </div>
        </>
      )}

      <CreateServerModal open={showCreateServer} onClose={() => setShowCreateServer(false)} />

      <div ref={serverNameRef}>
        <ServerDropdown
          open={showServerDropdown}
          onClose={() => setShowServerDropdown(false)}
          anchorRect={serverDropdownRect}
        />
      </div>

      <CreateChannelModal open={showCreateChannel} onClose={() => setShowCreateChannel(false)} />

      <ProfileCard open={showProfileCard} onClose={() => setShowProfileCard(false)} />

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />

      <VoiceJoinModal
        open={!!showVoiceJoin}
        onClose={() => setShowVoiceJoin(null)}
        channelName={showVoiceJoin}
      />

      <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />

      <NotificationPanel open={showNotifications} onClose={() => setShowNotifications(false)} />

      <EmojiPicker open={showEmojiPicker} onClose={() => setShowEmojiPicker(null)} />

      <AttachmentMenu open={showAttachmentMenu} onClose={() => setShowAttachmentMenu(false)} />

      <MemberProfilePopup open={showMemberProfile} onClose={() => setShowMemberProfile(null)} />

      <DMPopup open={showDMPopup} onClose={() => setShowDMPopup(null)} />

      <ContextMenu
        open={showContextServer}
        onClose={() => setShowContextServer(null)}
        x={contextMenuPos.x}
        y={contextMenuPos.y}
      />
    </div>
  )
}

export default WorkspaceLayout
