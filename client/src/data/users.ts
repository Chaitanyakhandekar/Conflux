export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  online: boolean
  status: string
}

export const users: User[] = [
  {
    id: "1",
    username: "sarah_dev",
    displayName: "Sarah Dev",
    avatar: "",
    online: true,
    status: "Refactoring...",
  },
  {
    id: "2",
    username: "alex_ops",
    displayName: "Alex Ops",
    avatar: "",
    online: true,
    status: "Monitoring CI/CD",
  },
  {
    id: "3",
    username: "mark_ui",
    displayName: "Mark UI",
    avatar: "",
    online: false,
    status: "Offline",
  },
]
