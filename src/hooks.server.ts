import type { Handle } from '@sveltejs/kit';
import { z } from 'zod';

const allowedOrigin = import.meta.env.VITE_ALLOWED_ORIGIN ?? '*'; // Use a fallback if not defined

const UserDataSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email(),
    phoneNumber: z.string().nonempty(),
    userType: z.enum(['Professional', 'Company', 'Admin']),
    Professional: z
        .object({
            jobTitle: z.string(),
            organizationName: z.string(),
            queryResponse: z.string(),
        })
        .optional(),
    Company: z
        .object({
            companySize: z.string(),
            companyLocation: z.string(),
            companyWebsite: z.string().url(),
            industry: z.string(),
        })
        .optional(),
});

export const handle: Handle = async ({ event, resolve }) => {
    const { pathname } = event.url;
    const method = event.request.method;

    // Handle CORS preflight (OPTIONS) requests
    if (method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    // Handle routes and process user data
    if (pathname === '/api/users' && method === 'POST') {
        try {
            const clonedRequest = event.request.clone();
            const data = await clonedRequest.json();

            // Validate incoming data with Zod
            const validatedData = UserDataSchema.parse(data);
            console.log('Validated user data:', validatedData);

            // Store user data in a secure cookie
            const userData = JSON.stringify(validatedData);
            const response = await resolve(event);
            response.headers.append(
                'Set-Cookie',
                `user-data=${encodeURIComponent(userData)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${
                    60 * 60 * 24 * 7
                }`
            );
            response.headers.append('Access-Control-Allow-Origin', allowedOrigin); // Ensure CORS headers are set in response

            return response;
        } catch (error) {
            console.error('Error processing request:', error);

            // Handle validation errors
            if (error instanceof z.ZodError) {
                return new Response(JSON.stringify({ errors: error.errors }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            return new Response('Invalid request', { status: 400 });
        }
    }

    // Default resolve for other routes, ensuring CORS headers
    const response = await resolve(event);
    response.headers.append('Access-Control-Allow-Origin', allowedOrigin);
    return response;
};
