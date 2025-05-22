import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/styled/styled.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

// Updated: 2026-01-21 00:05:55 - feat(pages/system): enhance styled component page
