import type { ErrorMessages } from "$lib/components/Forms/validation";
import { writable } from "svelte/store";
import type { KeyTextField } from '@prismicio/types';

export type UserType = "Professional" | "Company" | "Partner";
export const userType = writable<UserType>("Professional");// 'Professional' or 'Company'
export let showSwitchableButton = writable(true);

export const API_URL = "https://stingray-dashing-goshawk.ngrok-free.app/api";

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