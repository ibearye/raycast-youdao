import { useEffect, useState } from 'react';
import { List, ActionPanel, Action, useNavigation } from '@raycast/api';

import __ from './i18n';

import { useDebouncedState, useTranslateApi } from './hooks';

import Result from './compoennts/Result';
import Empty from './compoennts/Empty';
import Error from './compoennts/Error';
import LangsDropdown from './compoennts/LangsDropdown';
import SearchLangCode from './compoennts/SearchLangCode';

export default function () {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const [lang, setLang] = useState('auto auto');

  const { translate, result, isLoading, error } = useTranslateApi();

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    const [from, to] = lang.split(' ');
    translate(searchText, from, to);
  }, [searchText, lang]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder={__('请输入要翻译的文本')}
      searchBarAccessory={<LangsDropdown onChange={setLang} />}
      actions={<Actions />}
    >
      {searchText === '' ? <Empty /> : error ? <Error error={error} /> : <Result result={result} />}
    </List>
  );
}

function Actions() {
  const { push } = useNavigation();

  return (
    <ActionPanel>
      <Action title={__('查找语种代码')} onAction={() => push(<SearchLangCode />)} />
    </ActionPanel>
  );
}
