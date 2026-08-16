export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  online: boolean
  status: string
  role: "Admin" | "Moderator" | "Member"
}

export const users: User[] = [
  {
    id: "1",
    username: "Sarah",
    displayName: "Sarah",
    avatar: "",
    online: true,
    status: "Coding",
    role: "Admin",
  },
  // {
  //   id: "2",
  //   username: "Alex",
  //   displayName: "Alex",
  //   avatar: "",
  //   online: true,
  //   status: "In Voice",
  //   role: "Moderator",
  // },
  // {
  //   id: "3",
  //   username: "Rohan",
  //   displayName: "Rohan",
  //   avatar: "",
  //   online: true,
  //   status: "Idle",
  //   role: "Moderator",
  // },
  // {
  //   id: "4",
  //   username: "Priya",
  //   displayName: "Priya",
  //   avatar: "",
  //   online: true,
  //   status: "Browsing #frontend-help",
  //   role: "Member",
  // },
  // {
  //   id: "5",
  //   username: "Jordan",
  //   displayName: "Jordan",
  //   avatar: "",
  //   online: true,
  //   status: "Online",
  //   role: "Member",
  // },
  // {
  //   id: "6",
  //   username: "Mike",
  //   displayName: "Mike",
  //   avatar: "",
  //   online: false,
  //   status: "Offline",
  //   role: "Member",
  // },
  // {
  //   id: "7",
  //   username: "Kevin",
  //   displayName: "Kevin",
  //   avatar: "",
  //   online: false,
  //   status: "Offline",
  //   role: "Member",
  // },
  // {
  //   id: "8",
  //   username: "Aman",
  //   displayName: "Aman",
  //   avatar: "",
  //   online: false,
  //   status: "Offline",
  //   role: "Member",
  // },
]
