import { writable } from 'svelte/store';

interface AuthStore {
    token: string | null;
    isAuthenticated: boolean;
}

const authStore = writable<AuthStore>({
    token: null,
    isAuthenticated: false,
});

export default authStore;
