import z from "zod";

const StrapiImageSchema = z.object({
  url: z.string(), // path only
  width: z.number(),
  height: z.number(),
  size: z.number(),
});

const StrapiImageFormatsSchema = StrapiImageSchema.extend({
  id: z.number(),
  alternativeText: z.string(),
  caption: z.string(),
  formats: z.object({
    large: StrapiImageSchema,
    medium: StrapiImageSchema,
    small: StrapiImageSchema,
    thumbnail: StrapiImageSchema,
  }),
});

type StrapiImage = z.infer<typeof StrapiImageSchema>;
type StrapiImageFormats = z.infer<typeof StrapiImageFormatsSchema>;

export { StrapiImageSchema, StrapiImageFormatsSchema };
export type { StrapiImage, StrapiImageFormats };
