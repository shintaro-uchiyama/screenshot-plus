import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('en-US', () => import('./en-US.json'));
register('ja-JP', () => import('./ja-JP.json'));

init({
    fallbackLocale: 'ja-JP',
    initialLocale: getLocaleFromNavigator(),
  });