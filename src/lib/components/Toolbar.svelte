<script lang="ts">
	import {
		faChevronRight,
		faPlus,
		faVectorSquare,
		faWindowRestore,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';
	import { storedClickEvent } from '../store/click-store';

	let selectTypeOptionsVisible: boolean;
	let popupLeft: number = 12;
	let selectTypeRef: HTMLElement;
	let lastMouseEvent: MouseEvent;

	enum SelectedTypeEnum {
		Range = 'Range',
		Window = 'Window'
	}
	const selectTypeOptions: {
		selectType: SelectedTypeEnum;
		icon: IconDefinition;
		label: string;
	}[] = [
		{
			selectType: SelectedTypeEnum.Range,
			icon: faVectorSquare,
			label: $_('toolBar.selectType.range')
		},
		{
			selectType: SelectedTypeEnum.Window,
			icon: faWindowRestore,
			label: $_('toolBar.selectType.window')
		}
	];

	let selectedType: SelectedTypeEnum = SelectedTypeEnum.Range;
	let hoveredType: SelectedTypeEnum = selectedType;

	$: selectedSelectType = selectTypeOptions.find(
		(selectTypeOption) => selectTypeOption.selectType === selectedType
	);

	onMount(() => {
		const unsubscribe = storedClickEvent.subscribe((clickEvent) => {
			if (
				!(
					lastMouseEvent &&
					lastMouseEvent.timeStamp === clickEvent.timeStamp &&
					lastMouseEvent.x === clickEvent.x &&
					lastMouseEvent.y === clickEvent.y
				) &&
				selectTypeOptionsVisible
			) {
				selectTypeOptionsVisible = false;
			}
		});
		return unsubscribe;
	});

	const showSelectTypeOptions = (event: MouseEvent) => {
		lastMouseEvent = event;
		selectTypeOptionsVisible = true;
		const rect = selectTypeRef.getBoundingClientRect();
		const left = rect.left;
		popupLeft = left;
		hoveredType = selectedType;
	};

	const onClickSelectTypeOption = (_: MouseEvent, selectedSelectType: SelectedTypeEnum) => {
		selectedType = selectedSelectType;
	};

	const onMouseEnterOption = (hoveredSelectedType: SelectedTypeEnum) => {
		hoveredType = hoveredSelectedType;
	};
</script>

<div class="wrapper">
	<div class="container">
		<div class="new">
			<Fa icon={faPlus} size="sm" />
			<span class="new-text"> {$_('toolBar.new')} </span>
		</div>
		<div class="divider" />
		<div
			class="select-type"
			bind:this={selectTypeRef}
			on:click={showSelectTypeOptions}
			role="presentation"
		>
			<Fa icon={selectedSelectType?.icon} size="sm" />
			<span class="selected-type-name">{selectedSelectType?.label}</span>
			<span class="select-appearance">
				<Fa icon={faChevronRight} size="xs" rotate={90} />
			</span>
		</div>
	</div>
	{#if selectTypeOptionsVisible}
		<ul class="select-type-popup" style="left: {popupLeft}px">
			{#each selectTypeOptions as selectTypeOption}
				<li
					class="select-type-option"
					class:is-selected={hoveredType === selectTypeOption.selectType}
					on:click={(event) => onClickSelectTypeOption(event, selectTypeOption.selectType)}
					on:mouseenter={(_) => onMouseEnterOption(selectTypeOption.selectType)}
					role="presentation"
				>
					<Fa icon={selectTypeOption.icon} /><span class="select-type-text"
						>{selectTypeOption.label}</span
					>
				</li>
			{/each}
		</ul>
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
		background-color: var(--sub-highlight-color);
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
		width: 120px;
		height: 36px;
		margin-left: 14px;
		padding-right: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.selected-type-name {
		margin-left: 6px;
	}

	.select-appearance {
		margin-left: 12px;
	}

	.select-type-popup {
		position: absolute;
		top: 50px;
		/** leftは動的に設定 */
		padding: 6px 10px;
		cursor: pointer;
		background-color: var(--popup-bg-color);
		z-index: 100;
		border: 1px solid var(--popup-border-color);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}

	.select-type-option {
		cursor: pointer;
		padding: 6px 10px;
	}

	.select-type-text {
		margin-left: 6px;
	}

	.is-selected {
		background-color: var(--sub-highlight-color);
	}
</style>
