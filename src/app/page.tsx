import { Container, Stack, Typography } from "@mui/material";
import { fetchPublishedBlogs } from "./server-actions/strapi";
import BlogItems from "./components/BlogItemHomePage";
import { Blog } from "./schemas/blog.schema";

export const revalidate = 300;

export default async function Home() {
  const fetchParams = {
    fields: "slug,title,content,createdAt,publishStatus,excerpt",
    populate: "*",
    "filters[publishStatus][$eq]": "published",
    sort: "createdAt:desc,slug:desc",
  };

  let blogs: Blog[] = [];
  try {
    blogs = await fetchPublishedBlogs(fetchParams);
  } catch (reason) {
    console.log(reason);
    return "An error occured when fetching blogs";
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        pb: 10,
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          height: "90vh",
        }}
        spacing={3}
      >
        <Typography variant="h2" align="center">
          Welcome to my blog site!
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: "500",
          }}
        >
          ...where I&apos;ll be sharing the exciting things about the tech world
        </Typography>
      </Stack>
      <BlogItems blogs={blogs} />
    </Container>
  );
}
