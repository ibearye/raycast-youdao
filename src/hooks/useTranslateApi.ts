import { useState, useCallback } from 'react';
import qs from 'querystring';
import __ from '../i18n';

import useDebouncedRequest from './useDebouncedRequest';

import { YOUDAO_API, generateSign, app_key, app_secret } from '../utils';
import { TranslationResult } from '../types';

export default () => {
  const debouncedFetch = useDebouncedRequest();
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const translate = useCallback((content: string, from: string, to: string) => {
    const q = Buffer.from(content).toString('utf-8');
    const salt = Date.now();
    const sign = generateSign(q, salt, app_key, app_secret);
    const query = qs.stringify({ q: q, appKey: app_key, from, to, salt, sign });
    setIsLoading(true);
    return debouncedFetch(`${YOUDAO_API}?${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((result) => {
        const res = result as TranslationResult;
        if (res.errorCode !== '0') {
          setError(
            new Error(
              __(
                '翻译出错，错误代码为 %s \n你可以从这里查找到所有错误代码及对应信息\nhttps://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html',
                res.errorCode
              )
            )
          );
        } else {
          setError(null);
        }
        setResult(res);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { translate, result, isLoading, error };
};
