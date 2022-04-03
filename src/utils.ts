import fetch from 'node-fetch';
import crypto from 'crypto';
import qs from 'querystring';
import { getPreferenceValues } from '@raycast/api';
import play from 'play-sound';
import fs from 'fs/promises';
import path from 'path';
import languages from './languages.json';

export const YOUDAO_API = 'https://openapi.youdao.com/api';

export const { app_key, app_secret, locale } = getPreferenceValues();

export function generateSign(content: string, salt: number, app_key: string, app_secret: string) {
  const md5 = crypto.createHash('md5');
  md5.update(app_key + content + salt + app_secret);
  const cipher = md5.digest('hex');
  return cipher.slice(0, 32).toUpperCase();
}

export function translateAPI(content: string, from_language: string, to_language: string) {
  const q = Buffer.from(content).toString();
  const salt = Date.now();
  const sign = generateSign(q, salt, app_key, app_secret);
  const query = qs.stringify({ q: q, appKey: app_key, from: from_language, to: to_language, salt, sign });
  return fetch(`https://openapi.youdao.com/api?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export const pronounce = (url: string) => {
  const dirPath = path.resolve(__dirname, 'sounds');
  const soundPath = path.resolve(dirPath, 'dummy');
  mkdir(dirPath)
    .then(() => fetch(url))
    .then((res) => res.blob())
    .then((blob) => fs.writeFile(soundPath, blob.stream()))
    .then(() => playSound(soundPath))
    .finally(() => fs.unlink(soundPath));
};

const playSound = (soundPath: string) => {
  return new Promise((resolve, reject) => {
    play({ player: 'afplay' })
      .play(soundPath)
      .on('end', () => resolve(true))
      .on('error', reject);
  });
};

const mkdir = (dir: string) => {
  return new Promise((resolve) => {
    fs.stat(dir)
      .catch(() => fs.mkdir(dir))
      .finally(() => resolve(true));
  });
};

export { languages };

export const genLangs = () => {
  const langs: { from: string; to: string }[] = [{ from: 'auto', to: 'auto' }];

  for (let i = 0; i < languages.length - 1; i++) {
    for (let j = i + 1; j < languages.length; j++) {
      langs.push({ from: languages[i][1], to: languages[j][1] });
      langs.push({ from: languages[j][1], to: languages[i][1] });
    }
  }

  return langs;
};

export const langs = genLangs();
