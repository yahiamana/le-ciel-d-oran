import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^0[567]\d{8}$/),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = reservationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Données invalides", details: result.error.format() }, { status: 400 });
    }

    const { name, phone, date, time, guests, message } = result.data;

    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        date,
        time,
        guests: parseInt(guests),
        message,
      },
    });

    return NextResponse.json({ success: true, id: reservation.id });
  } catch (error) {
    console.error("Reservation API Error:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la réservation" }, { status: 500 });
  }
}
