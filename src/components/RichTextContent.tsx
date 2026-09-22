import "katex/dist/katex.min.css";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import katex from "katex";

import type { Page, Post } from "@/payload-types";

type EquationNode = {
  fields: {
    formula: string;
    display?: boolean | null;
  };
  type: "block";
  version: number;
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    ...defaultConverters.blocks,
    equation: ({ node }: { node: EquationNode }) => {
      const displayMode = node.fields.display !== false;
      const html = katex.renderToString(node.fields.formula, {
        displayMode,
        strict: "ignore",
        throwOnError: false,
      });

      return (
        <div
          className="prose-equation"
          // Wide display equations scroll; make them reachable by keyboard.
          tabIndex={displayMode ? 0 : undefined}
          role={displayMode ? "group" : undefined}
          aria-label={displayMode ? "Equation" : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    },
  },
});

export function RichTextContent({
  content,
}: {
  content: Page["content"] | Post["content"];
}) {
  return <RichText className="prose" converters={converters} data={content} />;
}
