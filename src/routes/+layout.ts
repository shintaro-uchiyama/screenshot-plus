import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async () => {
	// ダークモードかライトモードか判定
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		window.document.body.classList.add('dark');
	} else {
		window.document.body.classList.remove('dark');
	}

	// i18n読み込み
	if (browser) {
		locale.set(window.navigator.language)
	}
	await waitLocale()
}