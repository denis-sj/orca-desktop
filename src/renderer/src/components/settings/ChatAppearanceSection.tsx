import type React from 'react'
import { Minus, Plus } from 'lucide-react'
import type { GlobalSettings } from '../../../../shared/global-settings-types'
import type { ChatAppearanceMode } from '../../../../shared/ui-chrome-types'
import {
  DEFAULT_CHAT_FONT_SIZE,
  DEFAULT_CHAT_LINE_HEIGHT,
  MAX_CHAT_FONT_SIZE,
  MAX_CHAT_LINE_HEIGHT,
  MIN_CHAT_FONT_SIZE,
  MIN_CHAT_LINE_HEIGHT
} from '../../../../shared/chat-appearance-settings'
import { translate } from '@/i18n/i18n'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  FontAutocomplete,
  NumberField,
  SettingsRow,
  SettingsSegmentedControl
} from './SettingsFormControls'
import { SearchableSetting } from './SearchableSetting'
import { getChatAppearanceSearchEntries } from './appearance-search'

export type ChatAppearanceSectionProps = {
  settings: GlobalSettings
  updateSettings: (updates: Partial<GlobalSettings>) => void
  fontSuggestions: string[]
  terminalFontSuggestions: string[]
  onRequestFontSuggestions?: () => void
  forceVisiblePrimary?: boolean
}

