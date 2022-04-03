import { List } from '@raycast/api';
import __ from '../i18n';
import Actions, { ActionType } from './Actions';

export default function ({ error }: { error: Error }) {
  return (
    <List.EmptyView
      title={__('出错了')}
      description={error.message}
      icon={'😣'}
      actions={<Actions type={ActionType.EMPTY_VIEW} />}
    />
  );
}
