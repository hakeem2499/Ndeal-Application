import { writable } from 'svelte/store';

interface AuthStore {
    token: string | null;
    isAuthenticated: boolean;
}

const authStore = writable<AuthStore>({
    token: null,
    isAuthenticated: false,
});

type AuthStoreType = {
    isAuthenticated: boolean;
    user: any | null;
    sessionID: string | null;
  };
  
  // Initialize the store with the proper type
  export const cookieauthstore = writable<AuthStoreType>({
    isAuthenticated: false,
    user: null,
    sessionID: null,
  });

export default {};
