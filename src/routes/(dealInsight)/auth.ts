import { successMessage, errorMessages } from '$lib/toast';
import { get, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import {jwtDecode} from 'jwt-decode';
import { API_URL } from '../../store/HomeStore';

// Writable stores for managing tokens and error messages
export const authToken = writable<string | null>(null);
export const refreshToken = writable<string | null>(null);
export const errorMessage = writable<string | null>(null);

const API_BASE_URL = `${API_URL}auth`;
const GOOGLE_AUTH_URL = "http://localhost:8000/accounts/google/login/";

const isClient = typeof window !== 'undefined';

let tokenExpirationTimeout: number | null = null;

// Helper function to handle error messages
function handleErrorMessage(res: Response): string {
    if (res.status === 400) return 'Invalid input. Please check and try again.';
    if (res.status === 401) return 'Unauthorized. Please log in again.';
    if (res.status === 500) return 'Server error. Please try again later.';
    return 'An error occurred. Please try again.';
}

// Function to check if the token is a valid JWT
function isValidJWT(token: string): boolean {
    const parts = token.split('.');
    return parts.length === 3; // JWT token should have 3 parts
}

// Schedule token refresh dynamically based on token expiration
function scheduleTokenRefreshFromToken(token: string) {
    if (!isValidJWT(token)) {
        console.error('Invalid token format');
        return;
    }

    const decoded: { exp: number } = jwtDecode(token);
    const expiryTime = decoded.exp * 1000 - Date.now(); // Convert exp to milliseconds

    if (tokenExpirationTimeout) {
        clearTimeout(tokenExpirationTimeout);
    }

    tokenExpirationTimeout = window.setTimeout(() => {
        refreshAuthToken();
    }, expiryTime - 60000); // Refresh token 1 minute before expiry
}

// Load tokens from localStorage if on client
if (isClient) {
    const accessToken = localStorage.getItem('access_token');
    const refreshTokenValue = localStorage.getItem('refresh_token');
    
    if (accessToken && refreshTokenValue) {
        authToken.set(accessToken);
        refreshToken.set(refreshTokenValue);
        scheduleTokenRefreshFromToken(accessToken); // Dynamically set token refresh
    } else {
        console.error('Tokens are missing from localStorage');
    }
}

// Google OAuth Login
export function initiateGoogleLogin() {
    window.location.href = GOOGLE_AUTH_URL;
}

// Centralized Fetch Helper with Authentication
export async function authFetch(url: string, options: RequestInit = {}) {
    const token = get(authToken);
    const headers: HeadersInit = {
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    // If the body is FormData, don't manually set the Content-Type header.
    // Let the browser set it for multipart/form-data
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];  // Remove any manually set Content-Type
    } else {
        headers['Content-Type'] = 'application/json';  // For JSON bodies, set the Content-Type
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        console.error(`Request failed with status ${response.status}: ${response.statusText}`);
    }

    return response;
}




// Login Function
export async function login(email: string, password: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/users/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            errorMessage.set(handleErrorMessage(res));
            errorMessages(handleErrorMessage(res));
            return;
        }

        const data = await res.json();
        if (!data.access || !data.refresh) {
            console.error('Missing access or refresh token in login response');
            return;
        }

        // Store tokens in Svelte stores and localStorage
        authToken.set(data.access);
        refreshToken.set(data.refresh);

        if (isClient) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
        }

        scheduleTokenRefreshFromToken(data.access);
        successMessage('You have Logged in successfully');
        goto('/dealInsight');
    } catch (error) {
        console.error("Login error:", error);
        errorMessage.set("An error occurred during login.");
        errorMessages('There was an error logging into your account.');
    }
}

// Register Function
export async function register(displayname: string, email: string, password1: string, password2: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/registration/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayname, email, password1, password2 }),
        });

        if (!res.ok) {
            const data = await res.json();
            errorMessage.set(data.non_field_errors?.[0] || handleErrorMessage(res));
            errorMessages(handleErrorMessage(res));
            return;
        }

        successMessage('You have Registered successfully');
    } catch (error) {
        console.error("Registration error:", error);
        errorMessage.set("An error occurred during registration.");
    }
}

// Logout Function
export function logout() {
    authToken.set(null);
    refreshToken.set(null);

    if (isClient) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    if (tokenExpirationTimeout) {
        clearTimeout(tokenExpirationTimeout);
    }
}

// Token Refresh Function
export async function refreshAuthToken(): Promise<boolean> {
    const storedRefreshToken = isClient ? localStorage.getItem('refresh_token') : null;
    if (!storedRefreshToken) {
        errorMessage.set("No refresh token available. Please log in again.");
        return false;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: storedRefreshToken }),
        });

        if (!res.ok) {
            errorMessage.set("Token refresh failed. Please log in again.");
            logout();
            return false;
        }

        const data = await res.json();
        if (!data.access) {
            console.error('Missing access token in refresh response');
            logout();
            return false;
        }

        authToken.set(data.access);

        if (isClient) {
            localStorage.setItem('access_token', data.access);
        }

        scheduleTokenRefreshFromToken(data.access);
        errorMessage.set(null);
        return true;
    } catch (error) {
        console.error("Token refresh error:", error);
        errorMessage.set("An error occurred during token refresh.");
        logout();
        return false;
    }
}
