import OnlineUsers from "./OnlineUsers"
import RecentActivity from "./RecentActivity"
import UpgradeCard from "./UpgradeCard"

function ActivityPanel() {
  return (
    <aside className="w-[260px] h-full bg-[#101727] flex flex-col flex-shrink-0 border-l border-[rgba(255,255,255,0.06)] overflow-y-auto">
      <div className="p-5 space-y-6">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase">Workspace Details</span>
        </div>

        <OnlineUsers />

        <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

        <RecentActivity />

        <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />

        <UpgradeCard />
      </div>
    </aside>
  )
}

export default ActivityPanel
