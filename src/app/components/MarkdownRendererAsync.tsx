import { Typography } from "@mui/material";
import React, { ComponentProps } from "react";
import { MarkdownAsync } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { generateHTMLIdFromText } from "../utils/dom.utils";
import MarkdownImageRenderer from "./MarkdownImageRenderer";
import Link from "./Link";

type MarkdownHeader = {
  type: "text";
  value: string;
};

export default async function MarkdownRendererAsync(
  props: ComponentProps<typeof MarkdownAsync>,
) {
  return (
    <MarkdownAsync
      {...props}
      components={{
        h1: ({ node, ...props }) => {
          const header = (node?.children[0] as MarkdownHeader).value;
          return (
            <Typography
              variant="h4"
              id={generateHTMLIdFromText(header)}
              {...props}
              sx={{
                scrollMarginTop: "3.5em",
              }}
            />
          );
        },
        h2: ({ node, ...props }) => {
          const header = (node?.children[0] as MarkdownHeader).value;
          return (
            <Typography
              variant="h5"
              id={generateHTMLIdFromText(header)}
              {...props}
              sx={{
                scrollMarginTop: "3.5em",
              }}
            />
          );
        },
        h3: ({ node, ...props }) => {
          const header = (node?.children[0] as MarkdownHeader).value;
          return (
            <Typography
              variant="h6"
              id={generateHTMLIdFromText(header)}
              {...props}
              sx={{
                scrollMarginTop: "3.5em",
              }}
            />
          );
        },
        p: ({ ...props }) => <Typography {...props} textAlign="justify" />,
        img: ({ ...props }) => {
          return (
            <MarkdownImageRenderer
              src={props.src!.toString()}
              info={props.alt!}
            ></MarkdownImageRenderer>
          );
        },
        a: ({ ...props }) => {
          return <Link {...props} />;
        },
        code(codeProps) {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const { children, className, ref: _, ...rest } = codeProps;
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <SyntaxHighlighter
              {...rest}
              style={oneDark}
              PreTag="div"
              language={match[1]}
              showLineNumbers={true}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    ></MarkdownAsync>
  );
}
