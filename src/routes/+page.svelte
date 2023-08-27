<script lang="ts">
	import DrawArea from '$lib/components/DrawArea.svelte';
	import ToolBar from '$lib/components/Toolbar.svelte';
	import { storedClickEvent } from '$lib/store/click-store';
	const onClickHandler = (event: MouseEvent) => {
		console.log('on click', event);
		storedClickEvent.set(event);
	};
</script>

<main class="container" on:click={onClickHandler} role="presentation">
	<ToolBar />
	<DrawArea />
</main>

<style>
	/**
     * ライトモードの際に適用されるスタイル変数設定
    */
	:global(body) {
		--main-bg-color: #efebe9;
		--main-text-color: #212121;

		--sub-bg-color: #d7ccc8;
		--sub-text-color: #212121;
	}

	/**
     * ダークモードの際に適用されるスタイル変数設定
    */
	:global(body.dark) {
		--main-bg-color: #424242;
		--main-text-color: #f5f5f5;

		--sub-bg-color: #202020;
		--sub-text-color: #f5f5f5;

		--popup-bg-color: #1f1f1f;
		--popup-border-color: #111111;
	}

	:global(html) {
		height: 100%;
		font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif,
			Apple Color Emoji, Segoe UI Emoji;
	}
	:global(body) {
		height: 100%;
	}

	.container {
		padding: 0;
		height: 100%;
	}
</style>
