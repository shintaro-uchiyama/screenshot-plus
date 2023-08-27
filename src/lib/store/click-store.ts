import { writable } from 'svelte/store';

export const storedClickEvent = writable<MouseEvent>(undefined);