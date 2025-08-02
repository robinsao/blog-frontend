import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { Blog } from "../schemas/blog.schema";
import Link from "./Link";

function BlogItem({ blog }: { blog: Blog }) {
  const cover = blog.cover ? blog.cover.formats.large : null;
  const borderRadius = 4;

  return (
    <Grid
      size={{
        xs: 12,
      }}
    >
      <Card
        sx={{
          borderRadius,
        }}
      >
        <Link
          href={`/${blog.slug}`}
          underline="none"
          sx={{
            display: "flex",
          }}
          aria-label={`View blog ${blog.title}`}
        >
          <Box
            sx={{
              position: "relative",
              width: "30%",
              display: {
                xs: "none",
                md: "block",
              },
              flex: "0 0 auto",
              borderRadius,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              overflow: "hidden",
            }}
          >
            {!cover ? null : (
              <Image
                fill
                src={`${process.env.STRAPI_BASE_URL}${cover.url}`}
                alt={blog.cover?.alternativeText ?? ""}
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </Box>
          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
              flex: "1 1 auto",
              "&:last-child": {
                pb: {
                  xs: 2,
                  md: 3,
                },
              },
              "& span": {
                m: 0,
              },
            }}
          >
            <CardHeader
              title={blog.title}
              subheader={dayjs(blog.createdAt).format("D/M/YY")}
              slots={{
                title: Typography,
              }}
              slotProps={{
                title: {
                  variant: "h5",
                },
              }}
              sx={{
                px: 0,
                "& .MuiCardHeader-content": {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                },
                "& .MuiCardHeader-title": {
                  wordBreak: "break-word",
                  m: 0,
                },
                "& .MuiCardHeader-subheader": {
                  wordBreak: "break-word",
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                },
              }}
            />
            <Typography
              sx={{
                mb: 4,
              }}
              textAlign="justify"
            >
              {blog.excerpt}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <FontAwesomeIcon size="2x" icon={faArrowRight} />
            </Box>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
}

export default function BlogItems({
  blogs,
  sx,
}: {
  blogs: Array<Blog>;
  sx?: SxProps<Theme>;
}) {
  return (
    <Grid sx={sx} container spacing={4}>
      {blogs.map((b) => {
        return <BlogItem blog={b} key={b.slug} />;
      })}
    </Grid>
  );
}
