import { derived, get, writable, type Writable } from "svelte/store";

export const userType = writable('Professional'); // 'Professional' or 'Company'
const currentStep = writable(1);
export const progressValue = writable(0);
export let formChecker: boolean = false;

type ValidFields = {
    [key: string]: boolean;
};
// Define the structure of error messages
export interface ErrorMessages {
    [key: string]: string;
}

export let errorMessages = writable<ErrorMessages>({
    displayname: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
});





export const defaultValidFields = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false
};

export let validFields = writable<ValidFields>(defaultValidFields);

export const allFieldsValid = derived(validFields, ($validFields) => {
    return Object.values($validFields).every(value => value === true);
});





// validation function
export function validateInput(
    value: string,
    field: string
): {
    valid: boolean;
    errorMessage: string;
} {
    let isValid = false;
    let errorMessage = '';
    switch (field) {
        case 'firstName':
        case 'lastName':
        case 'displayname':
            isValid = value.trim().length > 0;
            errorMessage = isValid ? '' : 'This field is required';
            break;
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid email';
            break;
        case 'phoneNumber':
            isValid = /^[0-9]+$/.test(value) && value.trim().length > 9;
            errorMessage = isValid ? '' : 'Please enter a valid phone number';
            break;
        case 'password':
            isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            errorMessage = isValid ? '' : 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
            break;
        default:
            isValid = false;
            errorMessage = 'Invalid input';
    }
    return { valid: isValid, errorMessage };
}


export function updateProgress(formStore: Writable<any>) {
    const form = get(formStore);
    const filledCount = Object.keys(form)
        .flatMap((step) => Object.values(form[step]))
        .filter((value) => value !== '').length;

    const totalFields = form === 'Professional' ? 6 : 7;
    progressValue.set(filledCount / totalFields);
    if (filledCount / totalFields === 1) {
        formChecker = true;
    }
    console.log(filledCount / totalFields);
}

// Function to handle input changes, validate, and update error messages
export function dealInsightHandleInput(field: string, value: string, errorMessagesFields: Writable<ErrorMessages>) {
    // Get validation result
    const { valid, errorMessage } = validateInput(value, field);

    // Update error messages store
    errorMessagesFields.update(current => ({
        ...current,
        [field]: errorMessage // Set error message for the specific field
    }));

    return valid; // Return validation status if needed for further logic
}

export function handleInput(e: Event, step: string, field: string, formStore: Writable<any>) {
    try {
        const target = e.target as HTMLInputElement | null;

        if (target) {
            const value = target.value;
            console.log(`Updating ${field} with value:`, value);

            formStore.update((currentForm) => {
                currentForm[step][field] = value;
                return currentForm;
            });

            const { valid, errorMessage } = validateInput(value, field);
            console.log(`Validation result for ${field}:`, { valid, errorMessage });

            validFields.update((fields) => {
                fields[field] = valid;
                console.log('Updated validFields:', fields);
                return fields;
            });

            // Update error messages store
            errorMessages.update(current => ({
                ...current,
                [field]: errorMessage // Set error message for the specific field
            }));

        }
        validFields.subscribe((value) => console.log('validFields:', value));
        errorMessages.subscribe((value) => console.log('errorMessages:', value));
    } catch (error) {
        console.error(error);
    }
}