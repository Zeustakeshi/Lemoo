import { z } from "zod";

export const SearchQuerySchema = z.object({
    q: z.string(),
    // ratting: z.optional(z.number().min(1).max(5)),
    // cat: z.optional(z.string()),
    // min_price: z.optional(z.number().min(1)),
    // max_price: z.optional(z.number().min(1)),
    // sort: z.optional(z.enum(["popularity", "price_desc", "price_asc"])),
});

export type SearchQueryType = z.infer<typeof SearchQuerySchema>;
