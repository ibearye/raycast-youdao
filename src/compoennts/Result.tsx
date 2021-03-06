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
      return `${__('θ±')} ${result.basic['uk-phonetic']}, ${__('ηΎ')} ${result.basic['us-phonetic']}`;
    }

    return result.basic.phonetic;
  })();

  return (
    <>
      <List.Section title={__('η»ζ')}>
        <List.Item
          title={result.translation.join(', ')}
          accessories={result.tSpeakUrl ? [{ icon: 'πΊ' }] : []}
          actions={
            <Actions
              type={ActionType.RESULT_VIEW}
              pronunciation={result.tSpeakUrl}
              content={result.translation.join(', ')}
            />
          }
        />
      </List.Section>
      <List.Section title={__('ει³')}>
        {phonetic ?? result?.basic?.phonetic ? (
          <List.Item
            title={phonetic ?? result?.basic?.phonetic ?? ''}
            accessories={[{ icon: 'πΊ' }]}
            actions={<Actions type={ActionType.RESULT_VIEW} pronunciation={result?.speakUrl} />}
          />
        ) : null}
      </List.Section>
      <List.Section title={__('θ―¦ζ')}>
        {result?.basic?.explains.map((item, index) => (
          <List.Item key={index} title={item} actions={<Actions type={ActionType.RESULT_VIEW} content={item} />} />
        ))}
      </List.Section>
      <List.Section title={__('η½η»ιδΉ')}>
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
