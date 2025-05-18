import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/material/components/cards/cards.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

// Updated: 2026-01-20 23:51:00 - feat(pages/material-ui): improve material UI component pages

// Updated: 2026-01-21 00:05:51 - feat(pages/material-ui): enhance card component page
