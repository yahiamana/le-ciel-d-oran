import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const type = url.searchParams.get("type"); // "category" or "dish"

    if (!id || !type) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    if (type === "category") {
      await prisma.category.delete({ where: { id } });
    } else if (type === "dish") {
      await prisma.dish.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
