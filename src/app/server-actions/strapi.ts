"use server";

import { Blog, BlogsSchema } from "@/app/schemas/blog.schema";
import {
  formatUrlSearchParams,
  throwIfHttpResponseError,
} from "../utils/http.utils";
import { StrapiImageFormatsSchema } from "@/app/schemas/image.schema";

type BlogsResponse = {
  data: Blog[];
};

async function fetchPublishedBlogs(
  params: Record<string, string>,
): Promise<Blog[]> {
  if (params.fields == null) params.fields = "";
  if (!params.fields.includes("publishStatus"))
    params.fields += ",publishStatus";

  const url = `${process.env.STRAPI_BASE_URL}/api/blogs?${formatUrlSearchParams(params)}`;

  const response = await fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    }),
    method: "GET",
  });

  throwIfHttpResponseError(response);
  const responseJson = (await response.json()) as BlogsResponse;

  return BlogsSchema.parse(responseJson.data).filter(
    (b) => b.publishStatus === "published",
  );
}

async function fetchImage(imageId: number) {
  const params = {
    fields: "id,formats,width,height,url",
  };
  const url = `${process.env.STRAPI_BASE_URL}/api/upload/files/${encodeURIComponent(imageId)}?${formatUrlSearchParams(params)}`;

  const response = await fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    }),
    method: "GET",
  });
  const responseJson = await response.json();
  return StrapiImageFormatsSchema.parse(responseJson);
}

export { fetchPublishedBlogs, fetchImage };
