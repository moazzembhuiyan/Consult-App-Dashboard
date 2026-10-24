import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z
    .string({ error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export const forgotPassSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .min(1, { message: "Email is required" }),
});

export const otpSchema = z.object({
  otp: z
    .string({ error: "OTP is required" })
    .min(1, { message: "OTP is required" }),
});

export const resetPassSchema = z.object({
  newPassword: z
    .string({ error: "New password is required" })
    .min(1, { message: "New password is required" }),
  confirmPassword: z
    .string({ error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
});
