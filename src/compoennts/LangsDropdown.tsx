import { memo } from 'react';
import { List } from '@raycast/api';
import { langs } from '../utils';
import __ from '../i18n';

export default memo(function ({ onChange }: { onChange?: (lang: string) => void }) {
  return (
    <List.Dropdown tooltip={__('选择原语言和目标语言')} onChange={onChange} placeholder={__('搜索')}>
      {langs.map(({ from, to }) => (
        <List.Dropdown.Item key={`${from} ${to}`} title={`${from} -> ${to}`} value={`${from} ${to}`} />
      ))}
    </List.Dropdown>
  );
});
