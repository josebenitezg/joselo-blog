import type { Block } from "payload";

export const Equation: Block = {
  slug: "equation",
  interfaceName: "EquationBlock",
  labels: {
    plural: "Equations",
    singular: "Equation",
  },
  fields: [
    {
      name: "formula",
      type: "textarea",
      required: true,
      admin: {
        description: "LaTeX only, without the surrounding $$ delimiters.",
      },
    },
    {
      name: "display",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
