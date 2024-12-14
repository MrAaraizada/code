import React from 'react';

export interface ComponentDefinition {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  defaultProps?: Record<string, any>;
  validation?: (props: any) => boolean;
}

export interface RegistryOptions {
  allowOverride: boolean;
  validateProps: boolean;
  logRegistrations: boolean;
}

export class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components: Map<string, ComponentDefinition> = new Map();
  private options: RegistryOptions = {
    allowOverride: false,
    validateProps: true,
    logRegistrations: false,
  };

  private constructor() {
    this.registerDefaultComponents();
  }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  public setOptions(options: Partial<RegistryOptions>): void {
    this.options = { ...this.options, ...options };
  }

  public register(definition: ComponentDefinition): void {
    const { name, component } = definition;

    if (this.components.has(name) && !this.options.allowOverride) {
      throw new Error(`Component "${name}" is already registered. Set allowOverride to true to replace it.`);
    }

    if (this.options.logRegistrations) {
      console.log(`Registering component: ${name}`);
    }

    this.components.set(name, {
      ...definition,
      defaultProps: definition.defaultProps || {},
    });
  }

  public get(name: string): ComponentDefinition | undefined {
    return this.components.get(name);
  }

  public has(name: string): boolean {
    return this.components.has(name);
  }

  public unregister(name: string): boolean {
    return this.components.delete(name);
  }

  public list(): string[] {
    return Array.from(this.components.keys());
  }

  public clear(): void {
    this.components.clear();
    this.registerDefaultComponents();
  }

  public createComponent(
    name: string,
    props: Record<string, any> = {},
    children?: React.ReactNode
  ): React.ReactElement | null {
    const definition = this.components.get(name);

    if (!definition) {
      console.warn(`Component "${name}" not found in registry`);
      return null;
    }

    // Merge props with default props
    const finalProps = {
      ...definition.defaultProps,
      ...props,
    };

    // Validate props if enabled
    if (this.options.validateProps && definition.validation) {
      if (!definition.validation(finalProps)) {
        console.error(`Props validation failed for component "${name}"`);
        return null;
      }
    }

    // Create the component
    return React.createElement(definition.component, finalProps, children);
  }

  public batch(definitions: ComponentDefinition[]): void {
    definitions.forEach(definition => {
      try {
        this.register(definition);
      } catch (error) {
        console.error(`Failed to register component "${definition.name}":`, error);
      }
    });
  }

  public export(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  public import(definitions: ComponentDefinition[]): void {
    this.batch(definitions);
  }

  private registerDefaultComponents(): void {
    // Register common React Native components
    const defaultComponents: ComponentDefinition[] = [
      {
        name: 'View',
        component: require('react-native').View,
        defaultProps: {},
        validation: (props) => typeof props === 'object',
      },
      {
        name: 'Text',
        component: require('react-native').Text,
        defaultProps: {},
        validation: (props) => typeof props === 'object',
      },
      {
        name: 'Image',
        component: require('react-native').Image,
        defaultProps: {},
        validation: (props) => props.source !== undefined,
      },
      {
        name: 'TextInput',
        component: require('react-native').TextInput,
        defaultProps: {},
        validation: (props) => typeof props === 'object',
      },
      {
        name: 'TouchableOpacity',
        component: require('react-native').TouchableOpacity,
        defaultProps: { activeOpacity: 0.7 },
        validation: (props) => typeof props === 'object',
      },
      {
        name: 'ScrollView',
        component: require('react-native').ScrollView,
        defaultProps: {},
        validation: (props) => typeof props === 'object',
      },
      {
        name: 'FlatList',
        component: require('react-native').FlatList,
        defaultProps: {},
        validation: (props) => Array.isArray(props.data),
      },
    ];

    // Register without logging during initialization
    const originalLogSetting = this.options.logRegistrations;
    this.options.logRegistrations = false;

    defaultComponents.forEach(definition => {
      this.components.set(definition.name, definition);
    });

    this.options.logRegistrations = originalLogSetting;
  }

  public getStats(): {
    totalComponents: number;
    defaultComponents: number;
    customComponents: number;
  } {
    const total = this.components.size;
    const defaultCount = 7; // Number of default components
    
    return {
      totalComponents: total,
      defaultComponents: Math.min(defaultCount, total),
      customComponents: Math.max(0, total - defaultCount),
    };
  }

  public validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    this.components.forEach((definition, name) => {
      if (!definition.component) {
        errors.push(`Component "${name}" has no component implementation`);
      }

      if (typeof definition.component !== 'function') {
        errors.push(`Component "${name}" implementation is not a function`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default ComponentRegistry;
