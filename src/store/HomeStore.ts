import type { ErrorMessages } from "$lib/components/Forms/validation";
import { writable } from "svelte/store";
import type { KeyTextField } from '@prismicio/types';

export type UserType = "Professional" | "Company" | "Partner";
export const userType = writable<UserType>("Professional");// 'Professional' or 'Company'
export let showSwitchableButton = writable(true);
export type Api = "/auth/registration/resend-email/" | "/auth/password/reset/";
export type InputType = "text" | "email" | "password";
export const API_URL = "http://127.0.0.1:8000/api";
  // API Endpoints
export const COUNTRY_CODES_API = 'https://countriesnow.space/api/v0.1/countries/codes';
export const STATES_API = 'https://countriesnow.space/api/v0.1/countries/states';
// Check if the user has already accepted or rejected the cookies
export let hasAcceptedCookies = writable(false);
import Lenis from '@studio-freight/lenis';
import { cookieauthstore } from "./authStore";
export type consentStatusType = "accepted" | "rejected" | "customized" | "none";

export const openDropdown = writable<string | null>(null); // Tracks the open dropdown by a unique identifier

export let consentStatus = writable<consentStatusType>('none');  // Track cookie consent status

export let errorMessagesLogin = writable<ErrorMessages>({
    email: '',
    password: ''
});
export let errorMessagesRegister = writable<ErrorMessages>({
    displayname: '',
    email: '',
    password: ''
});

interface Slice {
    primary: {
        navigation_heading: KeyTextField;
        // Other fields of the slice
        [key: string]: any;
    };
    slice_type: string;
    id: string;
}


interface CookieFormData {
    consent: consentStatusType;
}

// Cache to store filtered results
export const sliceCache: Record<string, Slice[]> = {};

// Define an array of specific headings you want to render
export const whatWeDo = ['How We Can Help', 'By Industry'];
export const whoWeAre = ['About Us', 'Investors and Media', 'How We Serve'];
export const insightsAndTools = ['Learn and Connect', 'Ndeal Tools'];
export const insightsAndToolsFooter = ['Learn and Connect'];

export function categorizeSlicesByHeadings(slices: Slice[]): Record<string, Slice[]> {
    return slices.reduce(
        (acc, slice) => {
            const heading = slice.primary.navigation_heading || '';
            if (!heading) return acc;

            // Initialize array for this heading if it doesn't exist
            if (!acc[heading]) {
                acc[heading] = [];
            }

            // Push the slice into the appropriate heading category
            acc[heading].push(slice);
            return acc;
        },
        {} as Record<string, Slice[]>
    );
}

;


export const scroll = writable<any>(null);

// Initialize Lenis
// export function initLenis() {
//     const lenis = new Lenis({
//         lerp: 0.1,          // Smoothness factor (lower is smoother)
//         smoothWheel: true,  // Enable smooth scrolling on mouse wheel
//         syncTouch: true,  // Enable smooth scrolling on touch devices
//     });

//     // Update Lenis on every animation frame
//     function raf(time: any) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     scroll.set(lenis);
// }


// Function to filter slices by a list of target headings
export function filterSlicesByHeadings(slices: Slice[], headings: string[]): Slice[] {
    const cacheKey = headings.join(',');

    // Check the cache first
    if (sliceCache[cacheKey]) {
        return sliceCache[cacheKey];
    }

    // Create a Set for fast lookups
    const headingSet = new Set(headings);

    // Categorize slices by their headings
    const categorizedSlices = categorizeSlicesByHeadings(slices);

    // Collect slices matching the target headings
    const filteredSlices = Object.keys(categorizedSlices)
        .filter((heading) => headingSet.has(heading))
        .flatMap((heading) => categorizedSlices[heading]);

    // Cache the result for future reuse
    sliceCache[cacheKey] = filteredSlices;

    return filteredSlices;
}

export function getCsrfToken() {
    const csrfCookie = document.cookie.split(';')
        .find(cookie => cookie.trim().startsWith('csrftoken='));
    console.log(csrfCookie)
    return csrfCookie ? csrfCookie.split('=')[1] : null;
}





// Define types for the authstore





// Helper function to get the session ID from cookies
function getSessionIdFromCookies() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('sessionid=')) {
            return cookie.substring('sessionid='.length);
        }
    }
    return null;
}



// Send the consent status to the backend (Django API)
export const sendCookieConsent = async (status: consentStatusType) => {
    try {
        const response = await fetch(`${API_URL}/cookie-consent/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ consent: status }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Consent status updated:', data);
            consentStatus.set(status);
            // Store the consent status in localStorage so the banner doesn't pop up again
            localStorage.setItem('cookieConsentStatus', status);
            
        } else {
            console.error('Error:', data);
        }
    } catch (error) {
        console.error('Error sending consent:', error);
    }
};


export const submitForm = async (url: string, data: Record<string, any>) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response is not OK
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific HTTP statuses
            if (response.status === 400) {
                // Log validation error details for debugging
                console.error('400 Validation Error:', errorResponse);
                throw new Error(errorResponse.error || 'Validation error. Please check your input.');
            } else if (response.status === 500) {
                // Log server error
                console.error('500 Server Error:', errorResponse);
                throw new Error('Server error. Please try again later.');
            } else {
                // Log other errors
                console.error(`HTTP Status Code ${response.status}:`, errorResponse);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }

        // Return the response body if the request is successful
        return response.json();
    } catch (error: any) {
        // Log and rethrow error to be caught by the calling function
        console.error('Error submitting form data:', error.message || error);
        throw error;
    }
};