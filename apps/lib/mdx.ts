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

// Enhanced MDX processing for Material UI components
export const materialUIComponents = {
  Button: (props: any) => <MuiButton variant="contained" {...props} />,
  Card: (props: any) => <MuiCard elevation={2} {...props} />,
  Typography: (props: any) => <MuiTypography {...props} />,
};

// Updated: 2026-01-20 23:51:15 - docs(apps/lib): improve documentation utilities

// Updated: 2026-01-21 00:01:09 - docs(apps/lib): enhance MDX utilities

// Updated: 2026-01-21 00:05:40 - feat(apps/lib): enhance MDX processing
