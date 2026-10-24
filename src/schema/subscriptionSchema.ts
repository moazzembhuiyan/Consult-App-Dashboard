"use client";

import * as z from "zod";

export const createSubscriptionSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, { message: "Name is required" }),
  duration: z
    .string({ error: "Duration is required" })
    .min(1, { message: "Duration is required" }),
  description: z
    .string({ error: "Description is required" })
    .min(50, { message: "Description is required" }),
  price: z.coerce
    .number({ error: "Price is required" })
    .min(1, { message: "Price is required" }),
});
