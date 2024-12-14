import { HTMLElement } from './HTMLParser';

export interface TransformOptions {
  componentMapping: Record<string, string>;
  styleMapping: Record<string, any>;
  customComponents: Record<string, (props: any, children: any[]) => any>;
}

export interface ReactNativeComponent {
  type: string;
  props: Record<string, any>;
  children: (ReactNativeComponent | string)[];
}

export class ReactNativeTransformer {
  private static defaultComponentMapping: Record<string, string> = {
    'div': 'View',
    'span': 'Text',
    'p': 'Text',
    'h1': 'Text',
    'h2': 'Text',
    'h3': 'Text',
    'h4': 'Text',
    'h5': 'Text',
    'h6': 'Text',
    'img': 'Image',
    'input': 'TextInput',
    'button': 'TouchableOpacity',
    'a': 'TouchableOpacity',
    'ul': 'View',
    'ol': 'View',
    'li': 'View',
    'section': 'View',
    'article': 'View',
    'header': 'View',
    'footer': 'View',
    'nav': 'View',
    'main': 'View',
  };

  private static defaultStyleMapping: Record<string, any> = {
    'display': {
      'flex': { display: 'flex' },
      'none': { display: 'none' },
      'block': { display: 'flex', flexDirection: 'column' },
      'inline': { display: 'flex', flexDirection: 'row' },
    },
    'flex-direction': {
      'row': { flexDirection: 'row' },
      'column': { flexDirection: 'column' },
      'row-reverse': { flexDirection: 'row-reverse' },
      'column-reverse': { flexDirection: 'column-reverse' },
    },
    'justify-content': {
      'flex-start': { justifyContent: 'flex-start' },
      'flex-end': { justifyContent: 'flex-end' },
      'center': { justifyContent: 'center' },
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
      'space-evenly': { justifyContent: 'space-evenly' },
    },
    'align-items': {
      'flex-start': { alignItems: 'flex-start' },
      'flex-end': { alignItems: 'flex-end' },
      'center': { alignItems: 'center' },
      'stretch': { alignItems: 'stretch' },
      'baseline': { alignItems: 'baseline' },
    },
  };

  public static transform(
    elements: HTMLElement[],
    options: Partial<TransformOptions> = {}
  ): ReactNativeComponent[] {
    const finalOptions: TransformOptions = {
      componentMapping: { ...this.defaultComponentMapping, ...options.componentMapping },
      styleMapping: { ...this.defaultStyleMapping, ...options.styleMapping },
      customComponents: options.customComponents || {},
    };

    return elements.map(element => this.transformElement(element, finalOptions));
  }

  private static transformElement(
    element: HTMLElement | string,
    options: TransformOptions
  ): ReactNativeComponent | string {
    if (typeof element === 'string') {
      return element;
    }

    // Handle text nodes
    if (element.tagName === 'text') {
      return element.textContent || '';
    }

    // Get React Native component type
    const componentType = options.componentMapping[element.tagName.toLowerCase()] || 'View';

    // Transform attributes to props
    const props = this.transformAttributes(element.attributes, options);

    // Transform children
    const children = element.children.map(child => 
      this.transformElement(child, options)
    ).filter(child => child !== null && child !== undefined);

    // Handle custom components
    if (options.customComponents[componentType]) {
      return options.customComponents[componentType](props, children);
    }

    return {
      type: componentType,
      props,
      children,
    };
  }

  private static transformAttributes(
    attributes: Record<string, string>,
    options: TransformOptions
  ): Record<string, any> {
    const props: Record<string, any> = {};

    Object.entries(attributes).forEach(([key, value]) => {
      switch (key.toLowerCase()) {
        case 'class':
        case 'classname':
          props.style = this.parseClassName(value, options);
          break;
        case 'style':
          props.style = { ...props.style, ...this.parseInlineStyle(value, options) };
          break;
        case 'src':
          props.source = { uri: value };
          break;
        case 'alt':
          props.accessibilityLabel = value;
          break;
        case 'placeholder':
          props.placeholder = value;
          break;
        case 'value':
          props.value = value;
          break;
        case 'disabled':
          props.disabled = value === 'true' || value === '';
          break;
        case 'readonly':
          props.editable = !(value === 'true' || value === '');
          break;
        case 'href':
          props.onPress = () => {
            // Handle navigation - would need to be implemented based on navigation library
            console.log('Navigate to:', value);
          };
          break;
        case 'onclick':
          props.onPress = new Function(value);
          break;
        default:
          // Pass through other attributes
          props[key] = value;
      }
    });

    return props;
  }

  private static parseClassName(className: string, options: TransformOptions): any {
    // Simple className parsing - in a real implementation, this would be more sophisticated
    const classes = className.split(/\s+/);
    let style = {};

    classes.forEach(cls => {
      // This would typically map to a stylesheet or CSS-in-JS solution
      switch (cls) {
        case 'flex':
          style = { ...style, display: 'flex' };
          break;
        case 'flex-row':
          style = { ...style, flexDirection: 'row' };
          break;
        case 'flex-col':
          style = { ...style, flexDirection: 'column' };
          break;
        case 'justify-center':
          style = { ...style, justifyContent: 'center' };
          break;
        case 'items-center':
          style = { ...style, alignItems: 'center' };
          break;
        case 'text-center':
          style = { ...style, textAlign: 'center' };
          break;
        case 'font-bold':
          style = { ...style, fontWeight: 'bold' };
          break;
        case 'text-lg':
          style = { ...style, fontSize: 18 };
          break;
        case 'text-xl':
          style = { ...style, fontSize: 20 };
          break;
        case 'p-4':
          style = { ...style, padding: 16 };
          break;
        case 'm-4':
          style = { ...style, margin: 16 };
          break;
      }
    });

    return style;
  }

  private static parseInlineStyle(styleString: string, options: TransformOptions): any {
    const style: any = {};
    const declarations = styleString.split(';');

    declarations.forEach(declaration => {
      const [property, value] = declaration.split(':').map(s => s.trim());
      
      if (property && value) {
        const camelCaseProperty = this.toCamelCase(property);
        style[camelCaseProperty] = this.parseStyleValue(property, value);
      }
    });

    return style;
  }

  private static toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }

  private static parseStyleValue(property: string, value: string): any {
    // Handle different CSS value types
    if (value.endsWith('px')) {
      return parseInt(value.slice(0, -2), 10);
    }
    
    if (value.endsWith('%')) {
      return value; // Keep percentage as string for React Native
    }
    
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    
    return value;
  }
}

export default ReactNativeTransformer;
