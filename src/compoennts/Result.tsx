import { memo } from 'react';
import { List } from '@raycast/api';
import { TranslationResult } from '../types';

import Actions, { ActionType } from './Actions';
import __ from '../i18n';

export default memo(function ({ result }: { result: TranslationResult | null }) {
  if (!result) {
    return <></>;
  }

  const phonetic = (() => {
    if (!result.basic) {
      return '';
    }

    if (result.basic?.['uk-phonetic']) {
      return `${__('英')} ${result.basic['uk-phonetic']}, ${__('美')} ${result.basic['us-phonetic']}`;
    }

    return result.basic.phonetic;
  })();

  return (
    <>
      <List.Section title={__('结果')}>
        <List.Item
          title={result.translation.join(', ')}
          accessories={result.tSpeakUrl ? [{ icon: '🎺' }] : []}
          actions={
            <Actions
              type={ActionType.RESULT_VIEW}
              pronunciation={result.tSpeakUrl}
              content={result.translation.join(', ')}
            />
          }
        />
      </List.Section>
      <List.Section title={__('发音')}>
        {phonetic ?? result?.basic?.phonetic ? (
          <List.Item
            title={phonetic ?? result?.basic?.phonetic ?? ''}
            accessories={[{ icon: '🎺' }]}
            actions={<Actions type={ActionType.RESULT_VIEW} pronunciation={result?.speakUrl} />}
          />
        ) : null}
      </List.Section>
      <List.Section title={__('详情')}>
        {result?.basic?.explains.map((item, index) => (
          <List.Item key={index} title={item} actions={<Actions type={ActionType.RESULT_VIEW} content={item} />} />
        ))}
      </List.Section>
      <List.Section title={__('网络释义')}>
        {result?.web?.map((item, index) => (
          <List.Item
            key={index}
            title={item.key}
            subtitle={item.value.join(', ')}
            actions={<Actions type={ActionType.RESULT_VIEW} content={item.key} />}
          />
        ))}
      </List.Section>
    </>
  );
});
