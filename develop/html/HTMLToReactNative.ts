import { HTMLParser, HTMLElement } from './HTMLParser';
import { ReactNativeTransformer, ReactNativeComponent } from './ReactNativeTransformer';
import { ComponentRegistry } from './ComponentRegistry';
import React from 'react';

export interface ConversionOptions {
  preserveWhitespace?: boolean;
  customComponents?: Record<string, React.ComponentType<any>>;
  styleMapping?: Record<string, any>;
  componentMapping?: Record<string, string>;
  enableValidation?: boolean;
  logTransformations?: boolean;
}

export interface ConversionResult {
  success: boolean;
  components: React.ReactElement[];
  errors: string[];
  warnings: string[];
  stats: {
    elementsProcessed: number;
    componentsCreated: number;
    transformationTime: number;
  };
}

export class HTMLToReactNative {
  private static instance: HTMLToReactNative;
  private registry: ComponentRegistry;
  private defaultOptions: ConversionOptions = {
    preserveWhitespace: false,
    customComponents: {},
    styleMapping: {},
    componentMapping: {},
    enableValidation: true,
    logTransformations: false,
  };

  private constructor() {
    this.registry = ComponentRegistry.getInstance();
  }

  public static getInstance(): HTMLToReactNative {
    if (!HTMLToReactNative.instance) {
      HTMLToReactNative.instance = new HTMLToReactNative();
    }
    return HTMLToReactNative.instance;
  }

  public convert(html: string, options: ConversionOptions = {}): ConversionResult {
    const startTime = Date.now();
    const finalOptions = { ...this.defaultOptions, ...options };
    const errors: string[] = [];
    const warnings: string[] = [];
    let components: React.ReactElement[] = [];
    let elementsProcessed = 0;
    let componentsCreated = 0;

    try {
      if (finalOptions.logTransformations) {
        console.log('Starting HTML to React Native conversion...');
      }

      // Step 1: Parse HTML
      const parseOptions = {
        preserveWhitespace: finalOptions.preserveWhitespace || false,
        selfClosingTags: ['br', 'hr', 'img', 'input', 'meta', 'link'],
        voidElements: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
      };

      const htmlElements = HTMLParser.parse(html, parseOptions);
      elementsProcessed = this.countElements(htmlElements);

      if (finalOptions.logTransformations) {
        console.log(`Parsed ${elementsProcessed} HTML elements`);
      }

      // Step 2: Transform to React Native components
      const transformOptions = {
        componentMapping: finalOptions.componentMapping || {},
        styleMapping: finalOptions.styleMapping || {},
        customComponents: finalOptions.customComponents || {},
      };

      const rnComponents = ReactNativeTransformer.transform(htmlElements, transformOptions);

      // Step 3: Create React elements
      components = rnComponents.map((component, index) => {
        try {
          const element = this.createReactElement(component, `element-${index}`);
          if (element) {
            componentsCreated++;
            return element;
          }
          return null;
        } catch (error) {
          errors.push(`Failed to create component at index ${index}: ${error}`);
          return null;
        }
      }).filter(Boolean) as React.ReactElement[];

      if (finalOptions.logTransformations) {
        console.log(`Created ${componentsCreated} React Native components`);
      }

      // Step 4: Validation
      if (finalOptions.enableValidation) {
        const validationResult = this.validateComponents(components);
        warnings.push(...validationResult.warnings);
        errors.push(...validationResult.errors);
      }

    } catch (error) {
      errors.push(`Conversion failed: ${error}`);
    }

    const transformationTime = Date.now() - startTime;

    return {
      success: errors.length === 0,
      components,
      errors,
      warnings,
      stats: {
        elementsProcessed,
        componentsCreated,
        transformationTime,
      },
    };
  }

  private countElements(elements: (HTMLElement | string)[]): number {
    let count = 0;
    
    elements.forEach(element => {
      if (typeof element === 'string') {
        count++;
      } else {
        count++;
        count += this.countElements(element.children);
      }
    });

    return count;
  }

  private createReactElement(
    component: ReactNativeComponent | string,
    key: string
  ): React.ReactElement | null {
    if (typeof component === 'string') {
      return React.createElement('Text', { key }, component);
    }

    const { type, props, children } = component;

    // Check if component is registered
    if (!this.registry.has(type)) {
      console.warn(`Component "${type}" not found in registry, using View as fallback`);
      return React.createElement('View', { key, ...props }, 
        children.map((child, index) => 
          this.createReactElement(child, `${key}-child-${index}`)
        )
      );
    }

    // Create children elements
    const childElements = children.map((child, index) => 
      this.createReactElement(child, `${key}-child-${index}`)
    ).filter(Boolean);

    // Create the component using registry
    return this.registry.createComponent(type, { key, ...props }, childElements);
  }

  private validateComponents(components: React.ReactElement[]): {
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    components.forEach((component, index) => {
      if (!React.isValidElement(component)) {
        errors.push(`Invalid React element at index ${index}`);
      }

      // Check for common issues
      if (component.type === 'Text' && component.props.children) {
        const hasNestedText = React.Children.toArray(component.props.children)
          .some(child => React.isValidElement(child) && child.type === 'Text');
        
        if (hasNestedText) {
          warnings.push(`Nested Text components detected at index ${index} - this may cause rendering issues`);
        }
      }
    });

    return { errors, warnings };
  }

  public registerCustomComponent(
    name: string,
    component: React.ComponentType<any>,
    defaultProps?: Record<string, any>
  ): void {
    this.registry.register({
      name,
      component,
      defaultProps,
    });
  }

  public getRegisteredComponents(): string[] {
    return this.registry.list();
  }

  public clearRegistry(): void {
    this.registry.clear();
  }

  public getStats(): any {
    return this.registry.getStats();
  }
}

// Export singleton instance
export const htmlToReactNative = HTMLToReactNative.getInstance();

export default HTMLToReactNative;
