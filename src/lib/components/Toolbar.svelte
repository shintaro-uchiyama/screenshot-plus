<script lang="ts">
	import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { storedClickEvent } from '../store/click-store';

	let showSelectTypeOptions: boolean;
	let popupLeft: number = 12;
	let selectTypeRef: HTMLElement;
	let lastMouseEvent: MouseEvent;

	onMount(() => {
		const unsubscribe = storedClickEvent.subscribe((clickEvent) => {
			if (
				!(
					lastMouseEvent &&
					lastMouseEvent.timeStamp === clickEvent.timeStamp &&
					lastMouseEvent.x === clickEvent.x &&
					lastMouseEvent.y === clickEvent.y
				) &&
				showSelectTypeOptions
			) {
				showSelectTypeOptions = false;
			}
		});
		return unsubscribe;
	});

	const onClickSelectType = (event: MouseEvent) => {
		lastMouseEvent = event;
		showSelectTypeOptions = true;
		const rect = selectTypeRef.getBoundingClientRect();
		const left = rect.left;
		popupLeft = left;
		const bottom = rect.bottom;
	};
</script>

<div class="wrapper">
	<div class="container">
		<div class="new">
			<Fa icon={faPlus} size="sm" />
			<span class="new-text"> New </span>
		</div>
		<div class="divider" />
		<div
			class="select-type"
			bind:this={selectTypeRef}
			on:click={onClickSelectType}
			role="presentation"
		>
			<div class="drag-range" />
			<span class="select-appearance">
				<Fa icon={faChevronRight} size="xs" rotate={90} />
			</span>
		</div>
	</div>
	{#if showSelectTypeOptions}
		<div class="sample" style="left: {popupLeft}px">tttttttt</div>
	{/if}
</div>

<style>
	.wrapper {
		height: 50px;
		background: var(--sub-bg-color);
		color: var(--sub-text-color);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		justify-items: start;
		align-items: center;
		gap: 10px;
	}

	.container {
		display: flex;
		align-items: center;
	}

	.new {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 14px;

		cursor: pointer;
		width: 74px;
		height: 36px;
		background-color: #424242;
		border-radius: 4px;
	}

	.new-text {
		margin-left: 4px;
	}

	.divider {
		margin-left: 14px;
		height: 30px;
		width: 2px;
		background-color: #424242;
		border-radius: 4px;
	}

	.select-type {
		width: 80px;
		height: 36px;
		margin-left: 14px;
		padding-right: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.drag-range {
		width: 22px;
		height: 18px;
		border: 1px dashed #fafafa;
		border-radius: 2px;
	}

	.select-appearance {
		margin-left: 12px;
	}

	.sample {
		position: absolute;
		top: 50px;
		/** leftは動的に設定 */
		width: 80px;
		height: 80px;
		background-color: var(--popup-bg-color);
		z-index: 100;
		border: 1px solid var(--popup-border-color);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}
</style>
