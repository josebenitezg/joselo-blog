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
      const html = katex.renderToString(node.fields.formula, {
        displayMode: node.fields.display !== false,
        strict: "ignore",
        throwOnError: false,
      });

      return (
        <div
          className="prose-equation"
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
