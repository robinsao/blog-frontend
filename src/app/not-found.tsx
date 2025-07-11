import { Stack, Typography } from "@mui/material";

export default function GlobalNotFoundPage() {
  return (
    <Stack
      sx={{
        minHeight: "95vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      spacing={6}
    >
      <Typography variant="h3" textAlign="center">
        {"The page you're looking for doesn't exist"}
      </Typography>
      <Typography variant="h6" textAlign="center">
        Possible causes include broken links, deleted blogs, blogs being
        renamed, or the site is under ongoing maintenance
      </Typography>
    </Stack>
  );
}
