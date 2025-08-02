import * as z from "zod";
import { StrapiImageFormatsSchema } from "./image.schema";

const BlogSchema = z.object({
  documentId: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  slug: z.string().optional(),
  publishStatus: z.enum(["draft", "published", "scheduled"]).optional(),
  createdAt: z.string().nullish(),
  cover: StrapiImageFormatsSchema.nullish(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().optional(),
});

const BlogsSchema = z.array(BlogSchema);

type Blog = z.infer<typeof BlogSchema>;

export { BlogSchema as default, BlogsSchema };
export type { Blog };
