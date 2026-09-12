import { useMemo, type CSSProperties } from 'react'
import { useAppStore } from '../../store'
import { buildAppFontFamily } from '@/lib/app-font-family'
import { resolveTerminalSurfaceVariables } from '@/lib/left-sidebar-appearance'
import { useSystemPrefersDark } from '../terminal-pane/use-system-prefers-dark'
import {
  DEFAULT_CHAT_FONT_SIZE,
  DEFAULT_CHAT_LINE_HEIGHT
} from '../../../../shared/chat-appearance-settings'

export function useNativeChatAppearanceStyle(): CSSProperties {
  const settings = useAppStore((state) => state.settings)
  const systemPrefersDark = useSystemPrefersDark()

  return useMemo(() => {
    const chatFontFamily = settings?.chatFontFamily?.trim()
      ? buildAppFontFamily(settings.chatFontFamily)
      : 'var(--app-font-family)'

    const resolvedChatMono = settings?.chatFontMono?.trim()
      ? buildAppFontFamily(settings.chatFontMono)
      : settings?.terminalFontFamily?.trim()
        ? buildAppFontFamily(settings.terminalFontFamily)
        : undefined

    const chatFontMono = resolvedChatMono ?? 'var(--font-mono)'
    const chatFontSize = `${settings?.chatFontSize ?? DEFAULT_CHAT_FONT_SIZE}px`
    const chatLineHeight = `${settings?.chatLineHeight ?? DEFAULT_CHAT_LINE_HEIGHT}`

    const terminalSurfaceVariables =
      settings && settings.chatAppearanceMode === 'match-terminal'
        ? resolveTerminalSurfaceVariables(settings, systemPrefersDark)
        : undefined

    return {
      '--chat-font-family': chatFontFamily,
      '--chat-font-mono': chatFontMono,
      '--chat-font-size': chatFontSize,
      '--chat-line-height': chatLineHeight,
      ...(resolvedChatMono ? { '--font-mono': 'var(--chat-font-mono)' } : {}),
      fontFamily: 'var(--chat-font-family)',
      fontSize: 'var(--chat-font-size)',
      lineHeight: 'var(--chat-line-height)',
      ...terminalSurfaceVariables
    } as CSSProperties
  }, [settings, systemPrefersDark])
}
