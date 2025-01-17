export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { getSessionUser } from "@/services/server/auth.server.service";

import { AppError } from "@/utils/server/Error.util";

export async function GET() {
  try {
    const user = await getSessionUser();

    return NextResponse.json(user);
  } catch (error) {
    const err = AppError.create(`${error}`, 500, false);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode }
    );
  }
}
