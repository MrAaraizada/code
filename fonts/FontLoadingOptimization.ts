export class FontLoadingOptimization {
  static preloadFonts() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    document.head.appendChild(link);
  }
}
