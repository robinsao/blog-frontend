import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";
import Link from "./Link";

export default async function Navbar() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        zIndex: 1000,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "8vh",
          "& *": {
            flex: "0 0 auto",
          },
        }}
      >
        <Link
          href="/"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
          aria-label="View github profile"
        >
          <Typography
            sx={{
              margin: 0,
            }}
            variant="h5"
          >
            Robin Sao
          </Typography>
        </Link>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 3,
            height: "100%",
          }}
        >
          <Link href="https://github.com/robinsao">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Link>
          <ThemeSwitch />
        </Stack>
      </Container>
      <Divider />
    </Box>
  );
}
