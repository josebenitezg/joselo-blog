import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

function MarkdownLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      rel={external ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

function MarkdownImage({ src, alt = "" }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;

  return (
    <span className="prose-image">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        sizes="(max-width: 820px) 100vw, 760px"
        unoptimized={src.startsWith("http")}
      />
    </span>
  );
}

export function MarkdownContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={{ a: MarkdownLink, img: MarkdownImage }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        }}
      />
    </div>
  );
}
