import AppSidebar from "../components/workspace/AppSidebar"
import WorkspaceSidebar from "../components/workspace/WorkspaceSidebar"
import ChatHeader from "../components/workspace/ChatHeader"
import MessageList from "../components/workspace/MessageList"
import MessageInput from "../components/workspace/MessageInput"
import ActivityPanel from "../components/workspace/ActivityPanel"

function WorkspaceLayout() {
  return (
    <div className="h-full w-full flex bg-[#070B17] text-white font-sans">
      <AppSidebar />
      <WorkspaceSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#0C1322]">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </main>

      <ActivityPanel />
    </div>
  )
}

export default WorkspaceLayout
