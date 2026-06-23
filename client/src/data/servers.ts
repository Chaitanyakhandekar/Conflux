export interface Server {
  id: string
  name: string
  icon: string
  initials: string
  gradient: string
}

export const servers: Server[] = [
  {
    id: "1",
    name: "Conflux",
    icon: "",
    initials: "CF",
    gradient: "from-[#7C6BFF] to-[#5B4FE0]",
  },
  {
    id: "2",
    name: "Gaming Server",
    icon: "",
    initials: "GS",
    gradient: "from-[#FF6B6B] to-[#EE4444]",
  },
  {
    id: "3",
    name: "Dev Community",
    icon: "",
    initials: "DC",
    gradient: "from-[#22C55E] to-[#16A34A]",
  },
  {
    id: "4",
    name: "Study Group",
    icon: "",
    initials: "SG",
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
  {
    id: "5",
    name: "Anime Club",
    icon: "",
    initials: "AC",
    gradient: "from-[#EC4899] to-[#DB2777]",
  },
]
