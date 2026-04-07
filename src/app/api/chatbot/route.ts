import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the Dermancy Medical House AI Assistant. You help patients with information about treatments and booking.

CLINIC INFO:
- Name: Dermancy Medical House
- Doctor: Dr. Ioannis Michalakis, Specialist in Aesthetic Medicine & Anti-Aging
- Location: Larnakas 5, Rhodes, 85100, Greece
- Phone: +30 2241 309994
- Mobile: +30 695 663 9172
- Email: info@dermancy.com
- Hours: Monday-Saturday, 10:30 AM - 7:00 PM

TREATMENTS OFFERED:
1. Botox - Dynamic wrinkle smoothing (frown lines, forehead, crow's feet). 15-30 min, no downtime, results in 3-5 days, lasts 4-6 months.
2. Dermal Fillers - Lip, cheek, jawline enhancement with hyaluronic acid. 30-60 min, minimal downtime, immediate results, lasts 6-18 months.
3. Mesotherapy - Skin rejuvenation with vitamins, peptides, antioxidants. 30-45 min, minimal downtime.
4. Skin Boosters - Deep hydration micro-injections. 30 min, minimal downtime.
5. Biostimulator - Collagen rebuilding (PLLA, CaHA). 45-60 min, progressive results over weeks.
6. PRP Face & Scalp - Platelet-rich plasma therapy for regeneration. 60 min, no downtime.
7. Body Treatments - Body contouring and cellulite smoothing. 60-90 min, minimal downtime.
8. Hyperhidrosis - Excessive sweating treatment with Botox. <30 min, no downtime, lasts 6-9 months.

RULES:
- Never provide medical diagnoses or clinical advice
- Always recommend booking a consultation for personalized advice
- Be warm, professional, and helpful
- Keep responses concise (2-3 sentences max)
- For pricing inquiries, suggest contacting the clinic directly`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Simple rule-based responses (replace with AI API in production)
    const reply = generateSimpleReply(message.toLowerCase());
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateSimpleReply(message: string): string {
  if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) {
    return 'You can book an appointment through our online booking system on the website, or call us at +30 2241 309994. We are available Monday-Saturday, 10:30 AM - 7:00 PM.';
  }
  if (message.includes('hour') || message.includes('open') || message.includes('time')) {
    return 'We are open Monday through Saturday, from 10:30 AM to 7:00 PM. We are closed on Sundays.';
  }
  if (message.includes('botox')) {
    return 'Botox treatments take 15-30 minutes with no downtime. Results appear within 3-5 days and last 4-6 months. I recommend booking a consultation with Dr. Michalakis for personalized advice.';
  }
  if (message.includes('filler')) {
    return 'Dermal fillers provide immediate results for lip, cheek, and jawline enhancement. Sessions take 30-60 minutes and results last 6-18 months. Book a consultation to discuss your goals.';
  }
  if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
    return 'For pricing information, please contact us directly at +30 2241 309994 or email info@dermancy.com. Pricing varies based on your personalized treatment plan.';
  }
  if (message.includes('location') || message.includes('where') || message.includes('address')) {
    return 'We are located at Larnakas 5, Rhodes, 85100, Greece. You can find us on Google Maps on our Contact page.';
  }
  if (message.includes('treatment') || message.includes('service') || message.includes('offer')) {
    return 'We offer Botox, Dermal Fillers, Mesotherapy, Skin Boosters, Biostimulators, PRP Face & Scalp Rejuvenation, Body Treatments, and Hyperhidrosis Treatment. Which treatment interests you?';
  }
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return 'Hello! Welcome to Dermancy Medical House. How can I help you today? I can provide information about our treatments, booking, or anything else you need.';
  }
  return 'Thank you for your question! For the most accurate information, I recommend booking a consultation with Dr. Michalakis. You can also call us at +30 2241 309994 or visit our Booking page.';
}
