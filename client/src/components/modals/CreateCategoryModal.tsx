import { useState } from "react"
import Modal from "../ui/Modal"
import { useServerStore } from "../../store/server-store."
import { useAuthStore } from "../../store/auth-store"
import { useCategory } from "../../hooks/useCategory"

interface Props {
  open: boolean
  onClose: () => void
}

function CreateCategoryModal({ open, onClose }: Props) {
  const [categoryName, setCategoryName] = useState("")

  const { selectedServer } = useServerStore()
  const { createCategory, loading } = useCategory()
  const { user } = useAuthStore()

  const handleCreate = async () => {
    if (!categoryName.trim() || !selectedServer || !user) return;

    await createCategory({
      name: categoryName,
      serverId: selectedServer._id,
      createdBy: user._id
    })
    
    setCategoryName("")
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} width="480px">
      <div className="p-6">
        <h2 className="text-[20px] font-bold text-white">Create Category</h2>

        <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mt-5 block mb-2">
          Category Name
        </label>
        <div className="relative">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="New Category"
            className="w-full h-[40px] bg-[rgba(255,255,255,0.03)] rounded-[8px] px-3 text-sm text-white placeholder-[#64748B] outline-none border border-[rgba(255,255,255,0.06)] focus:border-[#8B7DFF] transition-all"
          />
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#94A3B8] hover:text-white transition-colors">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!categoryName.trim() || loading}
            className="px-5 py-2 rounded-[8px] bg-[#8B7DFF] text-white text-sm font-semibold hover:bg-[#7C6BFF] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(139,125,255,0.15)] transition-all duration-200"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateCategoryModal
