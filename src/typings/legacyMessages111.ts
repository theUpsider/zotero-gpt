import { States } from "./input"
import { MentionValue } from "./input"

export interface FeedbackContent {
  id: string
  timestamp: string
  vote: "up" | "down"
  user: string | null
  messages: string
  env: "development" | "production"
}

export interface BotMessageProps {
  id: string
  timestamp: string
  type: "BOT_MESSAGE"
  content: any
  copyId?: string
  setCopyId: (id: string) => void
}

export interface UserMessageProps {
  id: string
  timestamp: string
  type: "USER_MESSAGE"
  content: MentionValue
  states: States
  copyId?: string
  setCopyId: (id: string) => void
  editId?: string
  setEditId: (id: string | undefined) => void
}

export type Message = UserMessageProps | BotMessageProps

export type BotMessageStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
