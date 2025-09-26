import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/joy/components/button/button.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

// Updated: 2026-01-21 00:05:53 - feat(pages/joy-ui): enhance button component page

// Updated: 2026-01-21 00:47:40 - feat(pages/joy-ui): enhance button component page
