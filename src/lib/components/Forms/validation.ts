import { derived, get, writable, type Writable } from "svelte/store";
import type { UserType } from "../../../store/HomeStore";

export const userType = writable<UserType>('Professional'); // 'Professional' or 'Company'
const currentStep = writable(1);
export const progressValue = writable(0);
export let formChecker: boolean = false;


export type ValidFields = {
    [key: string]: boolean;
};
// Define the structure of error messages
export interface ErrorMessages {
    [key: string]: string;
}

export let errorMessagesProfessional = writable<ErrorMessages>({

    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',

});
export let errorMessagesCompany = writable<ErrorMessages>({

    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyWebsite: ''
});





export const defaultValidFieldsCompany: ValidFields = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    companyWebsite: false
};
export const defaultValidFieldsProfessional: ValidFields = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,

};

export let validFieldsStoreProfessional = writable<ValidFields>(defaultValidFieldsProfessional);
export let validFieldsStoreCompany = writable<ValidFields>(defaultValidFieldsCompany);

export function areAllFieldsValid(validFields: ValidFields): boolean {
    return Object.values(validFields).every((value) => value === true);
}


// Derived Store for Validation
export const allFieldsValidCompany = derived(validFieldsStoreCompany, ($validFieldsStoreCompany) =>
    Object.values($validFieldsStoreCompany).every((value) => value === true)
);

export const allFieldsValidProfessional = derived(validFieldsStoreProfessional, ($validFieldsStoreProfessional) =>
    Object.values($validFieldsStoreProfessional).every((value) => value === true)
);


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
        case 'companyWebsite':
            isValid = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid website (e.g., www.example.com)';
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

/**
 * Generic input handler for forms
 * @param e - The input event
 * @param step - The current form step (e.g., "step1", "personalDetails")
 * @param field - The field being updated (e.g., "firstName", "email")
 * @param formStore - Writable Svelte store for the form's data
 * @param validFieldsStore - Writable Svelte store for field validation states
 * @param errorMessagesStore - Writable Svelte store for error messages
 */
export function handleInput(
    e: Event,
    step: string,
    field: string,
    formStore: Writable<any>,
    validFieldsStore: Writable<{ [key: string]: boolean }>,
    errorMessagesStore: Writable<{ [key: string]: string }>
) {
    try {
        const target = e.target as HTMLInputElement | null;

        if (target) {
            const value = target.value;

            // Update the form's data store
            formStore.update((currentForm) => {
                currentForm[step][field] = value;
                return currentForm;
            });

            // Validate the input
            const { valid, errorMessage } = validateInput(value, field);

            // Update the validFields store
            validFieldsStore.update((fields) => {
                fields[field] = valid;
                return fields;
            });

            // Update the errorMessages store
            errorMessagesStore.update((messages) => ({
                ...messages,
                [field]: errorMessage,
            }));
        }
    } catch (error) {
        console.error('Error in handleInput:', error);
    }
}