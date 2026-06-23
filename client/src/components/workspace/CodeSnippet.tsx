import { FileCode, Copy } from "lucide-react"

interface CodeSnippetProps {
  filename: string
  language: string
  code: string
}

function CodeSnippet({ filename, language, code }: CodeSnippetProps) {
  return (
    <div className="mt-3 rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0A1020] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-[10px] border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <FileCode size={15} />
          <span>{filename}</span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors">
          <Copy size={13} />
          <span>Copy</span>
        </button>
      </div>
      <pre className="p-4 text-[13px] leading-[1.6] font-mono text-[#E2E8F0] overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeSnippet
