function UpgradeCard() {
  return (
    <div className="rounded-[16px] bg-gradient-to-br from-[#7C6BFF] to-[#5B4FE0] p-5 flex flex-col items-start">
      <h3 className="text-white text-lg font-bold">Upgrade Pro</h3>
      <p className="text-sm text-[rgba(255,255,255,0.7)] mt-1 leading-[1.4]">
        Get advanced analytics and unlimited message history.
      </p>
      <button className="mt-4 px-5 py-2 rounded-[10px] bg-[rgba(0,0,0,0.25)] text-white text-sm font-medium hover:bg-[rgba(0,0,0,0.35)] transition-colors">
        Learn More
      </button>
    </div>
  )
}

export default UpgradeCard
