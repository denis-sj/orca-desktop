import type { GlobalSettings } from './global-settings-types'
import type { ChatAppearanceMode } from './ui-chrome-types'

export const DEFAULT_CHAT_APPEARANCE_MODE: ChatAppearanceMode = 'default'
export const DEFAULT_CHAT_FONT_FAMILY = ''
export const DEFAULT_CHAT_FONT_SIZE = 13
export const MIN_CHAT_FONT_SIZE = 10
export const MAX_CHAT_FONT_SIZE = 24
export const DEFAULT_CHAT_LINE_HEIGHT = 1.4
export const MIN_CHAT_LINE_HEIGHT = 1
export const MAX_CHAT_LINE_HEIGHT = 3
export const DEFAULT_CHAT_FONT_MONO = ''

export function normalizeChatAppearanceMode(value: unknown): ChatAppearanceMode {
  return value === 'match-terminal' ? 'match-terminal' : 'default'
}

export function normalizeChatFontSize(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return DEFAULT_CHAT_FONT_SIZE
  }
  return Math.min(MAX_CHAT_FONT_SIZE, Math.max(MIN_CHAT_FONT_SIZE, Math.round(value)))
}

export function normalizeChatLineHeight(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return DEFAULT_CHAT_LINE_HEIGHT
  }
  const clamped = Math.min(MAX_CHAT_LINE_HEIGHT, Math.max(MIN_CHAT_LINE_HEIGHT, value))
  return Number(clamped.toFixed(2))
}

export function normalizeChatFontFamily(value: unknown): string {
  if (typeof value !== 'string') {
    return DEFAULT_CHAT_FONT_FAMILY
  }
  return value.trim()
}

export function normalizeChatFontMono(value: unknown): string {
  if (typeof value !== 'string') {
    return DEFAULT_CHAT_FONT_MONO
  }
  return value.trim()
}

export function applyChatSettingsNormalizations(
  updates: Partial<GlobalSettings>,
  sanitized: Partial<GlobalSettings>
): void {
  if ('chatAppearanceMode' in updates) {
    sanitized.chatAppearanceMode = normalizeChatAppearanceMode(updates.chatAppearanceMode)
  }
  if ('chatFontFamily' in updates) {
    sanitized.chatFontFamily = normalizeChatFontFamily(updates.chatFontFamily)
  }
  if ('chatFontSize' in updates) {
    sanitized.chatFontSize = normalizeChatFontSize(updates.chatFontSize)
  }
  if ('chatLineHeight' in updates) {
    sanitized.chatLineHeight = normalizeChatLineHeight(updates.chatLineHeight)
  }
  if ('chatFontMono' in updates) {
    sanitized.chatFontMono = normalizeChatFontMono(updates.chatFontMono)
  }
}
