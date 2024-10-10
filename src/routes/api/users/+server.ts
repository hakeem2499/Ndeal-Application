import { UserSchema } from '$lib/validation';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        const parsedData = UserSchema.parse(data);

        console.log('Parsed Data:', parsedData);

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parsedData.email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        let newUser;

        if (parsedData.userType === 'Professional') {
            newUser = await prisma.user.create({
                data: {
                    email: parsedData.email,
                    firstName: parsedData.firstName,
                    lastName: parsedData.lastName,
                    phoneNumber: parsedData.phoneNumber,
                    userType: parsedData.userType,
                    Professional: {
                        create: parsedData.Professional,
                    },
                },
            });
        } else if (parsedData.userType === 'Company') {
            newUser = await prisma.user.create({
                data: {
                    email: parsedData.email,
                    firstName: parsedData.firstName,
                    lastName: parsedData.lastName,
                    phoneNumber: parsedData.phoneNumber,
                    userType: parsedData.userType,
                    Company: {
                        create: parsedData.Company,
                    },
                },
            });
        } else if (parsedData.userType === 'Admin') {
            newUser = await prisma.user.create({
                data: {
                    email: parsedData.email,
                    firstName: parsedData.firstName,
                    lastName: parsedData.lastName,
                    phoneNumber: parsedData.phoneNumber,
                    userType: parsedData.userType,
                    isAdmin: true,
                },
            });
        }

        console.log('New User Created:', newUser);

        return new Response(JSON.stringify(newUser), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error:', error);

        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({ errors: error.errors }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
