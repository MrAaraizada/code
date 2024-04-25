import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";

export interface FrontMatter {
  title: string;
  description?: string;
  published?: boolean;
}

export async function getDocBySlug(slug: string) {
  const filePath = path.join(process.cwd(), "content/docs", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  
  const { content, frontmatter } = await compileMDX<FrontMatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    content,
    frontmatter,
    slug,
  };
}
