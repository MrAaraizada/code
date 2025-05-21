import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/components/card/card.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

// Updated: 2026-01-21 00:05:54 - feat(pages/joy-ui): enhance card component page
