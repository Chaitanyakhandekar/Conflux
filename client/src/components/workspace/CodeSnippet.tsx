import { Copy } from "lucide-react"

interface CodeSnippetProps {
  filename: string
  language: string
  code: string
}

function CodeSnippet({ filename, language, code }: CodeSnippetProps) {
  return (
    <div className="mt-2 rounded-[10px] bg-[#0A1020] border border-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.04)]">
        <div className="flex items-center gap-2 text-[13px] text-[#94A3B8]">
          <span className="text-[#8B7DFF] text-xs">▸</span>
          <span>{filename}</span>
        </div>
        <button className="flex items-center gap-1.5 text-[12px] text-[#94A3B8] hover:text-white transition-colors">
          <Copy size={13} />
          <span>Copy</span>
        </button>
      </div>
      <pre className="p-4 text-[13px] leading-[1.5] font-[Menlo,Consolas,monospace] text-[#C9D1D9] overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeSnippet
