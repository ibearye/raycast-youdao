import { List } from '@raycast/api';
import __ from '../i18n';
import Actions, { ActionType } from './Actions';

export default function () {
  return (
    <List.EmptyView
      title={__('请输入要翻译的文本')}
      description={__(`请在搜索框内输入要翻译的文本\nCmd+F 查找语种代码, Cmd+P 修改翻译语言`)}
      icon={'📝'}
      actions={<Actions type={ActionType.EMPTY_VIEW} />}
    />
  );
}
