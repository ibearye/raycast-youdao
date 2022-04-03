import { ActionPanel, Action, Icon, useNavigation, Clipboard, showToast } from '@raycast/api';
import React from 'react';
import { pronounce } from '../utils';
import __ from '../i18n';

import SearchLangCode from './SearchLangCode';

export const enum ActionType {
  RESULT_VIEW,
  EMPTY_VIEW,
  HOME_VIEW,
  ERROR_VIEW,
  SEARCH_LANG_CODE
}

function Actions(props: { type: ActionType.ERROR_VIEW }): React.ReactElement;
function Actions(props: { type: ActionType.EMPTY_VIEW }): React.ReactElement;
function Actions(props: { type: ActionType.RESULT_VIEW; content?: string; pronunciation?: string }): React.ReactElement;
function Actions(props: { type: ActionType.ERROR_VIEW }): React.ReactElement;
function Actions(props: { type: ActionType.SEARCH_LANG_CODE; content: string }): React.ReactElement;
function Actions({
  type,
  content,
  pronunciation
}: {
  type: ActionType;
  content?: string;
  pronunciation?: string;
}): React.ReactElement {
  const { push } = useNavigation();
  if (type === ActionType.RESULT_VIEW) {
    return (
      <ActionPanel>
        {content ? <Action.CopyToClipboard title={__('复制文本')} content={content} /> : null}
        {pronunciation ? (
          <Action
            title={__('播放发音')}
            icon={Icon.Bubble}
            onAction={() => pronounce(pronunciation)}
            shortcut={{ modifiers: ['cmd'], key: 'return' }}
          />
        ) : null}
        <Action
          title={__('查找语种代码')}
          icon={Icon.MagnifyingGlass}
          shortcut={{ modifiers: ['cmd'], key: 'f' }}
          onAction={() => push(<SearchLangCode />)}
        />
      </ActionPanel>
    );
  }

  if (type === ActionType.ERROR_VIEW || type === ActionType.EMPTY_VIEW || type === ActionType.HOME_VIEW) {
    return (
      <ActionPanel>
        <Action
          title={__('查找语种代码')}
          icon={Icon.MagnifyingGlass}
          shortcut={{ modifiers: ['cmd'], key: 'f' }}
          onAction={() => push(<SearchLangCode />)}
        />
      </ActionPanel>
    );
  }

  if (type === ActionType.SEARCH_LANG_CODE) {
    return (
      <ActionPanel>
        <Action
          title={__('复制语种代码')}
          icon={Icon.Clipboard}
          onAction={() => {
            if (content) {
              Clipboard.copy(content).then(() => showToast({ title: __('复制成功') }));
            }
          }}
        />
      </ActionPanel>
    );
  }

  return <></>;
}

export default Actions;
