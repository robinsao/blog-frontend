"use client";

import { createTheme, Theme } from "@mui/material";
import colorPalette from "./colorPalette";

const headerStyle = (theme: Theme) => ({
  fontWeight: 700,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
});

const defaultTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: colorPalette.light.surfaceContainerLow,
          paper: colorPalette.light.surfaceContainerLow,
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: colorPalette.dark.surfaceContainerLow,
          paper: colorPalette.dark.surfaceContainerLow,
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "data",
  },
  typography: {
    fontFamily: "var(--font-poppins)",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.getCssVar("palette-text-primary"),
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: ({ theme }) => headerStyle(theme),
        h2: ({ theme }) => headerStyle(theme),
        h3: ({ theme }) => headerStyle(theme),
        h4: ({ theme }) => headerStyle(theme),
        h5: ({ theme }) => headerStyle(theme),
        h6: ({ theme }) => headerStyle(theme),
        body1: ({ theme }) => ({
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(2),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.getCssVar("shadows-6"),
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 4 * Number(theme.shape.borderRadius),
        }),
      },
    },
  },
});

export default defaultTheme;
