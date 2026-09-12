import type { SettingsSearchEntry } from './settings-search'
import { createLocalizedCatalog } from '@/i18n/localized-catalog'
import { translate } from '@/i18n/i18n'
import { translateSearchKeyword } from './settings-search-keywords'

export const getChatAppearanceSearchEntries = createLocalizedCatalog((): SettingsSearchEntry[] => [
  {
    title: translate(
      'auto.components.settings.ChatAppearanceSection.appearanceModeTitle',
      'Chat Theme'
    ),
    description: translate(
      'auto.components.settings.ChatAppearanceSection.appearanceModeDescription',
      'Choose whether chat surfaces follow the application theme or match your terminal colors.'
    ),
    keywords: [
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.theme',
        'theme'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.chat',
        'chat'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.terminal',
        'terminal'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.appearance',
        'appearance'
      )
    ]
  },
  {
    title: translate(
      'auto.components.settings.ChatAppearanceSection.fontFamilyTitle',
      'Chat Font Family'
    ),
    description: translate(
      'auto.components.settings.ChatAppearanceSection.fontFamilyDescription',
      'Custom font used for chat messages and the composer. Leave empty to use the interface font.'
    ),
    keywords: [
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.font',
        'font'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.chat',
        'chat'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.typography',
        'typography'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.family',
        'family'
      )
    ]
  },
  {
    title: translate(
      'auto.components.settings.ChatAppearanceSection.fontSizeTitle',
      'Chat Font Size'
    ),
    description: translate(
      'auto.components.settings.ChatAppearanceSection.fontSizeDescription',
      'Base font size for native chat messages and composer.'
    ),
    keywords: [
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.size',
        'size'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.fontSize',
        'font size'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.chat',
        'chat'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.typography',
        'typography'
      )
    ]
  },
  {
    title: translate(
      'auto.components.settings.ChatAppearanceSection.lineHeightTitle',
      'Chat Line Height'
    ),
    description: translate(
      'auto.components.settings.ChatAppearanceSection.lineHeightDescription',
      'Line spacing multiplier for chat messages.'
    ),
    keywords: [
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.lineHeight',
        'line height'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.spacing',
        'spacing'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.chat',
        'chat'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.leading',
        'leading'
      )
    ]
  },
  {
    title: translate(
      'auto.components.settings.ChatAppearanceSection.fontMonoTitle',
      'Chat Monospace Font'
    ),
    description: translate(
      'auto.components.settings.ChatAppearanceSection.fontMonoDescription',
      'Font used for code blocks and inline code in chat. Leave empty to follow the terminal font.'
    ),
    keywords: [
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.monospace',
        'monospace'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.code',
        'code'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.mono',
        'mono'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.chat',
        'chat'
      ),
      ...translateSearchKeyword(
        'auto.components.settings.ChatAppearanceSection.search.font',
        'font'
      )
    ]
  }
])
