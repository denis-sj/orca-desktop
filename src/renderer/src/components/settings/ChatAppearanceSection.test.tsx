// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import type { GlobalSettings } from '../../../../shared/global-settings-types'
import { ChatAppearanceSection } from './ChatAppearanceSection'

vi.mock('@/i18n/i18n', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    translate: (_key: string, defaultValue: string) => defaultValue
  }
})

describe('ChatAppearanceSection', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => root.unmount())
    document.body.replaceChildren()
  })

  const baseSettings: GlobalSettings = {
    chatAppearanceMode: 'default',
    chatFontFamily: '',
    chatFontSize: 13,
    chatLineHeight: 1.4,
    chatFontMono: ''
  } as GlobalSettings

  function renderSection(
    settings: Partial<GlobalSettings> = {},
    updateSettings: Mock = vi.fn()
  ): { updateSettings: Mock } {
    act(() => {
      root.render(
        <ChatAppearanceSection
          settings={{ ...baseSettings, ...settings }}
          updateSettings={updateSettings}
          fontSuggestions={['Inter', 'Geist', 'Roboto']}
          terminalFontSuggestions={['JetBrains Mono', 'Fira Code', 'Menlo']}
          forceVisiblePrimary
        />
      )
    })
    return { updateSettings }
  }

  it('renders all appearance controls with expected default values', () => {
    renderSection()

    // Segmented control options
    expect(container.textContent).toContain('Chat Theme')
    expect(container.textContent).toContain('Default')
    expect(container.textContent).toContain('Match Terminal')

    // Font family row
    expect(container.textContent).toContain('Font Family')

    // Font size row
    expect(container.textContent).toContain('Font Size')
    const fontSizeInput = container.querySelector<HTMLInputElement>('input[type="number"]')
    expect(fontSizeInput?.value).toBe('13')

    // Line height row
    expect(container.textContent).toContain('Line Height')

    // Monospace font row
    expect(container.textContent).toContain('Monospace Font')
  })

  it('updates chatAppearanceMode when selecting Match Terminal or Default', () => {
    const { updateSettings } = renderSection({ chatAppearanceMode: 'default' })

    const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('button'))
    const matchTerminalBtn = buttons.find((btn) => btn.textContent?.includes('Match Terminal'))
    expect(matchTerminalBtn).toBeDefined()

    act(() => matchTerminalBtn?.click())
    expect(updateSettings).toHaveBeenCalledWith({ chatAppearanceMode: 'match-terminal' })
  })

  it('updates chatFontSize using minus and plus stepper buttons', () => {
    const { updateSettings } = renderSection({ chatFontSize: 14 })

    const stepperButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>('button')
    ).filter((btn) => btn.querySelector('svg.lucide-minus, svg.lucide-plus'))

    expect(stepperButtons.length).toBe(2)
    const [decrement, increment] = stepperButtons

    act(() => increment.click())
    expect(updateSettings).toHaveBeenCalledWith({ chatFontSize: 15 })

    act(() => decrement.click())
    expect(updateSettings).toHaveBeenCalledWith({ chatFontSize: 13 })
  })

  it('disables stepper buttons at minimum and maximum font size boundaries', () => {
    renderSection({ chatFontSize: 10 })
    const buttonsAtMin = Array.from(container.querySelectorAll<HTMLButtonElement>('button')).filter(
      (btn) => btn.querySelector('svg.lucide-minus, svg.lucide-plus')
    )
    expect(buttonsAtMin[0]?.disabled).toBe(true)
    expect(buttonsAtMin[1]?.disabled).toBe(false)

    renderSection({ chatFontSize: 24 })
    const buttonsAtMax = Array.from(container.querySelectorAll<HTMLButtonElement>('button')).filter(
      (btn) => btn.querySelector('svg.lucide-minus, svg.lucide-plus')
    )
    expect(buttonsAtMax[0]?.disabled).toBe(false)
    expect(buttonsAtMax[1]?.disabled).toBe(true)
  })

  it('updates chatFontSize when typed into input within range', () => {
    const { updateSettings } = renderSection({ chatFontSize: 13 })
    const input = container.querySelector<HTMLInputElement>('input[type="number"]')
    expect(input).toBeDefined()

    act(() => {
      if (input) {
        const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        setValue?.call(input, '16')
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
    expect(updateSettings).toHaveBeenCalledWith({ chatFontSize: 16 })
  })

  it('updates chatFontFamily through font autocomplete', () => {
    const { updateSettings } = renderSection({ chatFontFamily: '' })
    const comboboxes = Array.from(
      container.querySelectorAll<HTMLInputElement>('input[role="combobox"]')
    )
    const fontFamilyInput = comboboxes[0]
    expect(fontFamilyInput).toBeDefined()

    act(() => {
      if (fontFamilyInput) {
        const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        setValue?.call(fontFamilyInput, 'Inter')
        fontFamilyInput.dispatchEvent(new Event('input', { bubbles: true }))
        fontFamilyInput.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
    expect(updateSettings).toHaveBeenCalledWith({ chatFontFamily: 'Inter' })
  })

  it('updates chatFontMono through monospace autocomplete', () => {
    const { updateSettings } = renderSection({ chatFontMono: '' })
    const comboboxes = Array.from(
      container.querySelectorAll<HTMLInputElement>('input[role="combobox"]')
    )
    const fontMonoInput = comboboxes[1]
    expect(fontMonoInput).toBeDefined()

    act(() => {
      if (fontMonoInput) {
        const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        setValue?.call(fontMonoInput, 'JetBrains Mono')
        fontMonoInput.dispatchEvent(new Event('input', { bubbles: true }))
        fontMonoInput.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
    expect(updateSettings).toHaveBeenCalledWith({ chatFontMono: 'JetBrains Mono' })
  })
})
