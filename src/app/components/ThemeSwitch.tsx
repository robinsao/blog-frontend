"use client";

import { useColorScheme, Switch } from "@mui/material";
import { ChangeEvent } from "react";

export default function ThemeToggle() {
  const { mode, setMode, systemMode } = useColorScheme();

  function handleToggle(
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): void {
    if (checked) setMode("dark");
    else setMode("light");
  }

  return (
    <Switch
      onChange={handleToggle}
      aria-hidden="true"
      checked={(systemMode ?? mode) === "dark"}
      sx={{
        flexBasis: "auto",
        width: 72,
        height: 32,
        p: 0,
        "& .MuiSwitch-switchBase.Mui-checked": {
          transform: "translateX(25%)",
          color: "#8db4de",
        },
        "& .MuiSwitch-switchBase.Mui-checked MuiSwitch-thumb": {},
        "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
          backgroundColor: "rgb(176, 199, 218)",
        },
        "& .MuiSwitch-switchBase": {
          width: "100%",
          transform: "translateX(-25%)",
        },
        "& .MuiSwitch-track": {
          backgroundColor: "rgb(212, 235, 253)",
          boxSizing: "border-box",
          borderRadius: 22 / 4,
          border: "2px solid rgb(0,0,0,0.1)",
          opacity: 0.8,
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%) ",
            width: 20,
            height: 20,
          },
          // Light mode (sun icon)
          "&::before": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="${encodeURIComponent(
              "rgb(231, 177, 0)",
            )}" d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>')`,
            right: "10%",
          },
          // Dark mode (moon icon)
          "&::after": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="${encodeURIComponent(
              "rgb(25, 113, 185)",
            )}" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>')`,
            left: "16%",
          },
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: "rgb(139, 191, 231)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          width: 24,
          height: 24,
          margin: -0.7,
        },
      }}
    />
  );
}
