	import { browser } from '$app/environment';

	export const prerender = true;
	export const ssr = false;


	if (browser) {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			window.document.body.classList.add('dark');
		} else {
			window.document.body.classList.remove('dark');
		}
	}
