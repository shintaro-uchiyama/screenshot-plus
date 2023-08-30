import type { OsType } from '@tauri-apps/api/os';
import { writable } from 'svelte/store';

export const storedOsType = writable<OsType>(undefined);