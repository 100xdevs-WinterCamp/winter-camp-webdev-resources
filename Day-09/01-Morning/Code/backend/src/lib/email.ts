// src/lib/email.ts
import { Resend } from "resend";
import { env } from "./env";

export async function sendWelcomeEmail(email: string, username: string) {
  // No API key yet: just print the email in the terminal
  if (!env.RESEND_API_KEY) {
    console.log(`[email preview] Welcome ${username}, sent to ${email}`);
    return "preview";
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Exchange!",
      text: `Hi ${username},\n\nWelcome to Exchange! Your account is ready.`,
    });

    if (error) {
      console.error("Welcome email failed:", error.message);
      return "failed";
    }

    return "sent";
  } catch (err) {
    console.error("Welcome email failed:", err);
    return "failed";
  }
}