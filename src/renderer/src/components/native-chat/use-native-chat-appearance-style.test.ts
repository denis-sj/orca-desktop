// @vitest-environment happy-dom

import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAppStore } from '../../store'
import { getDefaultSettings } from '../../../../shared/constants'
import type { GlobalSettings } from '../../../../shared/global-settings-types'
import { useNativeChatAppearanceStyle } from './use-native-chat-appearance-style'
import { buildAppFontFamily } from '@/lib/app-font-family'

vi.mock('../terminal-pane/use-system-prefers-dark', () => ({
  useSystemPrefersDark: () => true
}))

describe('useNativeChatAppearanceStyle', () => {
  const baseSettings = getDefaultSettings('/tmp')

  beforeEach(() => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatAppearanceMode: 'default',
        chatFontFamily: '',
        chatFontSize: 13,
        chatLineHeight: 1.4,
        chatFontMono: '',
        terminalFontFamily: ''
      }
    })
  })

  afterEach(() => {
    useAppStore.setState({ settings: baseSettings })
  })

  it('returns default CSS variables and base styles when settings are empty', () => {
    const { result } = renderHook(() => useNativeChatAppearanceStyle())

    expect(result.current).toMatchObject({
      '--chat-font-family': 'var(--app-font-family)',
      '--chat-font-mono': 'var(--font-mono)',
      '--chat-font-size': '13px',
      '--chat-line-height': '1.4',
      fontFamily: 'var(--chat-font-family)',
      fontSize: 'var(--chat-font-size)',
      lineHeight: 'var(--chat-line-height)'
    })
    // In default mode without custom mono, does not set --font-mono to avoid circular reference
    expect(result.current['--font-mono']).toBeUndefined()
  })

  it('computes custom --chat-font-family when chatFontFamily is configured', () => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatFontFamily: 'Inter'
      } as GlobalSettings
    })

    const { result } = renderHook(() => useNativeChatAppearanceStyle())
    expect(result.current['--chat-font-family']).toBe(buildAppFontFamily('Inter'))
  })

  it('computes custom --chat-font-mono and maps --font-mono when chatFontMono is configured', () => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatFontMono: 'Fira Code'
      } as GlobalSettings
    })

    const { result } = renderHook(() => useNativeChatAppearanceStyle())
    expect(result.current['--chat-font-mono']).toBe(buildAppFontFamily('Fira Code'))
    expect(result.current['--font-mono']).toBe('var(--chat-font-mono)')
  })

  it('falls back to terminalFontFamily for --chat-font-mono when chatFontMono is empty', () => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatFontMono: '',
        terminalFontFamily: 'JetBrains Mono'
      } as GlobalSettings
    })

    const { result } = renderHook(() => useNativeChatAppearanceStyle())
    expect(result.current['--chat-font-mono']).toBe(buildAppFontFamily('JetBrains Mono'))
    expect(result.current['--font-mono']).toBe('var(--chat-font-mono)')
  })

  it('applies custom font size and line height', () => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatFontSize: 18,
        chatLineHeight: 1.8
      } as GlobalSettings
    })

    const { result } = renderHook(() => useNativeChatAppearanceStyle())
    expect(result.current['--chat-font-size']).toBe('18px')
    expect(result.current['--chat-line-height']).toBe('1.8')
  })

  it('resolves terminal surface variables when chatAppearanceMode is match-terminal', () => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatAppearanceMode: 'match-terminal',
        terminalColorOverrides: {
          background: '#123456',
          foreground: '#abcdef'
        }
      } as GlobalSettings
    })

    const { result } = renderHook(() => useNativeChatAppearanceStyle())
    expect(result.current['--background']).toBe('#123456')
    expect(result.current['--foreground']).toBe('#abcdef')
  })

  it('does not include terminal surface variables in default mode', () => {
    useAppStore.setState({
      settings: {
        ...baseSettings,
        chatAppearanceMode: 'default',
        terminalColorOverrides: {
          background: '#123456',
          foreground: '#abcdef'
        }
      } as GlobalSettings
    })

    const { result } = renderHook(() => useNativeChatAppearanceStyle())
    expect(result.current['--background']).toBeUndefined()
    expect(result.current['--foreground']).toBeUndefined()
  })
})