export function ChatAppearanceSection({
  settings,
  updateSettings,
  fontSuggestions,
  terminalFontSuggestions,
  onRequestFontSuggestions,
  forceVisiblePrimary = false
}: ChatAppearanceSectionProps): React.JSX.Element {
  const searchEntries = getChatAppearanceSearchEntries()

  return (
    <div className="divide-y divide-border/40">
      <SearchableSetting
        title={translate(
          'auto.components.settings.ChatAppearanceSection.appearanceModeTitle',
          'Chat Theme'
        )}
        description={searchEntries[0]?.description}
        keywords={searchEntries[0]?.keywords ?? ['theme', 'chat', 'terminal', 'appearance']}
        forceVisible={forceVisiblePrimary}
      >
        <SettingsRow
          alignTop
          label={translate(
            'auto.components.settings.ChatAppearanceSection.appearanceModeTitle',
            'Chat Theme'
          )}
          description={translate(
            'auto.components.settings.ChatAppearanceSection.appearanceModeDescription',
            'Choose whether chat surfaces follow the application theme or match your terminal colors.'
          )}
          control={
            <SettingsSegmentedControl<ChatAppearanceMode>
              size="sm"
              value={settings.chatAppearanceMode ?? 'default'}
              onChange={(chatAppearanceMode) => updateSettings({ chatAppearanceMode })}
              ariaLabel={translate(
                'auto.components.settings.ChatAppearanceSection.appearanceModeTitle',
                'Chat Theme'
              )}
              options={[
                {
                  value: 'default',
                  label: translate(
                    'auto.components.settings.ChatAppearanceSection.default',
                    'Default'
                  )
                },
                {
                  value: 'match-terminal',
                  label: translate(
                    'auto.components.settings.ChatAppearanceSection.matchTerminal',
                    'Match Terminal'
                  )
                }
              ]}
            />
          }
        />
      </SearchableSetting>

      <SearchableSetting
        title={translate(
          'auto.components.settings.ChatAppearanceSection.fontFamilyTitle',
          'Font Family'
        )}
        description={searchEntries[1]?.description}
        keywords={searchEntries[1]?.keywords ?? ['font', 'chat', 'typography', 'family']}
        forceVisible={forceVisiblePrimary}
      >
        <SettingsRow
          label={translate(
            'auto.components.settings.ChatAppearanceSection.fontFamilyTitle',
            'Font Family'
          )}
          control={
            <FontAutocomplete
              value={settings.chatFontFamily ?? ''}
              placeholder={translate(
                'auto.components.settings.ChatAppearanceSection.fontFamilyPlaceholder',
                'Same as interface font'
              )}
              suggestions={fontSuggestions}
              onRequestSuggestions={onRequestFontSuggestions}
              onChange={(value) => updateSettings({ chatFontFamily: value })}
            />
          }
        />
      </SearchableSetting>

      <SearchableSetting
        title={translate(
          'auto.components.settings.ChatAppearanceSection.fontSizeTitle',
          'Font Size'
        )}
        description={searchEntries[2]?.description}
        keywords={searchEntries[2]?.keywords ?? ['size', 'font size', 'chat', 'typography']}
        forceVisible={forceVisiblePrimary}
      >
        <SettingsRow
          label={translate(
            'auto.components.settings.ChatAppearanceSection.fontSizeTitle',
            'Font Size'
          )}
          control={
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  const current = settings.chatFontSize ?? DEFAULT_CHAT_FONT_SIZE
                  const next = Math.max(MIN_CHAT_FONT_SIZE, current - 1)
                  updateSettings({ chatFontSize: next })
                }}
                disabled={(settings.chatFontSize ?? DEFAULT_CHAT_FONT_SIZE) <= MIN_CHAT_FONT_SIZE}
              >
                <Minus className="size-3" />
              </Button>
              <Input
                type="number"
                min={MIN_CHAT_FONT_SIZE}
                max={MAX_CHAT_FONT_SIZE}
                value={settings.chatFontSize ?? DEFAULT_CHAT_FONT_SIZE}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value, 10)
                  if (
                    !Number.isNaN(value) &&
                    value >= MIN_CHAT_FONT_SIZE &&
                    value <= MAX_CHAT_FONT_SIZE
                  ) {
                    updateSettings({ chatFontSize: value })
                  }
                }}
                className="number-input-clean w-14 text-center tabular-nums"
              />
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  const current = settings.chatFontSize ?? DEFAULT_CHAT_FONT_SIZE
                  const next = Math.min(MAX_CHAT_FONT_SIZE, current + 1)
                  updateSettings({ chatFontSize: next })
                }}
                disabled={(settings.chatFontSize ?? DEFAULT_CHAT_FONT_SIZE) >= MAX_CHAT_FONT_SIZE}
              >
                <Plus className="size-3" />
              </Button>
              <span className="text-xs text-muted-foreground">
                {translate('auto.components.settings.ChatAppearanceSection.px', 'px')}
              </span>
            </div>
          }
        />
      </SearchableSetting>

      <SearchableSetting
        title={translate(
          'auto.components.settings.ChatAppearanceSection.lineHeightTitle',
          'Line Height'
        )}
        description={searchEntries[3]?.description}
        keywords={searchEntries[3]?.keywords ?? ['line height', 'spacing', 'chat', 'leading']}
        forceVisible={forceVisiblePrimary}
      >
        <NumberField
          label={translate(
            'auto.components.settings.ChatAppearanceSection.lineHeightTitle',
            'Line Height'
          )}
          description=""
          value={settings.chatLineHeight ?? DEFAULT_CHAT_LINE_HEIGHT}
          defaultValue={DEFAULT_CHAT_LINE_HEIGHT}
          min={MIN_CHAT_LINE_HEIGHT}
          max={MAX_CHAT_LINE_HEIGHT}
          step={0.1}
          suffix="1-3"
          onChange={(value) =>
            updateSettings({
              chatLineHeight: Number(
                Math.min(MAX_CHAT_LINE_HEIGHT, Math.max(MIN_CHAT_LINE_HEIGHT, value)).toFixed(2)
              )
            })
          }
        />
      </SearchableSetting>

      <SearchableSetting
        title={translate(
          'auto.components.settings.ChatAppearanceSection.fontMonoTitle',
          'Monospace Font'
        )}
        description={searchEntries[4]?.description}
        keywords={searchEntries[4]?.keywords ?? ['monospace', 'code', 'mono', 'chat', 'font']}
        forceVisible={forceVisiblePrimary}
      >
        <SettingsRow
          label={translate(
            'auto.components.settings.ChatAppearanceSection.fontMonoTitle',
            'Monospace Font'
          )}
          control={
            <FontAutocomplete
              value={settings.chatFontMono ?? ''}
              placeholder={translate(
                'auto.components.settings.ChatAppearanceSection.fontMonoPlaceholder',
                'Same as terminal font'
              )}
              suggestions={terminalFontSuggestions}
              onRequestSuggestions={onRequestFontSuggestions}
              onChange={(value) => updateSettings({ chatFontMono: value })}
            />
          }
        />
      </SearchableSetting>
    </div>
  )
}
