import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { fetchPublishedBlogs } from "../server-actions/strapi";
import { generateHTMLIdFromText } from "../utils/dom.utils";
import { extractHeaders, MarkdownHeader } from "../utils/markdown.utils";
import MarkdownRendererAsync from "../components/MarkdownRendererAsync";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}): Promise<Metadata> {
  const { blogSlug } = await params;

  const fetchParams = {
    fields: "slug,seoTitle,seoDescription",
  };
  const blog = (await fetchPublishedBlogs(fetchParams)).filter(
    (b) => b.slug === blogSlug,
  )[0];
  if (blog == null)
    return {
      title: "Blog not found",
      description: "Blog not found",
    };

  return {
    title: blog.seoTitle,
    description: blog.seoDescription,
  };
}

export const revalidate = 600;
export const dynamic = "force-static";

function getBlogChapters(headers: MarkdownHeader[], startingDepth: number = 1) {
  return (
    <>
      {headers.map((h) => (
        <BlogChapter
          key={`${generateHTMLIdFromText(h.text)}-li`}
          depth={startingDepth}
          title={h.text}
        >
          {getBlogChapters(h.children ?? [], startingDepth + 1)}
        </BlogChapter>
      ))}
    </>
  );
}

function BlogChapter({
  depth,
  title,
  children,
}: {
  depth: number;
  title: string;
  children?: ReactNode;
}) {
  return (
    <ListItem
      component="li"
      sx={{
        p: 0,
        pl: (depth - 1) * 2,
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "rgb(0,0,0,0)",
        },
        "& span": {
          m: 0,
        },
      }}
    >
      <ListItemButton
        component="a"
        href={`#${generateHTMLIdFromText(title)}`}
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          p: 1,
          borderRadius: 2,
        }}
      >
        <ListItemText
          sx={{
            "& *": {
              fontSize: "80%",
            },
          }}
          primary={title}
        />
      </ListItemButton>
      <List
        sx={{
          p: 0,
        }}
      >
        {children}
      </List>
    </ListItem>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const blogSlug = decodeURIComponent((await params).blogSlug);
  const fetchParams = {
    fields: "slug,title,content,createdAt,publishStatus,excerpt",
    populate: "*",
  };
  const blog = (await fetchPublishedBlogs(fetchParams)).filter(
    (b) => b.slug === blogSlug,
  )[0];

  if (blog == null) notFound();

  const cover = blog.cover?.formats.large;
  return (
    <Container
      sx={{
        minHeight: "95vh",
        pb: "20vh",
      }}
    >
      <Container
        sx={{
          position: "relative",
          height: "40vh",
          borderRadius: 4,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          overflow: "hidden",
          boxShadow: 6,
        }}
      >
        <Image
          fill
          src={`${process.env.STRAPI_BASE_URL}${cover?.url}`}
          alt={blog.cover?.alternativeText ?? ""}
          style={{
            objectFit: "cover",
          }}
          loading="eager"
        />
      </Container>

      <Grid
        sx={{
          pt: 4,
          pb: 2,
        }}
        container
        rowSpacing={2}
        alignItems="center"
        direction={{
          xs: "column",
          md: "row",
        }}
      >
        <Grid size="grow">
          <Typography
            variant="h4"
            sx={{
              m: 0,
            }}
          >
            {blog.title}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle1">
            {dayjs(blog.createdAt).format("ddd, D/M/YYYY")}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{
          xs: 2,
          md: 6,
        }}
        sx={{
          alignItems: "flex-start",
          pt: 2,
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          sx={{
            position: "sticky",
            borderRadius: 4,
            p: 2,
            pb: 0,
            mt: 2,
          }}
        >
          <Typography
            sx={{
              pl: 1,
            }}
            fontWeight="bold"
          >
            Chapters
          </Typography>
          <List>{getBlogChapters(extractHeaders(blog.content ?? ""))}</List>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 9,
          }}
        >
          <MarkdownRendererAsync>{blog.content}</MarkdownRendererAsync>
        </Grid>
      </Grid>
    </Container>
  );
}
