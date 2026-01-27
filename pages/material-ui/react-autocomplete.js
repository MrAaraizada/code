import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/material/components/autocomplete/autocomplete.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

// Updated: 2026-01-21 00:05:53 - feat(pages/material-ui): enhance autocomplete component page

// Updated: 2026-01-21 00:47:42 - feat(pages/material-ui): enhance autocomplete page

// Modified: 2026-01-21 01:09:55
