import { messages } from "../../data/messages"
import MessageItem from "./MessageItem"

function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-[2px]">
      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          message={message}
          isFirst={true}
          sameUser={
            index > 0 && messages[index - 1].username === message.username
          }
        />
      ))}
    </div>
  )
}

export default MessageList
