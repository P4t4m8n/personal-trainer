export const dynamic = "force-dynamic";

import { signOut } from "@/services/server/auth.server.service";

import { AppError } from "@/utils/server/Error.util";

import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    const err = AppError.create(`Error signing out${error}`, 500, true);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode }
    );
  }
}
