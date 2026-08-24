import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path");
  const expectedSecret = process.env.PAYLOAD_PREVIEW_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return new Response("Invalid preview token", { status: 401 });
  }

  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return new Response("Invalid preview path", { status: 400 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(path, url.origin));
}
