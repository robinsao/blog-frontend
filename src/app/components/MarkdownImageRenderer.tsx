"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import z from "zod";
import { StrapiImageFormats } from "../schemas/image.schema";
import { fetchImage } from "../server-actions/strapi";

const ImageInfo = z.object({
  alt: z.string(),
  id: z.coerce.number(),
});

type ImageInfoType = z.infer<typeof ImageInfo>;

function computeImageInfoFromStr(info: string): ImageInfoType | null {
  try {
    const fields = info.split(",");
    const parsedInfo = Object.fromEntries(
      fields.map((kEqualsV) => kEqualsV.split("=")),
    );

    return ImageInfo.parse(parsedInfo);
  } catch (e) {
    console.log(`Parsing image info errored: ${e}`);
    return null;
  }
}

export default function MarkdownImageRenderer({
  src,
  info,
}: {
  src: string;
  info: string;
}) {
  const [open, setOpen] = useState(false);
  const [imageMetadata, setImageMetadata] = useState<StrapiImageFormats | null>(
    null,
  );

  useEffect(() => {
    const imageInfo = computeImageInfoFromStr(info);
    if (imageInfo == null) throw new Error("Invalid image");

    async function fetchAndSetImageMetadata() {
      try {
        setImageMetadata(await fetchImage(imageInfo!.id));
      } catch (e) {
        throw new Error(`An error occured when fetching an image: ${e}`);
      }
    }

    fetchAndSetImageMetadata();
  }, [info]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Typography
      variant="button"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        onClick={handleClickOpen}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "90%",
          color: "text.primary",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.01)",
          },
          "& img": {
            width: "100%",
            height: "auto",
          },
        }}
      >
        <Image
          width={200}
          height={200}
          src={src}
          placeholder="empty"
          alt={imageMetadata?.alternativeText || ""}
        />
        <Typography>Image: {imageMetadata?.alternativeText || ""}</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogActions>
          <Button onClick={handleClose}>X</Button>
        </DialogActions>
        <DialogContent
          sx={{
            position: "relative",
            p: 2,
            "& img": {
              borderRadius: 4,
            },
          }}
        >
          <Image
            width={200}
            height={200}
            src={src}
            alt={imageMetadata?.alternativeText || ""}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "auto",
            }}
          />
        </DialogContent>
      </Dialog>
    </Typography>
  );
}
