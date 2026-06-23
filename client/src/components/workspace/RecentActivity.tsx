import { GitCommit, CheckCircle, AlertTriangle } from "lucide-react"

const activities = [
  {
    icon: GitCommit,
    color: "#7C6BFF",
    title: "Updated auth-api",
    time: "2 hours ago",
  },
  {
    icon: CheckCircle,
    color: "#22C55E",
    title: "Production build success",
    time: "5 hours ago",
  },
  {
    icon: AlertTriangle,
    color: "#F59E0B",
    title: "Security audit warning",
    time: "1 day ago",
  },
]

function RecentActivity() {
  return (
    <div>
      <span className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase">Recent Activity</span>

      <div className="mt-3 space-y-2">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="p-3 rounded-[10px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-start gap-3"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${activity.color}15` }}
            >
              <activity.icon size={15} style={{ color: activity.color }} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-white truncate">{activity.title}</span>
              <span className="text-[12px] text-[#94A3B8]">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
