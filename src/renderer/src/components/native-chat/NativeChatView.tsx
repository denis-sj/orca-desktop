import { NativeChatSessionGate } from './NativeChatSessionGate'
import { NativeChatStructuredSession } from './NativeChatStructuredSession'
import { NativeChatResolvedView } from './NativeChatResolvedView'
import { useNativeChatStatusEntry } from './use-native-chat-status-entry'
import { useNativeChatAppearanceStyle } from './use-native-chat-appearance-style'
import type { NativeChatViewProps } from './native-chat-view-types'

export type { NativeChatViewProps } from './native-chat-view-types'

/** Resolves an agent terminal into its native conversation and composer UI. */
export default function NativeChatView(props: NativeChatViewProps): React.JSX.Element {
  const appearanceStyle = useNativeChatAppearanceStyle()
  return (
    <div className="h-full w-full min-h-0 native-chat-surface" style={appearanceStyle}>
      {props.mode === 'structured' ? (
        <NativeChatStructuredSession key={props.sessionId} {...props} />
      ) : (
        <NativeChatBridgeView {...props} />
      )}
    </div>
  )
}

function NativeChatBridgeView({
  terminalTabId,
  isVisible,
  paneKey: preferredPaneKey,
  targetPtyId = null,
  launchAgent,
  resolvedAgent,
  ownsTabWideLaunchDraft,
  onSwitchToTerminal,
  readTerminalScreen,
  contextMenuActions
}: Exclude<NativeChatViewProps, { mode: 'structured' }>): React.JSX.Element {
  const { entry: agentStatusEntry, paneKey } = useNativeChatStatusEntry(
    terminalTabId,
    preferredPaneKey
  )
  return (
    <NativeChatSessionGate
      paneKey={paneKey}
      launchAgent={launchAgent}
      resolvedAgent={resolvedAgent}
      agentStatusEntry={agentStatusEntry}
      ptyId={targetPtyId}
    >
      {(resolution) => (
        <NativeChatResolvedView
          paneKey={resolution.paneKey}
          agent={resolution.agent}
          sessionId={resolution.sessionId}
          transcriptPath={resolution.transcriptPath}
          isVisible={isVisible}
          targetPtyId={targetPtyId}
          terminalTabId={terminalTabId}
          ownsTabWideLaunchDraft={ownsTabWideLaunchDraft}
          onSwitchToTerminal={onSwitchToTerminal}
          readTerminalScreen={readTerminalScreen}
          contextMenuActions={contextMenuActions}
        />
      )}
    </NativeChatSessionGate>
  )
}
