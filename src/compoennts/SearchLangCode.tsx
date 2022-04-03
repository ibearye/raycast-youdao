import { List } from '@raycast/api';
import __ from '../i18n';
import { languages } from '../utils';
import Actions, { ActionType } from './Actions';

export default function () {
  return (
    <List searchBarPlaceholder={__('请输入关键词搜索')} enableFiltering>
      {languages.map(([name, code]) => (
        <List.Item
          key={code}
          title={__(name)}
          subtitle={code}
          actions={<Actions type={ActionType.SEARCH_LANG_CODE} content={code} />}
        />
      ))}
    </List>
  );
}
