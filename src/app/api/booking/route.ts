import { NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
  treatment: z.string(),
  date: z.string(),
  time: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // In production, save to database and send notifications
    console.log('Booking submission:', data);

    return NextResponse.json({ success: true, booking: data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
