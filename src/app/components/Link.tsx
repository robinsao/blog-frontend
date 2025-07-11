"use client";
import NextLink from "next/link";
import MuiLink, { LinkProps } from "@mui/material/Link";

function NextLinkWrapper(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, ...otherProps } = props;
  return <NextLink {...otherProps} href={href ?? ""} prefetch={true} />;
}

export default function Link(props: LinkProps) {
  return <MuiLink {...props} component={NextLinkWrapper} rel="noopener" />;
}
