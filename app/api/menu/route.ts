import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { dishes: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Create new category
    if (data.type === "category") {
      const category = await prisma.category.create({
        data: {
          titleFr: data.titleFr,
          titleAr: data.titleAr,
          order: data.order || 0,
        },
      });
      return NextResponse.json(category);
    }
    
    // Create new dish
    if (data.type === "dish") {
      const dish = await prisma.dish.create({
        data: {
          nameFr: data.nameFr,
          nameAr: data.nameAr,
          price: data.price,
          description: data.description,
          order: data.order || 0,
          categoryId: data.categoryId,
        },
      });
      return NextResponse.json(dish);
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
