	import { browser } from '$app/environment';
	// import { LogicalSize, appWindow } from '@tauri-apps/api/window';

	export const prerender = true;
	export const ssr = false;

	// if (appWindow) {
	// 	appWindow.setSize(new LogicalSize(480, 180));
	// }

	if (browser) {
		// browser環境のみで動作させたい処理を書く
		console.log('999');

		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			console.log('dark');
			window.document.body.classList.add('dark');
		} else {
			console.log('not dark');
			window.document.body.classList.remove('dark');
		}

		// appWindow.setSize(new LogicalSize(480, 180));
	}
