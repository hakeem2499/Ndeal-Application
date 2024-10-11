import { newsletterSignUpSchema } from '$lib/validation';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const newsletterSignup: RequestHandler = async ({ request }) => {
    try {
      const data = await request.json();
      const { email } = data;
  
      // Validate email
      
      const parsedEmail = newsletterSignUpSchema.parse(email);
  
      // Check if email already exists in newsletter subscribers
      const existingSubscriber = await prisma.newsletterSignup.findUnique({
        where: { email: parsedEmail.email },
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
  
      // Create new newsletter subscriber
      const newSubscriber = await prisma.newsletterSignup.create({
        data: { email: parsedEmail.email },
      });
  
      return new Response(
        JSON.stringify({ message: 'Subscribed successfully' }),
        {
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
  