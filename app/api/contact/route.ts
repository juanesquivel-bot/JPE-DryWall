import { NextResponse } from "next/server";
import { isAllowedUpload } from "@/lib/upload";

const REQUIRED_FIELDS = ["fullName", "email", "phone", "company", "projectType", "details"] as const;

export const maxDuration = 60;

export async function POST(request: Request) {
  const webAppUrl = process.env.APPS_SCRIPT_WEBAPP_URL;

  if (!webAppUrl) {
    return NextResponse.json(
      { ok: false, error: "Form submissions are not configured yet." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const payload: Record<string, string> = {};
  for (const field of REQUIRED_FIELDS) {
    const value = String(form.get(field) || "").trim();
    if (!value) {
      return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 });
    }
    payload[field] = value;
  }

  const phoneDigits = payload.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || /[A-Za-z]/.test(payload.phone)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number with at least 10 digits." },
      { status: 400 }
    );
  }

  payload.fileName = "";
  payload.fileMime = "";
  payload.fileBase64 = "";

  const file = form.get("blueprint");
  if (file instanceof File && file.size > 0) {
    const uploadError = isAllowedUpload(file);
    if (uploadError) {
      return NextResponse.json({ ok: false, error: uploadError }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    payload.fileName = file.name;
    payload.fileMime = file.type || "application/octet-stream";
    payload.fileBase64 = bytes.toString("base64");
  }

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let result: { ok?: boolean; error?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      result = {};
    }

    if (!response.ok || result.ok !== true) {
      const needsGoogleAuth = /authorization needed|review permissions|access denied/i.test(text);
      return NextResponse.json(
        {
          ok: false,
          error: result.error
            || (needsGoogleAuth
              ? "Google still needs permission to save this bid. Open the Apps Script web app once, click Review Permissions, then try again."
              : "Unable to send your bid request right now."),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to send your bid request right now." },
      { status: 502 }
    );
  }
}
