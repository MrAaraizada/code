export interface HTMLElement {
  tagName: string;
  attributes: Record<string, string>;
  children: (HTMLElement | string)[];
  textContent?: string;
}

export interface ParseOptions {
  preserveWhitespace: boolean;
  selfClosingTags: string[];
  voidElements: string[];
}

export class HTMLParser {
  private static defaultOptions: ParseOptions = {
    preserveWhitespace: false,
    selfClosingTags: ['br', 'hr', 'img', 'input', 'meta', 'link'],
    voidElements: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
  };

  public static parse(html: string, options: Partial<ParseOptions> = {}): HTMLElement[] {
    const finalOptions = { ...this.defaultOptions, ...options };
    const tokens = this.tokenize(html);
    return this.buildTree(tokens, finalOptions);
  }

  private static tokenize(html: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inTag = false;
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < html.length; i++) {
      const char = html[i];
      const nextChar = html[i + 1];

      if (!inTag && char === '<') {
        if (current.trim()) {
          tokens.push(current.trim());
        }
        current = char;
        inTag = true;
      } else if (inTag && char === '>' && !inQuotes) {
        current += char;
        tokens.push(current);
        current = '';
        inTag = false;
      } else if (inTag && (char === '"' || char === "'")) {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
          quoteChar = '';
        }
        current += char;
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      tokens.push(current.trim());
    }

    return tokens.filter(token => token.length > 0);
  }

  private static buildTree(tokens: string[], options: ParseOptions): HTMLElement[] {
    const stack: HTMLElement[] = [];
    const result: HTMLElement[] = [];

    for (const token of tokens) {
      if (this.isOpeningTag(token)) {
        const element = this.parseTag(token);
        
        if (options.voidElements.includes(element.tagName.toLowerCase())) {
          // Void elements don't have children
          if (stack.length > 0) {
            stack[stack.length - 1].children.push(element);
          } else {
            result.push(element);
          }
        } else {
          stack.push(element);
        }
      } else if (this.isClosingTag(token)) {
        const tagName = this.getTagName(token);
        
        // Find matching opening tag
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].tagName.toLowerCase() === tagName.toLowerCase()) {
            const element = stack.splice(i)[0];
            
            if (stack.length > 0) {
              stack[stack.length - 1].children.push(element);
            } else {
              result.push(element);
            }
            break;
          }
        }
      } else {
        // Text content
        const textContent = options.preserveWhitespace ? token : token.trim();
        
        if (textContent) {
          if (stack.length > 0) {
            stack[stack.length - 1].children.push(textContent);
          } else {
            // Orphaned text becomes a text node
            result.push({
              tagName: 'text',
              attributes: {},
              children: [],
              textContent,
            });
          }
        }
      }
    }

    // Handle unclosed tags
    while (stack.length > 0) {
      const element = stack.pop()!;
      result.push(element);
    }

    return result;
  }

  private static isOpeningTag(token: string): boolean {
    return token.startsWith('<') && !token.startsWith('</') && token.endsWith('>');
  }

  private static isClosingTag(token: string): boolean {
    return token.startsWith('</') && token.endsWith('>');
  }

  private static parseTag(token: string): HTMLElement {
    const tagContent = token.slice(1, -1); // Remove < and >
    const parts = tagContent.split(/\s+/);
    const tagName = parts[0];
    const attributes: Record<string, string> = {};

    // Parse attributes
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const equalIndex = part.indexOf('=');
      
      if (equalIndex > 0) {
        const attrName = part.substring(0, equalIndex);
        let attrValue = part.substring(equalIndex + 1);
        
        // Remove quotes
        if ((attrValue.startsWith('"') && attrValue.endsWith('"')) ||
            (attrValue.startsWith("'") && attrValue.endsWith("'"))) {
          attrValue = attrValue.slice(1, -1);
        }
        
        attributes[attrName] = attrValue;
      } else {
        // Boolean attribute
        attributes[part] = 'true';
      }
    }

    return {
      tagName,
      attributes,
      children: [],
    };
  }

  private static getTagName(token: string): string {
    const tagContent = token.slice(2, -1); // Remove </ and >
    return tagContent.split(/\s+/)[0];
  }
}

export default HTMLParser;
