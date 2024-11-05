import { newsletterSignUpSchema } from '$lib/validation';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse the incoming data (assuming the body is an object with an email field)
    const data = await request.json();
    console.log("🚀 ~ Received data:", data);

    // Validate the entire object, not just the email field
    const parsedData = newsletterSignUpSchema.parse(data);

    // Check if the email already exists in the newsletter subscribers
    const existingSubscriber = await prisma.newsletterSignup.findUnique({
      where: { email: parsedData.email },
    });

    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ error: 'Email already subscribed' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create a new newsletter subscriber
    const newSubscriber = await prisma.newsletterSignup.create({
      data: { email: parsedData.email },
    });

    return new Response(
      JSON.stringify({ message: 'Subscribed successfully' }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ errors: error.errors }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
