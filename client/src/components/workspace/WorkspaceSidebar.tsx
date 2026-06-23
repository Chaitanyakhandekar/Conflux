import { ChevronDown } from "lucide-react"
import ChannelList from "./ChannelList"

function WorkspaceSidebar() {
  return (
    <aside className="w-[250px] h-full bg-[#101727] flex flex-col flex-shrink-0 border-r border-[rgba(255,255,255,0.06)]">
      <div className="h-[70px] flex items-center justify-between px-[18px] border-b border-[rgba(255,255,255,0.06)] flex-shrink-0">
        <h1 className="text-white text-base font-semibold tracking-tight">Conflux HQ</h1>
        <ChevronDown size={16} className="text-[#94A3B8]" />
      </div>

      <div className="flex-1 overflow-hidden pt-[18px]">
        <ChannelList />
      </div>
    </aside>
  )
}

export default WorkspaceSidebar
