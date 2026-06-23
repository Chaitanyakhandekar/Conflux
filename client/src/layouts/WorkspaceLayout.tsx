import { useState } from "react"
import { X } from "lucide-react"
import AppSidebar from "../components/workspace/AppSidebar"
import WorkspaceSidebar from "../components/workspace/WorkspaceSidebar"
import ChatHeader from "../components/workspace/ChatHeader"
import MessageList from "../components/workspace/MessageList"
import MessageInput from "../components/workspace/MessageInput"
import MembersSidebar from "../components/workspace/MembersSidebar"

function WorkspaceLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="h-full w-full flex bg-[#070B17] text-white font-sans relative">
      <div className="hidden lg:flex">
        <AppSidebar />
      </div>

      <div className="hidden lg:flex">
        <WorkspaceSidebar />
      </div>

      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 z-50 flex lg:hidden">
            <AppSidebar />
            <WorkspaceSidebar />
            <button
              className="absolute -right-10 top-4 w-9 h-9 rounded-full bg-[#0C1322] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#94A3B8]"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X size={16} />
            </button>
          </div>
        </>
      )}

      <main className="flex-1 flex flex-col min-w-0 bg-[#091223]">
        <ChatHeader onMenuClick={() => setMobileSidebarOpen(true)} />
        <MessageList />
        <MessageInput />
      </main>

      <div className="hidden xl:flex">
        <MembersSidebar />
      </div>
    </div>
  )
}

export default WorkspaceLayout
