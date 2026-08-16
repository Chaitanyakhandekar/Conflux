import { useState } from "react"
import DMTopTabs from "./DMTopTabs"
import ConversationSearch from "./ConversationSearch"
import ConversationList from "./ConversationList"
import AddContactModal from "./AddContactModal"

function DMHub() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [showAddContact, setShowAddContact] = useState(false)

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#091223]">
      <DMTopTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddContact={() => setShowAddContact(true)}
      />
      <ConversationSearch value={search} onChange={setSearch} />
      <ConversationList />
      <AddContactModal open={showAddContact} onClose={() => setShowAddContact(false)} />
    </main>
  )
}

export default DMHub
