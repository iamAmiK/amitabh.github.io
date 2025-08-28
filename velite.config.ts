import { defineConfig, defineCollection, s } from "velite";
import rehypeRaw from "rehype-raw";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

// Blog collection removed

// Changelog collection removed

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {},
  mdx: {
    rehypePlugins: [
      [rehypeRaw, { passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'] }]
    ],
    remarkPlugins: [],
  },
});
