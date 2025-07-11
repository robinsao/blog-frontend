"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // alert(error);
  }, [error]);

  return (
    <Stack
      sx={{
        minHeight: "95vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      spacing={6}
    >
      <Typography variant="h2" textAlign="center">
        Something went wrong
      </Typography>
      <Typography textAlign="center">
        Possible causes include broken links, deleted blogs, blogs being
        renamed, or the site is under ongoing maintenance
      </Typography>
      <Button
        variant="contained"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Stack>
  );
}
