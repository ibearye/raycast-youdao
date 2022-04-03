import { getPreferenceValues } from '@raycast/api';
import path from 'path';
import { osLocaleSync } from 'os-locale';
import { I18n } from 'i18n';

const AUTO_LOCALE = 'auto';

const { locale = AUTO_LOCALE } = getPreferenceValues();

const i18n = new I18n();

i18n.configure({
  locales: ['en', 'zh-CN'],
  defaultLocale: locale === AUTO_LOCALE ? osLocaleSync() : locale,
  directory: path.join(__dirname, 'assets/locales')
});

export default i18n.__.bind(i18n);
