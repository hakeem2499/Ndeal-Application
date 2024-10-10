import type { Handle } from '@sveltejs/kit';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: string;
    Professional?: {
        jobTitle: string;
        organizationName: string;
        queryResponse: string;
    };
    Company?: {
        companySize: string;
        companyLocation: string;
        companyWebsite: string;
        industry: string;
    };
    // Add Admin fields if necessary
}

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;
    const method = event.request.method;

    // Handle non-auth routes
    if (pathname.startsWith('/admin')) {
        return resolve(event);
    }

    // Handle auth routes
    if (pathname === '/api/users' && method === 'POST') {
        try {
            const clonedRequest = event.request.clone();
            const data: UserData = await clonedRequest.json();
            console.log('Request data:', data);

            // Validate data
            if (!data.firstName || !data.lastName || !data.email || !data.phoneNumber || !data.userType) {
                return new Response('Invalid user data', { status: 400 });
            }

            const userData = JSON.stringify(data);

            const response = await resolve(event);
            response.headers.append('Set-Cookie', `user-data=${userData}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`);
            return response;
        } catch (error) {
            console.error('Error parsing request body:', error);
            return new Response('Invalid request body', { status: 400 });
        }
    }

    // Default resolve for other routes
    return resolve(event);
};
