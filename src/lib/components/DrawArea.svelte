<script lang="ts">
	import { storedOsType } from '$lib/store/os-type-store';
	let key = '';
	storedOsType.subscribe((osType) => {
		switch (osType) {
			case 'Darwin':
				key = 'Command';

				break;

			case 'Windows_NT':
				key = 'Ctrl';

				break;
		}
	});
</script>

<div class="draw-area">
	<span> {key} + Shift + S to start snapshot</span>
</div>

<style>
	.draw-area {
		background: var(--main-bg-color);
		color: var(--main-text-color);
		height: 100%;
		padding-top: 40px;
		display: flex;
		justify-content: center;
	}
</style>
