import { z } from "zod"
import {
  SearchWorkflowSchema,
  QAWorkflowSchema,
  QuerySchema,
} from "../models/schemas/routing"
import { useMessages } from "../hooks/useMessages"
import type { recursiveSearchAndCompileResults } from "../apis/zotero/search"

export type ActionStatus = "IN_PROGRESS" | "COMPLETED"

export type SearchActionType = z.infer<typeof SearchWorkflowSchema> & {
  type: "search"
  mode: "search" | "qa" | "fulltext"
  output?: Awaited<ReturnType<typeof recursiveSearchAndCompileResults>>
}

export type QAActionType = z.infer<typeof QAWorkflowSchema> & {
  type: "qa"
  input: any
  output?: any
}

export type RetryActionType = {
  type: "retry"
  input: any
  output?: any
}

export type FileActionType = {
  type: "file"
  input: {
    searchResultsStepId: string
  }
  output?: any
}

export type ActionType =
  | SearchActionType
  | QAActionType
  | RetryActionType
  | FileActionType

export type QueryType = NonNullable<z.infer<typeof QuerySchema>>

interface BaseActionStepControl {
  scrollToEnd: () => void
  pauseScroll: () => void
  resumeScroll: () => void
  updateBotAction: ReturnType<typeof useMessages>["updateBotAction"]
  addFunctionCallOutput: (tool_call_id: string, output: string) => void
}

export interface SearchActionStepControl extends BaseActionStepControl {
  getBotStep: ReturnType<typeof useMessages>["getBotStep"]
  addBotStep: ReturnType<typeof useMessages>["addBotStep"]
  updateBotStep: ReturnType<typeof useMessages>["updateBotStep"]
}

export interface FileActionStepControl extends BaseActionStepControl {
  getBotStep: ReturnType<typeof useMessages>["getBotStep"]
  addBotStep: ReturnType<typeof useMessages>["addBotStep"]
  updateBotStep: ReturnType<typeof useMessages>["updateBotStep"]
  completeBotMessageStep: ReturnType<
    typeof useMessages
  >["completeBotMessageStep"]
}

export interface QAActionStepControl extends BaseActionStepControl {
  updateBotStep: ReturnType<typeof useMessages>["updateBotStep"]
}

export interface RetryActionStepControl extends BaseActionStepControl {
  addUserMessage: ReturnType<typeof useMessages>["addUserMessage"]
  addBotMessage: ReturnType<typeof useMessages>["addBotMessage"]
}

export interface ErrorActionStepControl extends BaseActionStepControl {}

export type ActionStepControl = SearchActionStepControl &
  FileActionStepControl &
  QAActionStepControl &
  RetryActionStepControl
